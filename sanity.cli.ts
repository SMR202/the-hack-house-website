import { config as loadEnv } from "dotenv";
import { defineCliConfig } from "sanity/cli";

loadEnv({ path: ".env.local" });

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  },
});
