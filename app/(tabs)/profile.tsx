/**
 * Profile screen - Placeholder
 */

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StyleSheet, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText type="title" style={styles.title}>
          Profile
        </ThemedText>
        <ThemedText style={styles.text}>
          This is the profile page.
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    opacity: 0.7,
  },
});

