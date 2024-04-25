"use server";
import { revalidatePath } from "next/cache";
import fsPromises from "fs/promises";
import path from "path";
const dataFilePath = path.join(process.cwd());
import attendance from "@/lib/attendance.json";

const markAttendance = async (index: number, email: string) => {
  revalidatePath("/");
  attendance.at(index)?.markedAttendance!.push(email)!;

  try {
    await fsPromises.writeFile(
      dataFilePath + "/src/lib/attendance.json",
      JSON.stringify(attendance)
    );
  } catch (error) {
    return { error: "Unknown Error found" };
  }
};

export { markAttendance };
