import { Database } from "./../../database.types";

import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://qxiemyivrrbjhkkprhtw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4aWVteWl2cnJiamhra3ByaHR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5ODI2NDIsImV4cCI6MjA2NDU1ODY0Mn0.Vs8t0VwMp6VJhyz57Lr8srpiYIRxvfICNz5OAc-AwvY";
const supabase = createClient<Database>(supabaseUrl, supabaseKey);
export default supabase;
