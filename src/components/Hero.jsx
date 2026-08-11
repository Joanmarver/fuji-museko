import { useEffect, useRef, useState } from 'react';
import logo from '../assets/logo.jpg';
import sushi3 from '../assets/sushi3.jpg';
import platoEbi from '../assets/ebiGreen.jpg';
import nigiri from '../assets/nigirituna.jpg';
import sake from '../assets/sake.jpg';
import sashimi from '../assets/sashimi.jpg';
import carpaccio from '../assets/carpaccio.jpg';
import takoyaki from '../assets/takoyaki.jpg';
import magdalena from '../assets/magdalena.jpg';


const IMAGES      = [ platoEbi, nigiri, sushi3, sake, sashimi, carpaccio, takoyaki, magdalena];
const DISPLAY_TIME = 5000; // ms entre transiciones
const FADE_TIME    = 2500; // ms de crossfade

export default function Hero() {
  // Todas las imágenes siempre montadas, sólo cambia su opacidad
  const [active, setActive] = useState(0);
  const bgRef = useRef(null);

  // Avanza automáticamente
  useEffect(() => {
    const timer = setInterval(() => {
      setActive(a => (a + 1) % IMAGES.length);
    }, DISPLAY_TIME + FADE_TIME);
    return () => clearInterval(timer);
  }, []);

  // Parallax
  useEffect(() => {
    const onScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.3}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">

      {/* Todas las imágenes apiladas — sólo la activa tiene opacity 1 */}
      <div ref={bgRef} className="absolute inset-0 scale-110 will-change-transform">
        {IMAGES.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity:    i === active ? 1 : 0,
              transition: `opacity ${FADE_TIME}ms ease-in-out`,
              zIndex:     i === active ? 1 : 0,
            }}
          />
        ))}
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/58 z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 z-10" />

      {/* Contenido */}
      <div className="relative z-20 text-center px-6 flex flex-col items-center -translate-y-20 md:-translate-y-28">
        <img
          id="hero-logo"
          src={logo}
          alt="Fuji Museko"
          className="fade-in w-56 sm:w-72 md:w-80 object-contain mb-8"
          style={{ animationDelay: '0.2s' }}
        />
        <div className="fade-up w-8 h-px bg-terra mx-auto mb-6" style={{ animationDelay: '0.5s' }} />
        <p
          className="fade-up text-white/45 text-[10px] font-light tracking-[0.5em] uppercase mb-10"
          style={{ animationDelay: '0.65s' }}
        >
          Sushi · Vila-real
        </p>
        <div className="fade-up flex flex-col sm:flex-row gap-4 items-center" style={{ animationDelay: '0.8s' }}>
          <button
            onClick={() => go('menu')}
            className="bg-white text-black text-[10px] font-bold tracking-[0.3em] uppercase
              px-10 py-4 hover:bg-terra hover:text-white transition-all duration-300"
          >
            Ver Menú
          </button>
          <button
            onClick={() => go('reserva')}
            className="border border-white/30 hover:border-white text-white/70 hover:text-white
              text-[10px] font-medium tracking-[0.3em] uppercase px-10 py-4
              backdrop-blur-sm transition-all duration-300"
          >
            Reservar
          </button>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2.5 z-20">
        {IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Imagen ${i + 1}`}
            style={{
              width:      i === active ? '24px' : '6px',
              height:     '6px',
              borderRadius: '9999px',
              background: i === active ? '#C4522A' : 'rgba(255,255,255,0.3)',
              transition: 'all 0.6s ease',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-10 right-8 z-20">
        <div className="pulse-line w-px h-10 bg-gradient-to-b from-terra/60 to-transparent" />
      </div>
    </section>
  );
}
