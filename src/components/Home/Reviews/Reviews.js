import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { ArchiveFill } from 'react-bootstrap-icons';
import ReactLoading from 'react-loading'
import swal from 'sweetalert';
import { BsPencilSquare } from 'react-icons/bs';
import UpdateReview from '../UpdateReview/UpdateReview';

const Reviews = () => {
    // Use USe State here 
    const [events, setEvents] = useState([]);

    const [modalShow, setModalShow] = useState(false);
    const [reviewId, setReviewId] = useState("");
    // Use Effect use here for fetching data 
    useEffect(() => {
        axios.get('https://singlespace.herokuapp.com/api/reviews')
            .then(res => setEvents(res.data.reviews))
    }, [modalShow])

    // Delete Order event button handler 
    const handleEventDelete = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Review!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete(`https://singlespace.herokuapp.com/api/reviews/${id}`)
                        .then(res => {
                            const remainingEvents = events.filter(e => e._id !== id);
                            setEvents(remainingEvents);

                        }).catch(err => console.log(err))
                    swal("The Review has been deleted!", {
                        icon: "success",
                    });
                } else {
                    swal("Your Review is safe!");
                }
            });
    }

    return (
        <div style={{ height: "100vh", overflow: "scroll" }}>
            <Container>
                <Row>
                    <Col lg="12" className="w-100 mx-auto">
                        <h2 className="t-color m-3">All Review manage</h2>
                        {
                            !events.length ?

                                <div className="d-flex align-items-center justify-content-center" style={{ height: '80vh' }}>
                                    <ReactLoading type={"bars"} color={"#7ea0ff"} height={100} width={100} />
                                </div>
                                :

                                < Table className="custom-color shadow" striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>Num</th>
                                            <th>Img</th>
                                            <th>Name</th>
                                            <th>Designation</th>
                                            <th>Update</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            events.map((e, i) => <tr>
                                                <td>{i + 1}</td>
                                                <td><img style={{ height: "80px", textAlign: "center" }} className="img-fluid" src={e.ownerPhoto} alt="bike" /></td>
                                                <td>{e.owner}</td>
                                                <td>{e.ownerDesignation}</td>
                                                <td
                                                    onClick={() => {
                                                        setModalShow(true)
                                                        setReviewId(e._id)
                                                    }}
                                                    style={{ cursor: 'pointer' }}
                                                ><BsPencilSquare className="text-success" /></td>
                                                <td className="text-center text-danger" role="button" onClick={() => handleEventDelete(e._id)} > <ArchiveFill></ArchiveFill> </td>
                                            </tr>)
                                        }
                                    </tbody>
                                </Table>
                        }

                    </Col>
                </Row>
            </Container>
            {modalShow ?
                <UpdateReview
                    show={modalShow}
                    project_id={reviewId}
                    onHide={() => setModalShow(false)}
                />
                :
                ""

            }
        </div >
    );
};

export default Reviews;