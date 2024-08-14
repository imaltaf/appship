import Link from 'next/link';

export default function AppCard({ title, description, link }) {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200">{title}</h3>
      <p className="mt-2 text-gray-700 dark:text-gray-400">{description}</p>
      <div className="mt-4">
        <Link href={link}>
          <a className="inline-block px-4 py-2 bg-purple-600 text-white rounded-md shadow-md hover:bg-purple-700">
            Open App
          </a>
        </Link>
      </div>
    </div>
  );
}
