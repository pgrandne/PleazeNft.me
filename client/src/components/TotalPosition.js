import { useContractRead } from 'wagmi';
import Col from 'react-bootstrap/Col';
import ABI from '../api/ABI.json';
import contract from '../api/contract';
import { useState, useEffect } from 'react';


const TotalPosition = () => {

    const [total, setTotal] = useState('0');

    const { data, isSuccess } = useContractRead({
        addressOrName: contract,
        contractInterface: ABI,
        functionName: 'getAllRequests',
    })

    useEffect(() => {
        if (data !== undefined) {
            let dataFiltered = [];
            let dataFiltered2 = [];
            for (let i = 0; i < data.length; i++) {
                dataFiltered.push(parseInt(data[i][4]['_hex']));
            }
            dataFiltered2 = dataFiltered.filter(item => dataFiltered[item] === 1)
            setTotal(dataFiltered2.length + 1)
        }
    }, [data, isSuccess])

    return (
        <Col sm={3}>
            you're <b>{total}</b> on pending list
        </Col>
    )
}

export default TotalPosition;
