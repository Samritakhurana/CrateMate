import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';

export default function AddHarvest() {
  const [harvestDate, setHarvestDate] = useState('');
  const [daysLeft, setDaysLeft] = useState(null);

  const calculateShelfLife = () => {
    const picked = new Date(harvestDate);
    const today = new Date();
    const diffTime = today - picked;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const shelf = 7 - diffDays;

    setDaysLeft(shelf >= 0 ? shelf : 0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Harvest Date (YYYY-MM-DD):</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 2024-05-20"
        value={harvestDate}
        onChangeText={setHarvestDate}
      />
      <Button title="Check Shelf Life" onPress={calculateShelfLife} />

      {daysLeft !== null && (
        <Text style={styles.result}>
          {daysLeft > 0
            ? `Papayas are fresh for ${daysLeft} more day(s).`
            : 'Papayas are likely spoiled.'}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fffbe6',
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 6,
  },
  result: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
    color: '#2f4f4f',
  },
});
