import { StatusBar } from 'expo-status-bar';
import { Text, Switch, View, SafeAreaView, Button, Platform, Pressable } from 'react-native';
import React, { useState } from "react"
import ListContainer from './components/ListContainer';
import styles from './Appstyles'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Network from 'expo-network'; 

import Archive from './Archive';
import Movie from './Movie';

function HomeScreen({navigation}) {
  const [ isEnabled, setIsEnabled ] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  Network.getNetworkStateAsync().then(data => {
    console.log({data});
  });

 
  
  return (
    <SafeAreaView style={styles.container}>
    
      
    
      <Text style={[styles.largeHeading, styles.headingColor]}>Welcome<br></br> to Movie Lister!</Text>
      {
        Platform.OS === 'ios'
        ? <Text style={styles.displayOS}>On Mobile</Text>
        : <Text style={styles.displayOS}>On Desktop</Text>
      }
      <Text style={styles.subtitle}>Looking for a good movie to watch tonight? Check out our Movie Archive for an incredible list!</Text>
      <View style={styles.button}>
      <Button color='red' title='Go to our Movie Archive' onPress={() => navigation.navigate('Archive')} />
      

      </View>
      
    
      <ListContainer />
      {/* <Switch 
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4" }
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      /> */}
      <StatusBar style='auto' />
    </SafeAreaView>
  );

}
const Stack = createNativeStackNavigator();
export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title:'Movie Lister'}} />
        <Stack.Screen name="Archive" component={Archive} />
        <Stack.Screen name="Movie" component={Movie} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}


