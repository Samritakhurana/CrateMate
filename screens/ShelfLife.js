import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ShelfLife() {
  // Simulate weather and freshness conditions
  const humidity = 'high'; // can be 'low' or 'high'
  const daysLeft = 2; // dummy freshness level

  let tip = '';

  if (humidity === 'high' && daysLeft <= 3) {
    tip = 'Keep the crate in shade — high humidity detected and ripening is fast.';
  } else if (humidity === 'low' && daysLeft > 3) {
    tip = 'Store in a cool, open place. Ripening is slower today.';
  } else {
    tip = 'Monitor daily — storage conditions are average.';
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Smart Storage Tip</Text>
      <Text style={styles.tip}>{tip}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fff0',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2e7d32',
  },
  tip: {
    fontSize: 18,
    textAlign: 'center',
    color: '#4e4e4e',
  },
});
