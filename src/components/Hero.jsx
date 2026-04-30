export default function Hero() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">

      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 55% at 50% 85%, rgba(200,169,110,0.07) 0%, transparent 70%),
            repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(255,255,255,0.015) 80px),
            repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(255,255,255,0.015) 80px)
          `,
        }}
      />

      {/* Content */}
      <p
        className="anim-fade-up text-fuji-gold text-xs tracking-[0.4em] uppercase mb-6"
        style={{ animationDelay: '0.1s' }}
      >
        Sushi · Villarreal · Vila-real
      </p>

      <h1
        className="anim-fade-up font-display font-light leading-none"
        style={{ fontSize: 'clamp(4.5rem, 14vw, 10rem)', animationDelay: '0.3s' }}
      >
        FUJI<br />
        <em className="italic text-fuji-gold">MUSEKO</em>
      </h1>

      <p
        className="anim-fade-up mt-5 text-white/35 text-xs tracking-[0.25em] uppercase"
        style={{ animationDelay: '0.5s' }}
      >
        Arte japonés · Ingredientes de mercado
      </p>

      <div
        className="anim-fade-up divider-gold mx-auto my-8"
        style={{ animationDelay: '0.6s' }}
      />

      <div
        className="anim-fade-up flex flex-col sm:flex-row gap-4 items-center"
        style={{ animationDelay: '0.75s' }}
      >
        <button
          onClick={() => scrollTo('menu')}
          className="bg-fuji-white text-fuji-black text-xs tracking-[0.2em] uppercase px-10 py-4
            hover:bg-fuji-offwhite transition-all duration-300 hover:-translate-y-0.5"
        >
          Ver el Menú
        </button>
        <button
          onClick={() => scrollTo('reserva')}
          className="text-white/50 hover:text-white border-b border-white/25 hover:border-white
            text-xs tracking-[0.2em] uppercase py-2 transition-all duration-300 bg-transparent"
        >
          Reservar mesa →
        </button>
      </div>

      {/* Scroll indicator */}
      <div
        className="anim-fade-up absolute bottom-10 flex flex-col items-center gap-2"
        style={{ animationDelay: '1.1s' }}
      >
        <span className="text-white/25 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="scroll-indicator w-px h-10 bg-gradient-to-b from-fuji-gold/60 to-transparent" />
      </div>
    </section>
  );
}
