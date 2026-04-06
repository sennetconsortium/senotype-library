import { NextResponse } from 'next/server'
import ONTOLOGY from "@/lib/ontology"

export async function GET() {

  const result = await ONTOLOGY.buildCache()
  return NextResponse.json({ ontology: result?.ontologyJson }, { status: result?.ontologyJson ? 200 : 404 })
}