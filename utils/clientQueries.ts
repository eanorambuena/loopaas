import { Evaluation } from "./schema"
import { createClient } from "./supabase/client"

export async function createResponse(evaluation: Evaluation, userInfoId: string, data: any) {
  const supabase = createClient()
  const { data: error } = await supabase
    .from('responses')
    .insert([
      {
        evaluationId: evaluation.id,
        userInfoId: userInfoId,
        data,
      }
    ])
  return error
}
