import Container from 'react-bootstrap/esm/Container';
import Withdraw from '../api/useContract/Withdraw';
import MintNFT from '../api/useContract/MintNFT'


const AccountAdmin = () => {
    return (
        <Container>
            <MintNFT />
            <br /><br />
            <Withdraw />

            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        </Container>
    )
}

export default AccountAdmin;