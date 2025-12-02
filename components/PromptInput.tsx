import React from 'react';
import { TargetAudience, OptimizationGoal } from '../types';
import type { OptimizationOptions } from '../types';

interface PromptInputProps {
  originalPrompt: string;
  setOriginalPrompt: (prompt: string) => void;
  options: OptimizationOptions;
  setOptions: (options: OptimizationOptions) => void;
  onOptimize: () => void;
  isLoading: boolean;
}

const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        <path d="m8.5 10.5 2 2" />
        <path d="m13.5 15.5 2 2" />
        <path d="m8.5 15.5 5-5" />
        <path d="m15.5 8.5-5 5" />
    </svg>
);

const SelectGroup: React.FC<{
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { [key: string]: string };
}> = ({ label, value, onChange, options }) => (
  <div>
    <label htmlFor={label} className="block text-sm font-medium text-slate-300 mb-1">
      {label}
    </label>
    <select
      id={label}
      value={value}
      onChange={onChange}
      className="w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
    >
      {Object.values(options).map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

export const PromptInput: React.FC<PromptInputProps> = ({
  originalPrompt,
  setOriginalPrompt,
  options,
  setOptions,
  onOptimize,
  isLoading,
}) => {
  return (
    <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 flex flex-col gap-6 h-full">
      <h2 className="text-xl font-semibold text-slate-100">Your Prompt</h2>
      <div className="flex-grow flex flex-col">
        <textarea
          value={originalPrompt}
          onChange={(e) => setOriginalPrompt(e.target.value)}
          placeholder="Enter the prompt you want to improve..."
          className="w-full flex-grow bg-slate-900 border border-slate-600 rounded-md p-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition resize-none"
          rows={10}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectGroup
          label="Target Audience"
          value={options.audience}
          onChange={(e) => setOptions({ ...options, audience: e.target.value as TargetAudience })}
          options={TargetAudience}
        />
        <SelectGroup
          label="Optimization Goal"
          value={options.goal}
          onChange={(e) => setOptions({ ...options, goal: e.target.value as OptimizationGoal })}
          options={OptimizationGoal}
        />
      </div>

      <button
        onClick={onOptimize}
        disabled={isLoading || !originalPrompt}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold py-3 px-4 rounded-md hover:from-purple-700 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
            Optimizing...
          </>
        ) : (
          <>
            <SparklesIcon className="w-5 h-5" />
            Optimize Prompt
          </>
        )}
      </button>
    </div>
  );
};
