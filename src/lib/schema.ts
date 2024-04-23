import { z } from "zod";

export const signUpFormSchema = z.object({
  firstName: z.string().min(1, { message: "This field has to be filled." }),
  lastName: z.string().min(1, { message: "This field has to be filled." }),
  accountType: z.enum(["Student", "Teacher"]),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z.string().min(8, { message: "Enter at least 8 characters." }),
});

export const signInFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z.string().min(8, { message: "Enter at least 8 characters." }),
});

export const courseSchema = z.object({
  sessionEmail: z.string().email("Compelete the email by adding .com"),
  className: z.string().min(1, { message: "This field has to be filled." }),
  classType: z.enum(["Lecture", "Tutorial", "Extra"]),
  datetime: z.string(),
  location: z.string().min(1, { message: "This field has to be filled." }),
  students: z
    .array(z.string())
    .refine((value) => value.some((student) => student), {
      message: "You have to select at least one student.",
    }),
});
