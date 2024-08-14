// pages/ascii-text-drawer.js
import WifiQRCodeGenerator from '../components/WifiQRCodeGenerator/WifiQRCodeGenerator';


const AsciiTextDrawerPage = () => {
  return (
    <div className="min-h-screen dark:bg-white bg-black  dark:bg-dot-black/[0.2] bg-dot-white/[0.2] flex items-center justify-center">
      <WifiQRCodeGenerator />
      
    </div>
  );
};

export default AsciiTextDrawerPage;
