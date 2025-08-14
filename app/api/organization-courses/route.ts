import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const organizationId = searchParams.get('organizationId')
  if (!organizationId) {
    return NextResponse.json({ count: 0 })
  }
  const supabase = createClient()
  const { count, error } = await supabase
    .from('courses')
    .select('id', { count: 'exact', head: true })
    .eq('organizationId', organizationId)
  if (error) {
    return NextResponse.json({ count: 0 })
  }
  return NextResponse.json({ count: count || 0 })
}
