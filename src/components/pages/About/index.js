import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import TeamCarousel from '../../shared/TeamCarousel';

const About = ({ isDark }) => {
  const [teamMembers, setTeamMembers] = useState([]);
  const values = [
    {
      title: 'Innovation First',
      description: 'We stay ahead of the curve, adopting cutting-edge technologies and methodologies to deliver future-proof solutions.',
      icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    },
    {
      title: 'Quality Driven',
      description: 'Every line of code matters. We maintain the highest standards of quality through rigorous testing and best practices.',
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    },
    {
      title: 'Client Partnership',
      description: 'We believe in long-term relationships. Your success is our success, and we work as an extension of your team.',
      icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    },
    {
      title: 'Transparent Process',
      description: 'Clear communication, honest timelines, and regular updates keep you informed and confident throughout the journey.',
      icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
    },
  ];

  const team = [
    {
      name: 'Alex Morgan',
      role: 'Founder & CEO',
      bio: 'Former WordPress core contributor with 15+ years in web development.',
      avatar: 'AM',
    },
    {
      name: 'Sarah Chen',
      role: 'Lead Architect',
      bio: 'Full-stack engineer specializing in scalable headless architectures.',
      avatar: 'SC',
    },
    {
      name: 'David Kim',
      role: 'Design Director',
      bio: 'Award-winning designer focused on user-centric digital experiences.',
      avatar: 'DK',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Project Manager',
      bio: 'Agile expert ensuring smooth delivery and client satisfaction.',
      avatar: 'ER',
    },
  ];

  const milestones = [
    { year: '2014', event: 'Founded with a vision to revolutionize WordPress development' },
    { year: '2017', event: 'Launched first enterprise headless WordPress platform' },
    { year: '2020', event: 'Expanded to serve 500+ clients worldwide' },
    { year: '2024', event: 'Introduced AI-powered content delivery solutions' },
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
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -30, 20, 0],
              scale: [1, 1.1, 0.95, 1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute -top-40 -right-40 h-80 w-80 rounded-full ${isDark ? 'bg-orange-500/10' : 'bg-orange-400/20'} blur-3xl`}
          />
          <motion.div
            animate={{
              x: [0, -20, 30, 0],
              y: [0, 20, -30, 0],
              scale: [1, 0.95, 1.1, 1],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute top-1/2 -left-40 h-80 w-80 rounded-full ${isDark ? 'bg-blue-500/10' : 'bg-blue-400/20'} blur-3xl`}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
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
                About Our Company
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`text-5xl font-bold tracking-tight sm:text-7xl ${isDark ? 'text-white' : 'text-gray-900'}`}
            >
              We Build Digital
              <span className={`block bg-gradient-to-r ${isDark ? 'from-orange-400 via-orange-500 to-amber-400' : 'from-orange-600 via-orange-500 to-amber-500'} bg-clip-text text-transparent`}>
                Experiences That Matter
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={`mx-auto mt-8 max-w-2xl text-lg leading-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
            >
              Founded with a passion for innovation, we specialize in creating headless WordPress solutions that transform how businesses connect with their audiences.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className={`py-24 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                  alt="Our team"
                  className="w-full h-[500px] object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-gray-900/60 to-transparent' : 'from-black/30 to-transparent'}`}></div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Our Story
              </h2>
              <div className={`space-y-4 text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                <p>
                  Founded in 2014, HeadlessWP began with a simple observation: traditional WordPress was powerful, but the way it delivered content was outdated. We saw an opportunity to decouple the backend from the frontend, unlocking unprecedented performance and flexibility.
                </p>
                <p>
                  What started as a small team of passionate developers has grown into a full-service digital agency. We have delivered over 500 projects for clients ranging from ambitious startups to Fortune 500 enterprises.
                </p>
                <p>
                  Today, we are proud to be at the forefront of the headless revolution, helping organizations across industries harness the full potential of modern web technologies.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={`py-24 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Our Core Values
            </h2>
            <p className={`mx-auto mt-4 max-w-2xl text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              The principles that guide everything we do.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`rounded-2xl p-8 transition-all hover:scale-105 ${
                  isDark 
                    ? 'bg-gray-900 border border-gray-700 hover:border-orange-700' 
                    : 'bg-white border border-gray-200 hover:border-orange-300 shadow-sm hover:shadow-md'
                }`}
              >
                <div className={`inline-flex rounded-lg p-3 mb-6 ${
                  isDark ? 'bg-orange-500/10' : 'bg-orange-100'
                }`}>
                  <svg className={`h-6 w-6 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={value.icon} />
                  </svg>
                </div>
                <h3 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {value.title}
                </h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={`py-24 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Meet Our Leadership
            </h2>
            <p className={`mx-auto mt-4 max-w-2xl text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              The passionate people behind our success.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`rounded-2xl p-8 text-center transition-all hover:scale-105 ${
                  isDark 
                    ? 'bg-gray-800 border border-gray-700 hover:border-orange-700' 
                    : 'bg-gray-50 border border-gray-200 hover:border-orange-300'
                }`}
              >
                <div className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold ${
                  isDark ? 'bg-gradient-to-br from-orange-500 to-amber-500 text-white' : 'bg-gradient-to-br from-orange-600 to-amber-500 text-white'
                }`}>
                  {member.avatar}
                </div>
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {member.name}
                </h3>
                <p className={`mt-1 text-sm font-medium ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
                  {member.role}
                </p>
                <p className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className={`py-24 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Our Journey
            </h2>
            <p className={`mx-auto mt-4 max-w-2xl text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Key milestones that shaped our company.
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 dark:bg-gray-700 hidden sm:block"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex items-center ${index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
                >
                  <div className={`w-full sm:w-1/2 ${index % 2 === 0 ? 'sm:pr-12 sm:text-right' : 'sm:pl-12'}`}>
                    <div className={`rounded-2xl p-6 ${
                      isDark ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'
                    }`}>
                      <div className={`text-2xl font-bold mb-2 ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
                        {milestone.year}
                      </div>
                      <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {milestone.event}
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 items-center justify-center">
                    <div className={`h-4 w-4 rounded-full border-4 ${isDark ? 'bg-orange-500 border-gray-800' : 'bg-orange-600 border-white'}`}></div>
                  </div>
                  <div className="w-full sm:w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={`py-24 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl ${isDark ? 'text-white' : 'text-gray-900'}`}>
              What We Do
            </h2>
            <p className={`mx-auto mt-4 max-w-2xl text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Comprehensive solutions tailored to your digital needs.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Headless WordPress Development',
                description: 'Custom headless architectures using WordPress as a backend with modern frontend frameworks like React, Next.js, and Vue.',
                icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
              },
              {
                title: 'Performance Optimization',
                description: 'Blazing fast load times through static site generation, CDN integration, and advanced caching strategies.',
                icon: 'M13 10V3L4 14h7v7l9-11h-7z',
              },
              {
                title: 'API & Integration',
                description: 'Seamless REST and GraphQL API development with third-party service integrations for enhanced functionality.',
                icon: 'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z',
              },
              {
                title: 'E-Commerce Solutions',
                description: 'Scalable WooCommerce and headless e-commerce platforms with multi-channel selling capabilities.',
                icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
              },
              {
                title: 'Multi-Platform Delivery',
                description: 'Content delivery across web, mobile apps, IoT devices, and emerging platforms from a single source.',
                icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
              },
              {
                title: 'Ongoing Support',
                description: '24/7 maintenance, monitoring, and support to keep your headless WordPress solution running smoothly.',
                icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z',
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`rounded-2xl p-8 transition-all hover:scale-105 ${
                  isDark 
                    ? 'bg-gray-800 border border-gray-700 hover:border-orange-700' 
                    : 'bg-gray-50 border border-gray-200 hover:border-orange-300'
                }`}
              >
                <div className={`inline-flex rounded-lg p-3 mb-6 ${
                  isDark ? 'bg-orange-500/10' : 'bg-orange-100'
                }`}>
                  <svg className={`h-6 w-6 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={service.icon} />
                  </svg>
                </div>
                <h3 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {service.title}
                </h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-24 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {[
              { value: '10+', label: 'Years Experience', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
              { value: '500+', label: 'Projects Delivered', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
              { value: '50+', label: 'Team Members', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
              { value: '99%', label: 'Client Satisfaction', icon: 'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`text-center p-6 rounded-2xl transition-all ${
                  isDark 
                    ? 'bg-gray-800 border border-gray-700 hover:border-orange-700/50' 
                    : 'bg-white border border-gray-200 hover:border-orange-300 shadow-sm hover:shadow-md'
                }`}
              >
                <div className={`inline-flex rounded-xl p-3 mb-4 ${
                  isDark ? 'bg-orange-500/10' : 'bg-orange-100'
                }`}>
                  <svg className={`h-6 w-6 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                  </svg>
                </div>
                <div className={`text-4xl font-bold bg-gradient-to-r ${isDark ? 'from-orange-400 to-amber-400' : 'from-orange-600 to-amber-500'} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <div className={`mt-2 text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={`py-24 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
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
    </div>
  );
};

export default About;
