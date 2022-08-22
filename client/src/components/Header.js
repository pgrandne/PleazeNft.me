import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { ConnectKitButton } from 'connectkit';
import { LinkContainer } from 'react-router-bootstrap'
import { useNetwork, useSwitchNetwork, useAccount } from 'wagmi';
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Header = () => {
    const [networkModal, setNetworkModal] = useState(false)

    const { chain } = useNetwork()
    const { error, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork()
    const { address, isConnected } = useAccount()

    useEffect(() => {
        if (chain && chain.id !== 80001) setNetworkModal(true);
    }, [chain]);

    const switchnetwork = () => {
        switchNetwork(80001)
        console.log("error " + error)
        console.log("loading " + isLoading)
        console.log("pending " + pendingChainId)
        setNetworkModal(false)

    }



    return (
        <Navbar color="white" variant="dark">
            <Container>
                <LinkContainer to="/"><Navbar.Brand className="Brand">PLZNFT.ME</Navbar.Brand></LinkContainer>
                <Nav className="justify-content-end">
                    <LinkContainer to="/wtf"><Nav.Link>WTF is this?</Nav.Link></LinkContainer>
                    <LinkContainer to="queue"><Nav.Link>Queue</Nav.Link></LinkContainer>
                    {isConnected && address !== "0x2444bADfA76CbC3076DC5FE8DB2adF65950E7ebF" &&
                        <LinkContainer to="account"><Nav.Link>Account</Nav.Link></LinkContainer>}
                    {isConnected && address === "0x2444bADfA76CbC3076DC5FE8DB2adF65950E7ebF" &&
                        < LinkContainer to="admin"><Nav.Link>Admin</Nav.Link></LinkContainer>}
                    <ConnectKitButton />
                    {chain &&
                        <Modal show={networkModal} onHide={() => { setNetworkModal(false) }}>
                            <Modal.Header closeButton>
                                <Modal.Title>Wrong Network</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>You are connected on {chain.name}!<br />Only Polygon Mumbai is supported</Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" onClick={switchnetwork}>
                                    Change Network
                                </Button>
                            </Modal.Footer>
                        </Modal>}
                </Nav>
            </Container >
        </Navbar >
    )
}

export default Header;
