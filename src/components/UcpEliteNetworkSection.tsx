import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import { ELITE_NETWORK_IMAGES } from '../data/eliteNetworkData';

// Swiper core styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/autoplay';

export const UcpEliteNetworkSection: React.FC = () => {
  return (
    <motion.section
      id="ucp-elite-network"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full bg-white dark:bg-[#07192F] py-[80px] overflow-hidden select-none transition-colors duration-200"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* =========================================================================
            HEADING:
            UCP ELITE STUDENT NETWORK with Red & Blue Mix and Golden Line
            ========================================================================= */}
        <div className="text-center mb-[44px]">
          {/* Big Heading with Red and Blue Mix + Text Animation */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-extrabold uppercase tracking-tight text-3xl sm:text-4xl lg:text-5xl leading-tight flex items-center justify-center flex-wrap gap-x-2.5 sm:gap-x-3.5 text-center"
          >
            <span className="text-[#C8102E] dark:text-[#FF4A60] drop-shadow-xs">
              UCP
            </span>
            <span className="text-[#002D62] dark:text-blue-300">
              ELITE
            </span>
            <span className="text-[#C8102E] dark:text-[#FF4A60] drop-shadow-xs">
              STUDENT
            </span>
            <span className="text-[#002D62] dark:text-white">
              NETWORK
            </span>
          </motion.h2>

          {/* Golden Line with shimmer gradient */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="w-[120px] sm:w-[140px] h-[4px] bg-gradient-to-r from-[#D4AF37] via-[#F3D368] to-[#AA7C11] mx-auto mt-3.5 mb-2.5 rounded-full shadow-xs origin-center" 
            aria-hidden="true"
          />
        </div>

        {/* =========================================================================
            GALLERY - PREMIUM LUMS STYLE CLEAN COVERFLOW:
            Swiper.js Coverflow, loop true, autoplay 2500ms, centeredSlides true
            Card size: desktop width 380px, height 240px, ratio 16:10, object-fit cover,
            border-radius 12px, soft shadow 0 4px 20px rgba(0,0,0,0.08) only.
            Side images: scale 0.9, opacity 0.6, no blur.
            Center image: scale 1, opacity 1, fully visible.
            On hover: scale 1.03, pause autoplay.
            Gap between slides: 24px.
            Mobile: <768px: 1 image per view, width 92vw, height 220px, centered.
            ========================================================================= */}
        <div className="w-full relative ucp-elite-swiper-container">
          <Swiper
            modules={[EffectCoverflow, Autoplay]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView="auto"
            spaceBetween={24}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 0,
              modifier: 1,
              scale: 0.9,
              slideShadows: false,
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 0,
                centeredSlides: true,
              },
              768: {
                slidesPerView: 'auto',
                spaceBetween: 24,
                centeredSlides: true,
              },
            }}
            className="ucp-elite-swiper w-full py-4 !overflow-visible"
          >
            {ELITE_NETWORK_IMAGES.map((item, index) => (
              <SwiperSlide
                key={item.id}
                className="!w-[380px] !h-[240px] max-md:!w-[92vw] max-md:!h-[220px] max-md:mx-auto shrink-0 transition-transform duration-300"
              >
                {({ isActive }) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: Math.min(index * 0.05, 0.6),
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`w-full h-full rounded-[12px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] bg-slate-50 transition-all duration-300 ease-out hover:scale-[1.03] ${
                      isActive ? 'opacity-100 scale-100' : 'opacity-60 scale-90 md:scale-95'
                    }`}
                  >
                    <img
                      src={item.localSrc}
                      alt={item.alt}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-center aspect-[16/10] block"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = item.fallbackSrc;
                      }}
                    />
                  </motion.div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* =========================================================================
            BOTTOM TEXT:
            "Volunteer Team Members" cursive at bottom, 24px margin top,
            color #0a1f44, font 18px italic, no white.
            ========================================================================= */}
        <div className="text-center mt-[24px]">
          <p
            className="italic text-[#0a1f44] text-[18px] select-none"
            style={{
              fontFamily: "'Great Vibes', 'Playfair Display', cursive, serif",
              lineHeight: 1.2,
            }}
          >
            Volunteer Team Members
          </p>
        </div>

      </div>

      {/* Scoped CSS for Swiper Side Slides Scale & Opacity */}
      <style>{`
        .ucp-elite-swiper-container .swiper-slide {
          transition: transform 0.4s ease, opacity 0.4s ease;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        @media (min-width: 768px) {
          .ucp-elite-swiper-container .swiper-slide:not(.swiper-slide-active) {
            opacity: 0.6;
            transform: scale(0.9);
          }
          .ucp-elite-swiper-container .swiper-slide-active {
            opacity: 1 !important;
            transform: scale(1) !important;
          }
        }
        @media (max-width: 767px) {
          .ucp-elite-swiper-container .swiper-slide {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </motion.section>
  );
};
