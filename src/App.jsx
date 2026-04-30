import Navbar  from './components/Navbar';
import Hero    from './components/Hero';
import Menu    from './components/Menu';
import Reserva from './components/Reserva';
import Footer  from './components/Footer';
import './index.css';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Menu />
        <Reserva />
      </main>
      <Footer />
    </>
  );
}
