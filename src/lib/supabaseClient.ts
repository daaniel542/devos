import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';

import type { Database } from '@/src/lib/database.types';
import { env } from '@/src/lib/env';

type StorageAdapter = {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
};

const isBrowser = typeof window !== 'undefined';

const browserStorage: StorageAdapter = {
  getItem: async (key) => window.localStorage.getItem(key),
  setItem: async (key, value) => {
    window.localStorage.setItem(key, value);
  },
  removeItem: async (key) => {
    window.localStorage.removeItem(key);
  },
};

const noopStorage: StorageAdapter = {
  getItem: async () => null,
  setItem: async () => {},
  removeItem: async () => {},
};

const storage =
  Platform.OS === 'web' ? (isBrowser ? browserStorage : noopStorage) : (AsyncStorage as StorageAdapter);

export const supabase = createClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
  auth: {
    storage,
    autoRefreshToken: Platform.OS !== 'web' || isBrowser,
    persistSession: Platform.OS !== 'web' || isBrowser,
    detectSessionInUrl: false,
  },
});
