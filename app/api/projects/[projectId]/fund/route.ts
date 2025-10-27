import { NextResponse, NextRequest } from "next/server";
import {
    PrivateKey,
    ContractExecuteTransaction,
    ContractFunctionParameters,
    Client,
    AccountId
} from "@hashgraph/sdk";
import { User } from "../../../../../model/User";
import { Project } from "../../../../../model/Project";

const contractId = process.env.CONTRACT_ID;

async function transferToContract(
    amount: number, senderAccount: string, projectId: string, senderPrivateKey: string
) {
    const userAccountId = AccountId.fromString(senderAccount);
    const userPrivateKey = PrivateKey.fromStringECDSA(senderPrivateKey);
    const client = Client.forTestnet().setOperator(userAccountId, userPrivateKey);    
    
    if (!contractId) {
        console.log("ContractId not found");
        return false;
    }
    const transferAmount = amount;
    // const fundTx = await new ContractExecuteTransaction()
    //     .setContractId(contractId)
    //     .setGas(100000)
    //     .setPayableAmount(amount)
    //     .execute(client);

    // await fundTx.getReceipt(client);
    const transferParams = new ContractFunctionParameters()
        .addString(projectId)

    const transferTx = await new ContractExecuteTransaction()
        .setContractId(contractId)
        .setGas(5000000)
        .setPayableAmount(transferAmount)
        .setFunction("transferHbar", transferParams)
        .execute(client);

    const receipt = await transferTx.getReceipt(client);
    console.log(`- Transfer status: ${receipt.status}`);
    return true;
}

export async function POST(request: NextRequest, {params}: { params: { projectId: string } }) {
    try {
        const {projectId} = await params;
        const {amount, hederaAccountId} = await request.json();
        console.log(amount);

        if (!amount || amount <= 0) {
            console.log("Amount invalid");
            return NextResponse.json({ message: "Invalid Amount" }, { status: 401 });
        }
        const userData = await User.findOne({ hederaAccountId: hederaAccountId });
        
        if (!userData?.hederaPrivateKey) {
            return NextResponse.json({ message: "User account not found" }, { status: 404 });
        }
        const result = await transferToContract(amount, hederaAccountId, projectId, userData?.hederaPrivateKey);
        console.log(result);

        const message = result ? `Successfully donated ${amount}` : `Donation Failed`;
        const status = result ? 200 : 400;
        
        if (result) {
            const project = await Project.findOne({ _id: projectId });
            await Project.updateOne({ _id: projectId }, { raised: (project?.raised + amount)});
        }
        return NextResponse.json({ message }, { status });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Donation failed" }, { status: 500 });
    }
}