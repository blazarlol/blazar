import Elysia, { t } from "elysia";
import { Resend } from "resend";

export const passwordReset = new Elysia().post(
  "/password-reset",
  async ({ body }) => {
    try {
      const { email, token } = body;

      const resend = new Resend(Bun.env.RESEND_API_KEY);

      const { data, error } = await resend.emails.send({
        from: "Blazar <password-reset@blazar.lol>",
        to: [email],
        subject: "Password Reset",
        text: `
          Click the link below to reset your password:
          http://localhost:8080/auth/password-reset/${token}
        `,
      });

      if (error) {
        throw new Error(error.message);
      }

      return { data };
    } catch (error) {
      return { error: (error as Error).message };
    }
  },
  {
    body: t.Object({
      email: t.String(),
      token: t.String(),
    }),
  }
);
