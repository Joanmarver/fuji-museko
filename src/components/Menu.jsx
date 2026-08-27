import { useState, useEffect, useRef } from 'react';
import { menuCategories, menuItems } from '../data/menu';
import { allergenCatalog } from '../data/allergens';
import { useScrollReveal } from '../hooks/useScrollReveal';
import AllergenIcon from './AllergenIcon';
import bannerImg from '../assets/carpaccio.jpg';
import nigiriSalmonImg from '../assets/nigiri-salmon.jpg';
import nigiriTunaImg from '../assets/nigiri-tuna-2u.jpg';

const dishImageByFilename = {
  'nigiri-salmon.jpg': nigiriSalmonImg,
  'nigiri-tuna-2u.jpg': nigiriTunaImg,
};

const BUFFET_FOOD_KEYS = [
  'entrantes', 'fritos', 'wok', 'plancha', 'brasa', 'sashimi', 'carpaccio',
  'tartar', 'nigiri', 'gunkan', 'maki', 'uramaki', 'futomaki', 'temaki',
];

const BEBIDAS_POSTRES_KEYS = ['bebidas', 'cafes', 'postres', 'vinos', 'copas', 'cubatas'];

const GROUPS = [
  { key: 'preciosBuffet', label: 'Precios Buffet', categories: ['buffetAdultos', 'buffetInfantil'] },
  { key: 'buffet', label: 'Buffet', categories: BUFFET_FOOD_KEYS },
  { key: 'bebidasPostres', label: 'Bebidas y Postres', categories: BEBIDAS_POSTRES_KEYS },
  ...menuCategories
    .filter(c => c.key !== 'buffetAdultos' && c.key !== 'buffetInfantil'
      && !BUFFET_FOOD_KEYS.includes(c.key) && !BEBIDAS_POSTRES_KEYS.includes(c.key))
    .map(c => ({ key: c.key, label: c.label, categories: [c.key] })),
];

const LABEL_BY_KEY = Object.fromEntries(menuCategories.map(c => [c.key, c.label]));

function AllergenIcons({ allergens }) {
  if (!allergens || allergens.length === 0) return null;
  return (
    <span className="flex items-center gap-1.5">
      {allergens.map((key) => {
        const info = allergenCatalog[key];
        if (!info) return null;
        return (
          <span
            key={key}
            title={info.label}
            aria-label={info.label}
            className="flex items-center justify-center w-5 h-5 rounded-full bg-terra/15 text-terra"
          >
            <AllergenIcon name={info.icon} className="w-3.5 h-3.5" />
          </span>
        );
      })}
    </span>
  );
}

function SpicyChip() {
  return (
    <span
      title="Picante"
      aria-label="Picante"
      className="flex items-center justify-center w-5 h-5 rounded-full bg-terra/15 text-terra"
    >
      <AllergenIcon name="picante" className="w-3.5 h-3.5" />
    </span>
  );
}

function MenuItem({ name, desc, price, badge, allergens, spicy, image, delay }) {
  const ref = useScrollReveal();
  const [showPhoto, setShowPhoto] = useState(false);
  const photoUrl = image ? dishImageByFilename[image] : null;

  return (
    <div
      ref={ref}
      className="reveal border-b border-white/6 hover:border-terra/40 transition-all duration-300"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        className={`group flex justify-between items-start gap-3 md:gap-6 py-5 ${photoUrl ? 'cursor-pointer' : 'cursor-default'}`}
        onClick={photoUrl ? () => setShowPhoto((v) => !v) : undefined}
      >
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-1">
            <p className="text-white font-medium text-sm tracking-wide group-hover:text-terra transition-colors duration-300">
              {name}
            </p>
            {badge && (
              <span className="text-terra border border-terra/40 text-[8px] font-bold tracking-[0.15em] uppercase px-1.5 py-0.5">
                {badge}
              </span>
            )}
            <AllergenIcons allergens={allergens} />
            {spicy && <SpicyChip />}
            {photoUrl && <ChevronIcon open={showPhoto} />}
          </div>
          <p className="text-white/30 text-xs font-light leading-relaxed">{desc}</p>
        </div>
        <p className="text-terra font-semibold text-sm flex-shrink-0 tracking-wide">{price}</p>
      </div>

      {photoUrl && (
        <div className={`grid transition-all duration-500 ease-in-out ${showPhoto ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
          <div className="overflow-hidden">
            <img
              src={photoUrl}
              alt={name}
              className="w-full max-w-xs h-40 object-cover rounded-sm mb-5"
            />
          </div>
        </div>
      )}
    </div>
  );
}

function ChevronIcon({ open }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`w-4 h-4 stroke-current transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
      fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function SubAccordion({ label, items }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/6 last:border-b-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center justify-between py-3 text-left transition-colors duration-300
          ${open ? 'text-terra' : 'text-terra/70 hover:text-terra'}`}
      >
        <span className="text-[10px] font-semibold tracking-[0.3em] uppercase">{label}</span>
        <ChevronIcon open={open} />
      </button>
      <div className={`grid transition-all duration-500 ease-in-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          {items.map((item, i) => (
            <MenuItem key={i} {...item} delay={i * 40} />
          ))}
        </div>
      </div>
    </div>
  );
}

function GroupAccordion({ group, open, onToggle }) {
  return (
    <div className="border-b border-white/8">
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between py-5 text-left transition-colors duration-300
          ${open ? 'text-white' : 'text-white/50 hover:text-white/80'}`}
      >
        <span className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase">{group.label}</span>
        <ChevronIcon open={open} />
      </button>

      <div className={`grid transition-all duration-500 ease-in-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <div className="pb-8">
            {group.categories.length > 1
              ? group.categories.map((catKey) => (
                  <SubAccordion key={catKey} label={LABEL_BY_KEY[catKey]} items={menuItems[catKey]} />
                ))
              : group.categories.map((catKey) => (
                  <div key={catKey}>
                    {menuItems[catKey].map((item, i) => (
                      <MenuItem key={`${catKey}-${i}`} {...item} delay={i * 40} />
                    ))}
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Menu() {
  const [openGroup, setOpenGroup] = useState('buffet');
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
        <img src={bannerImg} alt="Sushi" className="w-full h-full object-cover object-center scale-110 will-change-transform" />
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
        <div ref={tabsRef} className="reveal max-w-3xl mx-auto">

          {/* Acordeón de grupos */}
          <div className="border-t border-white/8">
            {GROUPS.map((group) => (
              <GroupAccordion
                key={group.key}
                group={group}
                open={openGroup === group.key}
                onToggle={() => setOpenGroup(openGroup === group.key ? null : group.key)}
              />
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
