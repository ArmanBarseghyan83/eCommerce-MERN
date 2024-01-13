import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Row, Col, Image } from 'react-bootstrap';
import { IoReturnUpBackOutline } from 'react-icons/io5';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from '../../slices/productsApiSlice';

const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState(null);
  const [deleteImages, setDeleteImages] = useState([]);

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  const navigate = useNavigate();

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setDeleteImages((prev) => [...prev, value]);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    let uploadResult = '';

    try {
      if (files) {
        const formData = new FormData();

        for (let i = 0; i < files.length; i++) {
          formData.append('image', files[i]);
        }

        uploadResult = await uploadProductImage(formData).unwrap();
      }
      await updateProduct({
        productId,
        name,
        price,
        images: uploadResult?.images || '',
        deleteImages,
        brand,
        category,
        description,
        countInStock,
      });

      toast.success('Product updated');
      refetch();
      navigate('/admin/productlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  return (
    <>
      <Link className="h1" to="/admin/productlist">
        {<IoReturnUpBackOutline />}
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error.data.message}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                className="mb-2"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                className="mb-2"
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                className="mb-2"
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                className="mb-2"
                type="number"
                placeholder="Enter countInStock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                className="mb-2"
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                className="mb-2"
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Add Image</Form.Label>
              <Form.Control
                className="mb-2"
                label="Choose File"
                onChange={(e) => setFiles(e.target.files)}
                type="file"
                multiple
              ></Form.Control>
              {loadingUpload && <Loader />}
            </Form.Group>
            {(product.images.length > 1) && (
              <>
                <div className="mb-2">Select images to delete</div>
                <Row>
                  {product.images.map((image, i) => (
                    <Col key={image._id} xs={3}>
                      <div>
                        <input
                          id={i}
                          type="checkbox"
                          value={image.filename}
                          onChange={handleCheckboxChange}
                          className="position-absolute"
                        />
                        <label htmlFor={i}>
                          <Image src={image.url} className="img-thumbnail" />
                        </label>
                      </div>
                    </Col>
                  ))}
                </Row>
              </>
            )}

            <Button
              type="submit"
              variant="primary"
              style={{ marginTop: '1rem' }}
            >
              Update
            </Button>
            <Link
              to="/admin/productlist"
              className="btn bg-white mt-3 mx-3 border hover"
            >
              Cancel
            </Link>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
