import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const SinglePost = ({ isDark }) => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const contentRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postRes, allPostsRes] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_ROOT}/posts?slug=${encodeURIComponent(slug)}&_embed`),
          axios.get(`${process.env.REACT_APP_API_ROOT}/posts?_embed&per_page=100`)
        ]);

        const found = postRes.data && postRes.data.length > 0 ? postRes.data[0] : null;
        if (!found) {
          setError('Post not found.');
        } else {
          setPost(found);
        }
        setAllPosts(allPostsRes.data);
      } catch (err) {
        console.error('API Error:', err);
        setError('Failed to fetch post. Make sure WordPress is running.');
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
      return null;
    }
    return postItem._embedded['wp:featuredmedia'][0].source_url;
  };

  const getCategory = (postItem) => {
    if (!postItem || !postItem._embedded || !postItem._embedded['wp:term'] || !postItem._embedded['wp:term'][0] || !postItem._embedded['wp:term'][0][0]) {
      return 'General';
    }
    return postItem._embedded['wp:term'][0][0].name;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const estimateReadTime = (html) => {
    if (!html) return '1 min read';
    const text = html.replace(/<[^>]*>?/gm, '').trim();
    const words = text.split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / 220));
    return `${minutes} min read`;
  };

  const extractHeadings = (html) => {
    if (!html) return { items: [], html: '' };
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const h1Elements = doc.querySelectorAll('h1');
    h1Elements.forEach((h1) => {
      const newH2 = doc.createElement('h2');
      newH2.innerHTML = h1.innerHTML;
      newH2.className = h1.className;
      newH2.id = h1.id || '';
      h1.replaceWith(newH2);
    });

    const headings = doc.querySelectorAll('h2, h3');
    const items = [];
    headings.forEach((heading, index) => {
      if (!heading.id) {
        const text = heading.textContent.trim();
        const baseId = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').substring(0, 50);
        heading.id = `${baseId}-${index}`;
      }
      const text = heading.textContent.trim();
      const truncated = text.length > 70 ? text.substring(0, 67).trimEnd() + '...' : text;
      items.push({ id: heading.id, text: truncated, fullText: text, level: heading.tagName.toLowerCase() });
    });
    return { items, html: doc.body.innerHTML };
  };

  const { items: tocItems, html: contentWithIds } = useMemo(() => {
    if (!post) return { items: [], html: '' };
    return extractHeadings(post.content?.rendered || '');
  }, [post]);

  const currentIndex = allPosts.findIndex(p => p.slug === slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  const currentCategory = post ? getCategory(post) : 'General';
  const relatedPosts = allPosts
    .filter(p => p.id !== post?.id && getCategory(p) === currentCategory)
    .slice(0, 3);

  useEffect(() => {
    if (!contentRef.current) return;
    const pres = contentRef.current.querySelectorAll('pre');
    pres.forEach((pre) => {
      if (pre.querySelector('.code-copy-btn')) return;
      const btn = document.createElement('button');
      btn.className = 'code-copy-btn';
      btn.textContent = 'Copy';
      btn.type = 'button';
      btn.style.cssText = 'position:absolute;top:0.5rem;right:0.5rem;z-index:10;border-radius:0.375rem;background-color:#1f2937;padding:0.25rem 0.5rem;font-size:0.75rem;font-weight:500;color:#e5e7eb;cursor:pointer;border:none;';
      btn.addEventListener('mouseenter', () => {
        btn.style.backgroundColor = '#374151';
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.backgroundColor = '#1f2937';
      });
      btn.addEventListener('click', async () => {
        const codeEl = pre.querySelector('code');
        const code = codeEl ? codeEl.textContent : pre.textContent.replace(btn.textContent, '').trim();
        try {
          await navigator.clipboard.writeText(code);
          btn.textContent = 'Copied!';
          setTimeout(() => {
            btn.textContent = 'Copy';
          }, 2000);
        } catch (err) {
          btn.textContent = 'Failed';
        }
      });
      pre.style.position = 'relative';
      pre.appendChild(btn);
    });
  }, [contentWithIds, tocItems]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-amber-400 border-t-transparent"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="mx-auto my-12 max-w-md rounded-2xl bg-rose-50 p-6 text-center text-sm font-semibold text-rose-600 border border-rose-100">
        {error || 'Post not found.'}
      </div>
    );
  }

  const featuredImage = getFeaturedImage(post);
  const category = getCategory(post);
  const date = formatDate(post.date);
  const readTime = estimateReadTime(post.content?.rendered);
  const authorName = post._embedded?.author?.[0]?.name || 'Admin';

  return (
    <div className={`font-sans ${isDark ? 'bg-gray-950 text-gray-300' : 'bg-white text-gray-800'}`}>
      {/* Hero Section */}
      <div className={`relative overflow-hidden py-16 sm:py-24 ${
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
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="md:grid md:grid-cols-[6fr_4fr] md:gap-12 items-center">
            {/* Left: Article Header */}
            <div>
              <Link
                to="/blog"
                className={`inline-flex items-center gap-2 text-sm font-medium transition-colors mb-6 ${
                  isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Blog
              </Link>

              <div className="flex items-center gap-3 mb-4">
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                  isDark ? 'bg-orange-900/30 text-orange-400' : 'bg-orange-50 text-orange-600'
                }`}>
                  {category}
                </span>
              </div>

              <h1 className={`text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {post.title.rendered}
              </h1>

              <div className={`flex items-center gap-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <div className="flex items-center gap-2 text-sm">
                  <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                    {authorName}
                  </span>
                  <span>•</span>
                  <span>{date}</span>
                  <span>•</span>
                  <span>{readTime}</span>
                </div>
              </div>
            </div>

            {/* Right: Featured Image */}
            {featuredImage && (
              <div className="mt-10 md:mt-0">
                <img
                  src={featuredImage}
                  alt={post.title.rendered}
                  className="w-full object-cover rounded-2xl"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="md:grid md:grid-cols-[1fr_auto] md:gap-12">
          {/* Article Content */}
          <div className="min-w-0">
            {/* Table of Contents - Mobile Only */}
            {tocItems.length > 0 && (
              <div className="md:hidden mb-8">
                <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-900 border border-gray-800' : 'bg-gray-50 border border-gray-200'}`}>
                  <h3 className={`text-sm font-semibold uppercase tracking-wider mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Table of Contents
                  </h3>
                  <nav className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {tocItems.map((item, index) => (
                      <a
                        key={index}
                        href={`#${item.id}`}
                        title={item.fullText || item.text}
                        className={`block py-1.5 text-sm transition-all ${
                          item.level === 'h3' ? 'pl-4' : ''
                        } ${
                          isDark ? 'text-gray-400 hover:text-orange-400' : 'text-gray-600 hover:text-orange-600'
                        }`}
                      >
                        {item.text}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            )}

            <div
              ref={contentRef}
              className={`article-content max-w-none ${
                isDark ? 'dark' : ''
              }`}
              dangerouslySetInnerHTML={{ __html: contentWithIds }}
            />

            {/* Prev/Next Navigation */}
            {(prevPost || nextPost) && (
              <div className={`mt-16 pt-8 ${isDark ? 'border-t border-gray-800' : 'border-t border-gray-200'}`}>
                <div className="grid gap-6 sm:grid-cols-2">
                  {prevPost && (
                    <Link
                      to={`/blog/${prevPost.slug}`}
                      className={`group block ${isDark ? 'hover:bg-gray-900' : 'hover:bg-gray-50'} -mx-4 px-4 py-4 rounded-lg transition-colors`}
                    >
                      <span className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                        Previous Article
                      </span>
                      <p className={`mt-2 font-semibold leading-snug ${isDark ? 'text-gray-200 group-hover:text-white' : 'text-gray-900 group-hover:text-orange-600'} transition-colors`}>
                        {prevPost.title.rendered.replace(/<[^>]*>?/gm, '').trim()}
                      </p>
                    </Link>
                  )}
                  {nextPost && (
                    <Link
                      to={`/blog/${nextPost.slug}`}
                      className={`group block text-right ${isDark ? 'hover:bg-gray-900' : 'hover:bg-gray-50'} -mx-4 px-4 py-4 rounded-lg transition-colors`}
                    >
                      <span className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                        Next Article
                      </span>
                      <p className={`mt-2 font-semibold leading-snug ${isDark ? 'text-gray-200 group-hover:text-white' : 'text-gray-900 group-hover:text-orange-600'} transition-colors`}>
                        {nextPost.title.rendered.replace(/<[^>]*>?/gm, '').trim()}
                      </p>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Table of Contents - Sticky Sidebar */}
          {tocItems.length > 0 && (
            <aside className="hidden md:block w-80">
              <div className="sticky top-24">
                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-900 border border-gray-800' : 'bg-gray-50 border border-gray-200'}`}>
                  <h3 className={`text-xs font-semibold uppercase tracking-wider mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Contents
                  </h3>
                  <nav className="space-y-1.5">
                    {tocItems.map((item, index) => (
                      <a
                        key={index}
                        href={`#${item.id}`}
                        title={item.fullText || item.text}
                        className={`block py-1.5 text-sm transition-all ${
                          item.level === 'h3' ? 'pl-4' : ''
                        } ${
                          isDark ? 'text-gray-400 hover:text-orange-400' : 'text-gray-600 hover:text-orange-600'
                        }`}
                      >
                        {item.text}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </aside>
          )}
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className={`mt-20 ${isDark ? 'border-t border-gray-800' : 'border-t border-gray-200'} pt-12`}>
            <h2 className={`text-2xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Related Articles
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedPosts.map((relatedPost) => {
                    const relatedImage = getFeaturedImage(relatedPost);
                    const relatedTitle = relatedPost.title.rendered.replace(/<[^>]*>?/gm, '').trim();
                    return (
                      <Link
                        key={relatedPost.id}
                        to={`/blog/${relatedPost.slug}`}
                        className="group flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-700 shadow-sm hover:shadow-md hover:shadow-orange-100 dark:hover:shadow-orange-900/20 transition-all duration-300"
                      >
                        <div className="relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                          {relatedImage ? (
                            <img
                              src={relatedImage}
                              alt={relatedPost.title.rendered}
                              loading="lazy"
                              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-gray-400 text-sm">No Image</div>
                          )}
                        </div>

                        <div className="flex flex-1 flex-col p-6">
                          <div className="mb-3">
                            <span className="inline-block rounded-full bg-orange-50 dark:bg-orange-900/30 px-3 py-1 text-xs font-semibold text-orange-600 dark:text-orange-400">
                              {getCategory(relatedPost)}
                            </span>
                          </div>

                          <h3
                            className="text-lg font-bold leading-snug text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors"
                          >
                            {relatedTitle}
                          </h3>

                          <div className="mt-auto pt-4 flex items-center justify-between">
                            <span className="text-xs font-medium text-orange-500 dark:text-orange-400">
                              {formatDate(relatedPost.date)}
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
          </div>
        )}
      </div>
    </div>
  );
};

export default SinglePost;
