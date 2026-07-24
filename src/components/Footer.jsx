import logo from '../assets/logo.jpg';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 px-6 py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <img src={logo} alt="Fuji Museko" className="h-6 object-contain opacity-30" />
        <p className="text-white/15 text-[10px] tracking-widest font-light uppercase">
          © {new Date().getFullYear()} Fuji Museko · Villarreal, Castellón
        </p>
        <div className="flex gap-6">
          {['Menú', 'Reservas'].map(item => (
            <button key={item}
              onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
              className="text-white/20 hover:text-white/50 text-[10px] tracking-[0.2em] uppercase transition-colors duration-300">
              {item}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}

