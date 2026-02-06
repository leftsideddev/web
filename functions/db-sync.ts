
import { Handler } from '@netlify/functions';
import Redis from 'ioredis';

export const handler: Handler = async (event) => {
  const password = process.env.REDIS_PASSWORD;
  
  if (!password) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: "Environment configuration error: REDIS_PASSWORD is missing." }),
    };
  }

  const REDIS_URL = `redis://default:${encodeURIComponent(password)}@redis-18662.c8.us-east-1-4.ec2.cloud.redislabs.com:18662`;
  const redis = new Redis(REDIS_URL, { 
    connectTimeout: 8000, 
    maxRetriesPerRequest: 1,
    retryStrategy: () => null 
  });

  if (event.httpMethod === 'GET') {
    try {
      const keyType = await redis.type('constants');
      let rawData: any = null;

      console.log(`[Bridge] Key 'constants' detected as type: ${keyType}`);

      if (keyType === 'none') {
        await redis.quit();
        return {
          statusCode: 404,
          headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: "Key 'constants' not found in Redis database." }),
        };
      }

      if (keyType === 'ReJSON-RL' || keyType.toLowerCase() === 'json') {
        // Use '$' path to get the root. Note: JSON.GET with path often returns an array string like "[{...}]"
        rawData = await redis.call('JSON.GET', 'constants', '$');
      } else if (keyType === 'string') {
        rawData = await redis.get('constants');
      } else if (keyType === 'hash') {
        const hashData = await redis.hgetall('constants');
        rawData = hashData.database_template || Object.values(hashData)[0];
      } else {
        await redis.quit();
        return {
          statusCode: 400,
          headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: `Unsupported Redis type: ${keyType}.` }),
        };
      }

      await redis.quit();

      if (!rawData) {
        return {
          statusCode: 404,
          headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: "Retrieved data is null." }),
        };
      }

      // Handle rawData which might be a string (likely JSON string) or a parsed object
      let parsed;
      try {
        parsed = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;
        
        // RedisJSON with path '$' returns an array of results. If so, unwrap it.
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].about) {
            parsed = parsed[0];
        }
      } catch (e) {
        return {
          statusCode: 500,
          headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: "Data is not valid JSON.", raw: String(rawData).substring(0, 50) }),
        };
      }
      
      return {
        statusCode: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*' 
        },
        body: JSON.stringify(parsed),
      };
    } catch (error: any) {
      console.error("[Bridge] Redis Error:", error);
      try { await redis.quit(); } catch(e) {}
      return {
        statusCode: 500,
        headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          error: "Database bridge execution failure.", 
          message: error.message 
        }),
      };
    }
  }

  return { statusCode: 405, body: "Method Not Allowed" };
};
