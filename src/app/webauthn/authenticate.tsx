import { client, server } from "@passwordless-id/webauthn";
import keys from "@/lib/webauthnKeys.json";

export default async function authenticate() {
  const authentication = await client.authenticate(
    [keys[0].id],
    "randomly-generated-challenge-to-avoid-replay-attacks",
    {
      authenticatorType: "auto",
      userVerification: "required",
      timeout: 60000,
    }
  );

  const credentialKey = {
    id: keys[0].id,
    publicKey: keys[0].publicKey,
    algorithm: "ES256",
  } as const;

  const expected = {
    challenge: "randomly-generated-challenge-to-avoid-replay-attacks",
    origin: "https://nidalfyp.vercel.app/",
    userVerified: true,
    counter: 0,
  };

  const authenticationParsed = await server.verifyAuthentication(
    authentication,
    credentialKey,
    expected
  );

  console.log("this is:", authenticationParsed);
}
