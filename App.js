// import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from './utils/Colors';
import Shopping from './screens/ShoppingList/ShoppingLists'
import ShoppingForm from './screens/ShoppingList/ShoppingForm';
import ShoppingBill from './screens/ShoppingList/ShoppingBill';
import { useEffect, useState } from 'react';
import { init } from './utils/database';


import ShoppingView from './screens/ShoppingList/ShoppingView';


const Stack = createNativeStackNavigator();

function Home(){
  return <View style={{flex: 1, backgroundColor: Colors.main800}}>
    <View style={{ backgroundColor: 'white', minHeight: 300, justifyContent: 'center', alignItems: 'center' }}>
      
    </View>
  </View>;
}

function App() {
  const [dbInitiated, setDBInitiated] = useState(false);
  useEffect(() => {
    async function initializeDB() {
      try {
        const res = await init();
      }
      catch (ex) {
        console.error(ex);
      }
    }
    initializeDB();
    setDBInitiated(true);
  }, []);

  if (!dbInitiated) {
    return null;
  }

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics} style={{ flex: 1 }}>
      <StatusBar style='light' backgroundColor={Colors.main800} />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: { backgroundColor: Colors.main100 },
          headerTintColor: Colors.main800        
        }}>
          
          <Stack.Screen name="Shopping" component={Shopping} options={{
            title: "Shopping Lists"
          }} />
          <Stack.Screen name="ShoppingForm" component={ShoppingForm}  options={{
            title: "Create List"
          }} />
          <Stack.Screen name="ShoppingView" component={ShoppingView} />
          <Stack.Screen name='ShoppingBill' component={ShoppingBill} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
