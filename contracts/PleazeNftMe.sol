//SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PleazeNftMe is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private currentTokenId;
    //Structure of all the requests with information
    struct RequestsList {
        uint idRequest;
        address addressApplicant;
        uint creationTimestamp;
        uint deposit;
        uint requestStatus;
    }

    event NewNftRequested(
        uint idrRequest,
        address addressApplicant,
        uint creationTimestamp,
        uint deposit
    );

    event NftCreated(uint tokenID, address addressRecipient);

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

    //For counting number of NFT Requested
    uint private idCounter;

    /// @dev Base token URI used as a prefix by tokenURI().
    string public baseTokenURI;

    //Start the Counter to 1
    constructor() ERC721("PleazeNftMe", "PNM") {
        baseTokenURI = "";
    }

    //Request a NFT, the info are provided in requestsList and status => 1 : NFT requested
    function createNFtRequest() public payable {
        require(msg.value >= 0.01 ether, "Deposit not enough! min 0.01");
        require(_status[msg.sender] != 1, "You already did a request");
        idCounter++;
        requestsList.push(
            RequestsList(idCounter, msg.sender, block.timestamp, msg.value, 1)
        );
        _status[msg.sender] = 1;
        _requestTime[msg.sender] = block.timestamp;

        emit NewNftRequested(idCounter, msg.sender, block.timestamp, msg.value);
    }

    //Withdraw all the deposits associated to provided NFT
    function withdraw() public payable onlyOwner returns (bool) {
        uint withdrawAmount = 0;
        for (uint i = 0; i < idCounter; i++) {
            if (_status[requestsList[i].addressApplicant] == 2) {
                withdrawAmount = withdrawAmount + requestsList[i].deposit;
                _status[requestsList[i].addressApplicant] = 3;
                requestsList[i].requestStatus = 3;
            }
        }
        (bool success, ) = owner().call{value: withdrawAmount}("");
        return (success);
    }

    //If you didn't receive your NFT after 15 days, you can get back your deposit
    function getDepositBack() public payable returns (bool) {
        require(_status[msg.sender] == 1, "You have no deposit");
        require(
            block.timestamp >= _requestTime[msg.sender] + 15 days,
            "You have to wait 15 days before request your deposit"
        );
        uint withdrawAmount;
        for (uint i = 0; i < idCounter; i++) {
            if (requestsList[i].addressApplicant == msg.sender) {
                withdrawAmount = requestsList[i].deposit;
                requestsList[i].requestStatus = 3;
                break;
            }
        }
        _status[msg.sender] = 3;
        (bool success, ) = msg.sender.call{value: withdrawAmount}("");
        return (success);
    }

    //Mint NFT
    function mintTo(address recipient) public onlyOwner returns (uint256) {
        require(_status[recipient] == 1, "There is no request!");
        currentTokenId.increment();
        uint256 newItemId = currentTokenId.current();
        _safeMint(recipient, newItemId);
        for (uint i = 0; i < idCounter; i++) {
            if (
                requestsList[i].requestStatus == 1 &&
                requestsList[i].addressApplicant == recipient
            ) {
                requestsList[i].requestStatus = 2;
                break;
            }
        }
        _status[recipient] = 2;
        emit NftCreated(newItemId, recipient);
        return newItemId;
    }

    /// @dev Sets the base token URI prefix.
    function setBaseTokenURI(string memory _baseTokenURI) public onlyOwner {
        baseTokenURI = _baseTokenURI;
    }

    //VIEW FUNCTIONS
    //ONLY READING

    /// @dev Returns an URI for a given token ID
    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    function getAllRequests() public view returns (RequestsList[] memory) {
        return requestsList;
    }

    function getContractBalance() public view onlyOwner returns (uint) {
        return address(this).balance;
    }

    function getRequest() public view returns (RequestsList memory) {
        RequestsList memory applicantRequest;
        for (uint i = 0; i < idCounter; i++) {
            if (requestsList[i].addressApplicant == msg.sender) {
                applicantRequest = requestsList[i];
                break;
            }
        }
        return (applicantRequest);
    }

    function getWithdrawDate() public view returns (uint) {
        require(_status[msg.sender] == 1, "You have no pending request");
        return (_requestTime[msg.sender] + 15 days);
    }
}
