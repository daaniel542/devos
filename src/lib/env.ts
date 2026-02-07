const readEnv = (primary: string, fallback?: string): string | undefined => {
  const value = process.env[primary] ?? (fallback ? process.env[fallback] : undefined);
  return typeof value === 'string' && value.trim().length > 0 ? value : undefined;
};

const requiredEnv = (value: string | undefined, labels: string[]): string => {
  if (!value) {
    throw new Error(`Missing environment variable. Set one of: ${labels.join(', ')}`);
  }

  return value;
};

export const env = {
  SUPABASE_URL: requiredEnv(readEnv('SUPABASE_URL', 'EXPO_PUBLIC_SUPABASE_URL'), [
    'SUPABASE_URL',
    'EXPO_PUBLIC_SUPABASE_URL',
  ]),
  SUPABASE_ANON_KEY: requiredEnv(readEnv('SUPABASE_ANON_KEY', 'EXPO_PUBLIC_SUPABASE_ANON_KEY'), [
    'SUPABASE_ANON_KEY',
    'EXPO_PUBLIC_SUPABASE_ANON_KEY',
  ]),
} as const;
