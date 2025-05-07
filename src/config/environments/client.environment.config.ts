import { z } from "zod";
import { createEnv } from "@t3-oss/env-nextjs";
import getConfig from "next/config";
import { NextConfig } from "next";

const isRunInDevelop = process.env.NEXT_PUBLIC_ENV === "development";

const { publicRuntimeConfig } = getConfig() as NextConfig;

export const clientEnvironment = createEnv({
  client: {
    NEXT_PUBLIC_BASE_URL: z.string().min(1),
  },
  runtimeEnv: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
});
