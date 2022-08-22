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
        if (isSuccess) setTotal(data.length + 1)
    }, [data.length, isSuccess])

    return (
        <Col sm={3}>
            you're <b>{isSuccess && total}</b> on pending list
        </Col>
    )
}

export default TotalPosition;
