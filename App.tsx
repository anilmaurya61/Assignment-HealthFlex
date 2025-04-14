import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import { TimerProvider } from './src/context/TimerContext';
import Toast from 'react-native-toast-message';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const CustomHeader = ({ title }: { title: string }) => (
  <View style={styles.header}>
    <Text style={styles.headerText}>{title}</Text>
  </View>
);

const App = () => {
  return (
    <TimerProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            header: () => <CustomHeader title={route.name} />,
            tabBarIcon: ({ color, size, focused }) => {
              let iconName: string = 'help-circle-outline'; 

              if (route.name === 'Timers') {
                iconName = focused ? 'timer' : 'timer-outline';
              } else if (route.name === 'History') {
                iconName = focused ? 'time' : 'time-outline';
              }
              return <Ionicons name={iconName as any} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#BF9264',
            tabBarInactiveTintColor: '#F0F1C5',
            tabBarLabelStyle: { fontSize: 12 },
            tabBarStyle: {
              backgroundColor: "#6F826A",
              borderTopWidth: 1,
              borderTopColor: '#ddd',
              height: 60,
              paddingBottom: 6,
              paddingTop: 6,
            },
          })}
        >
          <Tab.Screen name="Timers" component={HomeScreen} />
          <Tab.Screen name="History" component={HistoryScreen} />
        </Tab.Navigator>
      </NavigationContainer>
      <Toast />
    </TimerProvider>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#6F826A',
    paddingVertical: 16,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default App;

