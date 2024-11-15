import React from 'react';

interface ProcessStepProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const ProcessStep: React.FC<ProcessStepProps> = ({ 
  title, 
  description, 
  icon, 
  isActive,
  onClick 
}) => {
  return (
    <div 
      className={`
        group relative rounded-none bg-black border ${isActive ? 'border-zinc-700' : 'border-zinc-800'} 
        overflow-hidden transition-all duration-500 hover:border-zinc-700 hover:scale-[1.02]
        p-6 cursor-pointer
        ${isActive ? 'ring-1 ring-zinc-700 shadow-lg' : ''}
      `}
      onClick={onClick}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`
          transition-colors duration-300
          ${isActive ? 'text-white' : 'text-zinc-400'}
        `}>
          {icon}
        </div>
        <h3 className={`
          text-xl font-semibold transition-colors duration-300
          ${isActive ? 'text-white' : 'text-zinc-300'}
        `}>
          {title}
        </h3>
      </div>
      <p className="text-zinc-400">{description}</p>
    </div>
  );
};

export default ProcessStep;
