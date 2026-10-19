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

          <h2
            id="admissions-heading"
            className="text-3xl sm:text-4xl lg:text-[46px] font-['Playfair_Display',serif] font-bold text-[#0F2C61] dark:text-white tracking-tight leading-[1.18]"
          >
            Begin Your Journey — Visit Our Campus
          </h2>

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
                <img decoding="async" src="/assets/campus/4_admissions_entrance_red_carpet.jpg"
                  alt="Begin Your Journey - Welcoming Red Carpet Entrance to UCP Bahawalpur Campus"
                  loading="eager"
                  className="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
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
                  <strong>Personalized Campus Tours:</strong> Monday through Friday, 9:00 AM – 5:00 PM.
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
          <div className="w-full h-px bg-slate-200/80 dark:bg-white/10 mb-14 sm:mb-20" aria-hidden="true" />

          <motion.div
            initial={{ opacity: 0, y: 45, scale: 0.99 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0.15 }}
            className="relative bg-white dark:bg-[#0d1e38] rounded-3xl border border-slate-200/80 dark:border-[#1e3256] shadow-[0_20px_50px_rgba(15,44,97,0.06)] hover:shadow-[0_25px_60px_rgba(15,44,97,0.09)] transition-all duration-500 overflow-hidden p-6 sm:p-8 lg:p-12 mb-10"
          >
            {/* Ambient Subtle Luminous Gradient Backdrop */}
            <div 
              className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[#0F2C61]/5 dark:bg-amber-400/5 blur-3xl pointer-events-none" 
              aria-hidden="true" 
            />

            {/* Section Header with Actions */}
            <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-100 dark:border-white/10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F2C61]/5 dark:bg-amber-400/10 text-[#0F2C61] dark:text-amber-400 text-xs font-semibold tracking-wide uppercase mb-3">
                  <MapPin size={13} className="text-[#a30f16] dark:text-amber-400" />
                  <span>CAMPUS LOCATION & REACHABILITY</span>
                </div>
                <h3 
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F2C61] dark:text-white tracking-tight leading-tight"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Find UCP Bahawalpur Campus
                </h3>
                <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                  Centrally located with convenient transit access across Bahawalpur and Southern Punjab. Explore the interactive campus map below or launch live navigation.
                </p>
              </div>

              {/* Action Bar */}
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100/90 dark:bg-[#14284c] text-[#0F2C61] dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-[#1e3256]">
                  <Navigation size={13} className="text-[#a30f16] dark:text-amber-400" />
                  <span>{UCP_COORDINATES} ({UCP_PLUS_CODE})</span>
                </span>
                <a
                  href={GOOGLE_MAPS_PIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#a30f16] hover:bg-[#860c12] text-white rounded-xl text-xs font-bold uppercase tracking-[0.14em] transition-all shadow-md hover:shadow-lg cursor-pointer"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>

            {/* Interactive Map & Side Location Details Grid */}
            <div className="relative z-10 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              
              {/* Responsive Google Map Container */}
              <div className="lg:col-span-8">
                <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-[#1e3256] shadow-md bg-white dark:bg-[#091426] transition-all duration-300">
                  
                  {/* Clean light map frame */}
                  <div className="relative w-full h-[480px] sm:h-[500px] overflow-hidden bg-slate-100 dark:bg-slate-900" style={{ minHeight: '480px' }}>
                    <iframe
                      title="University of Central Punjab Bahawalpur Campus - Official Google Map Location"
                      src={`https://maps.google.com/maps?q=UCP+Bahawalpur+Campus,+Yazman+Rd,+New+Islami+Colony,+Bahawalpur,+Pakistan&t=${mapType === 'satellite' ? 'k' : ''}&z=16&ie=UTF8&iwloc=&output=embed`}
                      className="w-full h-full border-0 block"
                      loading="lazy"
                      allowFullScreen={true}
                      referrerPolicy="no-referrer-when-downgrade"
                      style={{ border: 0, minHeight: '480px' }}
                    />

                    {/* Official Campus Verified Badge Overlay */}
                    <div className="absolute top-4 left-4 z-20 bg-white/95 dark:bg-[#0c182c]/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-slate-200 dark:border-[#1e3256] flex items-center gap-2.5 pointer-events-none">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#a30f16] animate-pulse" />
                      <div>
                        <span className="text-[11px] font-black uppercase tracking-wider text-[#0F2C61] dark:text-white block leading-none">
                          UCP Bahawalpur Campus
                        </span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-300 font-medium block mt-1 leading-none">
                          {UCP_PLUS_CODE} • Yazman Road, Bahawalpur
                        </span>
                      </div>
                    </div>

                    {/* View Switcher: Default Light Map & Satellite */}
                    <div className="absolute top-4 right-4 z-20 bg-white/95 dark:bg-[#0c182c]/95 backdrop-blur-md p-1 rounded-xl shadow-lg border border-slate-200 dark:border-[#1e3256] flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setMapType('map')}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          mapType === 'map'
                            ? 'bg-[#0F2C61] text-white shadow-xs'
                            : 'text-slate-600 dark:text-slate-300 hover:text-[#0F2C61] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#14284c]'
                        }`}
                        title="Standard Google Map (Clean light view)"
                      >
                        <MapIcon size={12} />
                        <span>Map</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setMapType('satellite')}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          mapType === 'satellite'
                            ? 'bg-[#0F2C61] text-white shadow-xs'
                            : 'text-slate-600 dark:text-slate-300 hover:text-[#0F2C61] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#14284c]'
                        }`}
                        title="Google Satellite Imagery"
                      >
                        <Layers size={12} />
                        <span>Satellite</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Map Footer Note */}
                <div className="mt-3 flex flex-wrap items-center justify-between text-xs text-slate-600 dark:text-slate-300 px-1 gap-2">
                  <span>
                    Official Campus Coordinates: <strong className="text-slate-700 dark:text-white">{UCP_COORDINATES}</strong> • Plus Code: <strong className="text-slate-700 dark:text-white">{UCP_PLUS_CODE}</strong>
                  </span>
                  <a 
                    href={GOOGLE_MAPS_PIN_URL}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#a30f16] dark:text-amber-400 hover:underline font-bold inline-flex items-center gap-1"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              {/* Official Campus Access Information Panels */}
              <div className="lg:col-span-4 flex flex-col divide-y divide-slate-100 dark:divide-white/10 pt-1 lg:pt-0">
                
                {/* Location */}
                <div className="py-4.5 first:pt-0 transition-transform duration-200">
                  <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#a30f16] dark:text-amber-400 block">
                    Campus Location
                  </span>
                  <h4 
                    className="text-base font-semibold text-[#0F2C61] dark:text-white mt-1 tracking-tight"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    Yazman Rd, New Islami Colony
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-300 mt-1 font-sans">
                    Bahawalpur, Punjab, Pakistan (Plus Code: {UCP_PLUS_CODE})
                  </p>
                  <a
                    href={GOOGLE_MAPS_PIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#a30f16] dark:text-amber-400 font-semibold mt-2 hover:underline transition-colors"
                  >
                    <span>Get Directions on Google Maps</span>
                    <ArrowRight size={12} />
                  </a>
                </div>

                {/* Visiting Hours */}
                <div className="py-4.5 transition-transform duration-200">
                  <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-400 block">
                    Visiting Hours
                  </span>
                  <h4 
                    className="text-base font-semibold text-[#0F2C61] dark:text-white mt-1 tracking-tight"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    Mon – Fri: 8:30 AM – 5:00 PM
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-300 mt-1 font-sans">
                    Saturday: 9:00 AM – 2:00 PM
                  </p>
                </div>

                {/* Campus Transit */}
                <div className="py-4.5 last:pb-0 transition-transform duration-200">
                  <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-400 block">
                    Campus Transit
                  </span>
                  <h4 
                    className="text-base font-semibold text-[#0F2C61] dark:text-white mt-1 tracking-tight"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    Dedicated Shuttle Fleet
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-300 mt-1 font-sans leading-relaxed">
                    Connecting Bahawalpur & surrounding districts
                  </p>
                </div>

              </div>

            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
