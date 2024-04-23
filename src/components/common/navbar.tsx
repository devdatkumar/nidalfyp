import Link from "next/link";
import { ModeToggle } from "../ui/mode-toggle";
import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/auth";

function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button type="submit">Sign Out</Button>
    </form>
  );
}

const Navbar = async () => {
  const session = await auth();
  return (
    <div className="grid grid-cols-2 border-b-2 border-black dark:border-white">
      <div className="flex pl-2 items-center underline">
        <Button variant="outline">
          <Link href={"/"}>The Attendance System!</Link>
        </Button>
      </div>
      <div className="gap-x-2 p-1 flex justify-end">
        <div className="">
          {session?.user ? (
            <div className="flex justify-between gap-2">
              <Button asChild>
                <Link href={"/teacher"}>Dashboard</Link>
              </Button>
              <SignOut />
            </div>
          ) : (
            <Button asChild>
              <Link href={"/authenticate"}>Verify!</Link>
            </Button>
          )}
        </div>
        <div className="">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
