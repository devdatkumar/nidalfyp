import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { TableDisplay } from "./TableDisplay";
import { Card } from "@/components/ui/card";
// import Extra from "./extra";

export default async function Teacher() {
  const session = await auth();
  if (!session) {
    redirect("/authenticate");
  }

  return (
    <>
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 gap-5">
        Teacher
        <div className="md:grid gap-4">
          <Card className="p-4 ml-auto mr-auto">
            <TableDisplay sessionEmail={session.user?.email!} />
          </Card>
        </div>
      </div>
    </>
  );
}
