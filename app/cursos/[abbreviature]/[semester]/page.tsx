import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EvaluationIcon from "@/components/icons/EvaluationIcon";
import { evaluationPath } from "@/utils/paths";

export default async function Page({ params }: { params: { abbreviature: string, semester: string } }) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: courses } = await supabase
    .from("courses")
    .select("*")
    .eq("abbreviature", params.abbreviature)
    .eq("semester", params.semester)
    .order("created_at", { ascending: false });

  if (courses?.length === 0) {
    return <div>Course not found</div>;
  }

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
      <h1 className='text-3xl font-bold'>{courses?.[0].title ?? params.abbreviature} {params.semester}</h1>
        <main className="grid gap-20 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <Link className="w-full max-w-4xl rounded-md bg-foreground/5 hover:bg-foreground/10" href={evaluationPath(params)}>
          <div className="flex gap-2 p-4 flex-col items-center justify-center">
            <EvaluationIcon size={48} />
            <h3 className="text-xl font-bold">{"Evaluaciones"}</h3>
          </div>
        </Link>
        </main>
      </div>

      <Footer />
    </div>
  );
}
