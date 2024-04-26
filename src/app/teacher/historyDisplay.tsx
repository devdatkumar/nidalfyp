"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import attendance from "@/lib/attendance.json";
import { Button } from "@/components/ui/button";
import { endAttendanceAction } from "./teacher-action";
import { toast } from "@/components/ui/use-toast";

export function HistoryDisplay({ sessionEmail }: any) {
  return (
    <Table className="shadow-2xl">
      <TableHeader>
        <TableRow>
          <TableHead>marked</TableHead>
          <TableHead>Course Name</TableHead>
          <TableHead>Course Type</TableHead>
          <TableHead>Date & Time</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Students</TableHead>
          <TableHead>Attendace marked by</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {attendance.map(
          (item, index) =>
            item.sessionEmail == sessionEmail && (
              <TableRow key={index}>
                <TableCell>
                  <Button
                    variant="outline"
                    onClick={async () => {
                      await endAttendanceAction(index, !item.marked);
                      toast({
                        title: "Class Attendace",
                        description: !item.marked,
                      });
                    }}
                  >
                    {item.marked.toString()}
                  </Button>
                </TableCell>
                <TableCell>{item.className}</TableCell>
                <TableCell>{item.classType}</TableCell>
                <TableCell>{item.datetime}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>{item.students.join(", ")}</TableCell>
                <TableCell>{item.markedAttendance.join(", ")}</TableCell>
              </TableRow>
            )
        )}
      </TableBody>
    </Table>
  );
}
