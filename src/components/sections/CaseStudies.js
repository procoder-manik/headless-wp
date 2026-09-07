import React from 'react';
import { Link } from 'react-router-dom';

const CaseStudies = ({ isDark }) => {
  const caseStudies = [
    {
      id: 0,
      title: 'Enterprise SaaS Platform Migration',
      client: 'TechCorp Inc.',
      result: '300% Performance Improvement',
      description: 'Migrated from traditional WordPress to headless architecture, reducing load times from 2.5s to 800ms.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 1,
      title: 'E-commerce Multi-Channel Expansion',
      client: 'RetailMax Global',
      result: '5x Content Delivery Speed',
      description: 'Unified content delivery across web, mobile app, and IoT devices from a single WordPress backend.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 2,
      title: 'Media Company Digital Transformation',
      client: 'NewsFlow Media',
      result: '2M+ Monthly Readers',
      description: 'Scaled to handle 2 million monthly readers with sub-second page loads using headless WordPress.',
      image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 3,
      title: 'Financial Services Replatforming',
      client: 'SecureBank Financial',
      result: '99.99% Uptime',
      description: 'Replatformed legacy banking portal to headless WordPress with enhanced security and compliance features.',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 4,
      title: 'Healthcare Provider Portal',
      client: 'MediCare Health Systems',
      result: '60% Faster Patient Access',
      description: 'Built a patient portal with headless WordPress, enabling secure access to medical records and appointment scheduling.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 5,
      title: 'Education Platform Scale-Up',
      client: 'EduLearn Academy',
      result: '500k+ Active Learners',
      description: 'Scaled online learning platform to support half a million concurrent users with real-time collaboration features.',
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <section className={`py-24 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Case Studies
          </h2>
          <p className={`mx-auto mt-4 max-w-2xl text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            See how leading companies transformed their digital presence with our headless WordPress solutions.
          </p>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {caseStudies.map((study) => (
            <Link
              key={study.id}
              to={`/case-studies/${study.id}`}
              className={`group overflow-hidden rounded-2xl transition-all hover:scale-105 ${
                isDark 
                  ? 'bg-gray-800 border border-gray-700 hover:border-orange-700' 
                  : 'bg-gray-50 border border-gray-200 hover:border-orange-300'
              }`}
            >
              <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                <img
                  src={study.image}
                  alt={study.title}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className={`inline-block rounded-full px-3 py-1 text-xs font-semibold mb-4 ${
                  isDark ? 'bg-orange-500/10 text-orange-400' : 'bg-orange-100 text-orange-600'
                }`}>
                  {study.result}
                </div>
                <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {study.title}
                </h3>
                <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {study.description}
                </p>
                <p className={`text-xs font-semibold ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                  Client: {study.client}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
