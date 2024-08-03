import { createClient } from "@supabase/supabase-js";
import { Database } from "../_types/supabase_schema";

export const supabase = createClient<Database>(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);
