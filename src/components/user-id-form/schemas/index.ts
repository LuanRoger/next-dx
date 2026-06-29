import z from "zod";

export const formSchema = z.object({
  userId: z.string().optional(),
});

export type FormSchema = z.infer<typeof formSchema>;
