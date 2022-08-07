import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

const Header = () => {

    return (
        <Navbar color="white" variant="dark">
            <Container>
                <Navbar.Brand className="Brand" href="#home">PLZNFT.ME</Navbar.Brand>
                <Nav className="justify-content-end">
                    <Nav.Link href="#list">Pending List</Nav.Link>
                    <Nav.Link href="#about">WTF is this?</Nav.Link>
                    <Button variant="secondary">Connect Wallet</Button>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header;
