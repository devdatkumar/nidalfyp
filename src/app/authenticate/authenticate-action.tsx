"use server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import fsPromises from "fs/promises";
import path from "path";
import users from "@/lib/users.json";
const dataFilePath = path.join(process.cwd(), "/src/lib/users.json");

function getUser(email: string) {
  return users.find((user) => user.email === email) ?? null;
}

const signInAction = async (formData: { email: string; password: string }) => {
  let user = getUser(formData.email);
  let userType: string = "/" + user?.accountType.toLowerCase()!;

  try {
    revalidatePath("/");
    await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirectTo: userType,
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
    let user = getUser(formData.email);
    let userType: string = "/" + user?.accountType.toLowerCase()!;

    await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirectTo: userType,
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

export { signInAction, signUpAction };
