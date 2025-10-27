export interface Project {
    _id: string;
    projectTitle: string;
    description: string;
    tags: string[];
    raised: number;
    goal: number;
    imageUrl?: string;
    imageGradient?: string;
    hederaAccountId: string;
    hederaPrivateKey: string;
    hederaPublicKey: string;
}