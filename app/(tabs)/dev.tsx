import { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getSession } from '@/src/lib/auth';
import { runDb, table } from '@/src/lib/db';
import { env } from '@/src/lib/env';
import { supabase } from '@/src/lib/supabaseClient';

type TestStatus = 'idle' | 'running' | 'success' | 'error';

export default function DevScreen() {
  const [status, setStatus] = useState<TestStatus>('idle');
  const [logs, setLogs] = useState<string[]>([]);

  const runConnectionTest = async () => {
    setStatus('running');
    const nextLogs: string[] = [];

    try {
      nextLogs.push(`Env loaded: ${maskUrl(env.SUPABASE_URL)}`);
      if (!supabase) {
        throw new Error('Supabase client instance is undefined.');
      }
      nextLogs.push('Supabase client initialized.');

      const sessionResult = await getSession();
      if (sessionResult.error) {
        throw new Error(sessionResult.error.message);
      }
      nextLogs.push('Auth query succeeded: getSession().');

      const queryResult = await runDb(
        'profiles.head',
        table('profiles').select('id').limit(1)
      );

      if (queryResult.error) {
        nextLogs.push(
          `DB query returned an error: ${queryResult.error.message} (code: ${queryResult.error.code})`
        );
        nextLogs.push('Tip: create the profiles table and RLS policies in Phase 1.');
      } else {
        nextLogs.push(`DB query succeeded: profiles select check (rows: ${queryResult.data.length}).`);
      }

      setStatus('success');
    } catch (error) {
      setStatus('error');
      nextLogs.push(`Connection test failed: ${toErrorMessage(error)}`);
    } finally {
      setLogs(nextLogs);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText type="title">Dev Connection Test</ThemedText>
      <ThemedText>
        Use this screen to validate env wiring, Supabase client initialization, auth session access,
        and a basic DB query path.
      </ThemedText>

      <Pressable
        accessibilityRole="button"
        onPress={runConnectionTest}
        disabled={status === 'running'}
        style={({ pressed }) => [
          styles.button,
          pressed && status !== 'running' ? styles.buttonPressed : null,
        ]}>
        {status === 'running' ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <ThemedText style={styles.buttonText}>Run test</ThemedText>
        )}
      </Pressable>

      <ThemedView style={styles.results}>
        <ThemedText type="subtitle">Status: {statusLabel(status)}</ThemedText>
        {logs.length === 0 ? (
          <ThemedText>No logs yet.</ThemedText>
        ) : (
          logs.map((line) => (
            <ThemedText key={line} style={styles.logLine}>
              {`\u2022 ${line}`}
            </ThemedText>
          ))
        )}
      </ThemedView>
    </ScrollView>
  );
}

const statusLabel = (status: TestStatus) => {
  if (status === 'idle') return 'Idle';
  if (status === 'running') return 'Running';
  if (status === 'success') return 'Passed';
  return 'Failed';
};

const toErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
};

const maskUrl = (url: string) => {
  try {
    const parsed = new URL(url);
    return `${parsed.protocol}//${parsed.host}`;
  } catch {
    return url;
  }
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
    padding: 20,
  },
  button: {
    backgroundColor: '#0a7ea4',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  buttonPressed: {
    opacity: 0.9,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  results: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    gap: 10,
    padding: 14,
  },
  logLine: {
    lineHeight: 22,
  },
});
