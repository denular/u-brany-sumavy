import { z } from "astro/zod";
import { ActionError, defineAction } from "astro:actions";
import { FROM_EMAIL, RESEND_API_KEY, TO_EMAIL } from "astro:env/server";
import { Resend } from "resend";
import NewsLetter from "../components/NewsLetter.astro";

const resend = new Resend(RESEND_API_KEY);

export const server = {
  send: defineAction({
    accept: "form",
    input: z.object({
      firstName: z.string(),
      surName: z.string(),
      email: z.email(),
      message: z.string(),
      newsletter: z.boolean(),
    }),
    handler: async (input) => {
      const { data, error } = await resend.emails.send({
        from: FROM_EMAIL,
        to: TO_EMAIL,
        subject: `Zpráva od ${input.firstName} ${input.surName} ${input.newsletter ? " + newsletter" : ""}`,
        html: `<p>Od: <strong>${input.firstName} ${input.surName}</strong></p>
			<p>Email: ${input.email}</p>
			<p>${input.message}</p>
			${input.newsletter ? "<p><strong>PŘIDAT DO NEWSLETTERU!</strong></p>" : ""}`,
      });

      if (error) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: error.message,
        });
      }

      return data;
    },
  }),
};
