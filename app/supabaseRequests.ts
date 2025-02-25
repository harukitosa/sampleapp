import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const fetchData = async (tableName: string) => {
  const { data, error } = await supabase
    .from(tableName)
    .select('*');

  if (error) throw new Error(error.message);
  return data;
};

export const insertData = async (tableName: string, data: object) => {
  const { error } = await supabase
    .from(tableName)
    .insert(data);

  if (error) throw new Error(error.message);
};

export const updateData = async (tableName: string, id: string, data: object) => {
  const { error } = await supabase
    .from(tableName)
    .update(data)
    .eq('id', id);

  if (error) throw new Error(error.message);
};

export const deleteData = async (tableName: string, id: string) => {
  const { error } = await supabase
    .from(tableName)
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
};