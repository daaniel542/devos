import type { PostgrestError, PostgrestSingleResponse } from '@supabase/supabase-js';

import type { Database } from '@/src/lib/database.types';
import { supabase } from '@/src/lib/supabaseClient';

export type DbFailure = {
  code: string;
  message: string;
  details?: string;
  hint?: string;
  operation: string;
};

export type DbResult<T> =
  | {
      data: T;
      error: null;
    }
  | {
      data: null;
      error: DbFailure;
    };

const normalizeDbError = (operation: string, error: PostgrestError): DbFailure => ({
  code: error.code,
  message: error.message,
  details: error.details ?? undefined,
  hint: error.hint ?? undefined,
  operation,
});

export const runDb = async <T>(
  operation: string,
  query: PromiseLike<PostgrestSingleResponse<T>>
): Promise<DbResult<T>> => {
  const { data, error } = await query;

  if (error) {
    return {
      data: null,
      error: normalizeDbError(operation, error),
    };
  }

  return {
    data,
    error: null,
  };
};

export const unwrapDb = <T>(result: DbResult<T>): T => {
  if (result.error) {
    throw new Error(
      `[${result.error.operation}] ${result.error.message}${
        result.error.code ? ` (code: ${result.error.code})` : ''
      }`
    );
  }

  return result.data;
};

type PublicTables = keyof Database['public']['Tables'];

export const table = <TTable extends PublicTables>(tableName: TTable) => {
  return supabase.from(tableName);
};
