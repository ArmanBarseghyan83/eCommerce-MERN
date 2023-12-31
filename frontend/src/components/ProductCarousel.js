import { Link } from 'react-router-dom';
import { Carousel, Image, Col, Row } from 'react-bootstrap';
import Message from './Message';
import Loader from './Loader';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error?.data?.message || error.error}</Message>
  ) : (
    <Row style={{background: '#506574'}}>
      <Col xl={4} lg={5} md={6}>
        <Carousel pause="hover">
          {products.map((product) => (
            <Carousel.Item key={product._id} >
              <Link to={`/product/${product._id}`}>
                <Image src={product.image} alt={product.name} fluid />
                <Carousel.Caption className="carousel-caption">
                  <h3 className="text-white text-right">
                    {product.name} (${product.price})
                  </h3>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      </Col>
    </Row>
  );
};

export default ProductCarousel;
