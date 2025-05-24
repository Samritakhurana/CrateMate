import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>CrateMate</Text>
      <Text style={styles.subtitle}>
        Smart storage assistant for papaya farmers. Track harvests, prevent spoilage,
        and manage inventory — all in one simple app.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Add Harvest')}
      >
        <Text style={styles.buttonText}>➕ Add Harvest</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Shelf Life')}
      >
        <Text style={styles.buttonText}>🍃 Check Shelf Life</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Inventory')}
      >
        <Text style={styles.buttonText}>📊 Track Inventory</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>
        Built for small-scale farmers. Lightweight, offline, and easy to use.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#f9fefb',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    marginTop: 40,
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
});
