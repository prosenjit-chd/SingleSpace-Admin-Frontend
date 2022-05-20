import axios from 'axios';
import React, { useState } from 'react';
import { Col, Container, Form, Row, Button } from 'react-bootstrap';
import useAuth from '../../../hooks/useAuth';
import swal from 'sweetalert';

const AddUtilities = () => {
    const [product, setProduct] = useState({});
    const { token } = useAuth();

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newInfo = { ...product };
        newInfo[field] = value;
        setProduct(newInfo);
    }

    const handleSubmitProduct = e => {
        e.preventDefault();
        const newProduct = {
            ...product
        }
        const authToken = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        newProduct["status"] = true;

        axios.post('https://singlespace.herokuapp.com/api/utilities', newProduct, authToken)
            .then(res => {
                if (res) {
                    swal({
                        title: "Sucessful!",
                        text: "Successfully added!",
                        icon: "success",
                        button: "OK",
                    });
                    e.target.reset();
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <Container>
            <div className="mx-auto shadow-lg p-5" style={{ maxWidth: '700px' }}>
                <h3 className="text-center fw-bold mb-2">Add Utilities</h3>
                <Form onSubmit={handleSubmitProduct}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridModel">
                            <Form.Label>Home Title Name</Form.Label>
                            <Form.Control name="hometitle" onBlur={handleOnBlur} type="text" placeholder="Enter Home Title Name" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridMadeBy">
                            <Form.Label>Home Page Moto</Form.Label>
                            <Form.Control name="homemoto" onBlur={handleOnBlur} type="text" placeholder="Home page Moto" />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} className="mb-3" controlId="formGridPrice">
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control name="mobile" onBlur={handleOnBlur} type="text" placeholder="Example- +88017863412566" />
                        </Form.Group>

                        <Form.Group as={Col} className="mb-3" controlId="formGridPrice">
                            <Form.Label>Email</Form.Label>
                            <Form.Control name="email" onBlur={handleOnBlur} type="text" placeholder="Example- partha@gmail.com" />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} className="mb-3" controlId="formGridPrice">
                            <Form.Label>Banner Photo URL</Form.Label>
                            <Form.Control name="bannerphoto" onBlur={handleOnBlur} type="text" placeholder="http://example.jpg" />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} className="mb-3" controlId="formGridPrice">
                            <Form.Label>HireUS Title</Form.Label>
                            <Form.Control name="hireustitle" onBlur={handleOnBlur} type="text" placeholder="Hire us title" />
                        </Form.Group>

                        <Form.Group as={Col} className="mb-3" controlId="formGridPrice">
                            <Form.Label>HireUS Details</Form.Label>
                            <Form.Control name="hireusdetails" onBlur={handleOnBlur} type="text" placeholder="Hire us details" />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} className="mb-3" controlId="formGridPrice">
                            <Form.Label>Address</Form.Label>
                            <Form.Control name="address" onBlur={handleOnBlur} type="text" placeholder="Write Address" />
                        </Form.Group>

                        <Form.Group as={Col} className="mb-3" controlId="formGridPrice">
                            <Form.Label>About Title</Form.Label>
                            <Form.Control name="abouttitle" onBlur={handleOnBlur} type="text" placeholder="Hire us details" />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} className="mb-3" controlId="formGridPrice">
                            <Form.Label>About Details</Form.Label>
                            <Form.Control name="aboutdetails" onBlur={handleOnBlur} type="text" placeholder="Write About Details" />
                        </Form.Group>

                        <Form.Group as={Col} className="mb-3" controlId="formGridPrice">
                            <Form.Label>About Photo URL</Form.Label>
                            <Form.Control name="aboutphoto" onBlur={handleOnBlur} type="text" placeholder="http://example.jpg" />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">

                        <Form.Group as={Col} className="mb-3" controlId="formGridPrice">
                            <Form.Label>Twitter URL</Form.Label>
                            <Form.Control name="twitterurl" onBlur={handleOnBlur} type="text" placeholder="http://twitter.com" />
                        </Form.Group>

                        <Form.Group as={Col} className="mb-3" controlId="formGridPrice">
                            <Form.Label>Facebook URL</Form.Label>
                            <Form.Control name="facebookurl" onBlur={handleOnBlur} type="text" placeholder="http://facebook.com" />
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3" controlId="formGridPrice">
                            <Form.Label>Linkdin URL</Form.Label>
                            <Form.Control name="linkdinurl" onBlur={handleOnBlur} type="text" placeholder="http://linkdin.com" />
                        </Form.Group>
                    </Row>

                    <Button id="tutor-submit" variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </Container>
    );
};

export default AddUtilities;