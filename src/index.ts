import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "@quantqdev/sample-trpc-server-type";
import "./polyfill";

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000",
    }),
  ],
});

async function main() {
  /**
   * Inferring types
   */
  const users = await trpc.userList.query();
  //    ^?
  console.log("Users:", users);

  const createdUser = await trpc.userCreate.mutate({ name: "sachinraja" });
  //    ^?
  console.log("Created user:", createdUser);

  const user = await trpc.userById.query("1");
  //    ^?
  console.log("User 1:", user);

  const usersAfter = await trpc.userList.query();
  console.log("Users after:", usersAfter);
}

main().catch(console.error);
