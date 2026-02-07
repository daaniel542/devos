import type { AuthError, Session, User } from '@supabase/supabase-js';

import { supabase } from '@/src/lib/supabaseClient';

type Credentials = {
  email: string;
  password: string;
};

export type AuthResult<T> = {
  data: T | null;
  error: AuthError | null;
};

export const getSession = async (): Promise<AuthResult<Session>> => {
  const { data, error } = await supabase.auth.getSession();
  return { data: data.session, error };
};

export const signIn = async ({ email, password }: Credentials): Promise<AuthResult<Session>> => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { data: data.session, error };
};

export const signUp = async ({ email, password }: Credentials): Promise<AuthResult<User>> => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  return { data: data.user, error };
};

export const signOut = async (): Promise<AuthResult<null>> => {
  const { error } = await supabase.auth.signOut();
  return { data: null, error };
};
