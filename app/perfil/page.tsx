import WannabeProfessorForm from "./WannabeProfessorForm"

export default function Page() {
  return (
    <div className="flex-1 flex flex-col w-full sm:max-w-lg px-8 justify-center gap-6">
      <h1 className="text-3xl font-bold">Perfil</h1>
      <WannabeProfessorForm />
    </div>
  )
}
