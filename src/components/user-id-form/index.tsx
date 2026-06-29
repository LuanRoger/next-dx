"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { type FormSchema, formSchema } from "./schemas";

type UserIdFormProps = {
  userId?: string;
  onSubmit: (data: FormSchema) => void;
};

export default function UserIdForm({ userId, onSubmit }: UserIdFormProps) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: userId ?? "",
    },
  });

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Controller
        control={form.control}
        name="userId"
        render={({ field }) => (
          <Field>
            <FieldLabel>User ID {userId ? `(${userId})` : ""}</FieldLabel>
            <Input placeholder="0" type="text" {...field} />
          </Field>
        )}
      />
      <Button>Update</Button>
    </form>
  );
}
