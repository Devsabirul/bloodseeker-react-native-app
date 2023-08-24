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
import AccountSettings from '../screens/accountsettings';
import UpdateProfileDetails from '../screens/updateprofiledetails';
import ChangePassword from '../screens/changepassword';

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
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
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
                    <Drawer.Screen name="AccountSettings" component={AccountSettings} />
                    <Drawer.Screen name="UpdateProfileDetails" component={UpdateProfileDetails} />
                    <Drawer.Screen name="ChangePassword" component={ChangePassword} />
                </Drawer.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    )
}

export default AppNav