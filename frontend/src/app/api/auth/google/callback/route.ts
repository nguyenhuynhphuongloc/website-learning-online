import { createSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const accessToken = searchParams.get("accessToken"); // ✅ accessToken (camelCase)
  const refreshToken = searchParams.get("refreshToken");
  const userId = searchParams.get("userId");
  const name = searchParams.get("name");
  const Role = searchParams.get("role")

  if (!accessToken || !refreshToken || !userId || !name || !Role) {
    return new Response("Missing parameters", { status: 400 });
  }

 

  await createSession({
    user: {
      id: userId,
      name: name,
      role: Role
    },
    accessToken,
    refreshToken,
  });

  return redirect("/pages/HomePage"); // ✅ Quan trọng: phải return
}
