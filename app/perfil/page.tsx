import WannabeProfessorForm from "./WannabeProfessorForm"

export default function Page() {
  return (
    <div className="animate-in flex-1 flex flex-col w-full sm:max-w-lg px-8 justify-center gap-6">
      <h1 className="text-3xl font-bold">Perfil</h1>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Información Personal</h2>
        <p className="text-foreground">
          Actualiza tu información personal
        </p>
      </section>
      <WannabeProfessorForm />
    </div>
  )
}
