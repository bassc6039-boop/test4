import React from 'react';
import { X, Sparkles, Loader2 } from 'lucide-react';

interface GeminiModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  content: string;
  homeworkTitle: string;
}

const GeminiModal: React.FC<GeminiModalProps> = ({ isOpen, onClose, isLoading, content, homeworkTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-blue-50 to-white rounded-t-2xl">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600 fill-purple-100" />
            <h3 className="font-semibold text-gray-800 text-lg">AI Помощник</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 text-gray-700 leading-relaxed">
           <div className="mb-4 text-sm text-gray-500 font-medium">
             Тема: {homeworkTitle}
           </div>
           
           {isLoading ? (
             <div className="flex flex-col items-center justify-center py-12 gap-4">
                <Loader2 className="w-10 h-10 text-academy-blue animate-spin" />
                <p className="text-gray-500 animate-pulse">Анализирую задание...</p>
             </div>
           ) : (
             <div className="prose prose-blue max-w-none text-sm whitespace-pre-line">
               {content}
             </div>
           )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeminiModal;