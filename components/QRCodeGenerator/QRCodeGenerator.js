import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { ChromePicker } from 'react-color';

export default function QRCodeGenerator() {
  const [text, setText] = useState('https://appship.me');
  const [foreground, setForeground] = useState('#000000ff');
  const [background, setBackground] = useState('#ffffffff');
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState('medium');
  const [qrcode, setQrcode] = useState('');

  const errorCorrectionLevels = ['low', 'medium', 'quartile', 'high'];

  useEffect(() => {
    generateQRCode();
  }, [text, foreground, background, errorCorrectionLevel]);

  const generateQRCode = async () => {
    try {
      const qrCodeDataURL = await QRCode.toDataURL(text.trim(), {
        color: {
          dark: foreground,
          light: background,
        },
        errorCorrectionLevel: errorCorrectionLevel,
        width: 1024,
      });
      setQrcode(qrCodeDataURL);
    } catch (err) {
      console.error(err);
    }
  };

  const downloadQRCode = () => {
    const link = document.createElement('a');
    link.href = qrcode;
    link.download = 'qr-code.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg max-w-3xl w-full glassmorphism">
        <h2 className="text-center text-2xl font-semibold mb-8 text-gray-900 dark:text-white">
          QR Code Generator
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Text:
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="mt-1 block w-full p-2 border border-purple-400 rounded-md shadow-sm dark:bg-gray-700 dark:border-purple-600 dark:text-gray-300"
            rows="3"
            placeholder="Your link or text..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-purple-400 rounded-lg p-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Foreground color:
            </label>
            <ChromePicker
              color={foreground}
              onChangeComplete={(color) => setForeground(color.hex + 'ff')}
              className="mt-2"
            />
          </div>

          <div className="border border-purple-400 rounded-lg p-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Background color:
            </label>
            <ChromePicker
              color={background}
              onChangeComplete={(color) => setBackground(color.hex + 'ff')}
              className="mt-2"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Error resistance:
          </label>
          <select
            value={errorCorrectionLevel}
            onChange={(e) => setErrorCorrectionLevel(e.target.value)}
            className="mt-1 block w-full p-2 border border-purple-400 rounded-md shadow-sm dark:bg-gray-700 dark:border-purple-600 dark:text-gray-300"
          >
            {errorCorrectionLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6 flex flex-col items-center">
          {qrcode && (
            <div className="border border-purple-400 rounded-lg p-4 mb-4 w-full max-w-xs glassmorphism">
              <img src={qrcode} alt="Generated QR Code" className="mb-4 w-full" />
              <p className="text-center text-sm text-gray-700 dark:text-gray-300 break-all">
                {text}
              </p>
            </div>
          )}
          <button
            onClick={downloadQRCode}
            className="px-6 py-2 bg-purple-600 text-white rounded-md shadow-md hover:bg-purple-700"
          >
            Download QR Code
          </button>
        </div>
      </div>
    </div>
  );
}
