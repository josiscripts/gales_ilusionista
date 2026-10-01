import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  company: z.string().trim().max(120).optional().nullable(),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional().nullable(),
  event_type: z.string().trim().max(80),
  event_date: z.string().trim().max(30).optional().nullable(),
  city: z.string().trim().max(120).optional().nullable(),
  message: z.string().trim().min(1).max(2000),
});

export const submitContactRequest = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("contact_requests").insert({
      name: data.name,
      company: data.company || null,
      email: data.email,
      phone: data.phone || null,
      event_type: data.event_type,
      event_date: data.event_date || null,
      city: data.city || null,
      message: data.message,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });
