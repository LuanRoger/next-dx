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

    const trimedUserId = userId?.trim();
    const isEmpty = !trimedUserId || trimedUserId === "";
    if (isEmpty) {
      setUserIdQuery({ userId: null });
      return;
    }

    const userIdNumber = Number.parseInt(trimedUserId, 10);

    if (!Number.isNaN(userIdNumber)) {
      setUserIdQuery({ userId: userIdNumber });
    }
  }

  return <UserIdForm onSubmitAction={onSubmit} userId={parsedUserId} />;
}
