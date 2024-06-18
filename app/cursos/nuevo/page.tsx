import Footer from "@/components/Footer"
import GoBackLink from "@/components/GoBackLink"
import Header from "@/components/Header"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import NewCourseForm from "./NewCourseForm"

export default async function Page() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return redirect("/login")

  const { data: userInfo } = await supabase
    .from("userInfo")
    .select("*")
    .eq("userId", user.id)
    .single()

  if (!userInfo) return redirect("/login")

  return (
    <div className="flex-1 w-full flex flex-col gap-5 items-center">
      <Header />
      <div className="animate-in flex-1 flex flex-col gap-6 p-6 opacity-0 px-3 w-full max-w-4xl">
        <GoBackLink />
        <h1 className='text-3xl font-bold'>Nuevo Curso</h1>
        <NewCourseForm userInfoId={userInfo.id} />
      </div>
      <Footer />
    </div>
  )
}
