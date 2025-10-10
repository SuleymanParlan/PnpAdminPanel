import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://whdpfmqjsglhruqqeyeg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndoZHBmbXFqc2dsaHJ1cXFleWVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyNTQ4ODAsImV4cCI6MjA3MjgzMDg4MH0.K8vZ8DT14mizDcHLU8yMmTi0lUYcDX3iTEChpU6THfY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);