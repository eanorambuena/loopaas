import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default async function Page({ params }: { params: { abbreviature: string, semester: string, id: string } }) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: evaluation } = await supabase
    .from("evaluations")
    .select("*")
    .eq("id", params.id)
    .order("created_at", { ascending: false });

  return (
    <div className="flex-1 w-full flex flex-col gap-5 items-center">
      <div className="w-full">
        <div className="py-6 font-bold bg-purple-950 text-center hidden">
          This is a protected page that you can only see as an authenticated
          user
        </div>
        <Header />
      </div>

      <div className="animate-in flex-1 flex flex-col gap-6 p-6 opacity-0 max-w-4xl px-3">
      <h1 className='text-3xl font-bold'>Evaluacionón {params.id}</h1>
        <main className="grid gap-20 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          a
        </main>
      </div>

      <Footer />
    </div>
  );
}
