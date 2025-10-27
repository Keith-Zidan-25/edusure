import { NextResponse } from "next/server";
import { AccountCreateTransaction, PrivateKey, Hbar } from "@hashgraph/sdk";
import environmentSetup from "../../../lib/client";

export async function GET() {
    try {
        const client = await environmentSetup();
        const newPrivateKey = PrivateKey.generateECDSA();
        const newPublicKey = newPrivateKey.publicKey;
    
        const newAccountTx = await new AccountCreateTransaction()
                                .setECDSAKeyWithAlias(newPrivateKey)
                                .setInitialBalance(new Hbar(20))
                                .freezeWith(client);
    
        const newAccountSubmit = await newAccountTx.execute(client);
        const newAccountRx = await newAccountSubmit.getReceipt(client);
        const newAccountId = newAccountRx.accountId;
        if (!newAccountId) {
            throw new Error("Failed to create new Hedera account");
        }
    
        console.log(`Created new account with ID: ${newAccountId}`);
        return NextResponse.json({
            hederaAccountId: newAccountId.toString(),
            hederaPrivateKey: newPrivateKey.toStringDer(),
            hederaPublicKey: newPublicKey.toStringDer()
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "Error creating Hedera account", error }, { status: 500 });
    }
}