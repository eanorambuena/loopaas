import DeployButton from "../components/DeployButton";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import Footer from "../components/Footer";

export default async function Index() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className="flex-1 w-full flex flex-col items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <DeployButton />
          {isSupabaseConnected && <AuthButton />}
        </div>
      </nav>

      <div className='bg-center min-h-screen max-w-screen bg-cover bg-[url(background-color.webp)] bg-gray-800 bg-blend-multiply flex items-center justify-center'>
        <main className='px-14 mx-auto text-center py-24 lg:py-56'>
          <h1 className="sr-only">Instituto para el Desarrollo Sustentable App</h1>
          <h2 className='mb-4 text-4xl !leading-tight text-white md:text-5xl lg:text-6xl'>Convocando saberes para el<br className="hidden lg:inline" /> cuidado de la Tierra</h2>
          <p className='mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48'>En esta plataforma del Instituto para el Desarrollo Sustentable podrás encontrar las coevaluaciones de todos los cursos.</p>
          <div className='flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0'>
            <Link href='/cursos' className='inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 dark:focus:ring-emerald-900'>
              Ir a los Cursos
              <svg className='w-3.5 h-3.5 ms-2 rtl:rotate-180' aria-hidden='true'  fill='none' viewBox='0 0 14 10'>
                <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M1 5h12m0 0L9 1m4 4L9 9'/>
              </svg>
            </Link>
            <a
              href='https://desarrollosustentable.uc.cl/'
              target='_blank'
              className='inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400'
              rel='noreferrer'
            >
              Más información del IDS
            </a>  
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
