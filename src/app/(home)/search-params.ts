import {
  createLoader,
  createSearchParamsCache,
  parseAsInteger,
} from "nuqs/server";

export const pageSearchParams = {
  userId: parseAsInteger,
};

export const pageSearchParamsLoader = createLoader(pageSearchParams);
export const pageSearchParamsCache = createSearchParamsCache(pageSearchParams);
