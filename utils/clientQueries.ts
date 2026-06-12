import { Evaluation } from './schema'

export async function createResponse(evaluation: Evaluation, userInfoId: string, data: string[]) {
  const res = await fetch(`/api/evaluations/${evaluation.id}/responses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userInfoId, data }),
  })
  return res.ok ? null : { message: 'Error creating response' }
}
