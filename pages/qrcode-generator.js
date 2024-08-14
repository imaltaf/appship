import QRCodeGenerator from '../components/QRCodeGenerator/QRCodeGenerator';
import Footer from '../components/Footer'; // Ensure this is Footer.tsx if using TypeScript


export default function QRCodePage() {
  return (
    <div className="min-h-screen dark:bg-white bg-black  dark:bg-dot-black/[0.2] bg-dot-white/[0.2] p-8">
      <QRCodeGenerator />
      <Footer />
    </div>
  );
}
