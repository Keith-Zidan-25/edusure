import React, { useState } from 'react';
import { X, Heart, TrendingUp } from 'lucide-react';
import { Project } from '@/utils/types/community';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | undefined;
  onDonate?: (amount: number, id: string) => void;
}

const DonationModal: React.FC<DonationModalProps> = ({
  isOpen,
  onClose,
  project,
  onDonate
}) => {
  const [amount, setAmount] = useState('');
  
  if (project === undefined) return null;
  const progress = (project.raised / project.goal) * 100;

  const handleDonate = () => {
    const donationAmount = parseFloat(amount);
    if (donationAmount > 0) {
      onDonate?.(donationAmount, project._id);
      setAmount('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-900">Support This Project</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className={`w-full h-48 rounded-lg overflow-hidden mb-4 ${project.imageGradient || 'bg-gradient-to-br from-blue-500 to-purple-600'}`}>
              {project.imageUrl ? (
                <img src={project.imageUrl} alt={project.projectTitle} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white">
                  <Heart className="w-16 h-16" />
                </div>
              )}
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2">{project.projectTitle}</h3>
            <p className="text-sm text-gray-600 mb-4">{project.description}</p>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-semibold text-gray-900">
                  ${project.raised.toLocaleString()} raised
                </span>
                <span className="text-gray-600">of ${project.goal.toLocaleString()} goal</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div
                  className="bg-blue-600 h-2.5 rounded-full transition-all"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                ></div>
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <TrendingUp className="w-4 h-4" />
                <span>{progress.toFixed(1)}% funded</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Contribution Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 font-semibold">
                $
              </span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                min="1"
                step="0.01"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">Enter the amount you&apos;d like to contribute</p>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleDonate}
              disabled={!amount || parseFloat(amount) <= 0}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
            >
              Donate Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationModal;