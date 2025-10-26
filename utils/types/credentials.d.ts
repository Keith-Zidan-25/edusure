export interface Credential {
    title: string;
    issuer: string;
    date: string;
    status: 'Verified' | 'Pending' | string;
    credentialId: string;
    imageUrl?: string;
    imageGradient?: string;
}

export interface CredentialCardProps {
    credential: Credential;
    onView?: (id: string) => void;
    onShare?: (id: string) => void;
    onDownload?: (id: string) => void;
}

export interface IssueCredentialFormData {
    title: string;
    recipientId: string;
    issuanceDate: string;
}

export interface IssueCredentialFormProps {
    onSubmit?: (data: IssueCredentialFormData) => void;
}

interface ValidatorProps {
    onValidate?: (hash: string) => void;
    validationResult?: {
        isValid: boolean;
        message: string;
    } | null;
}

export interface NFTInfo {
    created_timestamp: string;
    metadata: string;
    token_id: string;
    serial_number: number;
    account_id: string;
    deleted: boolean;
    spender_id: string | null;
}