import React, { useContext } from 'react'
import { SafeAreaView, ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { TransitionPreset, CardStyleInterpolators } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SignIn from '../screens/Singin';
import SignUp from '../screens/Signup';
import WelcomeScreen from '../screens/WelcomeScreen';
import HomePage from '../screens/HomePage';
import DonorDetails from '../screens/DonorDetails';
import SearchBloodList from '../screens/SearchBloodList';
import BecomeDonor from '../screens/BecomeDonor';
import CustomeDrawer from './drawer';
import DonorProfile from '../screens/DonorProfile';

const Drawer = createDrawerNavigator();


const AppNav = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <NavigationContainer>
                <Drawer.Navigator
                    backBehavior="history"
                    drawerContent={props => <CustomeDrawer {...props} />}
                    screenOptions={{
                        headerShown: false,
                        gestureEnabled: false,
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                    }}
                >
                    <Drawer.Screen name="welcomePage" component={WelcomeScreen} />
                    <Drawer.Screen name="HomePage" component={HomePage} />
                    <Drawer.Screen name="DonorDetails" component={DonorDetails} />
                    <Drawer.Screen name="SearchBloodList" component={SearchBloodList} />
                    <Drawer.Screen name="SignIn" component={SignIn} />
                    <Drawer.Screen name="SignUp" component={SignUp} />
                    <Drawer.Screen name="DonorProfile" component={DonorProfile} />
                    <Drawer.Screen name="BecomeDonor" component={BecomeDonor} />
                </Drawer.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    )
}

export default AppNav