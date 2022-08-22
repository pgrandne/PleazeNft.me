import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { useContractRead } from 'wagmi';
import ABI from '../api/ABI.json';
import contract from '../api/contract';
import truncateEthAddress from 'truncate-eth-address';

const QueuePage = () => {
    const { data } = useContractRead({
        addressOrName: contract,
        contractInterface: ABI,
        functionName: 'getAllRequests',
    })

    const hexToDate = (hex) => {
        const requestDate = new Date(parseInt(hex) * 1000)
        return requestDate.toISOString().substring(0, 10)
    }

    let dataFormated = [[]];
    for (let i = 0; i < data.length; i++) {
        dataFormated.push([
            parseInt(data[i][0]['_hex']),
            truncateEthAddress(data[i][1]),
            hexToDate(data[i][2]['_hex']),
            parseInt(data[i][3]['_hex']),
            parseInt(data[i][4]['_hex'])
        ])
    }

    let dataFiltered = []
    let dataFiltered2 = []
    if (dataFormated.length > 1) dataFiltered = dataFormated.sort((a, b) => a[3] < b[3])
    else dataFiltered = dataFormated

    dataFiltered2 = dataFiltered.filter(item => item[4] === 1);

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
                    </tr>
                </thead>

                <tbody>
                    {data && dataFiltered2.map((item) => (
                        <tr key={item}>
                            <td>{item[0]}</td>
                            <td>{item[1]}</td>
                            <td>{item[2]}</td>
                            <td>{item[3] / Math.pow(10, 18)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <br /><br />
            <p>The address of the smart contract is : 0x1aD037Edc7758114FC80753DA2DBF246e14AdaED</p>
            <p>You can check all information by clicking on this <a href="https://mumbai.polygonscan.com/address/0x1aD037Edc7758114FC80753DA2DBF246e14AdaED">link (polygon scan)</a></p>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        </Container >
    )
}

export default QueuePage;
