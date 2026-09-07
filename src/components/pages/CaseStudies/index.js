import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CaseStudies = ({ isDark }) => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_ROOT}/case-studies?_embed&per_page=100`);
        const posts = response.data || [];
        const mapped = posts.map((post) => {
          const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80';
          const excerpt = post.excerpt?.rendered || post.content?.rendered || '';
          const cleanExcerpt = excerpt.replace(/<[^>]*>?/gm, '').trim().substring(0, 160);
          const tags = post._embedded?.['wp:term']?.[0]?.map(term => term.name) || [];
          const meta = post.meta || {};
          const client = meta.client || '';
          const result = meta.result || '';

          return {
            id: post.id,
            slug: post.slug,
            title: post.title.rendered,
            client: client,
            result: result,
            description: cleanExcerpt + (cleanExcerpt.length >= 160 ? '...' : ''),
            image: featuredImage,
            tags: tags.length > 0 ? tags : ['WordPress', 'Headless'],
          };
        });
        setCaseStudies(mapped);
      } catch (err) {
        setError('Failed to load case studies.');
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudies();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-amber-400 border-t-transparent"></div>
      </div>
    );
  }

  if (error || caseStudies.length === 0) {
    return (
      <div className="mx-auto my-12 max-w-md rounded-2xl bg-rose-50 p-6 text-center text-sm font-semibold text-rose-600 border border-rose-100">
        {error || 'No case studies found.'}
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className={`relative overflow-hidden py-24 sm:py-32 ${
        isDark 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
          : 'bg-gradient-to-br from-slate-50 via-white to-slate-100'
      }`}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute -top-40 -right-40 h-80 w-80 rounded-full ${isDark ? 'bg-orange-500/10' : 'bg-orange-400/20'} blur-3xl animate-blob`}></div>
          <div className={`absolute top-1/2 -left-40 h-80 w-80 rounded-full ${isDark ? 'bg-blue-500/10' : 'bg-blue-400/20'} blur-3xl animate-blob animation-delay-2000`}></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`text-4xl font-bold tracking-tight sm:text-6xl ${isDark ? 'text-white' : 'text-gray-900'}`}
            >
              Case <span className={`bg-gradient-to-r ${isDark ? 'from-orange-400 to-amber-400' : 'from-orange-600 to-amber-500'} bg-clip-text text-transparent`}>Studies</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`mt-6 text-lg leading-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
            >
              See how leading companies transformed their digital presence with our headless WordPress solutions.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className={`py-24 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {caseStudies.map((study, index) => (
              <Link
                key={study.slug}
                to={`/case-studies/${study.slug}`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
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
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudies;
