import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Row, Button, Modal } from 'react-bootstrap';
import swal from 'sweetalert';
import ReactLoading from 'react-loading';
import useAuth from '../../../hooks/useAuth';

const UpdateProject = (props) => {
    const [project, setProject] = useState({});
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();

    useEffect(() => {
        axios.get(`https://singlespace.herokuapp.com/api/projects/${props.project_id}`)
            .then(res => setProject(res.data))
            .then(() => setLoading(false))
            .catch(err => console.log(err))
    }, [])

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newInfo = { ...project };
        newInfo[field] = value;
        setProject(newInfo);
    }

    const handleSubmitProduct = e => {
        e.preventDefault();
        const newProject = {
            ...project
        }
        // newProduct["status"] = true;
        console.log(newProject);
        const authToken = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        axios.put(`https://singlespace.herokuapp.com/api/projects/${props.project_id}`, newProject, authToken)
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
                    Update Project
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
                                <Form.Label>Project Name</Form.Label>
                                <Form.Control name="title" onBlur={handleOnBlur} type="text" defaultValue={project?.title} placeholder="Enter Project Name" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridMadeBy">
                                <Form.Label>Client Name</Form.Label>
                                <Form.Control name="client" defaultValue={project?.client} onBlur={handleOnBlur} type="text" placeholder="Client Name" />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} className="mb-3" controlId="formGridPrice">
                                <Form.Label>Technology</Form.Label>
                                <Form.Control name="address" defaultValue={project?.technology} onBlur={handleOnBlur} type="text" placeholder="Example- Dhaka" />
                            </Form.Group>

                            <Form.Group as={Col} className="mb-3" controlId="formGridPrice">
                                <Form.Label>LiveSite</Form.Label>
                                <Form.Control name="flatSize" defaultValue={project?.livesite} onBlur={handleOnBlur} type="text" placeholder="www.ddd.com" />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} className="mb-3" controlId="formGridPrice">
                                <Form.Label>Details</Form.Label>
                                <Form.Control name="description" defaultValue={project?.description} onBlur={handleOnBlur} type="text" placeholder="Write details" />
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3" controlId="formGridImg">
                            <Form.Label>Cover Photo URL</Form.Label>
                            <Form.Control name="coverphoto" defaultValue={project?.coverphoto} onBlur={handleOnBlur} placeholder="http://example.jpg" />
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Group as={Col} className="mb-3" controlId="formGridPrice">
                                <h4 className='text-bold'>Details Image (Add one by one with Coma)</h4>
                                <Form.Control name="imgsrc" defaultValue={project?.imgsrc} onBlur={handleOnBlur} placeholder="http://ab.jpg,     http://kj.jpg,     http://wr.jpg," />
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

export default UpdateProject;