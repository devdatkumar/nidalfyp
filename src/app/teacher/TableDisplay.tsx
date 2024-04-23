"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useToast } from "@/components/ui/use-toast";
import { ClassForm } from "./classform";
import courses from "@/lib/courses.json";
import { removeCourseAction } from "./courseAction";

export function TableDisplay({ sessionEmail }: any) {
  const { toast } = useToast();
  async function removeItem(index: Number, className: String) {
    const res = await removeCourseAction(index);

    toast({
      title: res?.error,
    });

    toast({
      title: "Removed class",
      description: className,
    });
  }

  async function attendance(index: Number, className: String) {
    // const res = await removeCourseAction(index);
    // toast({
    //   title: res?.error,
    // });
    // toast({
    //   title: "Removed class",
    //   description: className,
    // });
  }

  return (
    <Table className="shadow-2xl">
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Course Name</TableHead>
          <TableHead>Course Type</TableHead>
          <TableHead>Date & Time</TableHead>
          <TableHead>Location</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {courses.map(
          (course, index) =>
            course.sessionEmail == sessionEmail && (
              <TableRow key={index}>
                <TableCell>
                  <Button
                    variant="outline"
                    onClick={() => removeItem(index, course.className)}
                  >
                    Delete
                  </Button>
                </TableCell>
                <TableCell>{course.className}</TableCell>
                <TableCell>{course.classType}</TableCell>
                <TableCell>{course.datetime}</TableCell>
                <TableCell>{course.location}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    onClick={() => attendance(index, course.className)}
                  >
                    Attendance {"->"}
                  </Button>
                </TableCell>
              </TableRow>
            )
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={6} align={"center"}>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Create Class</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader className="py-4">
                  <SheetTitle>Create a new class</SheetTitle>
                </SheetHeader>
                <ClassForm sessionEmail={sessionEmail} />
              </SheetContent>
            </Sheet>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
