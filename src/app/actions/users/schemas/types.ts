import type z from "zod";
import type { getUsersSchema, userSchema } from ".";

export type UserSchema = z.infer<typeof userSchema>;
export type GetUsersSchema = z.infer<typeof getUsersSchema>;
