import Link from "next/link"
import AuthButton from "@/components/AuthButton"
import { createClient } from "@/utils/supabase/server"

export default async function Header() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient()
      return true
    } catch (e) {
      return false
    }
  }

  const isSupabaseConnected = canInitSupabaseClient()
  if (!isSupabaseConnected) return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-4xl flex justify-end items-center p-3 text-sm" />
    </nav>
  )

  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const noUserOrUserInfoFallback = (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-4xl flex justify-end items-center p-3 text-sm">
        <AuthButton />
      </div>
    </nav>
  )

  if (!user) return noUserOrUserInfoFallback

  const { data: userInfo } = await supabase
    .from("userInfo")
    .select("*")
    .eq("userId", user.id)
    .single()

  if (!userInfo) return noUserOrUserInfoFallback

  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
        <Link
          href="/perfil"
          className="py-2 px-3 flex rounded-md no-underline hover:shadow-[0_20px_30px_rgba(_8,_184,_112,_0.7)]"
        >
          Perfil
        </Link>
        <AuthButton />
      </div>
    </nav>
  )
}
