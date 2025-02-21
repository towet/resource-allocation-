import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cwghijppmuqqczbxtnja.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3Z2hpanBwbXVxcWN6Ynh0bmphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAxMTk5NTksImV4cCI6MjA1NTY5NTk1OX0.LFSLv5MVcMUuoCz5tUepgq1s9NElUvmOIc3vjrwpj18';

export const supabase = createClient(supabaseUrl, supabaseKey);
