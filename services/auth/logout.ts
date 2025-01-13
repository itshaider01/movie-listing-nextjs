"use server";

import { cookies } from "next/headers";

async function logout() {
  (await cookies()).delete("access-token");
}

export default logout;
