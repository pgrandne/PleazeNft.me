import Container from 'react-bootstrap/Container';
import GetBackDeposit from '../api/useContract/GetbackDeposit';
import GetMyRequest from '../api/useContract/GetMyRequest';
import GetWithdrawDate from '../api/useContract/GetWitdrawDate';

const Account = () => {

    return (
        <Container>
            <h3>My Account</h3><br />
            <GetMyRequest />
            <br />
            <GetBackDeposit />
            <br /><br />
            <GetWithdrawDate />
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        </Container>

    )
}

export default Account;