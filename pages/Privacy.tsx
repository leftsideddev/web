import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Clock, Mail, ArrowRight } from 'lucide-react';
import { useTheme } from '../App';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Privacy: React.FC = () => {
    const { isDarkMode } = useTheme();

    const policyMarkdown = `# Privacy Policy

**Last Updated: October 2025**

## 1. Overview

Left-Sided Studios ("Left-Sided Studios," "we," "us," or "our") respects your privacy and is committed to protecting it through this Privacy Policy. This policy explains how we collect, use, disclose, and safeguard information when you visit our website or use any related digital services we operate (collectively, the "Services").

As an independent studio, we prioritize transparency and minimal data collection. We design our Services to function without requiring user accounts and to collect only the information necessary to operate, maintain, and improve our offerings.

By accessing or using our Services, you agree to the practices described in this Privacy Policy.

## 2. Scope of This Policy

This Privacy Policy applies to information collected:

- Through our website and any subdomains operated by Left-Sided Studios
- Through direct communications between you and us (such as email or contact forms)
- Automatically through technical processes associated with website hosting and delivery

This policy does **not** apply to third-party websites, platforms, or services that may be linked from our Services.

## 3. Information We Collect

We aim to collect as little information as possible. Depending on how you interact with us, we may collect the following types of information:

### 3.1 Information You Provide Voluntarily

You may choose to provide information to us when you:

- Contact us via email
- Submit a message through a contact form
- Communicate with us for support, feedback, or business inquiries

This information may include your email address, name (if provided), and any other information you include in your message. You are not required to provide any information beyond what you choose to share.

### 3.2 Automatically Collected Information

When you visit our website, certain information may be collected automatically by our hosting and delivery infrastructure. This may include:

- Internet Protocol (IP) address
- Browser type and version
- Operating system
- Referring/exit pages
- Date and time of access

This information is generally collected in server logs by our hosting provider (Netlify) and is used for security monitoring, troubleshooting, and performance optimization.

### 3.3 Cookies and Local Storage

We use minimal cookies or similar technologies solely for functionality purposes. Specifically:

- To remember your preference for Dark Mode or Light Mode

We do **not** use cookies for advertising, cross-site tracking, or behavioral profiling.

You can control or disable cookies through your browser settings; however, doing so may affect certain visual or preference-related features of the site.

## 4. How We Use Information

We use the information we collect for limited and specific purposes, including:

- Responding to inquiries and communications
- Operating and maintaining our website
- Monitoring website performance and security
- Improving user experience and site functionality
- Complying with legal obligations, if applicable

We do not use your information for automated decision-making or profiling.

## 5. Data Sharing and Disclosure

We do not sell, rent, trade, or otherwise transfer your personally identifiable information to outside parties for marketing or commercial purposes.

We may share information only in the following limited circumstances:

- **Service Providers:** With trusted third-party service providers (such as our hosting provider) who assist us in operating our website, provided they agree to keep such information confidential and use it only for authorized purposes.
- **Legal Requirements:** If required to do so by law, regulation, legal process, or governmental request.
- **Protection of Rights:** To protect the rights, property, or safety of Left-Sided Studios, our users, or others.

## 6. Third-Party Services and Links

Our Services may contain links to third-party platforms and services, including but not limited to GameJolt, YouTube, Discord, and social media platforms.

We do not control and are not responsible for the privacy practices, content, or policies of these third-party sites. We encourage you to review the privacy policies of any external services you visit.

## 7. Data Retention

We retain personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.

- Communication emails may be retained for reference or record-keeping
- Server logs are retained according to our hosting provider’s standard retention policies

When information is no longer needed, it is deleted or anonymized where feasible.

## 8. Data Security

We take reasonable administrative and technical measures to protect the information we collect against unauthorized access, disclosure, alteration, or destruction.

However, no method of transmission over the Internet or method of electronic storage is completely secure. While we strive to protect your information, we cannot guarantee absolute security.

## 9. Children’s Privacy

Our Services are not directed to children under the age of 13, and we do not knowingly collect personal information from children.

If you believe that a child has provided us with personal information, please contact us, and we will take appropriate steps to remove such information.

## 10. Your Privacy Rights

Depending on your location, you may have certain rights regarding your personal information, including:

- The right to access the information we hold about you
- The right to request correction or deletion of your information
- The right to object to or restrict certain processing activities

To exercise any applicable rights, please contact us using the information below. We will respond within a reasonable timeframe and in accordance with applicable laws.

## 11. Changes to This Privacy Policy

We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, or legal requirements.

When we make changes, we will update the "Last Updated" date at the top of this policy. Continued use of our Services after any changes indicates your acceptance of the revised policy.

## 12. Contact Information

If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, you may contact us at:

**Email:** leftsidedstudios@gmail.com`;

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="max-w-4xl mx-auto py-12 pb-32 px-6"
        >
            {/* Restored Original Header Layout */}
            <div className="mb-24 text-center">
                <div className={`inline-flex p-4 rounded-[2rem] mb-8 ${isDarkMode ? 'bg-emerald-500/10 text-emerald-500' : 'bg-emerald-50 text-emerald-600'}`}>
                    <ShieldCheck className="w-12 h-12" />
                </div>
                <h1 className={`text-6xl md:text-7xl font-black tracking-tighter uppercase mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Privacy <span className="text-gray-500">Policy</span>
                </h1>
                <div className="flex items-center justify-center gap-6 text-gray-500 font-bold uppercase text-[10px] tracking-[0.3em]">
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>Last Updated: October 2025</span>
                    </div>
                </div>
            </div>

            {/* Markdown Content with neutral article-like typography */}
            <div className={`prose max-w-none ${isDarkMode ? 'prose-invert' : 'prose-emerald'} 
                prose-headings:text-white prose-headings:uppercase prose-headings:tracking-tight prose-headings:font-black
                prose-h1:hidden prose-h2:text-3xl prose-h2:mt-24 prose-h2:mb-10 prose-h2:border-b prose-h2:border-white/5 prose-h2:pb-4
                prose-h3:text-xl prose-h3:mt-12 prose-h3:mb-6 prose-h3:text-white/80
                prose-p:text-lg prose-p:leading-relaxed prose-p:font-light prose-p:text-gray-400
                prose-li:text-lg prose-li:font-light prose-li:text-gray-400
                prose-strong:text-emerald-500 prose-strong:font-bold
            `}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {policyMarkdown}
                </ReactMarkdown>
            </div>

            {/* Restored Footer Callout */}
            <div className={`mt-32 p-12 md:p-16 rounded-[3.5rem] border ${isDarkMode ? 'bg-neutral-900/50 border-white/5 shadow-2xl' : 'bg-gray-50 border-gray-100 shadow-sm'}`}>
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="text-center md:text-left">
                        <h2 className={`text-3xl font-black uppercase tracking-tight mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Contact Inquiry</h2>
                        <p className="text-gray-500 text-lg font-medium leading-relaxed max-w-lg">
                            If you have any questions or concerns regarding our privacy practices, our editorial team is available for direct inquiries.
                        </p>
                    </div>
                    <a 
                        href="mailto:leftsidedstudios@gmail.com" 
                        className="flex items-center gap-4 bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] text-sm transition-all shadow-xl shadow-emerald-500/20 active:scale-95 group"
                    >
                        <Mail className="w-5 h-5" /> leftsidedstudios@gmail.com
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </a>
                </div>
            </div>

            <footer className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
                <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em]">
                    &copy; {new Date().getFullYear()} Left-Sided Studios • Transparency by Design
                </p>
                <button 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
                    className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-3 group px-6 py-3 rounded-xl bg-emerald-500/5 hover:bg-emerald-500/10 transition-colors"
                >
                    Return to Top <ArrowRight className="w-4 h-4 -rotate-90 group-hover:-translate-y-1 transition-transform" />
                </button>
            </footer>
        </motion.div>
    );
};

export default Privacy;