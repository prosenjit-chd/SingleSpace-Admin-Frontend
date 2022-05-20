import axios from 'axios';
import React, { useState } from 'react';
import { Col, Container, Form, Row, Button } from 'react-bootstrap';
import swal from 'sweetalert';

const AddTeams = () => {
    const [member, setMember] = useState({});

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newInfo = { ...member };
        newInfo[field] = value;
        setMember(newInfo);
    }

    const handleSubmitProduct = e => {
        e.preventDefault();
        const newMember = {
            ...member
        }
        newMember["status"] = true;
        console.log(newMember);
        axios.post('https://singlespace.herokuapp.com/api/teams', newMember)
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
                <h3 className="text-center fw-bold mb-2">Add Teams</h3>
                <Form onSubmit={handleSubmitProduct}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridModel">
                            <Form.Label>Team member Name</Form.Label>
                            <Form.Control name="name" onBlur={handleOnBlur} type="text" placeholder="Enter Name" />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} className="mb-3" controlId="formGridPrice">
                            <Form.Label>Team member Designation</Form.Label>
                            <Form.Control name="designation" onBlur={handleOnBlur} type="text" placeholder="Example- Engineer" />
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" controlId="formGridImg">
                        <Form.Label>Team member Picture URL</Form.Label>
                        <Form.Control name="userphoto" onBlur={handleOnBlur} placeholder="http://example.jpg" />
                    </Form.Group>

                    <Row className="mb-3">
                        <h4 className='text-bold'>Optional Field (Not mandatory)</h4>
                        <Form.Group as={Col} className="mb-3" controlId="formGridPrice">
                            <Form.Label>Website URL</Form.Label>
                            <Form.Control name="weburl" onBlur={handleOnBlur} type="text" placeholder="http://abcd.com" />
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

export default AddTeams;