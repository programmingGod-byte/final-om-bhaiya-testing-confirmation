import { motion } from 'framer-motion';
import { ArrowUpRight, ShieldCheck, Lock, Database, Cookie } from 'lucide-react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Privacy = () => {
  const context = useContext(AuthContext)
    context.ScrollToTop()
    
  const sections = [
    {
      title: "Information Collection",
      icon: <Database className="text-purple-600" size={20} />,
      content: "We collect personal information when you register, use our services, or communicate with us. This may include name, email, usage data, and device information."
    },
    {
      title: "Data Usage",
      icon: <Cookie className="text-purple-600" size={20} />,
      content: "Your data helps us provide services, improve user experience, and communicate with you. We never sell personal information to third parties."
    },
    {
      title: "Security Measures",
      icon: <Lock className="text-purple-600" size={20} />,
      content: "We implement industry-standard encryption, regular security audits, and access controls to protect your information from unauthorized access."
    },
    {
      title: "Third-Party Services",
      icon: <ArrowUpRight className="text-purple-600" size={20} />,
      content: "We may use trusted third-party services (like analytics providers) that have their own privacy policies. We vet these services for compliance."
    },
    {
      title: "Your Rights",
      icon: <ShieldCheck className="text-purple-600" size={20} />,
      content: "You may request access, correction, or deletion of your personal data. Contact our Data Protection Officer at verigeektech@gmail.com for requests."
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 py-12"
    >
      {/* Hero Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-purple-100 mb-4">
          <ShieldCheck className="text-purple-600" size={32} />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Privacy Policy</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </motion.div>

      {/* Policy Sections */}
      <div className="space-y-10">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="p-2 bg-purple-50 rounded-lg">
                {section.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {section.title}
                </h3>
                <p className="text-gray-600">
                  {section.content}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Contact & Updates */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-16 bg-purple-50 p-6 rounded-xl text-center"
      >
        <h3 className="text-2xl font-semibold text-gray-900 mb-3">
          Questions or Updates?
        </h3>
        <p className="text-gray-600 mb-4 max-w-2xl mx-auto">
          We may update this policy periodically. Significant changes will be notified via email or platform announcements.
        </p>
        <Link to="/contact">
        <button className="inline-flex items-center px-5 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          Contact Privacy Team
          <ArrowUpRight className="ml-2" size={16} />
        </button>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Privacy;