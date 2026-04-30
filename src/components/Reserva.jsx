// Cambia este número cuando el cliente lo facilite
const WA_NUMBER = '34600000000';
const WA_MESSAGE = encodeURIComponent('Hola, me gustaría reservar una mesa en Fuji Museko.');
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function Reserva() {
  return (
    <section id="reserva" className="py-24 md:py-32 px-6">
      <div className="max-w-xl mx-auto text-center">

        <p className="text-fuji-gold text-[10px] tracking-[0.35em] uppercase mb-4">Reservas</p>

        <h2 className="font-display text-5xl md:text-6xl font-light mb-6">
          Reserva tu <em className="italic text-fuji-gold">mesa</em>
        </h2>

        <p className="text-white/40 text-sm leading-relaxed mb-10">
          Haz tu reserva de forma rápida y sencilla a través de WhatsApp.
          Nuestro equipo confirmará disponibilidad en minutos.
        </p>

        {/* WhatsApp CTA */}
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 text-fuji-gold border border-fuji-gold/40
            text-xs tracking-[0.2em] uppercase px-8 py-4
            hover:bg-fuji-gold/10 hover:border-fuji-gold hover:-translate-y-0.5
            transition-all duration-300"
        >
          <WhatsAppIcon />
          Reservar por WhatsApp
        </a>

        {/* Info grid */}
        <div className="mt-14 grid grid-cols-3 gap-6 border-t border-white/8 pt-10">
          {[
            { label: 'Dirección',  value: 'Villarreal, Castellón' },
            { label: 'Horario',    value: 'Mar–Dom · 13–23 h'     },
            { label: 'Reservas',   value: 'WhatsApp'              },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-white/25 text-[10px] tracking-[0.25em] uppercase mb-1.5">{label}</p>
              <p className="font-display text-base font-light text-fuji-white">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
