import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gnfboywmgkqkugwpuyoj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImduZmJveXdtZ2txa3Vnd3B1eW9qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAxMTEzMjEsImV4cCI6MjA1NTY4NzMyMX0.kMMEm2LTtPkkBA5cMAbGRw9FDX7H0XRHiFhE83TX1mM';

export const supabase = createClient(supabaseUrl, supabaseKey);
