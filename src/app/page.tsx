import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col">
      <div className="min-h-screen grid grid-cols-2 h-screen space-x-2 bg-indigo-500 bg-[url('/circuit-board.svg')]">
        <div className="flex justify-center items-center">
          <Card className="sm:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle>Students</CardTitle>
              <CardDescription className="max-w-lg text-balance leading-relaxed animate-bounce">
                Every class is a brick in the foundation of your future.
                Don&apos;t skip a single one!
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild>
                <Link href={"/student"}>Learn !</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
        <div className="flex justify-center items-center">
          <Card className="sm:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle>Teachers</CardTitle>
              <CardDescription className="max-w-lg text-balance leading-relaxed">
                Attendance matters, because every student deserves a chance to
                learn.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild>
                <Link href={"/teacher"}>Share ...</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
