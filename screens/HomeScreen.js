import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../assets/cratemate-bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.overlay}>
          <Text style={styles.title}>CrateMate</Text>
          <Text style={styles.tagline}>
            Helping Small Farmers Keep Their Papayas Fresh
          </Text>

          <Text style={styles.paragraph}>
            CrateMate started with a simple goal: to help small farmers save more of the fruit they work so hard to grow. Every year, tons of papayas spoil—not because they’re bad, but because farmers don’t have the tools to track freshness or protect them after harvest. CrateMate changes that.
          </Text>

          <Text style={styles.paragraph}>
            It’s a mobile app made just for them. Paired with our eco-friendly bamboo crates, CrateMate uses real-life data to help farmers keep papayas fresh longer, cut down on waste, and earn more from every harvest.
          </Text>

          <Text style={styles.sectionTitle}>Here’s what CrateMate does:</Text>

          <Text style={styles.bullet}>
            • Predicts shelf life based on the harvest date, crate type, and local weather.
          </Text>
          <Text style={styles.bullet}>
            • Sends early spoilage alerts to prevent loss.
          </Text>
          <Text style={styles.bullet}>
            • Gives daily storage tips based on weather (e.g. move crates to shade).
          </Text>
          <Text style={styles.bullet}>
            • Tracks inventories like harvests, sales, losses, and spoilage trends.
          </Text>
          <Text style={styles.bullet}>
            • Supports local languages with a simple, friendly design.
          </Text>
          <Text style={styles.paragraph}>
            Plus, it comes with our custom bamboo crates—sturdy, breathable, and biodegradable, with antimicrobial cushions to slow ripening naturally.
          </Text>

          <Text style={styles.paragraph}>
            CrateMate helps farmers save fruit, cut waste, and grow with confidence.
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
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(255,255,255,0.88)',
    padding: 20,
    borderRadius: 16,
    maxWidth: 800,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2e7d32',
    textAlign: 'center',
    marginBottom: 10,
  },
  tagline: {
    fontSize: 18,
    fontWeight: '500',
    color: '#444',
    textAlign: 'center',
    marginBottom: 25,
  },
  paragraph: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
    lineHeight: 24,
    textAlign: 'justify',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#1b5e20',
  },
  bullet: {
    fontSize: 15,
    marginBottom: 8,
    color: '#444',
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

