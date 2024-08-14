import { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Card from '../components/Card';
import Footer from '../components/Footer'; // Ensure this is Footer.tsx if using TypeScript
import { TracingBeam } from "../components/ui/tracing-beam";


export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  const apps = [
    { title: 'G-Dorks', description: 'Google dorks are advanced search queries used to uncover hidden or sensitive information on the internet by exploiting search engine indexing.', link: 'https://g-dorks.appship.me' },
    { title: 'PDF-Convator', description: 'Stirling PDF is a tool for generating and managing PDF documents, often used for creating reports, forms, and other document types in a customizable and efficient manner', link: 'https://pdf.appship.me/' },
    { title: 'App 3', description: 'Description for App 3', link: '#' },
    { title: 'ComingSoon', description: 'ComingSoon', link: '#' },
  ];
  
 

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="flex flex-col min-h-screen dark:bg-white bg-black  dark:bg-dot-black/[0.2] bg-dot-white/[0.2]">
        <Head>
          <title>Appship </title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Navbar />

        <main className="flex-1">
          <Hero />

          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold mb-8">Our Apps</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {apps.map((app, index) => (
                  <Card key={index} {...app} />
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}
