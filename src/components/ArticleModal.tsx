import React from 'react';
import { X, Calendar, MapPin, Clock, Tag, Share2 } from 'lucide-react';
import { NewsEventItem } from '../types';

interface ArticleModalProps {
  article: NewsEventItem | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200">
        
        {/* Cover Image */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1000&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 text-white hover:bg-black p-2 rounded-full backdrop-blur-sm transition-colors"
          >
            <X size={18} />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <span className="bg-[#b8121a] text-white text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider inline-block mb-2">
              {article.category}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug drop-shadow-md">
              {article.title}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-4">
          
          {/* Metadata bar */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pb-3 border-b border-slate-200">
            <span className="flex items-center gap-1 font-semibold text-[#112c4f]">
              <Calendar size={14} className="text-[#b8121a]" />
              {article.date} ({article.formattedDate.day} {article.formattedDate.month} {article.formattedDate.year})
            </span>
            {article.time && (
              <span className="flex items-center gap-1">
                <Clock size={14} className="text-slate-400" /> {article.time}
              </span>
            )}
            {article.venue && (
              <span className="flex items-center gap-1">
                <MapPin size={14} className="text-[#b8121a]" /> {article.venue}
              </span>
            )}
          </div>

          <div className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-3">
            <p className="font-medium text-slate-800">
              {article.summary}
            </p>
            <p className="text-slate-600 text-xs sm:text-sm">
              The University of Central Punjab continues to foster active academia-industry synergy, research ethics, and experiential clinical learning across all faculties. Faculty and scholars from across Pakistan participated in this session to deliberate on contemporary methodologies and real-world implementation.
            </p>
            <p className="text-slate-600 text-xs sm:text-sm">
              For academic inquiries or registration for subsequent modules, students and external delegates may reach out to the relevant departmental coordinator or via the central university helpline.
            </p>
          </div>

          {article.author && (
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Published by: <strong>{article.author}</strong></span>
              <button 
                onClick={() => alert('Link copied to clipboard!')}
                className="text-[#112c4f] hover:text-[#b8121a] font-bold flex items-center gap-1"
              >
                <Share2 size={13} /> Share Story
              </button>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#112c4f] text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-slate-800 transition-colors"
          >
            Close Story
          </button>
        </div>

      </div>
    </div>
  );
};
