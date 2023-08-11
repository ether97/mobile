import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../types";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000" }),
  reducerPath: "main",
  endpoints: (build) => ({
    registerUser: build.mutation<User, User>({
      query: ({ ...user }) => ({
        url: "user/register/",
        method: "POST",
        body: user,
      }),
    }),

    loginUser: build.mutation<
      { _id: string; token: string },
      Omit<User, "name">
    >({
      query: ({ ...user }) => ({
        url: "user/login/",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,

  useLoginUserMutation,
} = api;
