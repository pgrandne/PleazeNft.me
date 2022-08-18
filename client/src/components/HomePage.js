import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import NftList from "./NftList";
import 'react-toastify/dist/ReactToastify.css';

import { useAccount, usePrepareSendTransaction, useSendTransaction } from 'wagmi'
import { ethers } from 'ethers'

const HomePage = () => {
    const [wrongPriceModal, setWrongPriceModal] = useState(false);
    const [pictureModal, setPictureModal] = useState(false);
    const [notConnectedModal, setNotConnectedModal] = useState(false);
    const [amount, setAmount] = useState('');

    let url = ""
    let listPosition = 1
    let totalNFT = 1

    const { isConnected } = useAccount()

    const handleUrl = (event) => { url = event.target.value }

    const handleClose = () => {
        setWrongPriceModal(false)
        setPictureModal(false)
        setNotConnectedModal(false)
    }

    const handleBuy = () => {
        if (isConnected) {
            if (amount < 0.01) setWrongPriceModal(true)
            else setPictureModal(true)
        } else setNotConnectedModal(true)
    }

    const contract = process.env.CONTRACT
    const { config } = usePrepareSendTransaction({
        request: {
            to: contract,
            value: amount ? ethers.utils.parseEther(amount) : undefined,
        },
    })
    const { sendTransaction } = useSendTransaction(config)

    const HandleSubmit = () => {
        //soumettre la transaction avec le prix
        setPictureModal(false)
        console.log(`${amount} USDT, url: ${url}`)
        sendTransaction?.()
        toast("NFT Request submitted!", {
            icon: "🦄",
            position: toast.POSITION.TOP_LEFT,
            theme: 'dark'
        })
        setAmount('')
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
                            <Form.Control
                                placeholder="USDT"
                                onChange={(e) => { setAmount(e.target.value) }}
                                value={amount}
                            />
                            <Form.Text className="text-muted">
                                5 USDT min!
                            </Form.Text>
                        </Col>
                        <Col sm={3}>
                            you're <b>{listPosition}</b> on pending list
                        </Col>
                        <Col sm={1}>
                            <Button variant="flat" onClick={handleBuy}><b>Buy!</b></Button>
                        </Col>
                        <Col sm={3}></Col>
                    </Row>
                </Form.Group>
            </Form>
            <br /><br />
            <h1>{totalNFT} portraits</h1>
            <h4>already ordered</h4>
            <NftList />

            <Modal show={wrongPriceModal} onHide={handleClose}>
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

            <Modal show={pictureModal} onHide={handleClose}>
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
                    <Button variant="primary" onClick={HandleSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer />

            <Modal show={notConnectedModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Please Connect!</Modal.Title>
                </Modal.Header>
                <Modal.Body>You have to be connected for buying!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </Container>
    )
}

export default HomePage;