export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/6 px-6 py-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
        <p className="font-display text-base font-light tracking-widest text-white/25">
          FUJI <span className="italic">MUSEKO</span>
        </p>
        <p className="text-white/18 text-[11px] tracking-wide">
          © {year} Fuji Museko · Villarreal, Castellón
        </p>
      </div>
    </footer>
  );
}
