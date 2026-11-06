import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jvapzokomhnnspwhmldl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2YXB6b2tvbWhubnNwd2htbGRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk5MzQ0MjksImV4cCI6MjA0NTUxMDQyOX0.ContohKunciAnonSupabaseKamu';

export const supabase = createClient(supabaseUrl, supabaseKey);