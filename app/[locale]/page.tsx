import {useTranslations} from 'next-intl';
import Link from 'next/link';
 
export default function HomePage() {
  const t = useTranslations('nav');
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">{t('home')}</h1>
      <nav className="space-x-4">
        <Link href="/es" className="text-blue-600 hover:underline">Español</Link>
        <Link href="/en" className="text-blue-600 hover:underline">English</Link>
      </nav>
      <div className="mt-8">
        <Link href="/es/organizaciones" className="bg-blue-500 text-white px-4 py-2 rounded mr-4">
          {t('organizations')} (ES)
        </Link>
        <Link href="/en/organizaciones" className="bg-blue-500 text-white px-4 py-2 rounded">
          {t('organizations')} (EN)
        </Link>
      </div>
    </div>
  );
}
