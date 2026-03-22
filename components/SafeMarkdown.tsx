
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import DOMPurify from 'isomorphic-dompurify';

export const SafeMarkdown: React.FC<{ content: string; components?: any }> = ({ content, components }) => {
    const sanitized = DOMPurify.sanitize(content);
    return (
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
            {sanitized}
        </ReactMarkdown>
    );
};
