import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gncckyltvihgnxtvtdej.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImduY2NreWx0dmloZ254dHZ0ZGVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMxODQwNTgsImV4cCI6MjAzODc2MDA1OH0.6h97AHSDrzb50q_9uYYvFOhzsSAAfDfYI1qV19gj6vg';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
