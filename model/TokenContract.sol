// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "./contracts/hedera-utils/ExpiryHelper.sol";
import "./contracts/hedera-utils/FeeHelper.sol";
import "./contracts/hedera-utils/HederaResponseCodes.sol";
import "./contracts/hedera-utils/HederaTokenService.sol";
import "./contracts/hedera-utils/IHederaTokenService.sol";
import "./contracts/hedera-utils/KeyHelper.sol";

contract TokenManager is HederaTokenService, KeyHelper{
    enum CredentialType {
        Diploma,
        Certificate,
        Badge
    }

    struct CredentialClasses {
        int64 maxSupply;
        CredentialType classType;
        address tokenAddress;
    }

    struct Credential {
        address holder;
        address organiser;
        address token;
        int64 serial;
        string credId;
    }

    struct CourseT {
        string name;
        address organiser;
    }

    mapping (CredentialType => string) private stringType;
    mapping (string => CourseT) private course;
    mapping (string => CredentialClasses) credRegistry;

    event CredentialsCreated(address tokenAddress, string name, uint timestamp);
    event BadgeClaimed(address receiver, string credId, address tokenAddress, uint timestamp);

    constructor() {
        stringType[CredentialType.Certificate] = "certificate";
        stringType[CredentialType.Diploma] = "diploma";
        stringType[CredentialType.Badge] = "badge";
    }

    function createCredNFT(
        string calldata credId,
        string calldata name,
        CredentialType[] calldata classType,
        int64[] calldata maxSupply,
        uint256 credTypes,
        address organiser
    ) external returns (address[] memory) {
        require(bytes(course[credId].name).length == 0, "Can create duplicate NFTs");

        address[] memory tokenAddresses = new address[](credTypes);
        course[credId] = CourseT({
            name: name,
            organiser: organiser
        });

        for (uint i = 0; i < credTypes; i++) {
            string memory identifier = string.concat(credId, "-", stringType[classType[i]]);
            address tokenAddress = createToken(identifier, organiser, maxSupply[i]);
            credRegistry[identifier] = CredentialClasses({
                maxSupply: maxSupply[i],
                tokenAddress: tokenAddress,
                classType: classType[i]
            });

            emit CredentialsCreated(tokenAddress, name, block.timestamp);
            tokenAddresses[i] = tokenAddress;
        }

        return tokenAddresses;
    }

    function claimCredential(
        address receiver,
        address organiser,
        string calldata credId,
        CredentialType classType,
        bytes[] memory metadata
    ) external returns (bytes32) {
        string memory identifier = string.concat(credId, "-", stringType[classType]);
        address token = credRegistry[identifier].tokenAddress;

        int64 serialNum = mintToken(token, metadata);
        associateTokenTo(organiser, token);
        transferToken(receiver, token, serialNum);

        bytes32 badgeHash = keccak256(abi.encodePacked(receiver, serialNum, credId));
        emit BadgeClaimed(receiver, credId, token, block.timestamp);
        return badgeHash;
    }

    function createToken(
        string memory name,
        address organiser,
        int64 maxSupply
    ) public payable returns (address) {

        IHederaTokenService.TokenKey[] memory keys = new IHederaTokenService.TokenKey[](1);
        keys[0] = getSingleKey(KeyType.SUPPLY, KeyValueType.CONTRACT_ID, address(this));

        IHederaTokenService.HederaToken memory token;
        token.name = name;
        token.symbol = string.concat("$", name);
        token.treasury = organiser;
        token.tokenSupplyType = false;
        token.maxSupply = maxSupply;
        token.tokenKeys = keys;
        token.freezeDefault = false;

        (int responseCode, address createdToken) = HederaTokenService.createNonFungibleToken(token);
        require(responseCode == HederaResponseCodes.SUCCESS, "Failed to create non-fungible token");

        return createdToken;

    }

    function mintToken(
        address token,
        bytes[] memory metadata
    ) public returns (int64) {
        (int response, , int64[] memory serial) = HederaTokenService.mintToken(
            token,
            0,
            metadata
        );
        require(
            response == HederaResponseCodes.SUCCESS,
            "Failed to mint non-fungible token"
        );

        return serial[0];
    }

    function transferToken(
        address token,
        address receiver,
        int64 serial
    ) public returns (int) {
        
        int response = HederaTokenService.transferNFT(
            token,
            address(this),
            receiver,
            serial
        );
        require(
            response == HederaResponseCodes.SUCCESS,
            "Failed to transfer non-fungible token"
        );

        return response;
    }

    function burnToken(
        address token,
        int64[] memory serials
    ) public returns (int64) {
        (int response, int64 newTotalSupply) = HederaTokenService.burnToken(
            token,
            0,
            serials
        );
        require(
            response == HederaResponseCodes.SUCCESS,
            "Failed to burn non-fungible token"
        );

        return newTotalSupply;
    }

    function associateTokenTo(address sender, address tokenAddress) internal returns (int) {
        int response = HederaTokenService.associateToken(sender, tokenAddress);

        if (response != HederaResponseCodes.SUCCESS) {
            revert ("Associate Failed");
        }

        return response;
    }   
}