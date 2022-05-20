import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Row, Button, Modal } from 'react-bootstrap';
import swal from 'sweetalert';
import ReactLoading from 'react-loading';
import useAuth from '../../../hooks/useAuth';

const UpdateUtilities = (props) => {
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();

    useEffect(() => {
        axios.get(`https://singlespace.herokuapp.com/api/utilities/${props.project_id}`)
            .then(res => setProduct(res.data))
            .then(() => setLoading(false))
            .catch(err => console.log(err))
    }, [])

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
        // newProduct["status"] = true;
        console.log(newProduct);
        const authToken = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        axios.put(`https://singlespace.herokuapp.com/api/utilities/${props.project_id}`, newProduct, authToken)
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
            .finally(props.onHide)
    }

    return (

        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Update Utilities
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading ?
                    <div className="d-flex align-items-center justify-content-center">
                        <ReactLoading type={"spinningBubbles"} color={"#A99577"} height={100} width={100} />
                    </div>
                    :
                    <Form onSubmit={handleSubmitProduct}>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridModel">
                                <Form.Label>Home Title Name</Form.Label>
                                <Form.Control name="hometitle" defaultValue={product?.hometitle} onBlur={handleOnBlur} type="text" placeholder="Enter Home Title Name" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridMadeBy">
                                <Form.Label>Home Page Moto</Form.Label>
                                <Form.Control name="homemoto" defaultValue={product?.homemoto} onBlur={handleOnBlur} type="text" placeholder="Home page Moto" />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} className="mb-3" controlId="formGridPrice">
                                <Form.Label>Mobile Number</Form.Label>
                                <Form.Control name="mobile" defaultValue={product?.mobile} onBlur={handleOnBlur} type="text" placeholder="Example- +88017863412566" />
                            </Form.Group>

                            <Form.Group as={Col} className="mb-3" controlId="formGridPrice">
                                <Form.Label>Email</Form.Label>
                                <Form.Control name="email" defaultValue={product?.email} onBlur={handleOnBlur} type="text" placeholder="Example- partha@gmail.com" />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} className="mb-3" controlId="formGridPrice">
                                <Form.Label>Banner Photo URL</Form.Label>
                                <Form.Control name="bannerphoto" defaultValue={product?.bannerphoto} onBlur={handleOnBlur} type="text" placeholder="http://example.jpg" />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} className="mb-3" controlId="formGridPrice">
                                <Form.Label>HireUS Title</Form.Label>
                                <Form.Control name="hireustitle" defaultValue={product?.hireustitle} onBlur={handleOnBlur} type="text" placeholder="Hire us title" />
                            </Form.Group>

                            <Form.Group as={Col} className="mb-3" controlId="formGridPrice">
                                <Form.Label>HireUS Details</Form.Label>
                                <Form.Control name="hireusdetails" defaultValue={product?.hireusdetails} onBlur={handleOnBlur} type="text" placeholder="Hire us details" />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} className="mb-3" controlId="formGridPrice">
                                <Form.Label>Address</Form.Label>
                                <Form.Control name="address" defaultValue={product?.address} onBlur={handleOnBlur} type="text" placeholder="Write Address" />
                            </Form.Group>

                            <Form.Group as={Col} className="mb-3" controlId="formGridPrice">
                                <Form.Label>About Title</Form.Label>
                                <Form.Control name="abouttitle" defaultValue={product?.abouttitle} onBlur={handleOnBlur} type="text" placeholder="Hire us details" />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} className="mb-3" controlId="formGridPrice">
                                <Form.Label>About Details</Form.Label>
                                <Form.Control name="aboutdetails" defaultValue={product?.aboutdetails} onBlur={handleOnBlur} type="text" placeholder="Write About Details" />
                            </Form.Group>

                            <Form.Group as={Col} className="mb-3" controlId="formGridPrice">
                                <Form.Label>About Photo URL</Form.Label>
                                <Form.Control name="aboutphoto" defaultValue={product?.aboutphoto} onBlur={handleOnBlur} type="text" placeholder="http://example.jpg" />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">

                            <Form.Group as={Col} className="mb-3" controlId="formGridPrice">
                                <Form.Label>Twitter URL</Form.Label>
                                <Form.Control name="twitterurl" defaultValue={product?.twitterurl} onBlur={handleOnBlur} type="text" placeholder="http://twitter.com" />
                            </Form.Group>

                            <Form.Group as={Col} className="mb-3" controlId="formGridPrice">
                                <Form.Label>Facebook URL</Form.Label>
                                <Form.Control name="facebookurl" defaultValue={product?.facebookurl} onBlur={handleOnBlur} type="text" placeholder="http://facebook.com" />
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3" controlId="formGridPrice">
                                <Form.Label>Linkdin URL</Form.Label>
                                <Form.Control name="linkdinurl" defaultValue={product?.linkdinurl} onBlur={handleOnBlur} type="text" placeholder="http://linkdin.com" />
                            </Form.Group>
                        </Row>

                        <Button id="tutor-submit" variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                }
            </Modal.Body>
        </Modal>

    );
};

export default UpdateUtilities;
