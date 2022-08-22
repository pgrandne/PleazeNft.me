import Container from "react-bootstrap/Container";

const WtfPage = () => {
    return (
        <Container className='text-left'>
            <h3>Rules</h3><br />
            <p>PleazeNftMe allows you to get a picture of you drawn by an artist</p>
            <p>This drawing is based on an picture of you that you provide by an url (facebook, instragram, ...)</p>
            <p>From this picture, we will create a sketch of you an send you by an NFT</p>
            <p>Because we cannot send you the sketch automatically you have to wait</p>
            <p>The deposit that you have done is blocked on a smart contract</p>
            <p>We cannot witdraw this deposit until we sent you the NFT</p>
            <p>If we didn't send you the NFT after 15 days, you can withdraw the deposit</p>
            <p>The minimum amount is 5 Matic, much more the deposit is important, much more you have the priority</p>
            <p>We respect yout privacy, the url that you sent is not stored on the blockchain, we just use it for creating the FNT and delete it after that</p>
            <p>However all the NFT created are apparent on the Home Page</p>
            <p>You cannot request a new NFT if you have a pending request, it is only one by one</p>
            <p>PleazeNft.Me uses Polygon Network</p>
            <p></p>
            <br /><br />
        </Container>
    )
}

export default WtfPage;