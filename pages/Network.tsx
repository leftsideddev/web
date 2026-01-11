import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, User, Shield, Zap, Users } from 'lucide-react';
import { useTheme } from '../App';
import { db } from '../constants';
import Card from '../components/Card';
import { Subsidiary, Partner } from '../types';

const Network: React.FC = () => {
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();

    const imprints = db.subsidiaries.filter(s => s.type === 'Founder Imprint');
    const officials = db.subsidiaries.filter(s => s.type === 'Official Subsidiary' || s.type === 'Production Unit');

    const renderSubCard = (sub: Subsidiary) => {
        const isFounder = sub.type === 'Founder Imprint';
        // As requested: Founder project entries keep emerald. Official units use purple.
        const accentColor = isFounder ? 'emerald' : 'purple';
        const typeColorClass = isFounder ? 'text-emerald-500' : 'text-purple-500';

        return (
            <Card
                key={sub.id}
                onClick={() => navigate(`/network/${sub.id}`)}
                image={sub.image}
                title={sub.name}
                subtitle={sub.tagline}
                description={sub.description}
                accentColor={accentColor}
                overlayColor={isFounder ? "bg-emerald-900/10" : "bg-purple-900/10"}
                footer={
                    <>
                        <div className="flex flex-col">
                            <span className={`text-[9px] font-black uppercase tracking-widest ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                {isFounder ? 'Owned By' : sub.type}
                            </span>
                            {sub.owner && (
                                <span className={`text-[10px] font-bold transition-colors ${typeColorClass}`}>
                                    {sub.owner}
                                </span>
                            )}
                            {!isFounder && (
                                <span className={`text-[10px] font-bold transition-colors ${typeColorClass}`}>
                                    Official Unit
                                </span>
                            )}
                        </div>
                        <span className={`text-xs flex items-center gap-1 font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                            View Details <ArrowRight className="w-3 h-3" />
                        </span>
                    </>
                }
            />
        );
    };

    const renderPartnerCard = (partner: Partner) => (
        <Card
            key={partner.id}
            onClick={() => navigate(`/partners/${partner.id}`)}
            image={partner.image}
            title={partner.name}
            subtitle={partner.type}
            description={partner.description}
            accentColor="blue"
            overlayColor="bg-blue-900/10"
            footer={
                <span className={`text-xs flex items-center gap-1 font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    View Details <ArrowRight className="w-3 h-3" />
                </span>
            }
        />
    );

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pb-32">
             <div className="mb-16">
                <div className="flex items-center gap-4 mb-4">
                    <button 
                        onClick={() => navigate('/')} 
                        className={`p-2 rounded-full ${isDarkMode ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-gray-100 hover:bg-gray-200 text-black'}`}
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-5xl font-black tracking-tighter uppercase">Our Network</h1>
                </div>
                <p className="text-gray-500 max-w-2xl text-lg">
                    The Left-Sided umbrella encompasses both official studio branches and personal creative projects led by our founders.
                </p>
            </div>

            {/* Official Units */}
            <section className="mb-24">
                <div className="flex items-center gap-3 mb-8">
                    <Shield className="w-6 h-6 text-purple-500" />
                    <h2 className="text-2xl font-black uppercase tracking-tight">Official Subsidiaries</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {officials.map(renderSubCard)}
                </div>
            </section>

            {/* Founder Projects */}
            <section className="mb-24">
                <div className="flex items-center gap-3 mb-8">
                    <User className="w-6 h-6 text-emerald-500" />
                    <h2 className="text-2xl font-black uppercase tracking-tight">Founder Projects</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {imprints.map(renderSubCard)}
                </div>
            </section>

            {/* Strategic Partners */}
            <section className="mb-24">
                <div className="flex items-center gap-3 mb-8">
                    <Users className="w-6 h-6 text-blue-500" />
                    <h2 className="text-2xl font-black uppercase tracking-tight">Strategic Partners</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {db.partners.map(renderPartnerCard)}
                </div>
            </section>

            <section className={`mt-32 p-12 md:p-16 rounded-[3rem] border flex flex-col md:flex-row items-center gap-12 text-center md:text-left ${
                isDarkMode ? 'bg-neutral-900 border-white/5' : 'bg-gray-50 border-gray-200'
            }`}>
                <div className="p-6 rounded-full bg-emerald-500/10 text-emerald-500">
                    <Zap className="w-12 h-12" />
                </div>
                <div className="flex-grow">
                    <h2 className="text-3xl font-black mb-4 tracking-tight uppercase">Strategic Alignment</h2>
                    <p className="text-gray-500 font-medium text-lg leading-relaxed">
                        Founder labels allow our team members to explore individual artistic visions while maintaining the high quality and resource support of the Left-Sided core.
                    </p>
                </div>
            </section>
        </motion.div>
    );
};

export default Network;