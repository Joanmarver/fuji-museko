import { useEffect, useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import sushi3 from '../assets/sushi3.jpg';


const WA_NUMBER  = '34641298725';
const WA_MESSAGE = encodeURIComponent('Hola, me gustaría reservar una mesa en Fuji Museko.');
const WA_URL     = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

const ADDRESS       = 'Av. Arcadi Garcia Sanz, 6, Vila-real, Castelló';
const ADDRESS_SHORT = 'Av. Arcadi Garcia Sanz, 6';
const GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;

const PHONE      = '641 29 87 25';
const PHONE_HREF = `tel:+34${PHONE.replace(/\s+/g, '')}`;

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

export default function Reserva() {
  const bgRef      = useRef(null);
  const titleRef   = useScrollReveal({ threshold: 0.2 });
  const dividerRef = useScrollReveal({ threshold: 0.2 });
  const textRef    = useScrollReveal({ threshold: 0.2 });
  const btnRef     = useScrollReveal({ threshold: 0.2 });
  const infoRef    = useScrollReveal({ threshold: 0.2 });

  // Parallax (throttled con rAF para evitar jank/reflow en scroll de móvil)
  useEffect(() => {
    let ticking = false;
    const apply = () => {
      ticking = false;
      if (bgRef.current) {
        const rect  = bgRef.current.getBoundingClientRect();
        const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * 0.25;
        bgRef.current.querySelector('img').style.transform = `translateY(${offset}px)`;
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(apply);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="reserva" ref={bgRef} className="relative h-dvh flex items-center justify-center overflow-hidden">

      <img src={sushi3} alt="" className="absolute inset-0 w-full h-full object-cover scale-110 will-change-transform" />
      <div className="absolute inset-0 bg-black/68" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/60" />

      <div className="relative z-10 text-center px-6 max-w-lg mx-auto">

        <p ref={titleRef} className="reveal text-terra text-[10px] font-semibold tracking-[0.45em] uppercase mb-5">
          Reservas
        </p>

        <h2 ref={dividerRef} className="reveal text-white text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4"
          style={{ transitionDelay: '0.1s' }}>
          Reserva<br />tu mesa
        </h2>

        <div ref={textRef} className="reveal w-8 h-px bg-terra mx-auto mb-8" style={{ transitionDelay: '0.2s' }} />

        <p className="reveal text-white/40 text-xs font-light leading-loose tracking-wide mb-10"
          style={{ transitionDelay: '0.3s' }}>
          Reserva de forma rápida a través de WhatsApp.<br />
          Confirmamos disponibilidad en minutos.
        </p>

        <div ref={btnRef} className="reveal" style={{ transitionDelay: '0.4s' }}>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-terra hover:bg-terra-dark
              text-white text-[10px] font-bold tracking-[0.3em] uppercase
              px-10 py-4 transition-all duration-300 hover:-translate-y-px hover:shadow-lg hover:shadow-terra/30"
          >
            <WhatsAppIcon />
            Reservar por WhatsApp
          </a>
        </div>

        <div ref={infoRef} className="reveal mt-14 grid grid-cols-2 sm:grid-cols-4 gap-x-2 gap-y-6 sm:gap-4 border-t border-white/10 pt-10"
          style={{ transitionDelay: '0.5s' }}>
          {[
            {
              label: 'Dirección',
              value: ADDRESS_SHORT,
              href: GOOGLE_MAPS_URL,
            },
            { label: 'Horario',  value: '13:00–16:30 | 20:00–23:00' },
            { label: 'Teléfono', value: PHONE, href: PHONE_HREF },
            { label: 'Reservas', value: 'WhatsApp' },
          ].map(({ label, value, href }) => (
            <div key={label}>
              <p className="text-white/25 text-[9px] tracking-[0.25em] uppercase mb-2 font-medium">{label}</p>
              {href ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-xs font-light hover:text-terra transition-colors duration-300"
                >
                  {value}
                </a>
              ) : (
                <p className="text-white text-xs font-light">{value}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
