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

    //If you didn't receive your NFT after 15 days, you can get back your deposit
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

    //VIEW FUNCTIONS
    //ONLY READING

    function getAllRequests() public view returns (RequestsList[] memory) {
        return requestsList;
    }

    function getAllPendingRequests()
        public
        view
        returns (RequestsList[] memory)
    {
        RequestsList[] memory pendingRequests;
        for (uint i = 0; i < idCounter; i++) {
            if (_status[requestsList[i].addressApplicant] == 1)
                pendingRequests.push(RequestsList(requestsList[i]));
        }
        return pendingRequests;
    }

    function getContractBalance() public view returns (uint) {
        require(msg.sender == owner, "Only the owner can call this function");
        return address(this).balance;
    }

    function getRequest() public view returns (uint, RequestsList memory) {
        uint status;
        RequestsList memory applicantRequest;

        for (uint i = 0; i < idCounter; i++) {
            if (requestsList[i].addressApplicant == msg.sender) {
                status = _status(msg.sender);
                applicantRequest = requestsList[i];
                break;
            }
        }
        return (status, applicantRequest);
    }

    function getWithdrawDate() public view returns (string) {
        if (_status[msg.sender] = '1') {
                for (uint i = 0; i < idCounter; i++) {
            if (requestsList[i].addressApplicant == msg.sender) {
                status = _status(msg.sender);
                applicantRequest = requestsList[i];
                break;
            }
        }
        return


    }
}
