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

export const NFTContract = {
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
						"internalType": "address",
						"name": "receiver",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "string",
						"name": "credId",
						"type": "string"
					},
					{
						"indexed": false,
						"internalType": "address",
						"name": "tokenAddress",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					}
				],
				"name": "BadgeClaimed",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": false,
						"internalType": "bool",
						"name": "",
						"type": "bool"
					},
					{
						"indexed": false,
						"internalType": "bytes",
						"name": "",
						"type": "bytes"
					}
				],
				"name": "CallResponseEvent",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": false,
						"internalType": "address",
						"name": "tokenAddress",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					}
				],
				"name": "CredentialsCreated",
				"type": "event"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "token",
						"type": "address"
					},
					{
						"internalType": "int64[]",
						"name": "serials",
						"type": "int64[]"
					}
				],
				"name": "burnToken",
				"outputs": [
					{
						"internalType": "int64",
						"name": "",
						"type": "int64"
					}
				],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "receiver",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "organiser",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "credId",
						"type": "string"
					},
					{
						"internalType": "enum TokenManager.CredentialType",
						"name": "classType",
						"type": "uint8"
					},
					{
						"internalType": "bytes[]",
						"name": "metadata",
						"type": "bytes[]"
					}
				],
				"name": "claimCredential",
				"outputs": [
					{
						"internalType": "bytes32",
						"name": "",
						"type": "bytes32"
					}
				],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "string",
						"name": "credId",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "enum TokenManager.CredentialType[]",
						"name": "classType",
						"type": "uint8[]"
					},
					{
						"internalType": "int64[]",
						"name": "maxSupply",
						"type": "int64[]"
					},
					{
						"internalType": "uint256",
						"name": "credTypes",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "organiser",
						"type": "address"
					}
				],
				"name": "createCredNFT",
				"outputs": [
					{
						"internalType": "address[]",
						"name": "",
						"type": "address[]"
					}
				],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "organiser",
						"type": "address"
					},
					{
						"internalType": "int64",
						"name": "maxSupply",
						"type": "int64"
					}
				],
				"name": "createToken",
				"outputs": [
					{
						"internalType": "address",
						"name": "",
						"type": "address"
					}
				],
				"stateMutability": "payable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "token",
						"type": "address"
					},
					{
						"internalType": "bytes[]",
						"name": "metadata",
						"type": "bytes[]"
					}
				],
				"name": "mintToken",
				"outputs": [
					{
						"internalType": "int64",
						"name": "",
						"type": "int64"
					}
				],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "token",
						"type": "address"
					},
					{
						"internalType": "bytes",
						"name": "encodedFunctionSelector",
						"type": "bytes"
					}
				],
				"name": "redirectForToken",
				"outputs": [
					{
						"internalType": "int256",
						"name": "responseCode",
						"type": "int256"
					},
					{
						"internalType": "bytes",
						"name": "response",
						"type": "bytes"
					}
				],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "token",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "from",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "to",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					}
				],
				"name": "transferFrom",
				"outputs": [
					{
						"internalType": "int64",
						"name": "responseCode",
						"type": "int64"
					}
				],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "token",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "from",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "to",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "serialNumber",
						"type": "uint256"
					}
				],
				"name": "transferFromNFT",
				"outputs": [
					{
						"internalType": "int64",
						"name": "responseCode",
						"type": "int64"
					}
				],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "token",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "receiver",
						"type": "address"
					},
					{
						"internalType": "int64",
						"name": "serial",
						"type": "int64"
					}
				],
				"name": "transferToken",
				"outputs": [
					{
						"internalType": "int256",
						"name": "",
						"type": "int256"
					}
				],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "nftToken",
						"type": "address"
					},
					{
						"internalType": "int64[]",
						"name": "serialNumbers",
						"type": "int64[]"
					},
					{
						"internalType": "bytes",
						"name": "metadata",
						"type": "bytes"
					}
				],
				"name": "updateNFTsMetadata",
				"outputs": [
					{
						"internalType": "int64",
						"name": "responseCode",
						"type": "int64"
					}
				],
				"stateMutability": "nonpayable",
				"type": "function"
			}
		],
		"devdoc": {
			"kind": "dev",
			"methods": {
				"redirectForToken(address,bytes)": {
					"params": {
						"encodedFunctionSelector": "The function selector from the ERC20 interface + the bytes input for the function called",
						"token": "The token address"
					},
					"returns": {
						"response": "The result of the call that had been encoded and sent for execution.",
						"responseCode": "The response code for the status of the request. SUCCESS is 22."
					}
				},
				"transferFrom(address,address,address,uint256)": {
					"params": {
						"amount": "The amount of tokens to transfer from `from` to `to`",
						"from": "The account address of the owner of the token, on the behalf of which to transfer `amount` tokens",
						"to": "The account address of the receiver of the `amount` tokens",
						"token": "The address of the fungible Hedera token to transfer"
					},
					"returns": {
						"responseCode": "The response code for the status of the request. SUCCESS is 22."
					}
				},
				"transferFromNFT(address,address,address,uint256)": {
					"params": {
						"from": "The account address of the owner of `serialNumber` of `token`",
						"serialNumber": "The NFT serial number to transfer",
						"to": "The account address of the receiver of `serialNumber`",
						"token": "The address of the non-fungible Hedera token to transfer"
					},
					"returns": {
						"responseCode": "The response code for the status of the request. SUCCESS is 22."
					}
				}
			},
			"version": 1
		},
		"userdoc": {
			"events": {
				"CallResponseEvent(bool,bytes)": {
					"notice": "Generic event"
				}
			},
			"kind": "user",
			"methods": {
				"redirectForToken(address,bytes)": {
					"notice": "Redirect for token"
				},
				"transferFrom(address,address,address,uint256)": {
					"notice": "Only applicable to fungible tokens"
				},
				"transferFromNFT(address,address,address,uint256)": {
					"notice": "Transfers `serialNumber` of `token` from `from` to `to` using the allowance mechanism. Only applicable to NFT tokens"
				}
			},
			"version": 1
		}
	},
	"settings": {
		"compilationTarget": {
			"contracts/CredentialManager.sol": "TokenManager"
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
		"contracts/CredentialManager.sol": {
			"keccak256": "0x0cce219ad314add6be65cdc693093db67ff23b9ce40aa6bd428fb10c2b905cc7",
			"license": "MIT",
			"urls": [
				"bzz-raw://4995768b7c5279a070dcdd323ce656972f0a8ec48fc35f3f1cf980113549c2ee",
				"dweb:/ipfs/QmbRkaeTqXJejKeoPgbcAKMkibq8koaDMvZg3K8XZrSzzu"
			]
		},
		"contracts/hedera-utils/ExpiryHelper.sol": {
			"keccak256": "0xec1234c514c202ee7728ae6362b09750c1ac67a77c0ac900d1f373548755963e",
			"license": "Apache-2.0",
			"urls": [
				"bzz-raw://5c4e4a2451cfe0f4e2816bbd235c33a0e944087ed2c160ee0cdbb5ff940f90b9",
				"dweb:/ipfs/QmTgdMDT96Y5opyPyn3J1g9iwAyrrikwnjwRxiToxvS3Ws"
			]
		},
		"contracts/hedera-utils/FeeHelper.sol": {
			"keccak256": "0xed681ba12f17ba1010c981e97d8344fca95e07c413211fccf8291aedbe3279cf",
			"license": "Apache-2.0",
			"urls": [
				"bzz-raw://fb9304194dcbcf8868be8b10defcecd7bf0853ebab72f325e70e017900db5dc9",
				"dweb:/ipfs/QmayA4C6EcGmGC4KZYNKMdyJ4qajacinrDA5h4BUV5Xzzr"
			]
		},
		"contracts/hedera-utils/HederaResponseCodes.sol": {
			"keccak256": "0x2dc9925d5ae4f92ba4bb09664693ec60bdef320960a85b1ffa5099c688304151",
			"license": "Apache-2.0",
			"urls": [
				"bzz-raw://b0caf33df982320c9fa9499721ea6bc480a5dc77349fa1e4c9176dc9c1250a65",
				"dweb:/ipfs/QmWFMsyoPfc9NmXPoAPB6YHTTechpk8JDiWDWZ3gcTuehT"
			]
		},
		"contracts/hedera-utils/HederaTokenService.sol": {
			"keccak256": "0xc2961d2ab3dc46215a5fff0ba4e9edca7e90b16c9e5598894dd00dfc36eac46f",
			"license": "Apache-2.0",
			"urls": [
				"bzz-raw://8371bb062365b5922eb9c62a51dae7c86ac901f710f6373c1b78e13d90274f94",
				"dweb:/ipfs/Qmba15pG6gAwjJG3LKzMjzbJeWmbuCQ3fQXZbzNgVjV3dW"
			]
		},
		"contracts/hedera-utils/IHederaTokenService.sol": {
			"keccak256": "0x712645f5657f6074ab28f4a5c140df330edb113494a85114a16eb2e5a7a33cf4",
			"license": "Apache-2.0",
			"urls": [
				"bzz-raw://5ac5235ba11e02be656d3a1405414d9e2d8031758249bad7c2788da84cee7508",
				"dweb:/ipfs/Qmbwnrqh7vmGYB2i3b5YAneCQChGzzV8RBivWvztQhTics"
			]
		},
		"contracts/hedera-utils/KeyHelper.sol": {
			"keccak256": "0xfdd0bf9c87a560fc356dea0f2ea2d367a423d16e3e4d41db9fb8c0fcac4b68be",
			"license": "Apache-2.0",
			"urls": [
				"bzz-raw://9142f5be004221a826882d91094a5be25a4a2d24f7b960b8338f23739d2f18c0",
				"dweb:/ipfs/QmZeTQRyobgiTx3XqsYxMcvUGohAQDE3c84biQCJgYkwin"
			]
		}
	},
	"version": 1
}