import { useContractRead } from 'wagmi';
import Col from 'react-bootstrap/Col';
import ABI from '../api/ABI.json';
import { useState, useEffect } from 'react';

const TotalPosition = () => {

    const [total, setTotal] = useState('0');

    const contract = "0x1aD037Edc7758114FC80753DA2DBF246e14AdaED"
    const { data, isSuccess } = useContractRead({
        addressOrName: contract,
        contractInterface: ABI,
        functionName: 'getAllRequests()',
    })

    useEffect(() => {
        setTotal(data.length + 1)
    }, [])

    return (
        <Col sm={3}>
            you're <b>{isSuccess && total}</b> on pending list
        </Col>
    )
}

export default TotalPosition;
