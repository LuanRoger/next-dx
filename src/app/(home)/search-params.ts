import { createLoader, parseAsInteger } from "nuqs/server";

export const pageSearchParams = {
  userId: parseAsInteger,
};

export const pageSearchParamsLoader = createLoader(pageSearchParams);
