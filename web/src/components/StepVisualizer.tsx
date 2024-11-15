import React from 'react';
import MatrixAnimation from './MatrixAnimation';

interface StepVisualizerProps {
  step: number;
}

const StepVisualizer: React.FC<StepVisualizerProps> = ({ step }) => {
  const originalParams = 10 * 10;
  const traditionalTrainingTime = "13 hours";
  const loraTrainingTime = "4.3 hours";

  const renderVisualization = () => {
    switch (step) {
      case 0:
        return (
          <div className="flex flex-col items-center gap-4">
            <div className="border border-zinc-800 rounded-none p-6 bg-black/50">
              <MatrixAnimation 
                rows={10} 
                cols={10} 
                isActive={true} 
              />
            </div>
            <div className="text-center">
              <p className="text-zinc-300">Original Model</p>
              <p className="text-zinc-400 text-sm mt-1">Large Parameter Space</p>
              <p className="text-zinc-400 text-sm mt-1">{`Parameters: ${originalParams}`}</p>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-8">
              <div className="border border-zinc-800 rounded-none p-6 bg-black/50">
                <MatrixAnimation rows={10} cols={10} />
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl text-zinc-400">→</span>
                <span className="text-sm text-zinc-500">Quantize</span>
              </div>
              <div className="border border-zinc-800 rounded-none p-6 bg-black/50">
                <MatrixAnimation 
                  rows={10} 
                  cols={10} 
                  highlight 
                  isActive={true}
                />
              </div>
            </div>
            <div className="text-center">
              <p className="text-zinc-300">4-bit Precision Conversion</p>
              <p className="text-zinc-400 text-sm mt-1">{`Parameters remain the same: ${originalParams}`}</p>
              <p className="text-zinc-400 text-sm mt-1">Memory usage reduced due to quantization</p>
            </div>
          </div>
        );

      case 2:
        const reducedParams1 = 10 * 3;
        const reducedParams2 = 3 * 10;
        const totalReducedParams = reducedParams1 + reducedParams2;

        return (
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-8">
              <div className="border border-zinc-800 rounded-none p-6 bg-black/50">
                <MatrixAnimation rows={10} cols={10} />
              </div>
              <span className="text-2xl text-zinc-400">≈</span>
              <div className="border border-zinc-800 rounded-none p-6 bg-black/50">
                <MatrixAnimation 
                  rows={10} 
                  cols={3} 
                  highlight 
                  isActive={true}
                />
              </div>
              <span className="text-xl text-zinc-400">×</span>
              <div className="border border-zinc-800 rounded-none p-6 bg-black/50">
                <MatrixAnimation 
                  rows={3} 
                  cols={10} 
                  highlight 
                  isActive={true}
                />
              </div>
            </div>
            <div className="text-center">
              <p className="text-zinc-300">Low-Rank Decomposition</p>
              <p className="text-zinc-400 text-sm mt-1">{`Original Parameters: ${originalParams}`}</p>
              <p className="text-zinc-400 text-sm mt-1">{`Reduced Parameters: ${totalReducedParams}`}</p>
              <p className="text-zinc-400 text-sm mt-1">{`Parameter reduction: ~${Math.round((totalReducedParams / originalParams) * 100)}% of original`}</p>
              <p className="text-zinc-400 text-sm mt-1">{`Training Time (Traditional): ${traditionalTrainingTime}`}</p>
              <p className="text-zinc-400 text-sm mt-1">{`Training Time (LoRA): ${loraTrainingTime}`}</p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center justify-center gap-8">
              <div className="border border-zinc-800 rounded-none p-6 bg-black/50">
                <MatrixAnimation 
                  rows={10} 
                  cols={10} 
                  highlight 
                  isActive={true} 
                />
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl text-zinc-400">✓</span>
                <span className="text-sm text-zinc-300">Optimized</span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-zinc-300">Task-Specific Model</p>
              <p className="text-zinc-400 text-sm mt-1">{`Optimized Parameters: ${originalParams}`}</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-black/20 rounded-none border border-zinc-800 p-8 transition-all duration-500">
      {renderVisualization()}
    </div>
  );
};

export default StepVisualizer;
