import axios from "axios";
import { useRouter } from "next/navigation";

export async function actionRegister(formData: FormData) {
  const email = formData.get("email") as string;
  const name = formData.get("name") as string;
  const password = formData.get("password") as string;
  const router = useRouter();

  if (!email || !password) throw new Error("Email and password are required");

  const reg = await axios.post(`${process.env.BASE_URL}/api/register`, {
    data: { email, name, password },
  });

  if (!reg || reg.status >= 400) throw new Error("error when register:");

  router.replace("/signin");
}
