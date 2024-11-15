"use client";

import React, { useState, useEffect } from 'react';

interface MatrixAnimationProps {
  rows: number;
  cols: number;
  highlight?: boolean;
  isActive?: boolean;
}

const MatrixAnimation: React.FC<MatrixAnimationProps> = ({ 
  rows, 
  cols, 
  highlight = false,
  isActive = false 
}) => {
  const [matrix, setMatrix] = useState<string[][]>([]);

  useEffect(() => {
    // Generate matrix only on client side
    const newMatrix = Array(rows).fill(0).map(() => 
      Array(cols).fill(0).map(() => Math.random().toFixed(1))
    );
    setMatrix(newMatrix);
  }, [rows, cols]);

  if (matrix.length === 0) {
    return null; // Return null during initial render
  }

  return (
    <div className="font-mono text-xs">
      {matrix.map((row, i) => (
        <div key={i} className="flex justify-center space-x-2">
          {row.map((value, j) => (
            <span 
              key={j}
              className={`
                w-6 h-6 flex items-center justify-center
                transition-colors duration-300
                ${highlight 
                  ? isActive 
                    ? 'text-white' 
                    : 'text-zinc-400'
                  : 'text-zinc-600'
                }
              `}
            >
              {value}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MatrixAnimation;
