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
        </TableRow>
      </TableHeader>
      <TableBody>
        {attendance.map(
          (item, index) =>
            item.sessionEmail == sessionEmail && (
              <TableRow key={index}>
                <TableCell>{item.marked.toString()}</TableCell>
                <TableCell>{item.className}</TableCell>
                <TableCell>{item.classType}</TableCell>
                <TableCell>{item.datetime}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>{item.students.join(", ")}</TableCell>
              </TableRow>
            )
        )}
      </TableBody>
    </Table>
  );
}
