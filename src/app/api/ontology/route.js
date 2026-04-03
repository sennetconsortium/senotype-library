import { NextResponse } from 'next/server'
import ONTOLOGY from "@/lib/ontology"

export async function GET() {

  const ontology = await ONTOLOGY.buildCache()
  return NextResponse.json({ ontology })
}