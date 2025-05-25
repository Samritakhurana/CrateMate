import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Pressable,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../assets/cratemate-bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>CrateMate</Text>
          <Text style={styles.tagline}>Helping Small Farmers Keep Their Papayas Fresh</Text>

          <Text style={styles.paragraph}>
            CrateMate started with a simple goal: to help small farmers save more of the fruit they work so hard to grow. Every year, tons of papayas spoil—not because they’re bad, but because farmers don’t have the tools to track freshness or protect them after harvest. CrateMate changes that.
          </Text>

          <Text style={styles.paragraph}>
            It’s a mobile app made just for them. Paired with our eco-friendly bamboo crates, CrateMate uses real-life data to help farmers keep papayas fresh longer, cut down on waste, and earn more from every harvest.
          </Text>

          <Text style={styles.sectionTitle}>Here’s what CrateMate does:</Text>
          <Text style={styles.bullet}>• Predicts shelf life based on the harvest date, crate type, and local weather.</Text>
          <Text style={styles.bullet}>• Sends early spoilage alerts to prevent loss.</Text>
          <Text style={styles.bullet}>• Gives daily storage tips based on weather (e.g. move crates to shade).</Text>
          <Text style={styles.bullet}>• Tracks inventories like harvests, sales, losses, and spoilage trends.</Text>
          <Text style={styles.bullet}>• Supports local languages with a simple, friendly design.</Text>

          <Text style={styles.paragraph}>
            Plus, it comes with our custom bamboo crates—sturdy, breathable, and biodegradable, with antimicrobial cushions to slow ripening naturally.
          </Text>

          <Text style={styles.paragraph}>
            CrateMate helps farmers save fruit, cut waste, and grow with confidence.
          </Text>

          {/* Animated Buttons with Icons */}
          <Pressable style={styles.button} onPress={() => navigation.navigate('Add Harvest')}>
            <Ionicons name="add-circle-outline" size={20} color="white" />
            <Text style={styles.buttonText}> Add Harvest</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={() => navigation.navigate('Shelf Life')}>
            <Ionicons name="leaf-outline" size={20} color="white" />
            <Text style={styles.buttonText}> Check Shelf Life</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={() => navigation.navigate('Inventory')}>
            <Ionicons name="bar-chart-outline" size={20} color="white" />
            <Text style={styles.buttonText}> Track Inventory</Text>
          </Pressable>
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
    justifyContent: 'center',
    padding: 20,
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.93)',
    padding: 24,
    borderRadius: 16,
    maxWidth: 800,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 16,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
