import logo from '../assets/logo.jpg';

// TODO: sustituir por el usuario de Instagram real del restaurante
const INSTAGRAM_URL = 'https://instagram.com/fujimuseko';

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 px-6 py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <img src={logo} alt="Fuji Museko" className="h-6 object-contain opacity-30" />
        <p className="text-white/15 text-[10px] tracking-widest font-light uppercase">
          © {new Date().getFullYear()} Fuji Museko · Villarreal, Castellón
        </p>
        <div className="flex items-center gap-6">
          {['Menú', 'Reservas'].map(item => (
            <button key={item}
              onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
              className={`text-white/20 text-[10px] tracking-[0.2em] uppercase transition-colors duration-300
                ${item === 'Reservas' ? 'hover:text-terra' : 'hover:text-white/50'}`}>
              {item}
            </button>
          ))}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-white/20 hover:text-terra transition-colors duration-300"
          >
            <InstagramIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}

