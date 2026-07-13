import { NextResponse } from "next/server";
import { submitToCrm } from "@/lib/crm";
import { requestDemoSchema } from "@/lib/forms";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = requestDemoSchema.safeParse(body);

  if (!parsed.success || parsed.data.website) {
    return NextResponse.json({ ok: false, errors: parsed.success ? undefined : parsed.error.flatten() }, { status: 400 });
  }

  await submitToCrm({
    type: "request-demo",
    submittedAt: new Date().toISOString(),
    data: parsed.data
  });

  return NextResponse.json({ ok: true });
}
