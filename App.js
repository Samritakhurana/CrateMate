import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importing your screens
import HomeScreen from './screens/HomeScreen';
import AddHarvest from './screens/AddHarvest';
import ShelfLife from './screens/ShelfLife';
import Inventory from './screens/Inventory';

// Create a stack navigator
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Add Harvest" component={AddHarvest} />
        <Stack.Screen name="Shelf Life" component={ShelfLife} />
        <Stack.Screen name="Inventory" component={Inventory} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

