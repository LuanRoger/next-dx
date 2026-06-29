"use client";

import { useQueryStates } from "nuqs";
import UserIdForm from "@/components/user-id-form";
import type { FormSchema } from "@/components/user-id-form/schemas";
import { pageSearchParams } from "../../search-params";

export default function UserIdUpdate() {
  const [userIdQuery, setUserIdQuery] = useQueryStates(pageSearchParams, {
    shallow: false,
  });
  const { userId } = userIdQuery;
  const parsedUserId = userId ? userId.toString() : undefined;

  function onSubmit(data: FormSchema) {
    const { userId } = data;
    if (!userId) {
      setUserIdQuery({ userId: null });
      return;
    }

    const userIdNumber = Number.parseInt(userId, 10);
    setUserIdQuery({ userId: userIdNumber });
  }

  return <UserIdForm onSubmit={onSubmit} userId={parsedUserId} />;
}
