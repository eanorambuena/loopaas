import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import CourseCard from "@/components/CourseCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default async function CursosPage() {
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
        <h1 className='text-3xl font-bold'>Cursos</h1>
        <main className="grid grid-cols-2 gap-20 md:grid-cols-3">
          {courses?.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </main>
      </div>

      <Footer />
    </div>
  );
}
