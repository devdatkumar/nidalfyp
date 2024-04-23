import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Student() {
  const session = await auth();

  if (!session) {
    redirect("/authenticate");
  }
  return <>Hello</>;
}
