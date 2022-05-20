import axios from 'axios';
import React, { useState } from 'react';
import { Col, Container, Form, Row, Button } from 'react-bootstrap';
import swal from 'sweetalert';

const AddReview = () => {
    const [product, setProduct] = useState({});

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
        newProduct["status"] = true;
        console.log(newProduct);
        axios.post('https://singlespace.herokuapp.com/api/reviews', newProduct)
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
                <h3 className="text-center fw-bold mb-2">Add Review</h3>
                <Form onSubmit={handleSubmitProduct}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridModel">
                            <Form.Label>Client Name</Form.Label>
                            <Form.Control name="owner" onBlur={handleOnBlur} type="text" placeholder="Enter Client Name" />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} className="mb-3" controlId="formGridPrice">
                            <Form.Label>Client Occupation</Form.Label>
                            <Form.Control name="ownerDesignation" onBlur={handleOnBlur} type="text" placeholder="Enter Client Occupation" />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} className="mb-3" controlId="formGridPrice">
                            <Form.Label>Comment Details</Form.Label>
                            <Form.Control name="comment" onBlur={handleOnBlur} type="text" placeholder="This is very good" />
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" controlId="formGridImg">
                        <Form.Label>Client Picture URL</Form.Label>
                        <Form.Control name="ownerPhoto" onBlur={handleOnBlur} placeholder="http://example.jpg" />
                    </Form.Group>

                    <Button id="tutor-submit" variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </Container>
    );
};

export default AddReview;