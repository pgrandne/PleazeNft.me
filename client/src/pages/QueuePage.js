import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { useContractRead } from 'wagmi';
import ABI from '../api/ABI.json';
import truncateEthAddress from 'truncate-eth-address';

const QueuePage = () => {
    const contract = "0x1aD037Edc7758114FC80753DA2DBF246e14AdaED"
    const { data } = useContractRead({
        addressOrName: contract,
        contractInterface: ABI,
        functionName: 'getAllRequests()',
    })

    const hexToDate = (hex) => {
        const requestDate = new Date(parseInt(data[0][2]['_hex']) * 1000)
        return requestDate.toISOString().substring(0, 10)
    }

    return (
        <Container>
            <h3>Queue Page</h3><br />
            <Table responsive striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Id Request</th>
                        <th>Address</th>
                        <th>Date Request</th>
                        <th>Deposit</th>
                        <th>NFT Received</th>
                    </tr>
                </thead>

                <tbody>
                    {data && data.map((item, i) => (
                        <tr key={i}>
                            <td>{parseInt(item[0]['_hex']) + 1}</td>
                            <td>{truncateEthAddress(item[1])}</td>
                            <td>{hexToDate(item[2]['_hex'])}</td>
                            <td>{(parseInt(item[3]['_hex']) / Math.pow(10, 18))}</td>
                            <td>{item[5] ? 'yes' : 'no'}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <br /><br />
            <p>The address of the smart contract is : 0x1aD037Edc7758114FC80753DA2DBF246e14AdaED</p>
            <p>You can check all information by clicking on this <a href="https://mumbai.polygonscan.com/address/0x1aD037Edc7758114FC80753DA2DBF246e14AdaED">link (polygon scan)</a></p>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        </Container>
    )
}

export default QueuePage;
