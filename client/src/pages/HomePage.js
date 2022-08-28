import { useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import NftList from "../components/NftList";
import TotalPosition from "../components/TotalPosition";
import TotalNFT from "../components/TotalNFT";
import 'react-toastify/dist/ReactToastify.css';
import { ethers } from "ethers";
import { useAccount, useWaitForTransaction, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { ToastContainer, toast } from 'react-toastify';
import ABI from '../api/ABI.json';
import { useDebounce } from 'use-debounce';
import contract from '../api/contract';
import emailjs from '@emailjs/browser';

const HomePage = () => {
    const [wrongPriceModal, setWrongPriceModal] = useState(false);
    const [transactionModal, setTransactionModal] = useState(false);
    const [notConnectedModal, setNotConnectedModal] = useState(false);
    const [amount, setAmount] = useState('');
    const [debouncedAmount] = useDebounce(amount, 500)

    const { address, isConnected } = useAccount()

    const form = useRef();

    const sendTransaction = (e) => {
        e.preventDefault();
        write?.()
        setTransactionModal(false);

        emailjs.sendForm('service_3lobq7o', 'template_olmr7mi', form.current, 'fdpNV8teobG5EqCjq')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };


    const handleBuy = () => {
        if (isConnected) {
            if (amount < 0.001) setWrongPriceModal(true)
            else {
                setTransactionModal(true)
            }
        } else setNotConnectedModal(true)
    }

    const { config } = usePrepareContractWrite({
        addressOrName: contract,
        contractInterface: ABI,
        functionName: 'createNFtRequest',
        enable: false,
        overrides: {
            value: debouncedAmount ? ethers.utils.parseEther(debouncedAmount) : ethers.utils.parseEther('0.02'),
        },
    })
    const { data, write } = useContractWrite(config)

    const { isLoading, isSuccess, isError } = useWaitForTransaction({
        hash: data?.hash,
    })

    //Generate a notifcation based on transaction status 
    useEffect(() => {
        setAmount('');
        if (isLoading) {
            toast("NFT Request submitted!", {
                icon: "🦄",
                position: toast.POSITION.TOP_LEFT,
                theme: 'dark'
            })
        }
        if (isSuccess) {
            toast.success("Your request is validated!", {
                position: toast.POSITION.TOP_LEFT,
                theme: 'dark'
            })
        }
        if (isError) {
            toast.error("The transaction has encountered an error!", {
                position: toast.POSITION.TOP_LEFT,
                theme: 'dark'
            })
        }


    }, [isLoading, isSuccess, isError])

    return (
        <Container>
            {/* Style for Buy button */}
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
            {/* Form for a NFT request */}
            <Form>
                <Form.Group>
                    <Row>
                        <Col sm={3}></Col>
                        <Col sm={1}>with </Col>
                        <Col sm={2}>
                            <Form.Control
                                placeholder="MATIC"
                                type="number"
                                onChange={(e) => { setAmount(e.target.value) }}
                                value={amount}
                            />
                            <Form.Text className="text-muted">
                                0.01 MATIC min!
                            </Form.Text>
                        </Col>
                        <TotalPosition />
                        <Col sm={1}>
                            <Button variant="flat" onClick={handleBuy}><b>Buy!</b></Button>
                        </Col>
                        <Col sm={3}></Col>
                    </Row>
                </Form.Group>
            </Form>
            <br /><br />

            <TotalNFT /><br />
            {/* Display all the NFT already created */}
            <NftList />

            {/* Modal if your are not already connected */}
            <Modal show={notConnectedModal} onHide={() => { setNotConnectedModal(false) }}>
                <Modal.Header closeButton>
                    <Modal.Title>Please Connect!</Modal.Title>
                </Modal.Header>
                <Modal.Body>You have to be connected for buying!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { setNotConnectedModal(false) }}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal if your amount is too low */}
            <Modal show={wrongPriceModal} onHide={() => { setWrongPriceModal(false) }}>
                <Modal.Header closeButton>
                    <Modal.Title>Wrong Price</Modal.Title>
                </Modal.Header>
                <Modal.Body>The minimum price for requesting a NFT is 5 USDT !<br /> Please change it!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { setWrongPriceModal(false) }}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal for Transaction */}
            <Modal show={transactionModal} onHide={() => { setTransactionModal(false) }}>
                <Modal.Header closeButton>
                    <Modal.Title>URL of your picture</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form ref={form} onSubmit={sendTransaction}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Your address</Form.Label>
                            <Form.Control readOnly type="text" name="address" defaultValue={address} />
                            <Form.Label>Please fill in with an URL of a picture of you</Form.Label>
                            <Form.Control type="text" name="url" required /><br />
                            <Button variant="primary" type="submit">Submit</Button>
                        </Form.Group>
                    </Form>

                </Modal.Body>

            </Modal>

            {/* For notification of transactions */}
            <ToastContainer />
        </Container >
    )
}

export default HomePage;