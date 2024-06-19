import { SubmitButton } from "@/components/SubmitButton"

export default function Page({ searchParams }: { searchParams: { message: string } }) {
  const handleSubmit = async (formData: FormData) => {
    "use server"

    console.log("formData", formData)
  }

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <h1 className="text-3xl font-bold">Perfil</h1>
      <h2 className="text-xl font-bold">Solicitar Cuenta de Profesor</h2>
      <p className="text-foreground">
        Para solicitar una cuenta de profesor, ingresa tu token de Canvas
      </p>
      <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
        <label className="text-md" htmlFor="email">
          Token de Canvas
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="token"
          type="text"
          placeholder="Token de Canvas"
          required
        />
        <SubmitButton
          formAction={handleSubmit}
          className="bg-green-700 rounded-md px-4 py-2 text-green-50 mb-2 font-bold"
          pendingText="Iniciando Sesión..."
        >
          Solicitar Cuenta de Profesor
        </SubmitButton>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  )
}
