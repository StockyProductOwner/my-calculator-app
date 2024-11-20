import React, { useState, useEffect } from 'react'; 
import { Calculator, Equal, Plus, Minus, X, Divide, Delete } from 'lucide-react';

function App() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);

  const handleKeyPress = (e: KeyboardEvent) => {
    const key = e.key;
    if (key.match(/[0-9]/) || key === '.') {
      handleNumber(key);
    } else if (['+', '-', '*', '/', '=', 'Enter'].includes(key)) {
      handleOperator(key === 'Enter' ? '=' : key);
    } else if (key === 'Backspace') {
      handleClear();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [display, equation]);

  const handleNumber = (num: string) => {
    if (shouldResetDisplay) {
      setDisplay(num);
      setShouldResetDisplay(false);
    } else {
      if (num === '.' && display.includes('.')) return;
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperator = (op: string) => {
    if (op === '=') {
      try {
        const result = eval(equation + display).toString();
        setDisplay(result);
        setEquation('');
      } catch {
        setDisplay('Error');
      }
    } else {
      setEquation(equation + display + op);
      setShouldResetDisplay(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
  };

  const Button = ({ children, onClick, className = '' }: { 
    children: React.ReactNode; 
    onClick: () => void; 
    className?: string; 
  }) => (
    <button
      onClick={onClick}
      className={`h-16 text-lg font-medium rounded-xl transition-all duration-200 
      active:scale-95 hover:bg-opacity-90 ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6 bg-indigo-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calculator className="h-6 w-6" />
            <h1 className="text-xl font-semibold">Modern Calculator</h1>
          </div>
          <span className="text-sm opacity-75">{equation}</span>
        </div>
        
        <div className="p-6 bg-gray-50">
          <div className="bg-white rounded-xl p-4 mb-4 shadow-inner">
            <input
              type="text"
              value={display}
              readOnly
              className="w-full text-right text-3xl font-semibold bg-transparent outline-none"
            />
          </div>

          <div className="grid grid-cols-4 gap-3">
            <Button
              onClick={handleClear}
              className="bg-red-500 text-white col-span-2"
            >
              <div className="flex items-center justify-center gap-2">
                <Delete className="h-5 w-5" />
                Clear
              </div>
            </Button>
            <Button
              onClick={() => handleOperator('/')}
              className="bg-indigo-100 text-indigo-600"
            >
              <Divide className="h-5 w-5 mx-auto" />
            </Button>
            <Button
              onClick={() => handleOperator('*')}
              className="bg-indigo-100 text-indigo-600"
            >
              <X className="h-5 w-5 mx-auto" />
            </Button>

            {[7, 8, 9].map((num) => (
              <Button
                key={num}
                onClick={() => handleNumber(num.toString())}
                className="bg-gray-100"
              >
                {num}
              </Button>
            ))}
            <Button
              onClick={() => handleOperator('-')}
              className="bg-indigo-100 text-indigo-600"
            >
              <Minus className="h-5 w-5 mx-auto" />
            </Button>

            {[4, 5, 6].map((num) => (
              <Button
                key={num}
                onClick={() => handleNumber(num.toString())}
                className="bg-gray-100"
              >
                {num}
              </Button>
            ))}
            <Button
              onClick={() => handleOperator('+')}
              className="bg-indigo-100 text-indigo-600"
            >
              <Plus className="h-5 w-5 mx-auto" />
            </Button>

            {[1, 2, 3].map((num) => (
              <Button
                key={num}
                onClick={() => handleNumber(num.toString())}
                className="bg-gray-100"
              >
                {num}
              </Button>
            ))}
            <Button
              onClick={() => handleOperator('=')}
              className="bg-indigo-600 text-white row-span-2"
            >
              <Equal className="h-5 w-5 mx-auto" />
            </Button>

            <Button
              onClick={() => handleNumber('0')}
              className="bg-gray-100 col-span-2"
            >
              0
            </Button>
            <Button
              onClick={() => handleNumber('.')}
              className="bg-gray-100"
            >
              .
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;