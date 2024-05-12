import { treaty } from "@elysiajs/eden";
import Elysia, { t } from "elysia";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const emailRoutes = new Elysia({ prefix: "/email" }).post(
  "/verification",
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
          http://localhost:3000/activate?token=${token}
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
);
