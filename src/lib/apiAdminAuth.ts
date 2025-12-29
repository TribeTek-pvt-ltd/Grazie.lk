// src/lib/apiAdminAuth.ts
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export function verifyAdminApi(req: NextRequest): boolean {
  const token = req.cookies.get("adminToken")?.value; // Ensure cookie name matches everywhere
  if (!token) return false;

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    return true;
  } catch {
    return false;
  }
}
