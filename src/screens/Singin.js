import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, StatusBar, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import tw from 'twrnc'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LoginLogo from '../assets/images/loginlogo.png'
import style from '../assets/globals/style';
import { AuthContext } from '../context/AuthContext';
import Toast from 'react-native-toast-message';
import { showToast } from '../components/toast';
import ProgressDialog from '../components/progressbar';

const SignIn = ({ navigation }) => {
    const { login, userToken } = useContext(AuthContext)
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [isLoading, setIsLoading] = useState(false)

    // if (isLoading) {
    //     return (
    //         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //             <ActivityIndicator size='large' />
    //         </View>
    //     )
    // }

    useEffect(() => {
        if (userToken !== null) {
            navigation.navigate('BecomeDonor')
        }
        setUsername('')
        setPassword('')
    }, [login])

    const loginValidate = () => {
        if (username && password) {
            login(username, password);
        }
        else {
            showToast('error', "Username and Password is Required!", 'Registration')
        }
    }

    return (
        <View style={tw`flex-1`} >
            <Toast />
            <ProgressDialog visible={isLoading} />
            <View>
                <View style={{ padding: 10, marginTop: 8, marginLeft: 6 }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('HomePage', { goBackNav: true })}
                    >
                        <FontAwesome5 name={'arrow-left'} size={20} color="gray" />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView showsHorizontalScrollIndicator={true}>
                <View style={tw`flex-1 mt-8`}>
                    <View style={tw`flex-1 justify-center items-center`}>
                        <Image source={LoginLogo} />
                        <Text
                            style={{ textAlign: 'center', fontSize: 35, color: '#FA6393', fontWeight: '600', marginTop: 10 }}>
                            Blood Seeker
                        </Text>
                    </View>
                </View>
                <View style={tw`flex-1 p-6 mt-6`}>
                    <Text style={{ marginBottom: 5, fontSize: 15, fontWeight: '500', letterSpacing: 1 }}>Username</Text>
                    <View style={[tw``, style.Inputbox]}>
                        <TextInput
                            placeholder='username'
                            value={username}
                            onChangeText={(text) => setUsername(text)}
                        />
                    </View>
                    <Text style={{ marginBottom: 5, fontSize: 15, fontWeight: '500', letterSpacing: 1 }}>Password</Text>
                    <View style={[tw``, style.Inputbox]}>
                        <TextInput
                            placeholder='Password'
                            secureTextEntry={true}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />
                    </View>
                    <TouchableOpacity
                        style={style.buttonPrimary}
                        onPress={() => loginValidate()}
                    >
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: '500' }}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View style={tw`flex-row justify-center items-center`}>
                    <Text style={{ fontSize: 16 }}>Don't have an account?</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignUp', { goBackNav: true })}
                        style={{ marginLeft: 5 }} >
                        <Text style={{ color: '#1E319D', fontSize: 16 }}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default SignIn