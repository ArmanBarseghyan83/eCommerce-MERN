import { Link } from 'react-router-dom';
import { Carousel, Image, Col, Row, Container } from 'react-bootstrap';
import Message from './Message';
import Loader from './Loader';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';
import homeImg from '../assets/home2.png';

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error?.data?.message || error.error}</Message>
  ) : (
    <Container className='position-relative' fluid>
      <Row
        style={{
          background: 'linear-gradient(to right, #8ca6b3, #2e4453)',
        }}
        className="py-2"
      >
        <Col lg={4} xs={6}>
          <Carousel pause="hover">
            {products.map((product) => (
              <Carousel.Item key={product._id}>
                <Link to={`/product/${product._id}`}>
                  <Image src={product.image} alt={product.name} fluid />
                  <Carousel.Caption className="carousel-caption pt-0">
                    <h4>
                      <span className="d-none d-md-block">{product.name}</span>{' '}
                      ${product.price}
                    </h4>
                  </Carousel.Caption>
                </Link>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>

        <Col className="carousel-right h1 " style={{ color: '#ebeff1' }}>
            <div>Sale 20% OFF</div>
            <div>New Arrivals</div>
          <Image
            src={homeImg}
            className=" position-absolute w-50 "
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ProductCarousel;
