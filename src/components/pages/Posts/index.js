import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Posts = ({ isDark }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const url = `${process.env.REACT_APP_API_ROOT}/posts?_embed`;
        const response = await axios.get(url);
        setPosts(response.data);
      } catch (err) {
        console.error('API Error:', err);
        setError('Failed to fetch posts. Make sure WordPress is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const allCategories = ['All'];
  posts.forEach((post) => {
    const terms = post._embedded && post._embedded['wp:term'] && post._embedded['wp:term'][0] ? post._embedded['wp:term'][0] : [];
    terms.forEach((term) => {
      if (!allCategories.includes(term.name)) {
        allCategories.push(term.name);
      }
    });
  });

  const filteredPosts =
    activeCategory === 'All'
      ? posts
      : posts.filter((post) => {
          const terms = post._embedded && post._embedded['wp:term'] && post._embedded['wp:term'][0] ? post._embedded['wp:term'][0] : [];
          return terms.some((term) => term.name === activeCategory);
        });

  const truncate = (text, max) => {
    if (!text) return '';
    const clean = text.replace(/<[^>]*>?/gm, '').trim();
    return clean.length > max ? clean.slice(0, max).trimEnd() + '...' : clean;
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-amber-400 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto my-12 max-w-md rounded-2xl bg-rose-50 p-6 text-center text-sm font-semibold text-rose-600 border border-rose-100">
        {error}
      </div>
    );
  }

  return (
    <div className="font-sans">
      {/* Blog Hero Section */}
      <section className={`relative overflow-hidden py-24 sm:py-32 ${
        isDark 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
          : 'bg-gradient-to-br from-slate-50 via-white to-slate-100'
      }`}>
        <div className="absolute inset-0 opacity-30">
          <div className={`absolute inset-0 ${
            isDark ? 'bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]' : 'bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.05),transparent_50%)]'
          }`}></div>
          <div className={`absolute inset-0 ${
            isDark ? 'bg-[radial-gradient(circle_at_80%_20%,rgba(251,146,60,0.15),transparent_50%)]' : 'bg-[radial-gradient(circle_at_80%_20%,rgba(249,115,22,0.1),transparent_50%)]'
          }`}></div>
          <div className={`absolute inset-0 ${
            isDark ? 'bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.15),transparent_50%)]' : 'bg-[radial-gradient(circle_at_20%_80%,rgba(37,99,235,0.1),transparent_50%)]'
          }`}></div>
        </div>

        <div className={`absolute inset-0 ${isDark ? 'opacity-10' : 'opacity-20'}`}>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'} 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
              animation: 'gridMove 20s linear infinite'
            }}
          ></div>
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute -top-40 -right-40 h-80 w-80 rounded-full ${isDark ? 'bg-orange-500/10' : 'bg-orange-400/20'} blur-3xl animate-blob`}></div>
          <div className={`absolute top-1/2 -left-40 h-80 w-80 rounded-full ${isDark ? 'bg-blue-500/10' : 'bg-blue-400/20'} blur-3xl animate-blob animation-delay-2000`}></div>
          <div className={`absolute -bottom-40 right-1/3 h-80 w-80 rounded-full ${isDark ? 'bg-purple-500/10' : 'bg-purple-400/20'} blur-3xl animate-blob animation-delay-4000`}></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className={`text-5xl font-bold tracking-tight sm:text-7xl ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              <span className="inline">Our</span>{' '}
              <span className={`inline bg-gradient-to-r ${
                isDark 
                  ? 'from-orange-400 via-orange-500 to-amber-400' 
                  : 'from-orange-600 via-orange-500 to-amber-500'
              } bg-clip-text text-transparent`}>
                Blog
              </span>
            </h1>
            <p className={`mx-auto mt-8 max-w-2xl text-lg leading-8 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Get tips and advice on delivering exceptional results. Stay updated with our latest insights and articles.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <div className="bg-white dark:bg-gray-950 py-16 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-wrap gap-2">
          {allCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-orange-600 text-white'
                  : 'bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {filteredPosts.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">No posts found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => {
              const featuredImageUrl =
                post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]
                  ? post._embedded['wp:featuredmedia'][0].source_url
                  : null;

              const fallbackImage =
                'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80';

              const altText =
                (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]
                  ? post._embedded['wp:featuredmedia'][0].alt_text
                  : null) || post.title.rendered;

              const categoryName =
                (post._embedded && post._embedded['wp:term'] && post._embedded['wp:term'][0] && post._embedded['wp:term'][0][0]
                  ? post._embedded['wp:term'][0][0].name
                  : null) || 'General';

              const formattedDate = new Date(post.date).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              });

              const titleText = post.title && post.title.rendered
                ? post.title.rendered.replace(/<[^>]*>?/gm, '').trim()
                : '';

              const excerptText = truncate(
                post.excerpt && post.excerpt.rendered ? post.excerpt.rendered : (post.content && post.content.rendered ? post.content.rendered : ''),
                120
              );

              return (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-700 shadow-sm hover:shadow-md hover:shadow-orange-100 dark:hover:shadow-orange-900/20 transition-all duration-300"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img
                      src={featuredImageUrl || fallbackImage}
                      alt={altText}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3">
                      <span className="inline-block rounded-full bg-orange-50 dark:bg-orange-900/30 px-3 py-1 text-xs font-semibold text-orange-600 dark:text-orange-400">
                        {categoryName}
                      </span>
                    </div>

                    <h3
                      className="text-lg font-bold leading-snug text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors"
                      dangerouslySetInnerHTML={{ __html: titleText }}
                    />

                    <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400 line-clamp-3">
                      {excerptText}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs font-medium text-orange-500 dark:text-orange-400">
                        {formattedDate}
                      </span>
                      <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wide group-hover:underline">
                        Read
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default Posts;
