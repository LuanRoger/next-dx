import z from "zod";

export const formSchema = z.object({
  userId: z
    .string()
    .optional()
    .refine(
      (val) => val === undefined || val === "" || !Number.isNaN(Number(val)),
      {
        message: "User ID must be a valid number",
      }
    ),
});

export type FormSchema = z.infer<typeof formSchema>;
