import { getServerSession } from "next-auth";
import { authOption } from "./auth/[...nextauth]/route";

export async function getUserid() {
  const session = await getServerSession(authOption);
  return session?.user.id;
}
