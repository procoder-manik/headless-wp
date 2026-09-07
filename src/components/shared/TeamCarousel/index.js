import React, { useEffect, useRef, useState } from 'react';

const TeamCarousel = ({ isDark, teamMembers }) => {
  const trackRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [perView, setPerView] = useState(3);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !teamMembers.length) return;

    const updatePerView = () => {
      const width = track.clientWidth;
      const slide = track.querySelector('.sbm-tc__slide');
      if (!slide) return;
      const slideWidth = slide.getBoundingClientRect().width;
      const gap = 24;
      const view = Math.max(1, Math.round(width / (slideWidth + gap)));
      setPerView(view);
    };

    updatePerView();
    window.addEventListener('resize', updatePerView);
    return () => window.removeEventListener('resize', updatePerView);
  }, [teamMembers.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !teamMembers.length) return;

    const handleScroll = () => {
      const base = track.querySelector('.sbm-tc__slide')?.offsetLeft || 0;
      const x = track.scrollLeft;
      let best = 0;
      let dist = Infinity;
      track.querySelectorAll('.sbm-tc__slide').forEach((slide, i) => {
        const d = Math.abs((slide.offsetLeft - base) - x);
        if (d < dist) {
          dist = d;
          best = i;
        }
      });
      setCurrentIndex(Math.min(best, teamMembers.length - perView));
    };

    track.addEventListener('scroll', handleScroll, { passive: true });
    return () => track.removeEventListener('scroll', handleScroll);
  }, [teamMembers.length, perView]);

  const scrollTo = (index) => {
    const track = trackRef.current;
    if (!track) return;
    const base = track.querySelector('.sbm-tc__slide')?.offsetLeft || 0;
    const slide = track.querySelectorAll('.sbm-tc__slide')[index];
    if (!slide) return;
    track.scrollTo({
      left: slide.offsetLeft - base,
      behavior: 'smooth',
    });
  };

  const goNext = () => {
    const next = currentIndex >= teamMembers.length - perView ? currentIndex : currentIndex + 1;
    scrollTo(next);
  };

  const goPrev = () => {
    const prev = currentIndex <= 0 ? 0 : currentIndex - 1;
    scrollTo(prev);
  };

  const maxIndex = Math.max(0, teamMembers.length - perView);

  if (!teamMembers.length) {
    return null;
  }

  const getSocialLinks = (member) => {
    const links = [];
    if (member.linkedin) {
      links.push({ href: member.linkedin, label: 'LinkedIn', icon: 'M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.24 8.25h4.5V24h-4.5V8.25zM8.5 8.25h4.31v2.15h.06a4.73 4.73 0 0 1 4.25-2.33c4.55 0 5.39 2.99 5.39 6.88V24h-4.5v-7.15c0-1.71-.03-3.9-2.38-3.9-2.38 0-2.74 1.86-2.74 3.78V24H8.5V8.25z' });
    }
    if (member.facebook) {
      links.push({ href: member.facebook, label: 'Facebook', icon: 'M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.96h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z' });
    }
    if (member.instagram) {
      links.push({ href: member.instagram, label: 'Instagram', icon: 'M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.9 5.9 0 0 0-2.13 1.38A5.9 5.9 0 0 0 .63 4.14c-.3.76-.5 1.64-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91a5.9 5.9 0 0 0 1.38 2.13 5.9 5.9 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.38 5.9 5.9 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z' });
    }
    if (member.whatsapp) {
      const whatsappUrl = member.whatsapp.startsWith('http') ? member.whatsapp : `https://wa.me/${member.whatsapp.replace(/[^0-9]/g, '')}`;
      links.push({ href: whatsappUrl, label: 'WhatsApp', icon: 'M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.17c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.23.25-.86.84-.86 2.05s.88 2.38 1 2.54c.13.17 1.74 2.65 4.21 3.72.59.25 1.05.4 1.4.52.59.19 1.13.16 1.55.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.28z' });
    }
    if (member.email) {
      links.push({ href: `mailto:${member.email}`, label: 'Email', icon: 'M2 4h20a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm10 8.2L3.6 6H20.4L12 12.2zM3 7.7V18h18V7.7l-9 6.7-9-6.7z' });
    }
    return links;
  };

  return (
    <div className={`sbm-tc ${isDark ? 'dark' : ''}`}>
      <div className="sbm-tc__inner">
        <div className="sbm-tc__viewport">
          <ul className="sbm-tc__track" tabIndex={0} aria-label="Meet the team carousel" ref={trackRef}>
            {teamMembers.map((member, index) => {
              const socialLinks = getSocialLinks(member);
              const colorMap = {
                'SEO': { c: '#FF3E23', cDark: '#E02B10', cSoft: 'rgba(255,62,35,.10)' },
                'Web': { c: '#F0A020', cDark: '#D98908', cSoft: 'rgba(254,182,67,.16)' },
                'Content': { c: '#6459EB', cDark: '#4F43D6', cSoft: 'rgba(100,89,235,.10)' },
                'Video': { c: '#3BB23C', cDark: '#2E9A2F', cSoft: 'rgba(59,178,60,.10)' },
              };
              const colors = colorMap[member.service_type] || { c: '#F97316', cDark: '#EA580C', cSoft: 'rgba(249,115,22,.10)' };

              return (
                <li key={member.id || index} className="sbm-tc__slide">
                  <article
                    className="sbm-card"
                    style={{
                      '--c': colors.c,
                      '--c-dark': colors.cDark,
                      '--c-soft': colors.cSoft,
                    }}
                  >
                    <div className="sbm-card__media">
                      <span className="sbm-card__spec">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <circle cx="11" cy="11" r="6.5" />
                          <path d="M16 16l4.5 4.5" />
                        </svg>
                        {member.service_type}
                      </span>
                      <img
                        src={member.image?.source_url || member.image || '/placeholder-avatar.png'}
                        alt={member.title?.rendered || member.name}
                        loading="lazy"
                        decoding="async"
                        width="712"
                        height="1024"
                      />
                      <span className="sbm-card__scrim" aria-hidden="true"></span>
                      {socialLinks.length > 0 && (
                        <ul className="sbm-card__social">
                          {socialLinks.map((social, i) => (
                            <li key={i}>
                              <a
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.label}
                              >
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                  <path d={social.icon} />
                                </svg>
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className="sbm-card__body">
                      <h3 className="sbm-card__name">{member.title?.rendered || member.name}</h3>
                      <p className="sbm-card__role">{member.designation}</p>
                      <p className="sbm-card__line">{member.short_description}</p>
                      {member.profile_link && (
                        <a
                          className="sbm-card__btn"
                          href={member.profile_link}
                          aria-label={`View ${member.title?.rendered || member.name}'s profile`}
                        >
                          View profile
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M5 12h13M12 5l7 7-7 7" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="sbm-tc__foot">
          <div className="sbm-tc__rail" aria-hidden="true">
            <span
              className="sbm-tc__railFill"
              style={{
                width: `${100 / (maxIndex + 1)}%`,
                transform: `translateX(${currentIndex * 100}%)`,
              }}
            ></span>
          </div>
          <div className="sbm-tc__dots" role="tablist" aria-label="Select team member">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-label={`Go to slide ${i + 1}`}
                aria-selected={i === currentIndex}
                onClick={() => scrollTo(i)}
                className={i === currentIndex ? 'bg-[#FEC535] w-6 rounded-full' : ''}
              />
            ))}
          </div>
          <div className="sbm-tc__nav">
            <button
              className="sbm-tc__arrow"
              data-dir="prev"
              type="button"
              aria-label="Previous team member"
              onClick={goPrev}
              disabled={currentIndex === 0}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" />
              </svg>
            </button>
            <button
              className="sbm-tc__arrow"
              data-dir="next"
              type="button"
              aria-label="Next team member"
              onClick={goNext}
              disabled={currentIndex >= maxIndex}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCarousel;
