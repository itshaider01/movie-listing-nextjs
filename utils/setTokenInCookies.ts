"use server";

import { cookies } from "next/headers";

interface Token {
  token: string;
  expires: string;
}

const storeTokensInCookies = async (tokens: { access: Token }) => {
  // Add await here
  const cookieStore = await cookies();

  // Use set() method
  cookieStore.set("access-token", tokens.access.token, {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    expires: new Date(tokens.access.expires),
  });
};

export default storeTokensInCookies;
