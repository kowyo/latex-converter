import React, { useState, useCallback } from 'react';
import { Copy, RefreshCw, FileText, Sparkles, Github } from 'lucide-react';

export default function LatexConverter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const convertText = useCallback((text) => {
    return text.replace(/\\\[/g, '$$').replace(/\\\]/g, '$$');
  }, []);

  const handleInputChange = (e) => {
    const newInput = e.target.value;
    setInput(newInput);
    setOutput(convertText(newInput));
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  const exampleText = 'Here is an equation: \\[E = mc^2\\] and another one: \\[\\sum_{i=1}^{n} x_i = \\frac{n(n+1)}{2}\\]';

  const handleLoadExample = () => {
    setInput(exampleText);
    setOutput(convertText(exampleText));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 relative">
          {/* GitHub Link */}
          <a
            href="https://github.com/kowyo/latex-converter"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-0 right-0 p-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200"
            aria-label="View source on GitHub"
          >
            <Github className="w-6 h-6" />
          </a>
          
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 rounded-2xl shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            LaTeX Converter
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Instantly convert LaTeX bracket notation <code className="bg-gray-100 px-2 py-1 rounded text-sm">\\[ \\]</code> to 
            dollar notation <code className="bg-gray-100 px-2 py-1 rounded text-sm">$$ $$</code>
          </p>
        </div>

        {/* Main Converter */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-indigo-500" />
                  Input Text
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={handleLoadExample}
                    className="px-3 py-1.5 text-sm bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors duration-200"
                  >
                    Load Example
                  </button>
                  <button
                    onClick={handleClear}
                    className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Clear
                  </button>
                </div>
              </div>
              <div className="relative">
                <textarea
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Paste your LaTeX text with \[ and \] brackets here..."
                  className="w-full h-64 p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 resize-none font-mono text-sm bg-white shadow-sm"
                />
                <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                  {input.length} characters
                </div>
              </div>
            </div>

            {/* Output Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  Converted Output
                </h2>
                <button
                  onClick={handleCopy}
                  disabled={!output}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  <Copy className="w-4 h-4" />
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="relative">
                <textarea
                  value={output}
                  readOnly
                  placeholder="Converted text will appear here..."
                  className="w-full h-64 p-4 border-2 border-gray-200 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 font-mono text-sm resize-none shadow-sm"
                />
                <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                  {output.length} characters
                </div>
              </div>
            </div>
          </div>

          {/* Conversion Preview */}
          {input && (
            <div className="mt-8 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Conversion Preview</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Before (Bracket Notation)</h4>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 font-mono text-sm">
                    {input.split(/(\\\[|\\\])/).map((part, index) => (
                      <span
                        key={index}
                        className={part === '\\[' || part === '\\]' ? 'bg-red-200 px-1 rounded' : ''}
                      >
                        {part}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-600 mb-2">After (Dollar Notation)</h4>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 font-mono text-sm">
                    {output.split(/(\$\$)/).map((part, index) => (
                      <span
                        key={index}
                        className={part === '$$' ? 'bg-green-200 px-1 rounded' : ''}
                      >
                        {part}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Usage Guide */}
          <div className="mt-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6">How It Works</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl mb-2">📝</div>
                <h4 className="font-semibold mb-2">Paste Your Text</h4>
                <p className="text-sm opacity-90">
                  Input your LaTeX content with \\[ and \\] bracket notation
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl mb-2">⚡</div>
                <h4 className="font-semibold mb-2">Instant Conversion</h4>
                <p className="text-sm opacity-90">
                  Watch as brackets are automatically converted to $$ notation
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl mb-2">📋</div>
                <h4 className="font-semibold mb-2">Copy & Use</h4>
                <p className="text-sm opacity-90">
                  Copy the converted text and use it in your documents
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}