// Set de iconos de alérgenos en silueta sólida, al estilo de los pictogramas
// oficiales de las cartas de restaurante. Cada icono es multicolor: las
// distintas partes del propio dibujo (la yema del huevo frente a la clara,
// los granos de la vaina de soja, la mecha del cacahuete, etc.) llevan su
// color natural para que la forma se lea de un vistazo, no un color plano.
const ICONS = {
  gluten: [
    { color: '#6B8E3D', d: 'M11.4 21V9H12.6V21Z' },
    { color: '#D1A02E', d: 'M12 17L6.5 16.5L12 19.5Z M12 17L17.5 16.5L12 19.5Z M12 13.5L7 13L12 16Z M12 13.5L17 13L12 16Z M12 10L7.7 9.7L12 12.5Z M12 10L16.3 9.7L12 12.5Z M12 7L8.8 6.7L12 9Z M12 7L15.2 6.7L12 9Z M11.4 8L12 5L12.6 8Z' },
  ],
  crustaceos: [
    { color: '#E2574B', d: 'M6.5 6.5c-3.2 2.8-3.6 9-.8 12.7c2.3 3 6.3 4 9.6 2.6c2.9-1.2 4.4-4.3 3.3-6.9c-.6-1.5-2-2.4-3.5-2.4c1.1-.7 1.6-2.1 1.1-3.5c-1-2.7-4.4-4-7.2-3.1c-.9.3-1.7.8-2.5 1.6z' },
    { color: '#A83A30', d: 'M4.8 5.5L7.2 4.6L6.5 7.5Z M5.6 5.2L3.3 3L4.6 6.3Z M6.8 4.3L5.6 1.7L7.6 4.5Z M9 15.5L6.2 17L7.4 14.8Z M11.3 17.3L8.7 19L9.7 16.6Z M14 18.4L11.6 20.3L12.3 17.7Z' },
  ],
  huevo: [
    { color: '#F2EAD8', d: 'M4 13c-.5-3 1.8-5 4-4.6c.8-2.6 3.6-3.6 5.6-2c1.7-1 4-.4 4.4 1.6c2.3.2 3.4 2.7 2.3 4.6c1 2-.3 4.4-2.6 4.4H7c-2 0-3.5-1.6-3-4z' },
    { color: '#F2C230', d: 'M15 13a3 3 0 1 1-6 0a3 3 0 1 1 6 0' },
  ],
  pescado: [
    { color: '#3E8FD0', d: 'M2 12c2.6-3.2 7-5 10-5s6.6 1.8 8 5c-1.4 3.2-5 5-8 5s-7.4-1.8-10-5z' },
    { color: '#2E6FA8', d: 'M19 9L22 6L22 18L19 15Z' },
    { color: '#F5F5F5', d: 'M10.1 11.2a.9 .9 0 1 0 0 1.6a.9 .9 0 0 0 0-1.6z' },
  ],
  soja: [
    { color: '#5CAE5C', d: 'M12 3c-4.5 2-6.5 6-6.5 10c0 4 3 8 6.5 8s6.5-4 6.5-8c0-4-2-8-6.5-10z' },
    { color: '#D9E4A8', d: 'M9.3 10a1.3 1.3 0 1 0 0 2.6a1.3 1.3 0 0 0 0-2.6z M12 13.4a1.3 1.3 0 1 0 0 2.6a1.3 1.3 0 0 0 0-2.6z M14.7 10a1.3 1.3 0 1 0 0 2.6a1.3 1.3 0 0 0 0-2.6z' },
  ],
  lacteos: [
    { color: '#EDE6D6', d: 'M7 9L12 4L17 9V21H7Z' },
    { color: '#3E8FD0', d: 'M8.5 14H15.5V15.5H8.5Z' },
  ],
  frutosSecos: [
    { color: '#97653C', d: 'M12 3.2c-4 0-6.8 3.3-6.8 8.3c0 5.6 3 9.5 6.8 9.5s6.8-3.9 6.8-9.5c0-5-2.8-8.3-6.8-8.3z' },
    { color: '#C9A46B', d: 'M11.7 4.8H12.3V21.6H11.7Z M8.6 9.3H15.4V9.9H8.6Z M8.6 15.3H15.4V15.9H8.6Z' },
  ],
  sesamo: [
    { color: '#C2A465', d: 'M5.9 16a1.3 2.2 0 1 0 2.6 0a1.3 2.2 0 1 0 -2.6 0 M10.9 11a1.3 2.2 0 1 0 2.6 0a1.3 2.2 0 1 0 -2.6 0 M15.9 7a1.3 2.2 0 1 0 2.6 0a1.3 2.2 0 1 0 -2.6 0' },
  ],
  moluscos: [
    { color: '#708CA3', d: 'M12 3c3 1 5.5 4 5.5 9c0 5.5-2.5 9-5.5 9s-5.5-3.5-5.5-9c0-5 2.5-8 5.5-9z' },
    { color: '#A8C0D2', d: 'M12 8c1.6 0 3 2 3 5c0 2.6-1.3 4.5-3 4.5s-3-1.9-3-4.5c0-3 1.4-5 3-5z' },
  ],
  sulfitos: [
    { color: '#7A2048', d: 'M8 3c0 4.4 1.7 7.3 4 8.1c2.3-.8 4-3.7 4-8.1z' },
    { color: '#B8B8C0', d: 'M11.7 11H12.3V18H11.7Z M8.5 20.3H15.5V21.3H8.5Z' },
  ],
  apio: [
    { color: '#A8C97F', d: 'M10.7 21L11 9H13L13.3 21Z' },
    { color: '#5C8A3A', d: 'M11.5 9L6 5.5L9 10.3Z M12.5 9L18 5.5L15 10.3Z M11.7 9L12 4.3L12.3 9Z' },
  ],
  mostaza: [
    { color: '#D6D0AE', d: 'M8.5 8H15.5V19.5H8.5Z' },
    { color: '#8A6A3A', d: 'M9.5 6H14.5V8H9.5Z M10.5 3.5H13.5V6H10.5Z' },
    { color: '#D9A62E', d: 'M10.4 11.3a.9 .9 0 1 0 0 1.8a.9 .9 0 0 0 0-1.8z M13.6 11.8a.9 .9 0 1 0 0 1.8a.9 .9 0 0 0 0-1.8z M12 15a.9 .9 0 1 0 0 1.8a.9 .9 0 0 0 0-1.8z' },
  ],
  cacahuetes: [
    { color: '#B87A45', d: 'M9.3 3.3c-2.6.6-4.3 3.2-4.3 6.2c0 1.7.6 3 1.5 4c-.9 1-1.5 2.3-1.5 4c0 3 1.7 5.6 4.3 6.2c1.1.2 2.1-.2 2.7-1c.6.8 1.6 1.2 2.7 1c2.6-.6 4.3-3.2 4.3-6.2c0-1.7-.6-3-1.5-4c.9-1 1.5-2.3 1.5-4c0-3-1.7-5.6-4.3-6.2c-1.1-.2-2.1.2-2.7 1c-.6-.8-1.6-1.2-2.7-1z' },
    { color: '#8A5A30', d: 'M8.3 12.2H10.1V12.9H8.3Z M13.9 12.2H15.7V12.9H13.9Z' },
  ],
  picante: [
    { color: 'currentColor', d: 'M6 10c0-3 2-5 5-5-1 1.5-1 2.5 0 3 1.5 1 2 2.5 1 4 4 0 6 2 6 5 0 4-3 6-6 6-4 0-7-2.5-7-6 0-2.5 0.5-5 1-7z' },
  ],
};

export default function AllergenIcon({ name, className = 'w-3.5 h-3.5' }) {
  const layers = ICONS[name];
  if (!layers) return null;
  return (
    <svg viewBox="0 0 24 24" className={className} fillRule="evenodd" stroke="none">
      {layers.map((layer, li) =>
        layer.d.split(' M').map((seg, i) => (
          <path key={`${li}-${i}`} d={i === 0 ? seg : `M${seg}`} fill={layer.color} />
        ))
      )}
    </svg>
  );
}
