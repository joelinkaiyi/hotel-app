import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "react-native-vector-icons/Ionicons";
import MapPage from './pages/MapPage';
import ListPage from './pages/ListPage';
import c4_map from './assets/c4_map.png';
import c4_list from './assets/c4_list.png';
const tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === '地圖') {
            iconName = focused ?
              'ios-map' :
              'ios-map-outline'
          }
          else if (route.name == '列表') {
           iconName = focused ? "ios-list" : "ios-list-outline";
          }
          return <Ionicons name={iconName} color={color} size={size} />
        },
          tabBarActiveTintColor: "#32B768",
          tabBarInactiveTintColor: "gray",
          headerShown : false,
      })}>
        <tab.Screen name="地圖" component={MapPage} />
        <tab.Screen name='列表' component={ListPage} />
      </tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 30,
    height:30
  }
});
