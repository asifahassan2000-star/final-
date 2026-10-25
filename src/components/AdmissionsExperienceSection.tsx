import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Calendar, Compass, MapPin, CheckCircle2, 
  Phone, Mail, Navigation, Clock, ExternalLink, ShieldCheck, Bus,
  Layers, Map as MapIcon
} from 'lucide-react';
import { UCP_CONTACT } from '../data/ucpData';

interface AdmissionsExperienceSectionProps {
  onOpenApply: () => void;
  onOpenFee: () => void;
}

const GOOGLE_MAPS_PIN_URL = 'https://maps.app.goo.gl/ud9Sz3ZLR7zt9aiT7';
const UCP_COORDINATES = '29.3581° N, 71.6943° E';
const UCP_PLUS_CODE = '9M5V+7P4';
const UCP_FULL_ADDRESS = '9M5V+7P4, Yazman Rd, New Islami Colony, Bahawalpur, Pakistan';

export const AdmissionsExperienceSection: React.FC<AdmissionsExperienceSectionProps> = ({
  onOpenApply,
  onOpenFee,
}) => {
  const [mapType, setMapType] = useState<'map' | 'satellite'>('map');

  return (
    <section 
      id="admissions-section"
      className="py-[90px] sm:py-[110px] bg-[#FAF8F5] dark:bg-[#080f1d] border-b border-slate-200/80 dark:border-white/10 overflow-hidden transition-colors duration-200"
      aria-labelledby="admissions-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Motion Reveal */}
        <motion.header 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-3xl mb-12 sm:mb-16"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#C5A059] dark:text-amber-400">
              ADMISSIONS & CAMPUS EXPERIENCE
            </span>
            <span className="h-[2px] w-8 bg-[#C5A059] dark:bg-amber-400" aria-hidden="true" />
          </div>

          <div className="overflow-hidden">
            <motion.h2
              id="admissions-heading"
              initial={{ y: '100%', opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-4xl lg:text-[46px] font-['Playfair_Display',serif] font-bold text-[#0F2C61] dark:text-white tracking-tight leading-[1.18]"
            >
              Begin Your Journey — Visit Our Campus
            </motion.h2>
          </div>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-sans max-w-2xl">
            A welcoming arrival experience awaits every prospective student and family at UCP Bahawalpur. Tour our lecture halls, laboratories, and student facilities firsthand.
          </p>
        </motion.header>

        {/* Entrance Photograph with Red Carpet & Admissions Guidance */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16 sm:mb-20"
        >
          {/* Entrance Red Carpet Welcome Image */}
          <div className="lg:col-span-7">
            <div className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-[#1e3256] bg-white dark:bg-[#0d1e38] shadow-md">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden">
                <img decoding="async" 
                  src="https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%202.46.14%20AM.jpeg"
                  alt="Begin Your Journey - Welcoming Entrance to UCP Bahawalpur Campus"
                  loading="lazy"
                  className="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/assets/campus/4_admissions_entrance_red_carpet.jpg';
                  }}
                />
              </div>
            </div>
          </div>

          {/* Admissions Journey & Action Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <h3 className="font-['Playfair_Display',serif] text-2xl sm:text-3xl font-bold text-[#0F2C61] dark:text-white">
                Fall 2026 Admissions Now Open
              </h3>
              <p className="text-sm sm:text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                Applications are invited for undergraduate BS, BBA, and Associate Degree Programmes across Computer Science, Business, Natural Sciences, and Humanities.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={13} />
                </div>
                <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-sans">
                  <strong>Personalized Campus Tours:</strong> Monday through Friday, 8:00 AM – 4:00 PM.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={13} />
                </div>
                <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-sans">
                  <strong>Direct Faculty Counseling:</strong> Discuss degree pathways with academic mentors.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={13} />
                </div>
                <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-sans">
                  <strong>Scholarships & Financial Aid:</strong> Merit, kinship, and PGC alumni fee concessions.
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-3.5">
              <button
                onClick={onOpenApply}
                className="px-6 py-3 bg-[#a30f16] hover:bg-[#860c12] text-white rounded-xl text-xs font-bold uppercase tracking-[0.16em] transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <span>Apply Online</span>
                <ArrowRight size={14} />
              </button>

              <button
                onClick={onOpenFee}
                className="px-5 py-3 bg-white dark:bg-[#0d1e38] border border-slate-300 dark:border-[#1e3256] hover:border-[#092242] dark:hover:border-white text-[#092242] dark:text-white rounded-xl text-xs font-semibold uppercase tracking-[0.14em] transition-colors cursor-pointer"
              >
                Fee Structure
              </button>
            </div>

            {/* Quick Contact Line */}
            <div className="pt-2 text-xs text-slate-500 dark:text-slate-400 font-sans flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Phone size={13} className="text-[#a30f16] dark:text-amber-400" />
                <span>{UCP_CONTACT.phone}</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Mail size={13} className="text-[#a30f16] dark:text-amber-400" />
                <span>{UCP_CONTACT.admissionsEmail}</span>
              </span>
            </div>
          </div>
        </motion.div>

        {/* =========================================================================
            WORLD-CLASS LOCATION & INTERACTIVE LEAFLET OPENSTREETMAP SECTION (CSS Selector 18)
            ========================================================================= */}
        <div id="location-section" className="pt-8 sm:pt-12 scroll-mt-24 relative">
          {/* Anchor alias for location navigation */}
          <div id="campus-location-section" className="absolute -top-24" aria-hidden="true" />

          {/* Subtle Institutional Hairline Separator */}
          <div className="w-full h-px bg-slate-200/80 dark:bg-white/10 mb-8 sm:mb-12" aria-hidden="true" />

          {/* Minimal Interactive Campus Map Section with Red Minimal Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0.15 }}
            className="space-y-4"
          >
            {/* Heading with Red Minimal Style & Minimal Text Controls — No borders */}
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-[#a30f16] dark:text-[#ef4444] font-bold block mb-1">
                  CAMPUS LOCATION
                </span>
                <h3 
                  className="text-2xl sm:text-3xl font-bold text-[#a30f16] dark:text-[#ef4444] tracking-tight font-serif"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  UCP Bahawalpur Campus
                </h3>
              </div>

              {/* Minimal Text Action Links — Pure text, no borders */}
              <div className="flex items-center gap-5 text-xs font-medium">
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                  <button
                    type="button"
                    onClick={() => setMapType('map')}
                    className={`cursor-pointer transition-colors ${
                      mapType === 'map'
                        ? 'text-[#a30f16] dark:text-[#ef4444] font-bold underline underline-offset-4'
                        : 'hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Street Map
                  </button>
                  <span className="text-slate-300 dark:text-slate-700">·</span>
                  <button
                    type="button"
                    onClick={() => setMapType('satellite')}
                    className={`cursor-pointer transition-colors ${
                      mapType === 'satellite'
                        ? 'text-[#a30f16] dark:text-[#ef4444] font-bold underline underline-offset-4'
                        : 'hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Topographic / Campus Area
                  </button>
                </div>

                <a
                  href={GOOGLE_MAPS_PIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#a30f16] dark:text-[#ef4444] hover:underline font-bold inline-flex items-center gap-1"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>

            {/* Fullscreen Big Borderless Interactive Map with Campus Marker */}
            <div className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden border-0 bg-slate-100 dark:bg-slate-950 h-[560px] sm:h-[660px] lg:h-[760px] shadow-2xl">
              <iframe
                title="University of Central Punjab Bahawalpur Campus Map"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=71.6700%2C29.3450%2C71.7150%2C29.3700&layer=${mapType === 'satellite' ? 'hot' : 'mapnik'}&marker=29.3581%2C71.6943`}
                className="w-full h-full border-0 block"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0, width: '100%', height: '100%' }}
              />
            </div>

            {/* Minimal Text Location Details Below Map — Pure text, no borders */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400 font-sans">
              <div className="flex flex-wrap items-center gap-3 sm:gap-6">
                <span>Yazman Rd, New Islami Colony, Bahawalpur</span>
                <span className="hidden sm:inline">·</span>
                <span>Visiting Hours: Mon – Fri (8:00 AM – 4:00 PM)</span>
                <span className="hidden md:inline">·</span>
                <span className="hidden md:inline">Dedicated Shuttle Fleet</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-slate-500">Plus Code: {UCP_PLUS_CODE}</span>
                <span>·</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">{UCP_CONTACT.phone}</span>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
