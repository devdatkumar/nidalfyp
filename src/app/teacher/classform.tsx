"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { courseSchema } from "@/lib/schema";
import { Checkbox } from "@/components/ui/checkbox";
import Users from "@/lib/users.json";
import { addCourseAction } from "./teacher-action";

export function ClassForm({ sessionEmail }: any) {
  const { toast } = useToast();

  // 1. Define your form.
  const form = useForm<z.infer<typeof courseSchema>>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      sessionEmail: sessionEmail,
      className: "",
      location: "",
      datetime: "",
      students: [],
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof courseSchema>) {
    const res = await addCourseAction(values);

    toast({
      title: res?.error,
    });

    toast({
      title: "Created class",
      description: values.className,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="sessionEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Email</FormLabel>
              <FormControl>
                <Input defaultValue={sessionEmail} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="className"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Name</FormLabel>
              <FormControl>
                <Input placeholder="Course Name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="classType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course type</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select course type"></SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Lecture">Lecture</SelectItem>
                  <SelectItem value="Tutorial">Tutorial</SelectItem>
                  <SelectItem value="Extra">Extra</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="datetime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>DateTime</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Location</FormLabel>
              <FormControl>
                <Input placeholder="Course Location..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="students"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Students</FormLabel>
                <FormDescription>
                  Select the students you want to include.
                </FormDescription>
              </div>
              <div className="overflow-y-auto max-h-40 space-y-2">
                {Users.map((user) => (
                  <FormField
                    key={user.email}
                    control={form.control}
                    name="students"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={user.email}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(user.email)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, user.email])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== user.email
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {user.firstName} {user.lastName}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
