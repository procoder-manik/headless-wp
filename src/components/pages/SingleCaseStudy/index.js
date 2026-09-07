import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import axios from 'axios';

const SingleCaseStudy = ({ isDark }) => {
  const { slug } = useParams();
  const [caseStudy, setCaseStudy] = useState(null);
  const [allCaseStudies, setAllCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [caseRes, allRes] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_ROOT}/case-studies?slug=${encodeURIComponent(slug)}&_embed`),
          axios.get(`${process.env.REACT_APP_API_ROOT}/case-studies?_embed&per_page=100`)
        ]);

        const found = caseRes.data && caseRes.data.length > 0 ? caseRes.data[0] : null;
        if (!found) {
          setError('Case study not found.');
        } else {
          setCaseStudy(found);
        }
        setAllCaseStudies(allRes.data || []);
      } catch (err) {
        setError('Failed to load case study. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchData();
    }
  }, [slug]);

  const getFeaturedImage = (postItem) => {
    if (!postItem || !postItem._embedded || !postItem._embedded['wp:featuredmedia'] || !postItem._embedded['wp:featuredmedia'][0]) {
      return 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80';
    }
    return postItem._embedded['wp:featuredmedia'][0].source_url;
  };

  const getMeta = (postItem, key, fallback = '') => {
    if (!postItem || !postItem.meta) return fallback;
    return postItem.meta[key] || fallback;
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-amber-400 border-t-transparent"></div>
      </div>
    );
  }

  if (error || !caseStudy) {
    return (
      <div className="mx-auto my-12 max-w-md rounded-2xl bg-rose-50 p-6 text-center text-sm font-semibold text-rose-600 border border-rose-100">
        {error || 'Case study not found.'}
      </div>
    );
  }

  const image = getFeaturedImage(caseStudy);
  const technologiesRaw = getMeta(caseStudy, 'technologies', '');
  const technologies = technologiesRaw ? technologiesRaw.split(',').map(t => t.trim()).filter(Boolean) : [];
  const client = getMeta(caseStudy, 'client');
  const result = getMeta(caseStudy, 'result');
  const industry = getMeta(caseStudy, 'industry');
  const duration = getMeta(caseStudy, 'duration');
  const teamSize = getMeta(caseStudy, 'team_size');
  const challenge = getMeta(caseStudy, 'challenge');
  const solution = getMeta(caseStudy, 'solution');
  const testimonialQuote = getMeta(caseStudy, 'testimonial_quote');
  const testimonialAuthor = getMeta(caseStudy, 'testimonial_author');
  const testimonialRole = getMeta(caseStudy, 'testimonial_role');

  const currentIndex = allCaseStudies.findIndex(s => s.slug === slug);
  const prevStudy = currentIndex > 0 ? allCaseStudies[currentIndex - 1] : allCaseStudies[allCaseStudies.length - 1];
  const nextStudy = currentIndex < allCaseStudies.length - 1 ? allCaseStudies[currentIndex + 1] : allCaseStudies[0];

  return (
    <div ref={ref}>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 sm:py-32 lg:py-40">
        <div className="absolute inset-0">
          <img
            src={image}
            alt={caseStudy.title.rendered}
            className="h-full w-full object-cover"
          />
          <div className={`absolute inset-0 ${isDark ? 'bg-gray-900/90' : 'bg-gray-900/80'}`}></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className={`inline-block rounded-full px-4 py-2 text-sm font-semibold ${
                isDark ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'bg-orange-100 text-orange-700 border border-orange-200'
              }`}>
                {result || 'Case Study'}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl ${isDark ? 'text-white' : 'text-white'}`}
            >
              {caseStudy.title.rendered}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 text-lg leading-8 text-gray-300"
            >
              {client} {industry ? `• ${industry}` : ''}
            </motion.p>

            {(duration || teamSize) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-8 flex flex-wrap gap-6"
              >
                {duration && (
                  <div>
                    <p className="text-sm text-gray-400">Duration</p>
                    <p className="text-base font-semibold text-white">{duration}</p>
                  </div>
                )}
                {teamSize && (
                  <div>
                    <p className="text-sm text-gray-400">Team Size</p>
                    <p className="text-base font-semibold text-white">{teamSize}</p>
                  </div>
                )}
                {client && (
                  <div>
                    <p className="text-sm text-gray-400">Client</p>
                    <p className="text-base font-semibold text-white">{client}</p>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Results Section */}
      {result && (
        <section className={`py-24 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className={`text-4xl font-bold bg-gradient-to-r ${isDark ? 'from-orange-400 to-amber-400' : 'from-orange-600 to-amber-500'} bg-clip-text text-transparent`}>
                  {result}
                </div>
                <div className={`mt-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Key Result
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Challenge & Solution */}
      {(challenge || solution) && (
        <section className={`py-24 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              {challenge && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    The Challenge
                  </h2>
                  <div className={`mt-6 text-lg leading-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {challenge}
                  </div>
                </motion.div>
              )}

              {solution && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Our Solution
                  </h2>
                  <div className={`mt-6 text-lg leading-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {solution}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Content Section */}
      <section className={`py-24 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="article-content">
            <div dangerouslySetInnerHTML={{ __html: caseStudy.content.rendered }} />
          </div>
        </div>
      </section>

      {/* Technologies */}
      {technologies.length > 0 && (
        <section className={`py-24 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className={`text-3xl font-bold tracking-tight text-center sm:text-4xl ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Technologies Used
            </h2>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              {technologies.map((tech, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold ${
                    isDark 
                      ? 'bg-gray-800 text-gray-300 border border-gray-700' 
                      : 'bg-gray-100 text-gray-700 border border-gray-200'
                  }`}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonial */}
      {(testimonialQuote && testimonialAuthor) && (
        <section className={`py-24 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className={`rounded-3xl p-8 sm:p-12 ${
                isDark ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-200 shadow-xl'
              }`}
            >
              <svg className={`mb-6 h-12 w-12 ${isDark ? 'text-orange-500/20' : 'text-orange-200'}`} fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              <blockquote className={`text-xl leading-relaxed sm:text-2xl ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {testimonialQuote}
              </blockquote>

              <div className="mt-8 flex items-center gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-full ${
                  isDark ? 'bg-gradient-to-br from-orange-500 to-amber-500' : 'bg-gradient-to-br from-orange-600 to-amber-500'
                }`}>
                  <span className="text-lg font-bold text-white">
                    {testimonialAuthor.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className={`text-base font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {testimonialAuthor}
                  </div>
                  {testimonialRole && (
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {testimonialRole}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Previous/Next Navigation */}
      {allCaseStudies.length > 1 && (
        <section className={`py-12 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {prevStudy && prevStudy.slug !== slug && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <Link
                    to={`/case-studies/${prevStudy.slug}`}
                    className={`group block rounded-2xl p-6 transition-all ${
                      isDark 
                        ? 'bg-gray-800 border border-gray-700 hover:border-orange-700' 
                        : 'bg-gray-50 border border-gray-200 hover:border-orange-300'
                    }`}
                  >
                    <span className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Previous Case Study
                    </span>
                    <h3 className={`mt-2 text-lg font-bold group-hover:text-orange-500 transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {prevStudy.title.rendered}
                    </h3>
                    {getMeta(prevStudy, 'client') && (
                      <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {getMeta(prevStudy, 'client')}
                      </p>
                    )}
                  </Link>
                </motion.div>
              )}

              {nextStudy && nextStudy.slug !== slug && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-right"
                >
                  <Link
                    to={`/case-studies/${nextStudy.slug}`}
                    className={`group block rounded-2xl p-6 transition-all ${
                      isDark 
                        ? 'bg-gray-800 border border-gray-700 hover:border-orange-700' 
                        : 'bg-gray-50 border border-gray-200 hover:border-orange-300'
                    }`}
                  >
                    <span className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Next Case Study
                    </span>
                    <h3 className={`mt-2 text-lg font-bold group-hover:text-orange-500 transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {nextStudy.title.rendered}
                    </h3>
                    {getMeta(nextStudy, 'client') && (
                      <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {getMeta(nextStudy, 'client')}
                      </p>
                    )}
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Related Case Studies */}
      {allCaseStudies.filter(s => s.slug !== slug).length > 0 && (
        <section className={`py-24 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className={`text-3xl font-bold tracking-tight text-center sm:text-4xl ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Related Case Studies
            </h2>
            <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
              {allCaseStudies.filter(s => s.slug !== slug).slice(0, 3).map((study, index) => {
                const relatedImage = getFeaturedImage(study);
                const relatedExcerpt = study.excerpt?.rendered || study.content?.rendered || '';
                const cleanExcerpt = relatedExcerpt.replace(/<[^>]*>?/gm, '').trim().substring(0, 160);
                const relatedResult = getMeta(study, 'result');
                const relatedClient = getMeta(study, 'client');

                return (
                  <motion.div
                    key={study.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link
                      to={`/case-studies/${study.slug}`}
                      className={`group block overflow-hidden rounded-2xl transition-all hover:scale-105 ${
                        isDark 
                          ? 'bg-gray-900 border border-gray-700 hover:border-orange-700' 
                          : 'bg-white border border-gray-200 hover:border-orange-300 shadow-lg hover:shadow-xl'
                      }`}
                    >
                      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                        <img
                          src={relatedImage}
                          alt={study.title.rendered}
                          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                      </div>
                      <div className="p-6">
                        {relatedResult && (
                          <div className={`inline-block rounded-full px-3 py-1 text-xs font-semibold mb-4 ${
                            isDark ? 'bg-orange-500/10 text-orange-400' : 'bg-orange-100 text-orange-600'
                          }`}>
                            {relatedResult}
                          </div>
                        )}
                        <h3 className={`text-lg font-bold mb-2 group-hover:text-orange-500 transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {study.title.rendered}
                        </h3>
                        <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {cleanExcerpt || 'No description available.'}
                        </p>
                        {relatedClient && (
                          <p className={`text-xs font-semibold ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                            Client: {relatedClient}
                          </p>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default SingleCaseStudy;
