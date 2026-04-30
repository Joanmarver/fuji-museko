import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${scrolled
          ? 'py-3 bg-fuji-black/95 backdrop-blur-md border-b border-white/10'
          : 'py-5 bg-fuji-black/80 backdrop-blur-sm border-b border-white/5'
        }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="font-display text-2xl font-light tracking-widest text-fuji-white"
        >
          FUJI <span className="italic text-fuji-gold">MUSEKO</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          <button
            onClick={() => scrollTo('menu')}
            className="text-white/50 hover:text-white text-xs tracking-widest uppercase transition-colors duration-300"
          >
            Menú
          </button>
          <button
            onClick={() => scrollTo('reserva')}
            className="text-fuji-gold border border-fuji-gold/40 hover:bg-fuji-gold hover:text-fuji-black
              text-xs tracking-widest uppercase px-5 py-2 transition-all duration-300"
          >
            Reservar
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          <span className={`block w-6 h-px bg-white/70 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-px bg-white/70 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-white/70 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu dropdown */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-40' : 'max-h-0'}`}>
        <div className="flex flex-col px-6 py-4 gap-4 border-t border-white/10">
          <button onClick={() => scrollTo('menu')}
            className="text-white/60 hover:text-white text-xs tracking-widest uppercase text-left transition-colors">
            Menú
          </button>
          <button onClick={() => scrollTo('reserva')}
            className="text-fuji-gold text-xs tracking-widest uppercase text-left transition-colors">
            Reservar
          </button>
        </div>
      </div>
    </nav>
  );
}
