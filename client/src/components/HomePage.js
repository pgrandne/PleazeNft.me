import { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import NftList from "./NftList";


const HomePage = () => {
    const [PriceModal, setPriceModal] = useState(false);
    const [PictureModal, setPictureModal] = useState(false);

    let askingPrice = 0
    let url = ""

    const handlePrice = (event) => { askingPrice = event.target.value }

    const handleUrl = (event) => { url = event.target.value }

    const handleClose = () => {
        setPriceModal(false)
        setPictureModal(false)
    }

    const handleBuy = () => {
        if (askingPrice < 5) {
            setPriceModal(true)
        }
        else
            setPictureModal(true)
    }

    const handleSubmit = () => {
        //soumettre la transaction avec le prix
        setPictureModal(false)
        console.log(`${askingPrice} USDT, url: ${url}`)
    }

    return (
        <Container>
            <style type="text/css">
                {`
    .btn-flat {
      background: linear-gradient(to left, #b90066, #009E65);
      border: 2px solid black;
      color: white;
    }
    `}
            </style>
            <h4>Get yours</h4>
            <h1 className="Brand">now!</h1>
            <br /><br />
            <Form>
                <Form.Group>
                    <Row>
                        <Col sm={3}></Col>
                        <Col sm={1}>with </Col>
                        <Col sm={2}>
                            <Form.Control placeholder="USDT" onChange={handlePrice} />
                            <Form.Text className="text-muted">
                                5 USDT min!
                            </Form.Text>
                        </Col>
                        <Col sm={3}>
                            you're <b>123rd</b> on pending list
                        </Col>
                        <Col sm={1}>
                            <Button variant="flat" onClick={handleBuy}><b>Buy!</b></Button>
                        </Col>
                        <Col sm={3}></Col>
                    </Row>
                </Form.Group>
            </Form>
            <br /><br />
            <h1>1245 portraits</h1>
            <h4>already ordered</h4>
            <NftList />

            <Modal show={PriceModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Wrong Price</Modal.Title>
                </Modal.Header>
                <Modal.Body>The minimum price for requesting a NFT is 5 USDT !<br /> Please change it!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={PictureModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>URL of your picture</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Please fill in with an URL of a picture of you</Form.Label>
                            <Form.Control
                                type="input"
                                placeholder="https://www.instagram.com/johnjohndoe/"
                                autoFocus
                                onChange={handleUrl}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default HomePage;