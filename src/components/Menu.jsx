import { useState, useEffect, useRef } from 'react';
import { menuCategories, menuItems } from '../data/menu';
import { useScrollReveal } from '../hooks/useScrollReveal';
import sushi2 from '../assets/sushi2.jpg';

function MenuItem({ name, desc, price, badge, delay }) {
  const ref = useScrollReveal();
  return (
    <div
      ref={ref}
      className="reveal group flex justify-between items-start gap-6 py-5
        border-b border-white/6 hover:border-terra/40 transition-all duration-300 cursor-default"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-1">
          <p className="text-white font-medium text-sm tracking-wide group-hover:text-terra transition-colors duration-300">
            {name}
          </p>
          {badge && (
            <span className="text-terra border border-terra/40 text-[8px] font-bold tracking-[0.15em] uppercase px-1.5 py-0.5">
              {badge}
            </span>
          )}
        </div>
        <p className="text-white/30 text-xs font-light leading-relaxed">{desc}</p>
      </div>
      <p className="text-terra font-semibold text-sm flex-shrink-0 tracking-wide">{price}</p>
    </div>
  );
}

export default function Menu() {
  const [active, setActive] = useState('nigiris');
  const bannerRef = useRef(null);
  const titleRef  = useScrollReveal();
  const tabsRef   = useScrollReveal({ threshold: 0.2 });

  // Parallax en el banner del menú
  useEffect(() => {
    const onScroll = () => {
      if (bannerRef.current) {
        const rect = bannerRef.current.getBoundingClientRect();
        const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * 0.2;
        bannerRef.current.querySelector('img').style.transform = `translateY(${offset}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="menu" className="relative">

      {/* Banner con parallax */}
      <div ref={bannerRef} className="relative h-56 md:h-72 overflow-hidden">
        <img src={sushi2} alt="Sushi" className="w-full h-full object-cover object-center scale-110 will-change-transform" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="text-terra text-[10px] font-semibold tracking-[0.45em] uppercase mb-3">Carta</p>
          <h2 className="text-white text-4xl md:text-6xl font-black tracking-tighter uppercase">Menú</h2>
          <div className="w-8 h-px bg-terra mt-4" />
        </div>
      </div>

      {/* Contenido */}
      <div className="bg-[#0a0a0a] py-16 px-6">
        <div className="max-w-3xl mx-auto">

          {/* Tabs */}
          <div ref={tabsRef} className="reveal flex justify-center gap-0 mb-12 border-b border-white/8">
            {menuCategories.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`px-8 py-3.5 text-[10px] font-semibold tracking-[0.25em] uppercase
                  border-b-2 -mb-px transition-all duration-300
                  ${active === key
                    ? 'text-white border-terra'
                    : 'text-white/25 border-transparent hover:text-white/50'
                  }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Items con stagger */}
          <div>
            {menuItems[active].map((item, i) => (
              <MenuItem key={`${active}-${i}`} {...item} delay={i * 60} />
            ))}
          </div>

          <p className="mt-10 text-center text-white/15 text-[9px] font-light tracking-[0.2em] uppercase">
            Precios con IVA incluido · Disponibilidad sujeta al mercado
          </p>
        </div>
      </div>
    </section>
  );
}
