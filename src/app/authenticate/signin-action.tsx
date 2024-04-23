"use server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";

const signInAction = async (formData: { email: string; password: string }) => {
  try {
    revalidatePath("/");
    await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        default:
          return { error: "Unknown Error Found" };
      }
    }
    throw error;
  }
};

export default signInAction;
