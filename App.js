import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import tw from 'twrnc'
import WelcomeScreen from './src/screens/welcomeScreen';
import HomePage from './src/screens/homePage';
import SplashPage from './src/screens/splash-page';


function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <WelcomeScreen /> */}
      <HomePage />
    </SafeAreaView>
  );
}
export default App;
