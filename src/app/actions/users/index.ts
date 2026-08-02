"use server";

import { ENV } from "varlock/env";
import { actionClient } from "@/lib/safe-actions";
import { getUsersSchema } from "./schemas";

export const getUsers = actionClient.action(async () => {
  const baseUrl = ENV.JSON_PLACEHOLDER_URL;

  const response = await fetch(`${baseUrl}/users`);
  const data = await response.json();
  const parsedData = await getUsersSchema.parseAsync(data);

  return parsedData;
});
