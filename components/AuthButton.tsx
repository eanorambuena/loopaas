import { createClient } from "@/utils/supabase/server"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function AuthButton() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  let name;
  if (user) {
    const { data: userInfo } = await supabase
      .from("userInfo")
      .select("*")
      .eq("userId", user.id)
      .single()
    name = userInfo.firstName
  }

  const signOut = async () => {
    "use server"

    const supabase = createClient()
    await supabase.auth.signOut()
    return redirect("/login")
  };

  return user ? (
    <div className="flex items-center gap-4">
      <span className="hidden sm:inline">
        Hola, {name}!
      </span>
      <form action={signOut}>
        <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          Cerrar sesión
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Iniciar sesión
    </Link>
  )
}
