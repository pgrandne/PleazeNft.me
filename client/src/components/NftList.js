import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Figure from 'react-bootstrap/Figure';
import num1 from '../images/1.png'
import num2 from '../images/2.png'
import num3 from '../images/3.png'

const NftList = () => {
    return (
        <div>
            <Row>
                <Col>
                    <Figure>
                        <Figure.Image
                            width={171}
                            height={180}
                            alt="171x180"
                            src={num1}
                        />
                    </Figure>
                </Col>
                {/* <Col>
                    <Figure>
                        <Figure.Image
                            width={171}
                            height={180}
                            alt="171x180"
                            src={num2}
                        />
                    </Figure>
                </Col>
                <Col>
                    <Figure>
                        <Figure.Image
                            width={171}
                            height={180}
                            alt="171x180"
                            src={num3}
                        />
                    </Figure>
                </Col> */}
            </Row>
        </div>
    )
}

export default NftList;