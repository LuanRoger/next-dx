import z from "zod";

export const userSchema = z.object({
  email: z.email(),
  id: z.number(),
  name: z.string(),
  username: z.string(),
});

export const getUsersSchema = z.array(userSchema);
