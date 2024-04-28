"use server";
import fsPromises from "fs/promises";
import path from "path";
const dataFilePath = path.join(process.cwd(), "/src/lib/webauthnKeys.json");
import keys from "@/lib/webauthnKeys.json";

const registerAction = async (credential: {
  id: string;
  publicKey: string;
  algorithm: "RS256" | "ES256";
}) => {
  keys.push(credential);
  await fsPromises.writeFile(dataFilePath, JSON.stringify(keys));
};

export { registerAction };
