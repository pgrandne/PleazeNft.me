import { useContractRead } from 'wagmi';
import ABI from '../api/ABI.json';
import contract from '../api/contract';
import { useState, useEffect } from 'react';


const TotalNFT = () => {

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
            dataFiltered2 = dataFiltered.filter(item => dataFiltered[item] !== 1)
            setTotal(dataFiltered2.length)
        }
    }, [data, isSuccess])

    return (
        <>
            <h1>{total} portraits</h1>
            <h4>already ordered</h4>
        </>
    )
}
export default TotalNFT;