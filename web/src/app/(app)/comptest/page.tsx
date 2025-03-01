"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from 'components/ui/card';
import { Button } from 'components/ui/button';
import { Textarea } from 'components/ui/textarea';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Analysis {
  timeComplexity: string;
  spaceComplexity: string;
  loopNestDepth: number;
  recursion: boolean;
  dataStructures: Set<string>;
}

const ComplexityAnalyzer: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [language, setLanguage] = useState<string>('c'); // Default language set to C++
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [feedback, setFeedback] = useState<string[]>([]);

  // API call to analyze the code
  const [loading, setLoading] = useState(false);

  const analyzeCode = async () => {
    try {
        setLoading(true);
      const response = await fetch('/api/testanalyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language }),
      });
      const data = await response.json();
  
      if (response.ok && data.analysis && data.feedback) {
        // Check if dataStructures is iterable (array) or empty
        const dataStructures = Array.isArray(data.analysis.dataStructures)
          ? new Set(data.analysis.dataStructures)
          : new Set(); // Handle case where it's an empty object or non-iterable
  
        setAnalysis({
          ...data.analysis,
          dataStructures, // Now it's a Set
        });
        setFeedback(data.feedback);
      } else {
        console.error("Invalid response or error:", data.error || data);
      }
    } catch (error) {
      console.error("Error analyzing code:", error);
    } finally {
        setLoading(false);
    }
  };
  

  

  // Prepare complexity data for visualization
  const complexityData = [
    { n: 1, O1: 1, Ologn: 0, On: 1, Onlogn: 0, On2: 1, O2n: 2 },
    { n: 2, O1: 1, Ologn: 1, On: 2, Onlogn: 2, On2: 4, O2n: 4 },
    { n: 4, O1: 1, Ologn: 2, On: 4, Onlogn: 8, On2: 16, O2n: 16 },
    { n: 8, O1: 1, Ologn: 3, On: 8, Onlogn: 24, On2: 64, O2n: 256 },
    { n: 16, O1: 1, Ologn: 4, On: 16, Onlogn: 64, On2: 256, O2n: 65536 },
  ];

  const complexityColors = {
    'O(1)': '#8884d8',
    'O(log n)': '#82ca9d',
    'O(n)': '#ffc658',
    'O(n log n)': '#ff7300',
    'O(n^2)': '#ff0000',
    'O(2^n)': '#00C49F'
  };

  const getComplexityKey = (complexity: string): string => {
    const map: { [key: string]: string } = {
      'O(1)': 'O1',
      'O(log n)': 'Ologn',
      'O(n)': 'On',
      'O(n log n)': 'Onlogn',
      'O(n^2)': 'On2',
      'O(2^n)': 'O2n'
    };
    return map[complexity] || 'On'; // default to 'On' if not found
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black to-gray-900 px-6 py-12 font-sans">
      <Card className="w-full max-w-3xl bg-gray-800 border border-gray-700 shadow-lg text-gray-300">
        <CardHeader className="text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
          Algorithmic Complexity Analyzer
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Select Language</label>
            <select
            title='lang'
              value={language}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setLanguage(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 text-gray-300 py-2 px-4 rounded-lg focus:ring-2 focus:ring-purple-500 transition duration-300"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="c">C</option>
            </select>
          </div>

          <Textarea
            value={code}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCode(e.target.value)}
            placeholder="Paste your code here..."
            className="h-48 mb-4 bg-gray-900 text-gray-300 border border-gray-700 focus:ring-2 focus:ring-purple-500 transition duration-300"
          />
          <div className="flex justify-center">
            <Button
              onClick={analyzeCode}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 ease-in-out shadow-lg hover:shadow-purple-500/50"
            >
              Analyze Complexity
            </Button>
          </div>
          {loading ? (
            <p>Analyzing code...</p>
            ) : ( 
        <>
          {analysis && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-purple-400">Analysis Results:</h3>
              <p className="mt-2">Time Complexity: {analysis.timeComplexity}</p>
              <p>Space Complexity: {analysis.spaceComplexity}</p>
              <p>Maximum Loop Nesting Depth: {analysis.loopNestDepth}</p>
              <p>Recursion Detected: {analysis.recursion ? 'Yes' : 'No'}</p>
              <p>Data Structures Used: {Array.from(analysis.dataStructures).join(', ')}</p>
            </div>
          )}

          {feedback.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-purple-400">Feedback:</h3>
              <ul className="list-disc pl-5 space-y-2">
                {feedback.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {analysis && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-purple-400">Complexity Visualization:</h3>
              <div className="flex justify-center mt-4 bg-gray-900 p-4 rounded-lg shadow-md border border-gray-700">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={complexityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="n" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
                    <Legend />
                    {Object.entries(complexityColors).map(([complexity, color]) => (
                      <Line
                        key={complexity}
                        type="monotone"
                        dataKey={getComplexityKey(complexity)}
                        stroke={color}
                        strokeWidth={complexity === analysis.timeComplexity ? 3 : 1}
                        dot={complexity === analysis.timeComplexity}
                        name={complexity}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
          </>
            )
          }
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplexityAnalyzer;
  