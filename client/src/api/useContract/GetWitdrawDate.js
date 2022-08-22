import { useAccount, useContractRead } from 'wagmi';
import ABI from '../ABI.json';
import contract from '../contract';

const GetWithdrawDate = () => {
    const { address } = useAccount()
    const { data } = useContractRead({
        addressOrName: contract,
        contractInterface: ABI,
        functionName: 'getWithdrawDate',
        overrides: { from: address },
    })

    const hexToDate = (hex) => {
        const requestDate = new Date(parseInt(hex) * 1000)
        return (requestDate.toISOString().substring(0, 10) + " " + requestDate.toISOString().substring(11, 19))
    }

    return (
        <p>You can get back your deposit at : {hexToDate(data)}</p>
    )

}

export default GetWithdrawDate;