export const metadata = {
	"compiler": {
		"version": "0.8.30+commit.73712a01"
	},
	"language": "Solidity",
	"output": {
		"abi": [
			{
				"inputs": [],
				"stateMutability": "nonpayable",
				"type": "constructor"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": false,
						"internalType": "string",
						"name": "id",
						"type": "string"
					},
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"indexed": false,
						"internalType": "address",
						"name": "sender",
						"type": "address"
					}
				],
				"name": "DonationMade",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": false,
						"internalType": "string",
						"name": "id",
						"type": "string"
					},
					{
						"indexed": false,
						"internalType": "address",
						"name": "accountAddress",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "goal",
						"type": "uint256"
					}
				],
				"name": "ProjectAdded",
				"type": "event"
			},
			{
				"stateMutability": "payable",
				"type": "fallback"
			},
			{
				"inputs": [
					{
						"internalType": "string",
						"name": "id",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "accountAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "goal",
						"type": "uint256"
					}
				],
				"name": "addProject",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "uint256",
						"name": "weiAmount",
						"type": "uint256"
					}
				],
				"name": "convertToTinybar",
				"outputs": [
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					}
				],
				"stateMutability": "pure",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "uint256",
						"name": "tinybarAmount",
						"type": "uint256"
					}
				],
				"name": "convertToWei",
				"outputs": [
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					}
				],
				"stateMutability": "pure",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "string",
						"name": "id",
						"type": "string"
					}
				],
				"name": "getAmountRaised",
				"outputs": [
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "getBalance",
				"outputs": [
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "owner",
				"outputs": [
					{
						"internalType": "address",
						"name": "",
						"type": "address"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "string",
						"name": "",
						"type": "string"
					}
				],
				"name": "projects",
				"outputs": [
					{
						"internalType": "address payable",
						"name": "hederaAccount",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "goal",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "raised",
						"type": "uint256"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "string",
						"name": "id",
						"type": "string"
					}
				],
				"name": "transferHbar",
				"outputs": [
					{
						"internalType": "bool",
						"name": "",
						"type": "bool"
					}
				],
				"stateMutability": "payable",
				"type": "function"
			},
			{
				"stateMutability": "payable",
				"type": "receive"
			}
		],
		"devdoc": {
			"kind": "dev",
			"methods": {},
			"version": 1
		},
		"userdoc": {
			"kind": "user",
			"methods": {},
			"version": 1
		}
	},
	"settings": {
		"compilationTarget": {
			"contracts/Crowdfunding.sol": "FundProjects"
		},
		"evmVersion": "prague",
		"libraries": {},
		"metadata": {
			"bytecodeHash": "ipfs"
		},
		"optimizer": {
			"enabled": false,
			"runs": 200
		},
		"remappings": []
	},
	"sources": {
		"contracts/Crowdfunding.sol": {
			"keccak256": "0x016e4e1c864ae6d3aec8580d1a49bfcc2895ad15271acc556d4b9ee8d16a68f9",
			"license": "MIT",
			"urls": [
				"bzz-raw://03c298ceb3ce10fa599fc1f5937bad36570aaa4537827453fa7a0e29ffd5603e",
				"dweb:/ipfs/QmW4r3TLb4V6VChVpk2kxxSWnw27qpoMsjVcGpXDvat2aD"
			]
		}
	},
	"version": 1
}