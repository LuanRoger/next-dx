"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { type FormSchema, formSchema } from "./schemas";

type UserIdFormProps = {
  userId?: string;
  onSubmitAction: (data: FormSchema) => void;
};

export default function UserIdForm({
  userId,
  onSubmitAction,
}: UserIdFormProps) {
  const form = useForm<FormSchema>({
    defaultValues: {
      userId: userId ?? "",
    },
    mode: "onChange",
    resolver: zodResolver(formSchema),
  });

  return (
    <form
      aria-label="User ID update form"
      className="flex flex-col gap-2"
      noValidate
      onSubmit={form.handleSubmit(onSubmitAction)}
    >
      <Controller
        control={form.control}
        name="userId"
        // biome-ignore lint/performance/noJsxPropsBind: Need to render using the React Hook Form
        render={({ field, fieldState: { error } }) => (
          <Field>
            <FieldLabel htmlFor="userId">
              User ID {userId ? `(${userId})` : ""}
            </FieldLabel>
            <Input
              id="userId"
              placeholder="Enter user ID"
              type="text"
              {...field}
              aria-describedby={error ? "userId-error" : undefined}
              aria-invalid={!!error}
            />
            {error !== undefined && <FieldError>{error.message}</FieldError>}
          </Field>
        )}
      />
      <Button aria-label="Update user ID" type="submit">
        Update
      </Button>
    </form>
  );
}
