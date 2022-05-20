import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Form, Row, Button, Modal } from 'react-bootstrap';
import swal from 'sweetalert';
import ReactLoading from 'react-loading';
import useAuth from '../../../hooks/useAuth';

const UpdateReview = (props) => {
    const [review, setReview] = useState({});
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();

    useEffect(() => {
        axios.get(`https://singlespace.herokuapp.com/api/reviews/${props.project_id}`)
            .then(res => setReview(res.data))
            .then(() => setLoading(false))
            .catch(err => console.log(err))
    }, [])

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newInfo = { ...review };
        newInfo[field] = value;
        setReview(newInfo);
    }

    const handleSubmitProduct = e => {
        e.preventDefault();
        const newReview = {
            ...review
        }
        // newProduct["status"] = true;
        console.log(newReview);
        const authToken = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        axios.put(`https://singlespace.herokuapp.com/api/reviews/${props.project_id}`, newReview, authToken)
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
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Update Review Information
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
                                <Form.Label>Client Name</Form.Label>
                                <Form.Control name="owner" defaultValue={review?.owner} onBlur={handleOnBlur} type="text" placeholder="Enter Client Name" />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} className="mb-3" controlId="formGridPrice">
                                <Form.Label>Client Occupation</Form.Label>
                                <Form.Control name="ownerDesignation" defaultValue={review?.ownerDesignation} onBlur={handleOnBlur} type="text" placeholder="Enter Client Occupation" />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} className="mb-3" controlId="formGridPrice">
                                <Form.Label>Comment Details</Form.Label>
                                <Form.Control name="comment" defaultValue={review?.comment} onBlur={handleOnBlur} type="text" placeholder="This is very good" />
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3" controlId="formGridImg">
                            <Form.Label>Client Picture URL</Form.Label>
                            <Form.Control name="ownerPhoto" defaultValue={review?.ownerPhoto} onBlur={handleOnBlur} placeholder="http://example.jpg" />
                        </Form.Group>

                        <Button id="tutor-submit" variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                }
            </Modal.Body>
        </Modal>

    );
};

export default UpdateReview;