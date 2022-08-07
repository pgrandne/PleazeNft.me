import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import NftList from "./NftList";


const HomePage = () => {
    return (
        <Container>
            <h4>Get yours</h4>
            <h1 className="Brand">now!</h1>
            <br /><br />
            <Form>
                <Form.Group>
                    <Row>
                        <Col sm={3}></Col>
                        <Col sm={1}>with </Col>
                        <Col sm={2}>
                            <Form.Control placeholder="USDT" />
                            <Form.Text className="text-muted">
                                5 USDT min!
                            </Form.Text>
                        </Col>
                        <Col sm={3}>
                            you're <b>123rd</b> on pending list
                        </Col>
                        <Col sm={1}>
                            <Button variant="danger">Buy</Button>
                        </Col>
                        <Col sm={3}></Col>
                    </Row>
                </Form.Group>
            </Form>
            <br /><br />
            <h1>1245 portraits</h1>
            <h4>already ordered</h4>
            <NftList />
        </Container>
    )
}

export default HomePage;