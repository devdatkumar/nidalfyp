"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import fsPromises from "fs/promises";
import path from "path";
const dataFilePath = path.join(process.cwd(), "/src/lib/courses.json");
import { courseSchema } from "@/lib/schema";
import courses from "@/lib/courses.json";

const addCourseAction = async (courseData: z.infer<typeof courseSchema>) => {
  if (!courseData) {
    return { error: "Invalid Data" };
  }

  try {
    revalidatePath("/");
    courses.push(courseData);
    await fsPromises.writeFile(dataFilePath, JSON.stringify(courses));
  } catch (error) {
    return { error: "Unknown Error found" };
  }
};

export const removeCourseAction = async (index: Number) => {
  const updatedCourses = courses.filter((_, i) => i !== index);
  try {
    revalidatePath("/");
    await fsPromises.writeFile(dataFilePath, JSON.stringify(updatedCourses));
  } catch (error) {
    return { error: "Unknown Error found" };
  }
};

export default addCourseAction;
