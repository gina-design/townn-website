import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, type } = await req.json();

  if (!email || !type) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const properties =
    type === "waitlist"
      ? { waitlist: true }
      : { beta_tester: true };

  const headers = {
    Authorization: `Bearer ${process.env.LOOPS_API_KEY}`,
    "Content-Type": "application/json",
  };

  const body = JSON.stringify({
    email,
    subscribed: true,
    source: "townn.io",
    ...properties,
  });

  // Try to create first
  const createRes = await fetch("https://app.loops.so/api/v1/contacts/create", {
    method: "POST",
    headers,
    body,
  });

  // If contact already exists, update instead
  if (createRes.status === 409) {
    const updateRes = await fetch("https://app.loops.so/api/v1/contacts/update", {
      method: "PUT",
      headers,
      body,
    });

    if (!updateRes.ok) {
      console.error("Loops update error:", await updateRes.text());
      return NextResponse.json({ error: "Signup failed" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  }

  if (!createRes.ok) {
    console.error("Loops create error:", await createRes.text());
    return NextResponse.json({ error: "Signup failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
