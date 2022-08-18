//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PleazeNftMe is Ownable {
    using Counters for Counters.Counter;

    event NewNftRequested(
        bytes32 nftID,
        address applicantAddress,
        uint256 creationTimestamp,
        uint256 deposit,
        string dataCID
    );

    struct RequestsList {
        uint256 nftId;
        address applicantAddress;
        uint256 creationTimestamp;
        uint256 deposit;
        string dataCID;
        bool nftNotSent;
    }

    RequestsList[] requestsList;

    mapping(address => uint) public addressToNft;
    mapping(address => uint) public balanceOfApplicant;

    Counters.Counter public tokenIdCounter;

    uint currentTime;
    uint totalNft;

    receive() external payable {}

    function getAllRequests() public view returns (RequestsList[] memory) {
        return requestsList;
    }

    function createNFtRequest() public payable {
        require(msg.value > 1 ether, "Deposit not enough!");
        addressToNft[msg.sender] = tokenIdCounter.current();
        balanceOfApplicant[msg.sender] =
            balanceOfApplicant[msg.sender] +
            msg.value;
        requestsList.push(
            RequestsList(
                tokenIdCounter.current(),
                msg.sender,
                block.timestamp,
                msg.value,
                "url",
                false
            )
        );
        tokenIdCounter.increment();
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    // function currentId() public view returns(uint) {
    //     return tokenIdCounter.current();
    // }

    // function collectCurrentTime() public view returns (uint) {
    //     return block.timestamp;
    //     }

    // function fifteenDaysHavePassed() public view returns (bool) {
    //     //require(nftNotSent, "NFT already sent!");
    //     return (block.timestamp >= (currentTime + 15 days));
    //     }
}
