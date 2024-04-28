"use client";
import { Button } from "@/components/ui/button";
import authenticate from "./authenticate";

export default async function webauthn() {
  return (
    <div className="m-4 space-x-5">
      <Button onClick={async () => await authenticate()}>
        Authenticate User
      </Button>
    </div>
  );
}
