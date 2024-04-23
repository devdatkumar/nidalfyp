"use server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import fsPromises from "fs/promises";
import path from "path";
import users from "@/lib/users.json";
const dataFilePath = path.join(process.cwd(), "/src/lib/users.json");

const signUpAction = async (formData: {
  firstName: string;
  lastName: string;
  accountType: "Student" | "Teacher";
  email: string;
  password: string;
}) => {
  if (!formData) {
    return { error: "Invalid Credentials" };
  }

  try {
    revalidatePath("/");
    users.push(formData);
    await fsPromises.writeFile(dataFilePath, JSON.stringify(users));

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

export default signUpAction;
