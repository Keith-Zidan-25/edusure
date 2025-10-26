import { Schema, model } from "mongoose";

const projectSchema = new Schema({
    projectTitle: { 
        type: String, required: true 
    },
    description: { 
        type: String, required: true 
    },
    tags: { 
        type: [String], required: true 
    },
    goal: {
        type: Number, required: true
    },
    raised: {
        type: Number, default: 0
    },
    hederaAccountId: { 
        type: String, required: true, unique: true 
    },
    hederaPrivateKey: { 
        type: String, required: true, unique: true 
    },
    hederaPublicKey: { 
        type: String, required: true, unique: true 
    },
    imageUrl: {
        type: String
    }
}, { timestamps: true });

export const Project = model("Project", projectSchema);