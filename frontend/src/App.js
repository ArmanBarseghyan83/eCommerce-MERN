import { Container } from 'react-bootstrap';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import ProductCarousel from './components/ProductCarousel';
import Footer from './components/Footer';

function App(props) {
  const homePath = useLocation().pathname === '/';

  return (
    <>
      <Header />
      {homePath && <ProductCarousel />}
      <main className="py-3">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
