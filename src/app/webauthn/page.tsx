"use client";
import { Button } from "@/components/ui/button";
import registration from "./registration";
import authenticate from "./authenticate";
import { isLocalAuthenticator } from "@passwordless-id/webauthn/dist/esm/client";

export default async function webauthn() {
  return (
    <div className="m-4 space-x-5">
      <Button onClick={async () => await registration()}>
        Register Device locally
      </Button>
      <Button onClick={async () => await authenticate()}>
        Authenticate User
      </Button>
    </div>
  );
}
