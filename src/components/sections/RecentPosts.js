import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RecentPosts = ({ isDark }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const url = `${process.env.REACT_APP_API_ROOT}/posts?_embed&per_page=3`;
        const response = await axios.get(url);
        setPosts(response.data.slice(0, 3));
      } catch (err) {
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const truncate = (text = '', max = 100) => {
    const clean = text.replace(/<[^>]*>?/gm, '').trim();
    return clean.length > max ? clean.slice(0, max).trimEnd() + '...' : clean;
  };

  if (loading) {
    return (
      <section className={`py-24 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-amber-400 border-t-transparent"></div>
          </div>
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className={`py-24 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Recent Posts
          </h2>
          <p className={`mx-auto mt-4 max-w-2xl text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Stay updated with our latest insights and articles.
          </p>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {posts.map((post) => {
            const featuredImageUrl =
              post._embedded?.['wp:featuredmedia']?.[0]?.source_url;

            const fallbackImage =
              'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80';

            const altText =
              post._embedded?.['wp:featuredmedia']?.[0]?.alt_text ||
              post.title.rendered;

            const categoryName =
              post._embedded?.['wp:term']?.[0]?.[0]?.name || 'General';

            const formattedDate = new Date(post.date).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            });

            const titleText = post.title?.rendered
              .replace(/<[^>]*>?/gm, '')
              .trim();

            const excerptText = truncate(
              post.excerpt?.rendered || post.content?.rendered,
              100
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
          }          )}
        </div>
        <div className="mt-16 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center rounded-full bg-gradient-to-r from-orange-600 to-orange-500 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-orange-500/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-orange-500/40"
          >
            Read Our Blog
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentPosts;
