import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import RecentPosts from '../../sections/RecentPosts';
import TeamCarousel from '../../shared/TeamCarousel';

const LogoImage = ({ src, fallback, alt, ...props }) => {
  const [error, setError] = React.useState(false);

  return (
    <img
      src={error && fallback ? fallback : src}
      alt={alt}
      loading="lazy"
      {...props}
      onError={() => setError(true)}
      style={{ height: '32px', width: '32px', objectFit: 'contain', flexShrink: 0 }}
    />
  );
};

const Marquee = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="marquee-wrapper overflow-hidden"
      style={{ '--dur': '38s' }}
    >
      <div
        className="marquee-track"
        style={{
          background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(249,115,22,0.08), transparent 60%)`,
        }}
      >
        {[
          { src: 'https://static.cdnlogo.com/logos/w/65/wordpress.svg', alt: 'WordPress' },
          { src: 'https://cdn.jsdelivr.net/gh/callback-io/allogo@main/public/logos/shopify/icon.svg', alt: 'Shopify' },
          { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/woocommerce/woocommerce-original.svg', alt: 'WooCommerce' },
          { src: 'https://cdn.jsdelivr.net/gh/callback-io/allogo@main/public/logos/squarespace/icon.svg', alt: 'Squarespace' },
          { src: 'https://cdn.jsdelivr.net/gh/callback-io/allogo@main/public/logos/wix/icon.svg', alt: 'Wix' },
          { src: 'https://cdn.jsdelivr.net/gh/callback-io/allogo@main/public/logos/webflow/icon.svg', alt: 'Webflow' },
          { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', alt: 'HTML5' },
          { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', alt: 'CSS3' },
          { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', alt: 'JavaScript' },
          { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', alt: 'React' },
          { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', alt: 'Node.js' },
          { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', alt: 'MongoDB' },
          { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg', alt: 'PHP' },
          { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', alt: 'Figma' },
          { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', alt: 'Tailwind CSS' },
          { src: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/n8n.svg', alt: 'n8n', fallback: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/53/N8n-logo-new.svg/1280px-N8n-logo-new.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail' },
          { src: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/zapier.svg', alt: 'Zapier' },
          { src: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/make.svg', alt: 'Make' },
          { src: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/hubspot.svg', alt: 'HubSpot CRM' },
        ].map((logo, i) => (
          <LogoImage
            key={i}
            src={logo.src}
            fallback={logo.fallback}
            alt={logo.alt}
            width="34"
            height="34"
            className={`${logo.alt === 'WordPress' || logo.alt === 'n8n' ? 'h-12 w-12' : 'h-10 w-10'} object-contain opacity-60 dark:opacity-70 hover:opacity-100 transition-opacity duration-300 flex-shrink-0`}
          />
        ))}
      </div>
      <div className="marquee-track" aria-hidden="true">
        {[
          { src: 'https://static.cdnlogo.com/logos/w/65/wordpress.svg', alt: '' },
          { src: 'https://cdn.jsdelivr.net/gh/callback-io/allogo@main/public/logos/shopify/icon.svg', alt: '' },
          { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/woocommerce/woocommerce-original.svg', alt: '' },
          { src: 'https://cdn.jsdelivr.net/gh/callback-io/allogo@main/public/logos/squarespace/icon.svg', alt: '' },
          { src: 'https://cdn.jsdelivr.net/gh/callback-io/allogo@main/public/logos/wix/icon.svg', alt: '' },
          { src: 'https://cdn.jsdelivr.net/gh/callback-io/allogo@main/public/logos/webflow/icon.svg', alt: '' },
          { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', alt: '' },
          { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', alt: '' },
          { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', alt: '' },
          { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', alt: '' },
          { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', alt: '' },
          { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', alt: '' },
          { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg', alt: '' },
          { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', alt: '' },
          { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', alt: '' },
          { src: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/n8n.svg', alt: '', fallback: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/53/N8n-logo-new.svg/1280px-N8n-logo-new.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail' },
          { src: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/zapier.svg', alt: '' },
          { src: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/make.svg', alt: '' },
          { src: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/hubspot.svg', alt: '' },
        ].map((logo, i) => (
          <LogoImage
            key={i}
            src={logo.src}
            fallback={logo.fallback}
            alt={logo.alt}
            width="34"
            height="34"
            className={`${logo.alt === 'WordPress' || logo.alt === 'n8n' ? 'h-12 w-12' : 'h-10 w-10'} object-contain opacity-60 dark:opacity-70 hover:opacity-100 transition-opacity duration-300 flex-shrink-0`}
          />
        ))}
      </div>
    </div>
  );
};

const Home = ({ isDark }) => {
  const [teamMembers, setTeamMembers] = useState([]);
  const features = [
    {
      title: 'Lightning Fast Performance',
      description: 'Optimized headless architecture delivers content in milliseconds, ensuring the best user experience across all devices.',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    },
    {
      title: 'Scalable Infrastructure',
      description: 'Built to grow with your business. Handle millions of requests without compromising on speed or reliability.',
      icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4',
    },
    {
      title: 'Secure by Design',
      description: 'Enterprise-grade security with regular updates, encrypted connections, and compliance with global standards.',
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    },
    {
      title: 'API-First Approach',
      description: 'Access your content through powerful REST and GraphQL APIs. Integrate with any platform or technology stack.',
      icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CTO at TechCorp',
      content: 'Switching to headless WordPress was the best decision we made. Our site loads 3x faster and our development workflow has never been smoother.',
      rating: 5,
      avatar: 'SJ',
    },
    {
      name: 'Michael Chen',
      role: 'Lead Developer at StartupXYZ',
      content: 'The API-first approach gives us complete flexibility. We built our React frontend in record time while keeping WordPress as our content backend.',
      rating: 5,
      avatar: 'MC',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Product Manager at DigitalAgency',
      content: 'Incredible performance and scalability. We handle millions of requests monthly without breaking a sweat. The headless architecture just works.',
      rating: 5,
      avatar: 'ER',
    },
    {
      name: 'David Kim',
      role: 'Full Stack Developer',
      content: 'Finally, a solution that combines WordPress\'s content management power with modern frontend frameworks. This is the future of web development.',
      rating: 5,
      avatar: 'DK',
    },
  ];

  const caseStudies = [
    {
      id: 0,
      title: 'Enterprise SaaS Platform Migration',
      client: 'TechCorp Inc.',
      result: '300% Performance Improvement',
      description: 'Migrated from traditional WordPress to headless architecture, reducing load times from 2.5s to 800ms.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      tags: ['WordPress', 'React', 'AWS'],
    },
    {
      id: 1,
      title: 'E-commerce Multi-Channel Expansion',
      client: 'RetailMax Global',
      result: '5x Content Delivery Speed',
      description: 'Unified content delivery across web, mobile app, and IoT devices from a single WordPress backend.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      tags: ['E-commerce', 'GraphQL', 'CDN'],
    },
    {
      id: 2,
      title: 'Media Company Digital Transformation',
      client: 'NewsFlow Media',
      result: '2M+ Monthly Readers',
      description: 'Scaled to handle 2 million monthly readers with sub-second page loads using headless WordPress.',
      image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80',
      tags: ['Media', 'Next.js', 'Vercel'],
    },
    {
      id: 3,
      title: 'Financial Services Replatforming',
      client: 'SecureBank Financial',
      result: '99.99% Uptime',
      description: 'Replatformed legacy banking portal to headless WordPress with enhanced security and compliance features.',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
      tags: ['Finance', 'Security', 'AWS'],
    },
    {
      id: 4,
      title: 'Healthcare Provider Portal',
      client: 'MediCare Health Systems',
      result: '60% Faster Patient Access',
      description: 'Built a patient portal with headless WordPress, enabling secure access to medical records and appointment scheduling.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
      tags: ['Healthcare', 'HIPAA', 'React'],
    },
    {
      id: 5,
      title: 'Education Platform Scale-Up',
      client: 'EduLearn Academy',
      result: '500k+ Active Learners',
      description: 'Scaled online learning platform to support half a million concurrent users with real-time collaboration features.',
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80',
      tags: ['Education', 'Node.js', 'Socket.io'],
    },
   ];

  useEffect(() => {
    const fetchTeam = async () => {
      try {
                const response = await axios.get(`${process.env.REACT_APP_CUSTOM_API_ROOT}/team`);
        const team = response.data || [];
        const mapped = team.map((member) => ({
          id: member.id,
          slug: member.slug,
          name: member.name,
          designation: member.designation || '',
          short_description: member.short_description || '',
          full_description: member.full_description || '',
          service_type: member.service_type || '',
          profile_link: member.profile_link || '',
          linkedin: member.linkedin || '',
          facebook: member.facebook || '',
          instagram: member.instagram || '',
          whatsapp: member.whatsapp || '',
          email: member.email || '',
          image: member.image ? { source_url: member.image } : null,
        }));
        setTeamMembers(mapped);
      } catch (err) {
        console.error('Failed to load team members:', err);
      }
    };

    fetchTeam();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className={`relative overflow-hidden py-24 sm:py-32 lg:py-40 ${
        isDark 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
          : 'bg-gradient-to-br from-slate-50 via-white to-slate-100'
      }`}>
        {/* Animated Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -30, 20, 0],
              scale: [1, 1.1, 0.95, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={`absolute -top-40 -right-40 h-80 w-80 rounded-full ${isDark ? 'bg-orange-500/10' : 'bg-orange-400/20'} blur-3xl`}
          />
          <motion.div
            animate={{
              x: [0, -20, 30, 0],
              y: [0, 20, -30, 0],
              scale: [1, 0.95, 1.1, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={`absolute top-1/2 -left-40 h-80 w-80 rounded-full ${isDark ? 'bg-blue-500/10' : 'bg-blue-400/20'} blur-3xl`}
          />
          <motion.div
            animate={{
              x: [0, -30, 20, 0],
              y: [0, 30, -20, 0],
              scale: [1, 1.05, 0.9, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={`absolute -bottom-40 right-1/3 h-80 w-80 rounded-full ${isDark ? 'bg-purple-500/10' : 'bg-purple-400/20'} blur-3xl`}
          />
          <motion.div
            animate={{
              x: [0, 15, -15, 0],
              y: [0, -15, 15, 0],
              scale: [1, 1.08, 0.92, 1],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={`absolute top-1/4 right-1/4 h-40 w-40 rounded-full ${isDark ? 'bg-emerald-500/10' : 'bg-emerald-400/15'} blur-3xl`}
          />
        </div>

        {/* Grid Background */}
        <div className={`absolute inset-0 ${isDark ? 'opacity-10' : 'opacity-20'}`}>
          <motion.div
            animate={{
              backgroundPosition: ['0px 0px', '50px 50px', '0px 0px'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'} 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
              className={`absolute w-2 h-2 rounded-full ${isDark ? 'bg-white' : 'bg-gray-400'}`}
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 30}%`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 flex justify-center"
            >
              <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
                isDark 
                  ? 'bg-white/10 text-gray-300 border border-white/10' 
                  : 'bg-gray-100 text-gray-700 border border-gray-200'
              }`}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                Headless WordPress Architecture
              </div>
            </motion.div>

            {/* Heading */}
            <div className="text-center">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl ${isDark ? 'text-white' : 'text-gray-900'}`}
              >
                <span className="block overflow-hidden">
                  <motion.span
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: [0.6, -0.05, 0.01, 0.99] }}
                    className="block"
                  >
                    Build Modern
                  </motion.span>
                </span>
                <span className="block overflow-hidden">
                  <motion.span
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: [0.6, -0.05, 0.01, 0.99] }}
                    className={`block bg-gradient-to-r ${isDark ? 'from-orange-400 via-orange-500 to-amber-400' : 'from-orange-600 via-orange-500 to-amber-500'} bg-clip-text text-transparent`}
                  >
                    Headless WordPress
                  </motion.span>
                </span>
                <span className="block overflow-hidden">
                  <motion.span
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
                    className="block"
                  >
                    Solutions
                  </motion.span>
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className={`mx-auto mt-8 max-w-2xl text-lg leading-8 sm:text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
              >
                Experience the future of content management. Scale your digital presence with our cutting-edge headless architecture, delivering lightning-fast performance across all platforms.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
              >
                <motion.a
                  href="/blog"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative rounded-full bg-gradient-to-r from-orange-600 to-orange-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-orange-500/30 transition-all hover:shadow-xl hover:shadow-orange-500/40 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Explore Blog
                    <motion.svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </motion.svg>
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-orange-700 to-orange-600"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`rounded-full px-8 py-4 text-base font-semibold transition-all ${
                    isDark 
                      ? 'bg-white/10 text-white backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/30' 
                      : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-sm hover:shadow-md'
                  }`}
                >
                  Learn More
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Logo/Tools Carousel */}
      <section className={`py-12 border-y ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className={`mb-8 text-center text-xs font-mono uppercase tracking-[0.24em] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Tools I build with every day
          </p>
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-800 z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent dark:from-gray-800 z-10 pointer-events-none" />
            <Marquee />
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className={`py-24 lg:py-32 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24 items-center">
            {/* Left - Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                  alt="Team collaboration"
                  className="w-full h-[500px] object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-gray-900/60 to-transparent' : 'from-black/30 to-transparent'}`}></div>
              </div>
              
              {/* Floating Stats Card */}
              <div className={`absolute -bottom-8 -right-4 lg:-right-8 rounded-2xl p-6 shadow-2xl ${
                isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
              }`}>
                <div className="flex items-center gap-4">
                  <div className={`rounded-xl p-3 ${
                    isDark ? 'bg-orange-500/10' : 'bg-orange-100'
                  }`}>
                    <svg className={`h-8 w-8 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      10+ Years
                    </div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Industry Experience
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium mb-6 ${
                isDark 
                  ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' 
                  : 'bg-orange-100 text-orange-700 border border-orange-200'
              }`}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                About Our Company
              </div>

              <h2 className={`text-4xl sm:text-5xl font-bold tracking-tight mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                We Build Digital
                <span className={`block bg-gradient-to-r ${isDark ? 'from-orange-400 to-amber-400' : 'from-orange-600 to-amber-500'} bg-clip-text text-transparent`}>
                  Experiences That Matter
                </span>
              </h2>

              <p className={`text-lg leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Founded with a passion for innovation, we specialize in creating headless WordPress solutions that transform how businesses connect with their audiences. Our team combines technical excellence with creative vision to deliver results that exceed expectations.
              </p>

              <p className={`text-base leading-relaxed mb-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                From startups to enterprise clients, we've helped organizations across industries harness the power of modern web technologies. Our approach is simple: understand your goals, architect the right solution, and deliver with precision.
              </p>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-6 mb-10">
                <div>
                  <div className={`text-3xl font-bold ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
                    500+
                  </div>
                  <div className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Projects Delivered
                  </div>
                </div>
                <div>
                  <div className={`text-3xl font-bold ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
                    98%
                  </div>
                  <div className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Client Satisfaction
                  </div>
                </div>
                <div>
                  <div className={`text-3xl font-bold ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
                    24/7
                  </div>
                  <div className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Support Available
                  </div>
                </div>
              </div>

              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-orange-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/40 hover:scale-105"
              >
                <span>Get In Touch</span>
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-24 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Powerful Features for Modern Teams
            </h2>
            <p className={`mx-auto mt-4 max-w-2xl text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Everything you need to build, deploy, and scale your headless WordPress solution.
            </p>
          </div>
          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div key={index} className={`rounded-2xl p-8 transition-all hover:scale-105 ${
                isDark 
                  ? 'bg-gray-800 border border-gray-700 hover:border-orange-700' 
                  : 'bg-gray-50 border border-gray-200 hover:border-orange-300'
              }`}>
                <div className={`inline-flex rounded-lg p-3 ${
                  isDark ? 'bg-orange-500/10' : 'bg-orange-100'
                }`}>
                  <svg className={`h-6 w-6 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                  </svg>
                </div>
                <h3 className={`mt-6 text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {feature.title}
                </h3>
                <p className={`mt-4 text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={`py-24 overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Trusted by Industry Leaders
            </h2>
            <p className={`mx-auto mt-4 max-w-2xl text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              See what our clients have to say about their experience with headless WordPress.
            </p>
          </div>

          <div className="relative">
            <motion.div
              className="flex gap-6"
              animate={{ x: [0, -1920] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className={`flex-shrink-0 w-[400px] rounded-2xl p-8 relative ${
                    isDark 
                      ? 'bg-gray-800 border border-gray-700 shadow-2xl shadow-black/20' 
                      : 'bg-white border border-gray-200 shadow-xl'
                  }`}
                >
                  {/* Quote Icon */}
                  <div className={`absolute top-6 right-6 opacity-10 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${isDark ? 'text-orange-400' : 'text-orange-500'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Content */}
                  <p className={`text-base leading-relaxed mb-6 relative z-10 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {testimonial.content}
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold ${
                      isDark ? 'bg-gradient-to-br from-orange-500 to-amber-500 text-white' : 'bg-gradient-to-br from-orange-600 to-amber-500 text-white'
                    }`}>
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {testimonial.name}
                      </div>
                      <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* About/Services Section */}
      <section className={`py-24 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Why Choose Headless WordPress?
              </h2>
              <p className={`mt-6 text-lg leading-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Traditional WordPress is great, but headless takes it to the next level. By decoupling the frontend from the backend, you get unparalleled flexibility, performance, and scalability.
              </p>
              <div className="mt-8 space-y-6">
                <div className="flex gap-4">
                  <div className={`flex-shrink-0 rounded-lg p-2 ${isDark ? 'bg-orange-500/10' : 'bg-orange-100'}`}>
                    <svg className={`h-6 w-6 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Better Performance
                    </h3>
                    <p className={`mt-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Static site generation and CDN delivery ensure blazing fast load times.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className={`flex-shrink-0 rounded-lg p-2 ${isDark ? 'bg-orange-500/10' : 'bg-orange-100'}`}>
                    <svg className={`h-6 w-6 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Multi-Platform Delivery
                    </h3>
                    <p className={`mt-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Reach web, mobile, IoT, and emerging platforms from a single content source.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className={`flex-shrink-0 rounded-lg p-2 ${isDark ? 'bg-orange-500/10' : 'bg-orange-100'}`}>
                    <svg className={`h-6 w-6 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Developer Friendly
                    </h3>
                    <p className={`mt-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Use modern frameworks like React, Next.js, or any frontend technology you prefer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <svg viewBox="0 0 500 400" className="w-full max-w-lg">
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#ea580c" />
                  </linearGradient>
                  <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#2563eb" />
                  </linearGradient>
                </defs>

                <circle cx="250" cy="200" r="60" fill="url(#grad1)" opacity="0.1" />

                <rect x="215" y="175" width="70" height="50" rx="8" fill="none" stroke="url(#grad1)" strokeWidth="2.5" />

                <text x="250" y="195" textAnchor="middle" fill={isDark ? "#fff" : "#111"} fontSize="10" fontWeight="bold">WP</text>
                <text x="250" y="215" textAnchor="middle" fill={isDark ? "#9ca3af" : "#6b7280"} fontSize="8">API</text>

                <g opacity="0.8">
                  <rect x="80" y="80" width="60" height="44" rx="6" fill="none" stroke="url(#grad2)" strokeWidth="2" />
                  <text x="110" y="104" textAnchor="middle" fill={isDark ? "#fff" : "#111"} fontSize="9" fontWeight="600">Web</text>

                  <rect x="360" y="80" width="60" height="44" rx="6" fill="none" stroke="url(#grad2)" strokeWidth="2" />
                  <text x="390" y="104" textAnchor="middle" fill={isDark ? "#fff" : "#111"} fontSize="9" fontWeight="600">Mobile</text>

                  <rect x="80" y="276" width="60" height="44" rx="6" fill="none" stroke="url(#grad2)" strokeWidth="2" />
                  <text x="110" y="300" textAnchor="middle" fill={isDark ? "#fff" : "#111"} fontSize="9" fontWeight="600">IoT</text>

                  <rect x="360" y="276" width="60" height="44" rx="6" fill="none" stroke="url(#grad2)" strokeWidth="2" />
                  <text x="390" y="300" textAnchor="middle" fill={isDark ? "#fff" : "#111"} fontSize="9" fontWeight="600">App</text>
                </g>

                <line x1="145" y1="102" x2="215" y2="175" stroke="url(#grad1)" strokeWidth="1.5" opacity="0.6">
                  <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite" />
                </line>
                <line x1="355" y1="102" x2="285" y2="175" stroke="url(#grad1)" strokeWidth="1.5" opacity="0.6">
                  <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2.3s" repeatCount="indefinite" />
                </line>
                <line x1="145" y1="298" x2="215" y2="225" stroke="url(#grad2)" strokeWidth="1.5" opacity="0.6">
                  <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.6s" repeatCount="indefinite" />
                </line>
                <line x1="355" y1="298" x2="285" y2="225" stroke="url(#grad2)" strokeWidth="1.5" opacity="0.6">
                  <animate attributeName="opacity" values="0.8;0.4;0.8" dur="1.9s" repeatCount="indefinite" />
                </line>

                <circle r="3" fill="#f97316">
                  <animateMotion path="M215,175 L145,102" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle r="3" fill="#3b82f6">
                  <animateMotion path="M285,175 L355,102" dur="2.3s" repeatCount="indefinite" />
                </circle>
                <circle r="3" fill="#f97316">
                  <animateMotion path="M215,225 L145,298" dur="2.6s" repeatCount="indefinite" />
                </circle>
                <circle r="3" fill="#3b82f6">
                  <animateMotion path="M285,225 L355,298" dur="1.9s" repeatCount="indefinite" />
                </circle>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Carousel */}
      <section className={`py-24 overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Case Studies
            </h2>
            <p className={`mx-auto mt-4 max-w-2xl text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              See how leading companies transformed their digital presence with our headless WordPress solutions.
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden">
              <motion.div
                className="flex gap-6"
                animate={{ x: [0, -1920] }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 30,
                    ease: "linear",
                  },
                }}
              >
                {[...caseStudies, ...caseStudies].map((study, index) => (
                  <Link
                    key={index}
                    to={`/case-studies/${study.id}`}
                    className={`flex-shrink-0 w-[400px] rounded-2xl overflow-hidden transition-all ${
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
                      <div className="flex items-center justify-between">
                        <p className={`text-xs font-semibold ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                          Client: {study.client}
                        </p>
                        <div className="flex gap-2">
                          {study.tags.map((tag, i) => (
                            <span
                              key={i}
                              className={`text-xs px-2 py-1 rounded-full ${
                                isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </motion.div>
            </div>

            {/* Gradient Fades */}
            <div className={`absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r ${isDark ? 'from-gray-900 to-transparent' : 'from-white to-transparent'} z-10 pointer-events-none`} />
            <div className={`absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l ${isDark ? 'from-gray-900 to-transparent' : 'from-white to-transparent'} z-10 pointer-events-none`} />
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/case-studies"
              className={`inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold transition-all hover:scale-105 ${
                isDark 
                  ? 'bg-white/10 text-white backdrop-blur-sm border border-white/20 hover:bg-white/20' 
                  : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 shadow-sm hover:shadow-md'
              }`}
            >
              View All Case Studies
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={`py-24 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Meet Our Team
            </h2>
            <p className={`mx-auto mt-4 max-w-2xl text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              The passionate people behind our success.
            </p>
          </div>
          <TeamCarousel isDark={isDark} teamMembers={teamMembers} />
        </div>
      </section>

      {/* Recent Posts Section */}
      <RecentPosts isDark={isDark} />
    </div>
  );
};

export default Home;
