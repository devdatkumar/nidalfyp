import { client, server } from "@passwordless-id/webauthn";
import { registerAction } from "./webauthn-action";

export default async function registration() {
  const username = "testname";

  const registration = await client.register(
    username,
    "randomly-generated-challenge-to-avoid-replay-attacks"
  );

  const expected = {
    challenge: "randomly-generated-challenge-to-avoid-replay-attacks",
    origin: "http://localhost:3000",
  };
  const registrationParsed = await server.verifyRegistration(
    registration,
    expected
  );

  registerAction(registrationParsed.credential);
}
