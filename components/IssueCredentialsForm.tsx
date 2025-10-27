import { useState } from "react";
import { Award } from "lucide-react";
import { IssueCredentialFormData, IssueCredentialFormProps } from "../utils/types/credentials";

const IssueCredentialForm: React.FC<IssueCredentialFormProps> = ({ onSubmit }) => {
    const [formData, setFormData] = useState<IssueCredentialFormData>({
        title: '',
        recipientId: '',
        issuanceDate: '2024-07-20'
    });

    const handleChange = (field: keyof IssueCredentialFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        onSubmit?.(formData);
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Issue New Credential</h2>
        
        <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Create & Publish a Verifiable Certificate</h3>
            <p className="text-sm text-gray-600">
            As an authorized institution or educator, you can issue new blockchain-secured credentials. 
            Fill in the details below to create a new tamper-proof record.
            </p>
        </div>

        <div className="space-y-4">
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Credential Title
            </label>
            <input
                type="text"
                placeholder="e.g., Advanced AI Ethics Course"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Recipient EduBlock ID
            </label>
            <input
                type="text"
                placeholder="e.g., 0xRecipientWalletAddress"
                value={formData.recipientId}
                onChange={(e) => handleChange('recipientId', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Issuance Date
            </label>
            <input
                type="date"
                value={formData.issuanceDate}
                onChange={(e) => handleChange('issuanceDate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>

            <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center space-x-2"
            >
            <Award className="w-5 h-5" />
            <span>Issue Credential</span>
            </button>
        </div>
        </div>
    );
};

export default IssueCredentialForm;