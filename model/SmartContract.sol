// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract FundProjects {
    address public owner;
    struct ProjectT {
        address payable hederaAccount;
        uint goal;
        uint raised;
    }

    mapping (string => ProjectT) public projects;

    event ProjectAdded(string id, address accountAddress, uint goal);
    event DonationMade(string id, uint amount, address sender);

    constructor () {
        owner = msg.sender;
    }

    receive() external payable {}
    fallback() external payable {}

    modifier OnlyOwner {
        require(msg.sender == owner, "Unauthorised access");
        _;
    }

    function convertToTinybar(uint256 weiAmount) public pure returns (uint256) {
        return weiAmount / (10 ** 10);
    }

    function convertToWei(uint256 tinybarAmount) public pure returns (uint256) {
        return tinybarAmount * (10 ** 10);
    }

    function addProject(string calldata id, address accountAddress, uint goal) external OnlyOwner {
        projects[id] = ProjectT(payable(accountAddress), goal, 0);
        emit ProjectAdded(id, accountAddress, goal);
    }

    function transferHbar(string calldata id) public payable returns (bool) {
        require(msg.value > 0, "Must send HBAR");
        
        address payable projectAddress = projects[id].hederaAccount;
        (bool sent, ) = projectAddress.call{value: msg.value}("");
        require(sent, "Failed to send HBAR");
        
        uint256 amountInTinybars = convertToTinybar(msg.value);
        projects[id].raised += amountInTinybars;
        emit DonationMade(id, amountInTinybars, msg.sender);
        
        return true;
    }
    
    function getBalance() public view returns (uint) {
        return convertToTinybar(address(this).balance);
    }

    function getAmountRaised(string calldata id) public view returns (uint) {
        return projects[id].raised;
    }
}