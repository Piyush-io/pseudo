"use client";
import React, { useState } from 'react';
import { Brain, Cpu, Database, Layers, LightbulbIcon, Grid, Scale, Zap } from 'lucide-react';
import ProcessStep from '@/components/ProcessStep';
import StepVisualizer from '@/components/StepVisualizer';

function App() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "Pre-trained LLM",
      description: "Start with a large language model pre-trained on vast amounts of data",
      icon: <Brain className="w-6 h-6" />
    },
    {
      title: "Quantization (QLoRA)",
      description: "Reduce model precision while maintaining performance",
      icon: <Scale className="w-6 h-6" />
    },
    {
      title: "Low-Rank Adaptation",
      description: "Train small rank decomposition matrices instead of full weights",
      icon: <Grid className="w-6 h-6" />
    },
    {
      title: "Fine-tuned Model",
      description: "Resulting model adapted to specific tasks with minimal parameters",
      icon: <LightbulbIcon className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-8 py-16">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">
            LoRA & QLoRA Visualization
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Understanding Low-Rank Adaptation and Quantized Fine-tuning for Large Language Models
          </p>
        </header>

        {/* Interactive Process Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 [&:has(>*:hover)>*:not(:hover)]:opacity-50 [&:has(>*:hover)>*:not(:hover)]:blur-sm [&:has(>*:hover)>*:not(:hover)]:scale-95">
          {steps.map((step, index) => (
            <ProcessStep
              key={index}
              {...step}
              isActive={activeStep === index}
              onClick={() => setActiveStep(index)}
            />
          ))}
        </div>

        {/* Dynamic Visualization */}
        <div className="mb-16">
          <StepVisualizer step={activeStep} />
        </div>

        {/* Technical Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group relative rounded-none bg-black border border-zinc-800 overflow-hidden transition-all duration-500 hover:border-zinc-700 hover:scale-[1.02] p-6">
            <div className="flex items-center gap-3 mb-4">
              <Cpu className="w-6 h-6 text-zinc-400" />
              <h3 className="text-xl font-semibold">QLoRA Benefits</h3>
            </div>
            <ul className="space-y-3 text-zinc-400">
              <li className="flex items-start gap-2">
                <Zap className="w-5 h-5 text-zinc-400 mt-1 flex-shrink-0" />
                <span>4-bit quantization reduces memory usage by up to 75%</span>
              </li>
              <li className="flex items-start gap-2">
                <Database className="w-5 h-5 text-zinc-400 mt-1 flex-shrink-0" />
                <span>Enables fine-tuning on consumer GPUs</span>
              </li>
              <li className="flex items-start gap-2">
                <Layers className="w-5 h-5 text-zinc-400 mt-1 flex-shrink-0" />
                <span>Maintains model quality through double quantization</span>
              </li>
            </ul>
          </div>

          <div className="group relative rounded-none bg-black border border-zinc-800 overflow-hidden transition-all duration-500 hover:border-zinc-700 hover:scale-[1.02] p-6">
            <div className="flex items-center gap-3 mb-4">
              <Grid className="w-6 h-6 text-zinc-400" />
              <h3 className="text-xl font-semibold">LoRA Architecture</h3>
            </div>
            <ul className="space-y-3 text-zinc-400">
              <li className="flex items-start gap-2">
                <Layers className="w-5 h-5 text-zinc-400 mt-1 flex-shrink-0" />
                <span>Trains rank decomposition matrices instead of full weights</span>
              </li>
              <li className="flex items-start gap-2">
                <Scale className="w-5 h-5 text-zinc-400 mt-1 flex-shrink-0" />
                <span>Typically uses rank 8-32 for optimal balance</span>
              </li>
              <li className="flex items-start gap-2">
                <LightbulbIcon className="w-5 h-5 text-zinc-400 mt-1 flex-shrink-0" />
                <span>Enables efficient task-specific adaptations</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
