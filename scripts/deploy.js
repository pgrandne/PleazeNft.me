// scripts/deploy.js
async function main() {
    // We get the contract to deploy
    const PleazeNftMe = await ethers.getContractFactory('PleazeNftMe');
    console.log('Deploying PleazeNftMe...');
    const pleazeNftMe = await PleazeNftMe.deploy();
    await pleazeNftMe.deployed();
    console.log('PleazeNftMe deployed to:', pleazeNftMe.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });