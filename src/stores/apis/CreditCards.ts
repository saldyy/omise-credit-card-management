// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PaginationQuery } from "../../types";

// Define a service using a base URL and expected endpoints
export const creditCardsApi = createApi({
  reducerPath: "creditCardsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: builder => ({
    getPokemonByName: builder.query<any, string>({
      query: name => `pokemon/${name}`,
    }),
    getListCreditCards: builder.query<any, PaginationQuery>({
      query: ({ limit, offset }) => ({
        url: "pokemon",
        params: {
          limit,
          offset,
        },
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery, useGetListCreditCardsQuery } =
  creditCardsApi;
