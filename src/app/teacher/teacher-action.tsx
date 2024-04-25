"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import fsPromises from "fs/promises";
import path from "path";
const dataFilePath = path.join(process.cwd());
import { courseSchema } from "@/lib/schema";
import courses from "@/lib/courses.json";
import attendance from "@/lib/attendance.json";
import { setTimeout } from "timers/promises";

const addCourseAction = async (courseData: z.infer<typeof courseSchema>) => {
  if (!courseData) {
    return { error: "Invalid Data" };
  }

  try {
    revalidatePath("/");
    courses.push(courseData);
    await fsPromises.writeFile(
      dataFilePath + "/src/lib/courses.json",
      JSON.stringify(courses)
    );
  } catch (error) {
    return { error: "Unknown Error found" };
  }
};

const removeCourseAction = async (index: Number) => {
  const updatedCourses = courses.filter((_, i) => i !== index);
  try {
    revalidatePath("/");
    await fsPromises.writeFile(
      dataFilePath + "/src/lib/courses.json",
      JSON.stringify(updatedCourses)
    );
  } catch (error) {
    return { error: "Unknown Error found" };
  }
};

const addAttendanceAction = async (index: number) => {
  try {
    revalidatePath("/");
    let courseData = courses.at(index);
    attendance.push(courseData!);
    await fsPromises.writeFile(
      dataFilePath + "/src/lib/attendance.json",
      JSON.stringify(attendance)
    );
  } catch (error) {
    return { error: "Unknown Error found" };
  }
};

const attendanceAction = async (index: number) => {
  addAttendanceAction(index);
  const res = await setTimeout(60000, "1 min");
  res && removeCourseAction(index);
};

export { addCourseAction, removeCourseAction, attendanceAction };
