import ABI from '../ABI.json';
import contract from '../contract';
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';


const MintNFT = () => {
    const [recipient, setRecipient] = useState('');

    const { config } = usePrepareContractWrite({
        addressOrName: contract,
        contractInterface: ABI,
        functionName: 'mintTo',
        args: [recipient],
    })
    const { isLoading, isSuccess, isError, write } = useContractWrite(config)

    //Generate a notifcation based on transaction status 
    useEffect(() => {
        if (isLoading) {
            toast("Mint transaction submitted!", {
                icon: "🦄",
                position: toast.POSITION.TOP_LEFT,
                theme: 'dark'
            })
        }
        if (isSuccess) {
            toast.success("The NFT is minted", {
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
        <>
            <h3>Admin</h3>
            <Row>
                <Col sm={3}></Col>
                <Col sm={6}>
                    <Form.Control
                        placeholder="Address for minting NFT"
                        aria-label="address"
                        aria-describedby="basic-addon1"
                        onChange={(e) => { setRecipient(e.target.Value) }}
                    />
                </Col>
                <Col sm={3}></Col>
            </Row>
            <br />
            <Button variant="outline-dark" onClick={() => write?.()}>Mint</Button>
            <ToastContainer />
        </>
    )



}

export default MintNFT;
