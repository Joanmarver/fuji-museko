// Set de iconos monocromo (stroke = currentColor) para alérgenos.
// Trazos simples, no ilustrativos, pensados para combinar con la web.
const PATHS = {
  gluten: 'M12 3v18 M12 5c-2 1.5-3 3-3 5s1 3.5 3 5c2-1.5 3-3 3-5s-1-3.5-3-5z M9 14c-1.5 1-2.5 2.5-2.5 4 M15 14c1.5 1 2.5 2.5 2.5 4',
  crustaceos: 'M6 12c0-4 2.5-7 6-7s6 3 6 7-2.5 7-6 7-6-3-6-7z M6 12H3 M18 12h3 M8 8 5 5 M16 8l3-3 M10 18l-2 3 M14 18l2 3',
  huevo: 'M12 21c4 0 6-3 6-7 0-5-3-10-6-10S6 9 6 14c0 4 2 7 6 7z',
  pescado: 'M3 12c3-4 8-6 13-4 M16 8c2 1 3.5 2.5 5 4-1.5 1.5-3 3-5 4 M16 8c-3 2-3 6 0 8 M9 11.5h.01',
  soja: 'M12 20c0-6 0-11 3-15 M12 20c0-6 0-11-3-15 M8 8c1.5 1 3 1 4 0 M8 13c1.5 1 3 1 4 0 M13 8c1.5 1 3 1 4 0 M13 13c1.5 1 3 1 4 0',
  lacteos: 'M10 3h4 M10 3v3l-2 3v11a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9l-2-3V3 M8 13h8',
  frutosSecos: 'M12 4c-3 0-5 2.5-5 6 0 5 2.5 10 5 10s5-5 5-10c0-3.5-2-6-5-6z M9 11c1.5 1 4.5 1 6 0',
  sesamo: 'M8 9c0-2 1.8-3.5 4-3.5S16 7 16 9s-1.8 5-4 9c-2.2-4-4-7-4-9z M9 9h6',
  moluscos: 'M12 3c5 2 8 6 8 11a8 8 0 0 1-16 0c0-5 3-9 8-11z M8 13c1.3.8 2.7.8 4 0 M8 13c1.3.8 2.7.8 4 0 M12 13c1.3.8 2.7.8 4 0',
  sulfitos: 'M9 3h6 M10 3v5L6 20a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1L14 8V3 M7.5 15h9',
};

export default function AllergenIcon({ name, className = 'w-3.5 h-3.5' }) {
  const d = PATHS[name];
  if (!d) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {d.split(' M').map((seg, i) => (
        <path key={i} d={i === 0 ? seg : `M${seg}`} />
      ))}
    </svg>
  );
}
