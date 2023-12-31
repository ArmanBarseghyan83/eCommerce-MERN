import { Container } from "react-bootstrap";
import { Outlet, useParams, Link, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { IoReturnUpBackOutline } from 'react-icons/io5';
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import ProductCarousel from './components/ProductCarousel';
import Footer from "./components/Footer";

function App(props) {
  const { keyword } = useParams();

  const homePath = useLocation().pathname === '/'

  console.log(homePath)
  return (
    <>
      <Header />
      {!keyword && homePath ? (
        <ProductCarousel />
      ) : (
        <Link className="h1 m-sm-5" to="/">
          {<IoReturnUpBackOutline />}
        </Link>
      )}
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
