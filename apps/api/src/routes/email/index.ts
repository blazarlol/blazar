import Elysia, { t } from "elysia";
import { Resend } from "resend";

const resend = new Resend(Bun.env.RESEND_API_KEY);

export const emailRoutes = new Elysia({ prefix: "/email" })
  .post(
    "/email-verification",
    async ({ body }) => {
      try {
        const { email, code, token } = body;

        const { data, error } = await resend.emails.send({
          from: "Blazar <onboarding@blazar.lol>",
          to: [email],
          subject: "Email Verification",
          text: `
          Your verification code is ${code}
          
          Activate your account by entering the link below:
          http://localhost:8080/auth/email-verification/${token}
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
        code: t.String(),
        token: t.String(),
      }),
    }
  )
  .post(
    "/password-reset",
    async ({ body }) => {
      try {
        const { email, token } = body;

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
