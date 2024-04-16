import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
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

  if (!evaluation) {
    return redirect(`/cursos/${params.abbreviature}/${params.semester}`);
  }

  console.log(evaluation);
  const evaluationInfo = evaluation as any as {
    title: string;
    instructions: string;
    deadLine: string;
    sections: Record<string, string>;
    questions: Record<string, string>;
  };

  const { register, handleSubmit } = useForm();

  function dataHandler(data) {
    const filteredData = Object.keys(data).filter((key) => data[key] !== null)
    let numberOfQuestions = 0
    Object.entries(evaluation.questions).forEach(([key, value]) => {
      if (value.type !== 'linear') numberOfQuestions += 1
      else numberOfQuestions += value.criteria.length
    })
    const numberOfSections = Object.keys(sections).length
    if (filteredData.length < numberOfQuestions * numberOfSections) {
      toast({
        title: 'Error',
        description: 'Por favor, completa todas las preguntas',
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    }
    else {
      setResponses(filteredData)
    }
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
      <h1 className='text-3xl font-bold'>{evaluationInfo.title}</h1>
        <main className="grid gap-20 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <form onSubmit={ handleSubmit(dataHandler) } className='w-full sm:max-w-4xl mx-auto flex flex-col gap-6 bg-slate-100 dark:bg-slate-800 p-6'>
          <h1 className='text-2xl font-bold dark:text-gray-100'>{ title ?? 'Cargando' }</h1>
          <p className='dark:text-gray-100'>{ instructions ?? 'Cargando' }</p>
          <p className='dark:text-gray-100'>Fecha límite: { deadLine ? `${deadLineDay} / ${deadLineMonth} / ${deadLineYear}` : 'Cargando' } </p>
          { Object.entries(sections).map(([sectionKey, sectionValue]) => (
            <fieldset key={ sectionKey } className='w-full'>
              <legend className='text-lg font-bold dark:text-gray-100'>{ sectionValue }</legend>
              { Object.entries(questions ?? {}).map(([questionKey, question]) => (
                <Question
                  id={`${sectionKey}-${questionKey}`}
                  key={`${sectionKey}-${questionKey}`}
                  question={ question }
                  sectionKey={ sectionKey }
                  register={ register }
                />
              ))}
            </fieldset>
          ))}
          { children }
          <SubmitButton>Enviar</SubmitButton>
        </form>
        </main>
      </div>

      <Footer />
    </div>
  );
}
