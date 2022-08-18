import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import NftList from "../components/NftList";
import TotalPosition from "../components/TotalPosition";
import 'react-toastify/dist/ReactToastify.css';
import { ethers } from "ethers";
import { useAccount, useWaitForTransaction, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { ToastContainer, toast } from 'react-toastify';
import ABI from '../api/ABI.json';
import { useDebounce } from 'use-debounce'

const HomePage = () => {
    const [wrongPriceModal, setWrongPriceModal] = useState(false);
    const [transactionModal, setTransactionModal] = useState(false);
    const [notConnectedModal, setNotConnectedModal] = useState(false);
    const [amount, setAmount] = useState('');
    const [debouncedAmount] = useDebounce(amount, 500)
    const [pictureUrl, setPictureUrl] = useState('');

    const { isConnected } = useAccount()
    let listPosition = 1
    let totalNFT = 1
    const contract = "0x1aD037Edc7758114FC80753DA2DBF246e14AdaED"

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
                                placeholder="USDT"
                                onChange={(e) => { setAmount(e.target.value) }}
                                value={amount}
                            />
                            <Form.Text className="text-muted">
                                5 USDT min!
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

            <h1>{totalNFT} portraits</h1>
            <h4>already ordered</h4>

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
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Please fill in with an URL of a picture of you</Form.Label>
                            <Form.Control
                                type="input"
                                placeholder="https://www.instagram.com/johnjohndoe/"
                                autoFocus
                                onChange={(e) => { setPictureUrl(e.target.value) }}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={(e) => {
                        e.preventDefault()
                        write?.()
                        setTransactionModal(false)
                    }}
                    >
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* For notification of transactions */}
            <ToastContainer />
        </Container>
    )
}

export default HomePage;