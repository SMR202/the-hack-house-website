import "server-only";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

let writeClient: ReturnType<typeof createClient> | null = null;

export function getWriteClient() {
  if (writeClient) return writeClient;

  const token = process.env.SANITY_API_TOKEN ?? process.env.SANITY_EDITOR_TOKEN;
  if (!projectId || !dataset || !token) {
    throw new Error("Sanity write configuration is missing");
  }

  writeClient = createClient({ projectId, dataset, apiVersion, token, useCdn: false });
  return writeClient;
}
