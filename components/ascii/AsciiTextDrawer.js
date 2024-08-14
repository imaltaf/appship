import { useState, useEffect } from 'react';
import figlet from 'figlet';

const AsciiTextDrawer = () => {
  const [input, setInput] = useState('Ascii ART');
  const [font, setFont] = useState('Standard');
  const [width, setWidth] = useState(80);
  const [output, setOutput] = useState('');
  const [errored, setErrored] = useState(false);
  const [processing, setProcessing] = useState(false);

  const fonts = [
    'Standard', 'Slant', 'Big', // Add fonts you need
  ];

  useEffect(() => {
    const generateAscii = async () => {
      setProcessing(true);
      try {
        const options = {
          font: font,
          width: width,
          whitespaceBreak: true,
        };
        figlet.text(input, options, (err, text) => {
          if (err) {
            setErrored(true);
            console.error('Figlet error:', err);
            return;
          }
          setOutput(text ?? '');
          setErrored(false);
        });
      } catch (error) {
        setErrored(true);
        console.error('Error:', error);
      } finally {
        setProcessing(false);
      }
    };

    generateAscii();
  }, [input, font, width]);

  return (
    <div className="max-w-lg mx-auto p-6 bg-white bg-opacity-10 backdrop-blur-md rounded-lg border border-purple-500">
      <label className="block text-sm font-medium text-white mb-2">Your text:</label>
      <textarea
        className="w-full p-3 rounded-lg text-black"
        rows={4}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Your text to draw"
      />

      <div className="my-4 h-px bg-purple-500"></div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-white mb-2">Font:</label>
          <select
            className="w-full p-3 rounded-lg text-black"
            value={font}
            onChange={(e) => setFont(e.target.value)}
          >
            {fonts.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-2">Width:</label>
          <input
            type="number"
            className="w-full p-3 rounded-lg text-black"
            value={width}
            onChange={(e) => setWidth(parseInt(e.target.value))}
            placeholder="Width of the text"
          />
        </div>
      </div>

      <div className="my-4 h-px bg-purple-500"></div>

      {processing ? (
        <div className="flex justify-center items-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-purple-500" />
          <span className="ml-2 text-white">Loading font...</span>
        </div>
      ) : errored ? (
        <div className="text-center text-red-500">Current settings resulted in error.</div>
      ) : (
        <div className="mt-4">
          <label className="block text-sm font-medium text-white mb-2">Ascii Art text:</label>
          <textarea
            className="w-full p-3 rounded-lg text-black"
            rows={8}
            value={output}
            readOnly
          />
        </div>
      )}
    </div>
  );
};

export default AsciiTextDrawer;
