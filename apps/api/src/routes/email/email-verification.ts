import { CustomError } from "@blazar/helpers";
import Elysia, { error, t } from "elysia";
import { Resend } from "resend";

export const emailVerification = new Elysia().post(
  "/email-verification",
  async ({ body }) => {
    try {
      const { email, code, token } = body;

      const resend = new Resend(Bun.env.RESEND_API_KEY);

      const { data, error } = await resend.emails.send({
        from: "Blazar <onboarding@blazar.lol>",
        to: [email],
        subject: "Email Verification",
        text: `
        Your verification code is ${code}
        
        Activate your account by entering the link below:
        ${Bun.env.CLIENT_URL}/auth/email-verification/${token}
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
      code: t.String(),
      token: t.String(),
    }),
  }
);
