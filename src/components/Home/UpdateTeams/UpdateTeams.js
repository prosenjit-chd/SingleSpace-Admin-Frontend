import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Form, Row, Button, Modal } from 'react-bootstrap';
import swal from 'sweetalert';
import ReactLoading from 'react-loading';
import useAuth from '../../../hooks/useAuth';

const UpdateTeams = (props) => {
    const [team, setTeam] = useState({});
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();

    useEffect(() => {
        axios.get(`https://singlespace.herokuapp.com/api/teams/${props.project_id}`)
            .then(res => setTeam(res.data))
            .then(() => setLoading(false))
            .catch(err => console.log(err))
    }, [])

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newInfo = { ...team };
        newInfo[field] = value;
        setTeam(newInfo);
    }

    const handleSubmitProduct = e => {
        e.preventDefault();
        const newTeam = {
            ...team
        }
        // newProduct["status"] = true;
        console.log(newTeam);
        const authToken = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        axios.put(`https://singlespace.herokuapp.com/api/teams/${props.project_id}`, newTeam, authToken)
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
                    Update Team Member Information
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
                                <Form.Label>Team member Name</Form.Label>
                                <Form.Control name="name" defaultValue={team?.name} onBlur={handleOnBlur} type="text" placeholder="Enter Name" />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} className="mb-3" controlId="formGridPrice">
                                <Form.Label>Team member Designation</Form.Label>
                                <Form.Control name="designation" defaultValue={team?.designation} onBlur={handleOnBlur} type="text" placeholder="Example- Engineer" />
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3" controlId="formGridImg">
                            <Form.Label>Team member Picture URL</Form.Label>
                            <Form.Control name="userphoto" defaultValue={team?.userphoto} onBlur={handleOnBlur} placeholder="http://example.jpg" />
                        </Form.Group>

                        <Row className="mb-3">
                            <h4 className='text-bold'>Optional Field (Not mandatory)</h4>
                            <Form.Group as={Col} className="mb-3" controlId="formGridPrice">
                                <Form.Label>Website URL</Form.Label>
                                <Form.Control name="weburl" defaultValue={team?.weburl} onBlur={handleOnBlur} type="text" placeholder="http://abcd.com" />
                            </Form.Group>

                            <Form.Group as={Col} className="mb-3" controlId="formGridPrice">
                                <Form.Label>Facebook URL</Form.Label>
                                <Form.Control name="facebookurl" defaultValue={team?.facebookurl} onBlur={handleOnBlur} type="text" placeholder="http://facebook.com" />
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3" controlId="formGridPrice">
                                <Form.Label>Linkdin URL</Form.Label>
                                <Form.Control name="linkdinurl" defaultValue={team?.linkdinurl} onBlur={handleOnBlur} type="text" placeholder="http://linkdin.com" />
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

export default UpdateTeams;