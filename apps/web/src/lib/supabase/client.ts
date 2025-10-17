import { createBrowserClient } from "@supabase/ssr";

export const supabaseBrowser = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        name: "sb-darlemlih-auth",
        lifetime: 60 * 60 * 24 * 30,
        sameSite: "lax"
      }
    }
  );

