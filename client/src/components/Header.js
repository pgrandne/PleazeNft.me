import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { ConnectKitButton } from "connectkit";

const Header = () => {

    return (
        <Navbar color="white" variant="dark">
            <Container>
                <Navbar.Brand className="Brand" href="#home">PLZNFT.ME</Navbar.Brand>
                <Nav className="justify-content-end">
                    <Nav.Link href="#about">WTF is this?</Nav.Link>
                    <Nav.Link href="#list">Queue</Nav.Link>
                    <ConnectKitButton />
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header;
