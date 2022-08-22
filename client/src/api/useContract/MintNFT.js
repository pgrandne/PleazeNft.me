import ABI from '../ABI.json';
import contract from '../contract';
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';


const MintNFT = () => {
    const { config } = usePrepareContractWrite({
        addressOrName: contract,
        contractInterface: ABI,
        functionName: 'witdhraw',
    })
    const { isLoading, isSuccess, isError, write } = useContractWrite(config)

    //Generate a notifcation based on transaction status 
    useEffect(() => {
        if (isLoading) {
            toast("Withdraw deposit submitted!", {
                icon: "🦄",
                position: toast.POSITION.TOP_LEFT,
                theme: 'dark'
            })
        }
        if (isSuccess) {
            toast.success("Your deposit is back!", {
                position: toast.POSITION.TOP_LEFT,
                theme: 'dark'
            })
        }
        if (isError) {
            toast.error("The transaction has encountered an error!", {
                position: toast.POSITION.TOP_LEFT,
                theme: 'dark'
            })
        }


    }, [isLoading, isSuccess, isError])

    return (
        <>
            <h3>Admin</h3>
            <Button variant="outline-dark" onClick={() => write?.()}>Mint</Button>
            <ToastContainer />
        </>
    )



}

export default MintNFT;
