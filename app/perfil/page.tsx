import WannabeProfessorForm from "./WannabeProfessorForm"

export default function Page() {
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <h1 className="text-3xl font-bold">Perfil</h1>
      <WannabeProfessorForm />
    </div>
  )
}
