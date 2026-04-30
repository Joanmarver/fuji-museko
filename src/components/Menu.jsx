import { useState } from 'react';
import { menuCategories, menuItems } from '../data/menu';

function MenuItem({ name, desc, price, badge }) {
  return (
    <div className="flex justify-between items-start gap-4 p-5 border border-white/5
      hover:bg-white/[0.03] hover:border-white/10 transition-all duration-300 group">
      <div className="flex-1 min-w-0">
        <p className="font-display text-xl font-light text-fuji-white mb-1 group-hover:text-fuji-gold transition-colors duration-300">
          {name}
        </p>
        <p className="text-white/35 text-xs leading-relaxed">{desc}</p>
        {badge && (
          <span className="inline-block mt-2 text-fuji-gold border border-fuji-gold/30
            text-[10px] tracking-[0.12em] uppercase px-2 py-0.5">
            {badge}
          </span>
        )}
      </div>
      <p className="font-display text-lg font-light text-fuji-gold flex-shrink-0 pt-0.5">
        {price}
      </p>
    </div>
  );
}

export default function Menu() {
  const [active, setActive] = useState('nigiris');

  return (
    <section id="menu" className="py-24 md:py-32 px-6 bg-white/[0.02] border-y border-white/5">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-fuji-gold text-[10px] tracking-[0.35em] uppercase mb-4">Carta</p>
          <h2 className="font-display text-5xl md:text-6xl font-light">
            <em className="italic text-fuji-gold">Menú</em> Fuji Museko
          </h2>
          <p className="mt-4 text-white/35 text-sm leading-relaxed max-w-md mx-auto">
            Ingredientes frescos, técnica japonesa y un toque propio.
            La carta evoluciona con la temporada y el mercado.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center border-b border-white/10 mb-10 overflow-x-auto">
          {menuCategories.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`px-6 md:px-8 py-3 text-[11px] tracking-[0.2em] uppercase whitespace-nowrap
                transition-all duration-300 border-b-2 -mb-px
                ${active === key
                  ? 'text-fuji-white border-fuji-gold'
                  : 'text-white/35 border-transparent hover:text-white/60'
                }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Items grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
          {menuItems[active].map((item, i) => (
            <div key={i} className="bg-fuji-black">
              <MenuItem {...item} />
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-white/20 text-[10px] tracking-widest uppercase">
          Precios con IVA incluido · Disponibilidad sujeta al mercado
        </p>
      </div>
    </section>
  );
}
