import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { TableDisplay } from "@/app/student/TableDisplay";
import { Card } from "@/components/ui/card";
export default async function Student() {
  const session = await auth();

  if (!session) {
    redirect("/authenticate");
  }
  return (
    <>
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 gap-5">
        <div className="md:grid gap-4">
          <Card className="p-4 ml-auto mr-auto">
            <TableDisplay sessionEmail={session.user?.email!} />
          </Card>
        </div>
      </div>
    </>
  );
}
