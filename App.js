import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FirstView from './src/Screens/FirstView';
import SecondView from './src/Screens/SecondView';
import VPage from './src/Screens/Video';
import store from './store'
import { Provider as StoreProvider } from 'react-redux'
import { Provider as PaperProvider } from 'react-native-paper'

const Stack = createStackNavigator();
function App() {
      
    return (
      <StoreProvider store={store}>
          <PaperProvider>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={FirstView}/>
                <Stack.Screen name="Second" component={SecondView} />
                <Stack.Screen name="Video" component={VPage} />
              </Stack.Navigator>
            </NavigationContainer>
          </PaperProvider>
      </StoreProvider>
    )
}

export default App;
