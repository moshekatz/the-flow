import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log("🔍 Environment check:", {
  hasUrl: !!supabaseUrl,
  hasKey: !!supabaseKey,
  url: supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : "MISSING",
});

if (!supabaseUrl || !supabaseKey) {
  console.warn("⚠️ Missing Supabase environment variables!");
  console.warn("Create a .env file in your project root with:");
  console.warn("VITE_SUPABASE_URL=https://your-project.supabase.co");
  console.warn("VITE_SUPABASE_ANON_KEY=your-anon-key-here");
  console.warn("Using placeholder values - authentication won't work.");
}

const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseKey || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder-key"
);

export { supabase };
