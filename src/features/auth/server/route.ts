import { Hono } from "hono";
import { ID } from "node-appwrite";
import { deleteCookie, setCookie } from "hono/cookie";

import { zValidator } from "@hono/zod-validator";
import { createAdminClient } from "@/lib/appwrite";
import { sessionMiddleware } from "@/lib/session-middleware";

import { AUTH_COOKIE } from "../constants";
import { loginSchema, registerSchema } from "../schemas";
import { SRC_CURRENT, SRC_HOME, SRC_LOGIN, SRC_LOGOUT, SRC_REGISTER } from "./constant-routes";

const app = new Hono()
  .get(SRC_CURRENT, sessionMiddleware,
    (c) => {
      const user = c.get(`user`);

      return c.json({ data: user });
    })
  .post(SRC_LOGIN, zValidator(`json`, loginSchema),
    async (c) => {
      const { email, password } = c.req.valid(`json`);
      const { account } = await createAdminClient();
      const session = await account.createEmailPasswordSession(
        email,
        password
      );
      setCookie(c, AUTH_COOKIE, session.secret, {
        path: SRC_HOME,
        httpOnly: true,
        secure: true,
        sameSite: `strict`,
        maxAge: 60 * 60 * 24 * 30,
      });
      return c.json({ success: true });
    }
  )
  .post(SRC_REGISTER, zValidator(`json`, registerSchema),
    async (c) => {
      const { name, email, password } = c.req.valid(`json`);
      const { account } = await createAdminClient();
      const user = await account.create(
        ID.unique(),
        email,
        password,
        name,
      );
      const session = await account.createEmailPasswordSession(
        email,
        password
      );
      setCookie(c, AUTH_COOKIE, session.secret, {
        path: SRC_HOME,
        httpOnly: true,
        secure: true,
        sameSite: `strict`,
        maxAge: 60 * 60 * 24 * 30,
      });
      return c.json({ data: user });
    }
  )
  .post(SRC_LOGOUT, sessionMiddleware,
    async (c) => {
      const account = c.get(`account`);

      deleteCookie(c, AUTH_COOKIE);
      await account.deleteSession(`current`);

      return c.json({ sucess: true });
    });
export default app;