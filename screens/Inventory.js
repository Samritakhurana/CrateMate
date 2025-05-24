import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Inventory() {
  const [picked, setPicked] = useState('');
  const [sold, setSold] = useState('');
  const [spoiled, setSpoiled] = useState('');
  const [summary, setSummary] = useState(null);

  const handleSubmit = () => {
    setSummary({
      picked: picked || 0,
      sold: sold || 0,
      spoiled: spoiled || 0,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inventory Tracker</Text>

      <TextInput
        style={styles.input}
        placeholder="Papayas picked"
        keyboardType="numeric"
        value={picked}
        onChangeText={setPicked}
      />

      <TextInput
        style={styles.input}
        placeholder="Papayas sold"
        keyboardType="numeric"
        value={sold}
        onChangeText={setSold}
      />

      <TextInput
        style={styles.input}
        placeholder="Papayas spoiled"
        keyboardType="numeric"
        value={spoiled}
        onChangeText={setSpoiled}
      />

      <Button title="Save Inventory" onPress={handleSubmit} />

      {summary && (
        <View style={styles.summary}>
          <Text style={styles.result}>Picked: {summary.picked}</Text>
          <Text style={styles.result}>Sold: {summary.sold}</Text>
          <Text style={styles.result}>Spoiled: {summary.spoiled}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff0f5',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#8e44ad',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 6,
  },
  summary: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#fafafa',
    borderRadius: 6,
  },
  result: {
    fontSize: 16,
    marginVertical: 2,
  },
});

