import Link from "next/link";
import { ModeToggle } from "../ui/mode-toggle";
import { Button } from "@/components/ui/button";
import { auth, signOut, signIn } from "@/auth";
import users from "@/lib/users.json";

function SignOutButton() {
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

function getUser(email: string) {
  return users.find((user) => user.email === email) ?? null;
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
                <Link
                  href={
                    getUser(session?.user?.email!)
                      ?.accountType?.toString()
                      .toLowerCase()!
                  }
                >
                  Dashboard
                </Link>
              </Button>
              <SignOutButton />
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
