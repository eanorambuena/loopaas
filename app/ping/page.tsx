import { createClient } from '@/utils/supabase/server'

export default async function PingPage(props: { searchParams: Promise<{ origin: string }> }) {
  const searchParams = await props.searchParams
  const supabase = createClient()

  const { data: courses } = await supabase
    .from('courses')
    .select('*')

  return (
    <div className="animate-in flex-1 flex flex-col gap-6 p-6 opacity-0 max-w-4xl px-3">
      <h1 className='text-3xl font-bold'>Hello Ping!</h1>
      <main className="grid gap-20 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-4">
        {JSON.stringify(searchParams)}
      </main>
    </div>
  )
}

console.log('Ping')
