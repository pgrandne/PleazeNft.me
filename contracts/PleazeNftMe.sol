//SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

contract PleazeNftMe2 {
    //Structure of all the requests with information
    struct RequestsList {
        uint idRequest;
        address addressApplicant;
        uint creationTimestamp;
        uint deposit;
        string dataCID;
    }

    event NewNftRequested(
        uint idrRequest,
        address addressApplicant,
        uint creationTimestamp,
        uint deposit
    );

    RequestsList[] private requestsList;

    //For deposit amount on smart contract
    receive() external payable {}

    //Mapping between an address and status of Request :
    //0 no request
    //1: NFT requested
    //2: NFT sent
    //3: deposit withdrawn
    mapping(address => uint) private _status;

    //Mapping between an address and request timestamp
    mapping(address => uint) private _requestTime;

    //Address of the owner of the contract
    address private owner;

    //For counting number of NFT Requested
    uint private idCounter;

    //Start the Counter to 1
    constructor() {
        idCounter = 1;
        owner = msg.sender;
    }

    //Request a NFT, the info are provided in requestsList and status => 1 : NFT requested
    function createNFtRequest() public payable {
        require(msg.value > 0.01 ether, "Deposit not enough! min 0.01");
        require(_status[msg.sender] != 1, "You already did a request");
        requestsList.push(
            RequestsList(
                idCounter,
                msg.sender,
                block.timestamp,
                msg.value,
                "url"
            )
        );
        _status[msg.sender] = 1;
        _requestTime[msg.sender] = block.timestamp;
    }

    //Withdraw all the deposits associated to provided NFT
    function withdraw() public payable returns (bool) {
        require(
            msg.sender == owner,
            "You are not the owner, you cannot withdraw!"
        );
        uint withdrawAmount = 0;
        address depositAddress;
        for (uint i = 0; i < idCounter; i++) {
            depositAddress = requestsList[i].addressApplicant;
            if (_status[depositAddress] == 2) {
                withdrawAmount = withdrawAmount + requestsList[i].deposit;
                _status[depositAddress] = 3;
            }
        }
        (bool success, ) = owner.call{value: withdrawAmount}("");
        return (success);
    }

    function getStatus() public view returns (RequestsList[] memory) {
        return requestsList;
    }

    //If you didn't receive your NFt after 15 days, you can get back your deposit
    function getDepositBack() public payable returns (bool) {
        require(_status[msg.sender] == 1, "You have no deposit");
        require(
            block.timestamp >= _requestTime[msg.sender] + 5 minutes,
            "You have to wait 15 days before request your deposit"
        );
        uint withdrawAmount;
        for (uint i = 0; i < idCounter; i++) {
            if (requestsList[i].addressApplicant == msg.sender) {
                withdrawAmount = requestsList[i].deposit;
                break;
            }
        }
        _status[msg.sender] = 3;
        (bool success, ) = msg.sender.call{value: withdrawAmount}("");
        return (success);
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
