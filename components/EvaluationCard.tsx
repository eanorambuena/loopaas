import { createClient } from "@/utils/supabase/server";
import { evaluationPath } from "@/utils/paths";
import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";
import Badge from "@/components/Badge";

export default async function EvaluationCard({ evaluation, params }: { evaluation: any, params: any }) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <Link className="w-full max-w-4xl rounded-md bg-foreground/5 hover:bg-foreground/10" href={evaluationPath({ ...params, ...evaluation })}>
      <Image src={"/background-color.webp"/* evaluation.img */} alt={evaluation.title} className="w-full rounded-t-md" width={500} height={500} />
      <div className="flex gap-2 p-4 flex-col">
        <div className="flex gap-2 justify-between">
          <p className="text-sm font-normal text-gray-400">{params.abbreviature}</p>
          <Badge>{params.semester}</Badge>
        </div>
        <h3 className="text-xl font-bold">{evaluation.title}</h3>
      </div>
    </Link>
  );
}
