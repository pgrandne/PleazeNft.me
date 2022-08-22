import ABI from '../ABI.json';
import contract from '../contract';
import { useContractRead, useAccount } from 'wagmi';
import truncateEthAddress from 'truncate-eth-address';
import Table from 'react-bootstrap/Table';

const GetMyRequest = () => {
    const hexToDate = (hex) => {
        const requestDate = new Date(parseInt(data[0][2]['_hex']) * 1000)
        return requestDate.toISOString().substring(0, 10)
    }

    const { data, error } = useContractRead({
        addressOrName: contract,
        contractInterface: ABI,
        functionName: 'getAllRequests',
    })

    console.log(error)

    const { address } = useAccount()

    return (
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
                {data && data.filter(item => item[1] === address).map((item) => (
                    <tr key={item}>
                        <td>{parseInt(item[0]['_hex'])}</td>
                        <td>{truncateEthAddress(item[1])}</td>
                        <td>{hexToDate(item[2]['_hex'])}</td>
                        <td>{(parseInt(item[3]['_hex']) / Math.pow(10, 18))}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default GetMyRequest;