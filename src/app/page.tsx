import { SignInGithub, SignOut } from "@/components/common/auth-buttons";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ModeToggle />
      <SignInGithub />
      <SignOut />
    </main>
  );
}
