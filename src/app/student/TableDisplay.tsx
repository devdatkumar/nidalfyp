"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useToast } from "@/components/ui/use-toast";
import attendance from "@/lib/attendance.json";
import { markAttendance } from "./student-action";

const attendanceList = (userEmail: string) => {
  const filteredItems = attendance.filter((item) => {
    return (
      item.marked === false &&
      item.students.includes(userEmail) &&
      !item.markedAttendance?.includes(userEmail)
    );
  });

  const indexesToUpdate = filteredItems.map((item) => attendance.indexOf(item));

  return { filteredItems, indexesToUpdate };
};

export function TableDisplay({ sessionEmail }: any) {
  const { toast } = useToast();

  const { filteredItems, indexesToUpdate } = attendanceList(sessionEmail);

  return (
    <Table className="shadow-2xl">
      <TableHeader>
        <TableRow>
          <TableHead>Course Name</TableHead>
          <TableHead>Course Type</TableHead>
          <TableHead>Date & Time</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Mark attendance</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredItems.map((course, index) => (
          <TableRow key={index}>
            <TableCell>{course.className}</TableCell>
            <TableCell>{course.classType}</TableCell>
            <TableCell>{course.datetime}</TableCell>
            <TableCell>{course.location}</TableCell>
            <TableCell>
              <Button
                variant="outline"
                onClick={async () => {
                  toast({
                    title: "Attendance started:" + course.className,
                    description: "course will be removed in 2 min",
                  });
                  await markAttendance(indexesToUpdate[index], sessionEmail)!;
                }}
              >
                Mark {"->"}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
