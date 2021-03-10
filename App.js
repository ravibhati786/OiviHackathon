import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FirstView from './src/Screens/FirstView';
import SecondView from './src/Screens/SecondView';
import VPage from './src/Screens/Video';


const Stack = createStackNavigator();
function App() {
      
    return (
      
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={FirstView}/>
          <Stack.Screen name="Second" component={SecondView} />
          <Stack.Screen name="Video" component={VPage} />
        </Stack.Navigator>
      </NavigationContainer>
    )
}

export default App;
