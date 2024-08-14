import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { ChromePicker } from 'react-color';

const wifiEncryptions = ['WEP', 'WPA', 'nopass', 'WPA2-EAP'];
const EAPMethods = [
  'MD5', 'POTP', 'GTC', 'TLS', 'IKEv2', 'SIM', 'AKA', 'AKA\'', 'TTLS', 'PWD',
  'LEAP', 'PSK', 'FAST', 'TEAP', 'EKE', 'NOOB', 'PEAP'
];
const EAPPhase2Methods = ['None', 'MSCHAPV2'];

function escapeString(str) {
  return str.replace(/([\\;,:"])/g, '\\$1');
}

function getQrCodeText(options) {
  const {
    ssid, password, encryption, eapMethod,
    isHiddenSSID, eapAnonymous, eapIdentity,
    eapPhase2Method
  } = options;

  if (!ssid) {
    return null;
  }
  if (encryption === 'nopass') {
    return `WIFI:S:${escapeString(ssid)};;`;
  }
  if (encryption !== 'WPA2-EAP' && password) {
    return `WIFI:S:${escapeString(ssid)};T:${encryption};P:${escapeString(password)};${isHiddenSSID ? 'H:true' : ''};`;
  }
  if (encryption === 'WPA2-EAP' && password && eapMethod) {
    if (!eapIdentity && !eapAnonymous) {
      return null;
    }
    if (eapMethod === 'PEAP' && !eapPhase2Method) {
      return null;
    }
    const identity = eapAnonymous ? 'A:anon' : `I:${escapeString(eapIdentity)}`;
    const phase2 = eapPhase2Method !== 'None' ? `PH2:${eapPhase2Method};` : '';
    return `WIFI:S:${escapeString(ssid)};T:WPA2-EAP;P:${escapeString(password)};E:${eapMethod};${phase2}${identity};${isHiddenSSID ? 'H:true' : ''};`;
  }
  return null;
}

const WifiQRCodeGenerator = () => {
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [encryption, setEncryption] = useState('WPA');
  const [eapMethod, setEapMethod] = useState('');
  const [isHiddenSSID, setIsHiddenSSID] = useState(false);
  const [eapAnonymous, setEapAnonymous] = useState(false);
  const [eapIdentity, setEapIdentity] = useState('');
  const [eapPhase2Method, setEapPhase2Method] = useState('None');
  const [foreground, setForeground] = useState('#000000');
  const [background, setBackground] = useState('#ffffff');
  const [qrcode, setQrcode] = useState(null);

  useEffect(() => {
    const generateQRCode = async () => {
      const text = getQrCodeText({
        ssid,
        password,
        encryption,
        eapMethod,
        isHiddenSSID,
        eapAnonymous,
        eapIdentity,
        eapPhase2Method
      });

      if (text) {
        try {
          const url = await QRCode.toDataURL(text, {
            color: {
              dark: foreground,
              light: background
            },
            errorCorrectionLevel: 'M'
          });
          setQrcode(url);
        } catch (error) {
          console.error('Error generating QR code:', error);
          setQrcode(null);
        }
      } else {
        setQrcode(null);
      }
    };

    generateQRCode();
  }, [ssid, password, encryption, eapMethod, isHiddenSSID, eapAnonymous, eapIdentity, eapPhase2Method, foreground, background]);

  const handleDownload = () => {
    if (qrcode) {
      const a = document.createElement('a');
      a.href = qrcode;
      a.download = 'qr-code.png';
      a.click();
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 md:flex md:space-x-6">
          <div className="md:w-1/2 space-y-4">
            <select
              value={encryption}
              onChange={(e) => setEncryption(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select encryption method</option>
              {wifiEncryptions.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>

            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={ssid}
                onChange={(e) => setSsid(e.target.value)}
                placeholder="Your WiFi SSID..."
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isHiddenSSID}
                  onChange={(e) => setIsHiddenSSID(e.target.checked)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="text-sm">Hidden</span>
              </label>
            </div>

            {encryption !== 'nopass' && (
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your WiFi Password..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}

            {encryption === 'WPA2-EAP' && (
              <>
                <select
                  value={eapMethod}
                  onChange={(e) => setEapMethod(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select EAP method</option>
                  {EAPMethods.map((method) => (
                    <option key={method} value={method}>
                      {method}
                    </option>
                  ))}
                </select>

                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={eapIdentity}
                    onChange={(e) => setEapIdentity(e.target.value)}
                    placeholder="Your EAP Identity..."
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={eapAnonymous}
                      onChange={(e) => setEapAnonymous(e.target.checked)}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="text-sm">Anonymous</span>
                  </label>
                </div>

                <select
                  value={eapPhase2Method}
                  onChange={(e) => setEapPhase2Method(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select EAP Phase 2 method</option>
                  {EAPPhase2Methods.map((method) => (
                    <option key={method} value={method}>
                      {method}
                    </option>
                  ))}
                </select>
              </>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Foreground color:</label>
              <ChromePicker
                color={foreground}
                onChange={(color) => setForeground(color.hex)}
                disableAlpha={true}
                className="w-full max-w-[200px]"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Background color:</label>
              <ChromePicker
                color={background}
                onChange={(color) => setBackground(color.hex)}
                disableAlpha={true}
                className="w-full max-w-[200px]"
              />
            </div>
          </div>

          <div className="md:w-1/2 mt-6 md:mt-0 flex flex-col items-center justify-center space-y-4">
            {qrcode ? (
              <>
                <div className="w-64 h-64">
                  <img alt="wifi-qrcode" src={qrcode} className="w-full h-full object-contain" />
                </div>
                <button
                  onClick={handleDownload}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Download QR code
                </button>
              </>
            ) : (
              <p className="text-gray-500 text-center">Fill in the details to generate a QR code</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WifiQRCodeGenerator;