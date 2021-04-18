import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { withApollo as createWithApollo } from "next-apollo";
import { API_URL } from "../constants";
import { PaginatedHotels, PaginatedReviews } from "../generated/graphql";

export const client = new ApolloClient({
  uri: API_URL,
  credentials: "include",
  link: createUploadLink({
    uri: API_URL,
    fetchOptions: { credentials: "include" },
  }) as never,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          hotels: {
            keyArgs: [],
            merge: (
              existing: PaginatedHotels | undefined,
              incoming: PaginatedHotels
            ): PaginatedHotels => ({
              ...incoming,
              hotels: [...(existing?.hotels || []), ...incoming.hotels],
            }),
          },
          reviews: {
            keyArgs: ["filter"],
            merge: (
              existing: PaginatedReviews | undefined,
              incoming: PaginatedReviews
            ): PaginatedReviews => ({
              ...incoming,
              reviews: [...(existing?.reviews || []), ...incoming.reviews],
            }),
          },
        },
      },
    },
  }),
});

export const withApollo = createWithApollo(client);
