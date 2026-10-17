import React, { useState } from 'react';
import { Calendar, MapPin, ArrowRight, Clock, Tag, ExternalLink } from 'lucide-react';
import { NEWS_EVENTS } from '../data/ucpData';
import { NewsEventItem } from '../types';

interface NewsAndEventsProps {
  onSelectArticle: (article: NewsEventItem) => void;
}

export const NewsAndEvents: React.FC<NewsAndEventsProps> = ({ onSelectArticle }) => {
  const [filter, setFilter] = useState<'All' | 'News' | 'Event' | 'Workshop' | 'Symposium'>('All');

  const filteredItems = NEWS_EVENTS.filter((item) => {
    if (filter === 'All') return true;
    return item.category === filter;
  });

  return (
    <section id="news-section" className="py-[100px] bg-slate-50 border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span data-reveal="label" data-reveal-delay="0" className="text-[#0F2C61] font-semibold text-xs sm:text-sm uppercase tracking-widest bg-slate-200/60 px-3.5 py-1.5 rounded-full border border-slate-300/60 inline-block mb-3">
              Happening at UCP
            </span>
            <div className="heading-mask">
              <h2 
                data-reveal="heading"
                data-reveal-delay="100"
                className="heading-reveal text-3xl sm:text-4xl lg:text-5xl font-['Playfair_Display',serif] font-bold text-[#0F2C61] tracking-tight leading-tight drop-shadow-xs"
              >
                In The Moment
              </h2>
            </div>
            <p data-reveal="text" data-reveal-delay="220" className="mt-3 text-slate-600 text-base sm:text-lg max-w-xl leading-relaxed">
              Stay informed with recent academic symposia, research milestones, workshops, and campus happenings.
            </p>
          </div>

          {/* Filter Pills & Official Blogs */}
          <div data-reveal="button" data-reveal-delay="340" className="flex items-center gap-2 flex-wrap">
            {['All', 'Workshop', 'Symposium', 'Announcement'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`text-sm px-4 py-2 rounded-full transition-all ${
                  filter === f
                    ? 'bg-[#092242] text-white font-bold shadow-sm'
                    : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-200 font-medium'
                }`}
              >
                {f}
              </button>
            ))}

            <a
              href="https://ucp.edu.pk/blog/?_gl=1*g7icau*_gcl_au*mtgzmja3odq4mc4xnzkwmdeymzq5li0uls4xnzkwmtgwndm0ljy0mta5mdayni4xnzkwmtgwndm0lje3otaxoda0mzq.*_ga*mtk1mtm4njg4ms4xnzkwmdeymzq5*_ga_9bbzl6tfyq*cze3otaxnzk2otykbzykzzekdde3otaxoda0otckajywjgwwjgg0nzm0ndm5mza."
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm px-4 py-2 rounded-full bg-rose-50 hover:bg-rose-100 text-[#a30f16] border border-rose-200 font-bold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <span>UCP Blogs</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>

        {/* Featured + Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Featured Card: Image rendered immediately with subtle parallax */}
          {NEWS_EVENTS[0] && (
            <div 
              onClick={() => onSelectArticle(NEWS_EVENTS[0])}
              className="editorial-card lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group flex flex-col justify-between hover:border-[#092242]/30"
            >
              <div>
                <div className="parallax-container relative h-64 sm:h-84 w-full overflow-hidden bg-slate-900 aspect-[16/10]">
                  <img
                    src={NEWS_EVENTS[0].image}
                    alt={NEWS_EVENTS[0].title}
                    data-parallax-img
                    loading="lazy"
                    decoding="async"
                    className="parallax-img w-full h-full object-cover subtle-hover-scale"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4 bg-[#a30f16] text-white text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-lg uppercase tracking-wider shadow">
                    Featured {NEWS_EVENTS[0].category}
                  </div>

                  {/* Date badge */}
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md text-[#092242] px-4 py-2 rounded-xl shadow-lg text-center flex items-center gap-2.5">
                    <span className="text-2xl font-black text-[#a30f16]">
                      {NEWS_EVENTS[0].formattedDate.day}
                    </span>
                    <div className="text-left text-xs leading-tight font-bold text-slate-700">
                      <span>{NEWS_EVENTS[0].formattedDate.month}</span>
                      <span className="block text-slate-400 font-normal">{NEWS_EVENTS[0].formattedDate.year}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-7">
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#092242] group-hover:text-[#a30f16] transition-colors leading-snug">
                    {NEWS_EVENTS[0].title}
                  </h3>
                  <p className="text-base sm:text-lg text-slate-600 mt-3.5 leading-relaxed">
                    {NEWS_EVENTS[0].summary}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-500 mt-5 pt-5 border-t border-slate-100">
                    {NEWS_EVENTS[0].venue && (
                      <span className="flex items-center gap-1.5">
                        <MapPin size={15} className="text-[#a30f16]" /> {NEWS_EVENTS[0].venue}
                      </span>
                    )}
                    {NEWS_EVENTS[0].time && (
                      <span className="flex items-center gap-1.5">
                        <Clock size={15} className="text-slate-400" /> {NEWS_EVENTS[0].time}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-7 pt-0 flex items-center text-sm font-bold text-[#a30f16] group-hover:translate-x-1 transition-transform">
                Read Full Coverage →
              </div>
            </div>
          )}

          {/* Secondary List Column: Cards exist immediately */}
          <div className="lg:col-span-5 space-y-4">
            {filteredItems.slice(1, 4).map((item) => {
              return (
                <div
                  key={item.id}
                  onClick={() => onSelectArticle(item)}
                  className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm hover:shadow-xl transition-all duration-200 flex gap-4 sm:gap-5 cursor-pointer group hover:border-[#092242]/40"
                >
                {/* Thumbnail */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-slate-100 shrink-0 relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover subtle-hover-scale"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                  <div className="absolute top-2 left-2 bg-black/75 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    {item.formattedDate.day} {item.formattedDate.month}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#a30f16] uppercase tracking-wider">
                      {item.category}
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-[#092242] group-hover:text-[#a30f16] transition-colors leading-snug line-clamp-2 mt-1">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>

                  <span className="text-xs text-slate-400 font-medium flex items-center gap-1 mt-2">
                    {item.venue ? item.venue.split(',')[0] : 'UCP Lahore'}
                  </span>
                </div>
              </div>
              );
            })}

            {/* Newsletter & Alerts Subscription Box: Exists immediately */}
            <div className="bg-[#0b2341] text-white p-6 rounded-2xl shadow-md border border-slate-800">
              <h4 className="text-base sm:text-lg font-bold tracking-tight">Stay Connected with UCP Today</h4>
              <p className="text-sm text-slate-300 mt-1.5 leading-relaxed">
                Receive official press releases, merit lists updates, and conference invitations directly.
              </p>
              <div className="mt-4 flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  className="bg-white/10 text-white placeholder-slate-400 text-sm px-4 py-2.5 rounded-xl flex-1 border border-white/15 focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
                <button className="bg-[#a30f16] hover:bg-[#880d12] text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-colors shrink-0">
                  Subscribe
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
