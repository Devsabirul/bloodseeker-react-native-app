import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, StatusBar } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LoginLogo from '../assets/images/loginlogo.png'
import style from '../assets/globals/style';
import axios from 'axios';
import { registerApi } from '../assets/globals/apiurl';
import Toast from 'react-native-toast-message';
import { showToast } from '../components/toast';
const SignUp = ({ navigation }) => {
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [email, setEmail] = useState(null)
    const [checkValidEmail, setCheckValidEmail] = useState(false)

    const reset = () => {
        setUsername('')
        setEmail('')
        setPassword('')
    }

    const handleCheckEmail = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        setEmail(text)
        if (reg.test(text)) {
            setCheckValidEmail(false)
        } else {
            setCheckValidEmail(true)
        }

    }

    const register = () => {
        if (username && password && email) {
            axios.post(`${registerApi}`, {
                username,
                password,
                email
            })
                .then((response) => {
                    let res = response.data
                    showToast(res.status, 'Registration', res.msg)
                })
                .catch((error) => {
                    showToast('error', 'Registration', "Something wrong try another username.")
                });
            reset()
        } else {
            showToast('error', "Username and Password is Required!", 'Registration')
            setUsername('')
            setEmail('')
            setPassword('')
        }
    }

    return (
        <View style={tw`flex-1`} >
            <View>
                <Toast />
                <View style={{ padding: 10, marginTop: 8, marginLeft: 6 }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignIn', { goBackNav: true })}
                    >
                        <FontAwesome5 name={'arrow-left'} size={20} color="gray" />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView showsHorizontalScrollIndicator={true}>
                <View style={tw`flex-1 mt-4`}>
                    <View style={tw`flex-1 justify-center items-center`}>
                        <Image source={LoginLogo} />
                        <Text
                            style={{ textAlign: 'center', fontSize: 35, color: '#FA6393', fontWeight: '600', marginTop: 10 }}>
                            Blood Seeker
                        </Text>
                    </View>
                </View>
                <View style={tw`flex-1 p-6 mt-3`}>
                    <Text style={{ marginBottom: 5, fontSize: 15, fontWeight: '500', letterSpacing: 1 }}>Username</Text>
                    <View style={[tw``, style.Inputbox]}>
                        <TextInput
                            placeholder='username'
                            value={username}
                            onChangeText={(text) => setUsername(text)}
                        />
                    </View>
                    <Text style={{ marginBottom: 5, fontSize: 15, fontWeight: '500', letterSpacing: 1 }}>Email</Text>
                    <View
                        style={[tw``, style.Inputbox,
                        checkValidEmail ? {
                            borderColor: 'red'
                        } : null]}
                    >
                        <TextInput
                            placeholder='Email'
                            value={email}
                            onChangeText={(text) => handleCheckEmail(text)}
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
                        onPress={() => register()}
                        disabled={checkValidEmail}
                    >
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: '500' }}>Create a Account</Text>
                    </TouchableOpacity>
                </View>
                <View style={tw`flex-row justify-center items-center`}>
                    <Text style={{ fontSize: 16 }}>Already have an account?</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignIn', { goBackNav: true })}
                        style={{ marginLeft: 5 }} >
                        <Text style={{ color: '#1E319D', fontSize: 16 }}>Sign in</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default SignUp