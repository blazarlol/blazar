import { CustomError } from "@blazar/helpers";
import Elysia, { error, t } from "elysia";
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
          ${Bun.env.CLIENT_URL}/auth/password-reset/${token}
        `,
      });

      if (error) {
        throw new CustomError(error.message);
      }

      return { message: "Email sent successfully.", data };
    } catch (err) {
      if (err instanceof CustomError) {
        return error(err.status, err.message);
      }

      return error(500, (err as Error).message);
    }
  },
  {
    body: t.Object({
      email: t.String(),
      token: t.String(),
    }),
  }
);
