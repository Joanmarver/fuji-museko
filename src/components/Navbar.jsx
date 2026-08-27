import { useState, useEffect } from 'react';
import logo from '../assets/logo.jpg';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const fn = () => {
      ticking = false;
      setScrolled(window.scrollY > 80);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(fn);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Muestra el logo del navbar justo cuando el logo del Hero deja de verse (sin hueco entre ambos)
  useEffect(() => {
    const target = document.getElementById('hero-logo');
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowLogo(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setOpen(false); };

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-700
      ${scrolled ? 'bg-black/90 backdrop-blur-xl py-2 md:py-3 border-b border-white/5' : 'bg-transparent py-3 md:py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">

        <a href="#" onClick={e => { e.preventDefault(); window.scrollTo({ top:0, behavior:'smooth' }); }}
          className={`transition-opacity duration-500 md:opacity-100 md:pointer-events-auto ${showLogo ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <img src={logo} alt="Fuji Museko" className={`object-contain transition-all duration-500 ${scrolled ? 'h-10 md:h-20' : 'h-14 md:h-28'}`} />
        </a>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-10">
          <button onClick={() => go('menu')}
            className="text-white/40 hover:text-white text-[10px] font-medium tracking-[0.25em] uppercase transition-colors duration-300">
            Menú
          </button>
          <button onClick={() => go('reserva')}
            className="text-[10px] font-semibold tracking-[0.25em] uppercase px-7 py-3
              bg-terra hover:bg-terra-dark text-white transition-all duration-300 hover:-translate-y-px">
            Reservar
          </button>
        </nav>

        {/* Mobile toggle */}
        <button className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8" onClick={() => setOpen(!open)}>
          <span className={`block h-px bg-white transition-all duration-300 ${open ? 'rotate-45 translate-y-[7px]' : 'w-6'}`} />
          <span className={`block h-px bg-white transition-all duration-300 ${open ? 'opacity-0 w-6' : 'w-4'}`} />
          <span className={`block h-px bg-white transition-all duration-300 ${open ? '-rotate-45 -translate-y-[7px] w-6' : 'w-6'}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ${open ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-black/95 border-t border-white/5 px-8 py-6 flex flex-col gap-5">
          <button onClick={() => go('menu')} className="text-white/50 hover:text-white text-[11px] tracking-[0.2em] uppercase text-left transition-colors">Menú</button>
          <button onClick={() => go('reserva')} className="text-terra text-[11px] tracking-[0.2em] uppercase text-left font-semibold">Reservar</button>
        </div>
      </div>
    </header>
  );
}