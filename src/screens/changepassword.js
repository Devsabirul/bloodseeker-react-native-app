import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import tw from 'twrnc'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import style from '../assets/globals/style'
import axios from 'axios';
import { changePasswordApi } from '../assets/globals/apiurl';
import { AuthContext } from '../context/AuthContext';

const ChangePassword = ({ navigation }) => {
    const [checkPassword, setCheckPassword] = useState(false)
    const [password, setPassword] = useState()
    const [password2, setPassword2] = useState()
    const [btnDone, setBtnDone] = useState(true)
    const { userToken } = useContext(AuthContext)

    const changePassword = async () => {
        if (password && password2 !== "") {
            if (password === password2) {
                setCheckPassword(false)
                try {
                    axios({
                        url: changePasswordApi,
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${userToken}`
                        },
                        data: {
                            password: password,
                            password2: password2
                        }
                    })
                        .then((res) => {
                            Alert.alert("Success", res.data.msg)
                            setTimeout(() => {
                                setPassword('')
                                setPassword2('')
                                navigation.navigate("DonorProfile")
                            }, 2000);
                        })
                        .catch((err) => {
                            Alert.alert("Error", "Something wrong! please reopen the app")
                        })
                } catch (error) {
                    Alert.alert("Error", "Something wrong! please reopen the app")
                }

            } else {
                setCheckPassword(true)
            }
        } else {
            Alert.alert("Error", 'Please enter new password!!')
        }
    }

    return (
        <View style={tw`flex-1`}>
            <View style={[tw`p-3 pl-4 flex-row items-center pr-4`, { backgroundColor: '#FF3334' }]}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('DonorProfile')}
                >
                    <FontAwesome5 name={'arrow-left'} size={20} color="white" />
                </TouchableOpacity>
                <Text style={[style.headerH1, { marginLeft: 15 }]}>
                    Change account password
                </Text>
            </View>
            <View style={[tw`flex-1 p-4 pt-1`]}>
                <View>
                    <Text style={{ fontSize: 14, fontWeight: 600 }}>
                        You can change you account passowrd :-
                    </Text>
                </View>
                <ScrollView>
                    <View style={{ marginTop: 10 }}>
                        <View>
                            <TextInput
                                style={[style.Inputbox, { padding: 13, marginTop: 0, marginBottom: 10, fontSize: 20 }]}
                                placeholder='New password'
                                secureTextEntry={true}
                                value={password}
                                onChangeText={text => setPassword(text)}
                            />
                        </View>
                        <View>
                            <TextInput
                                style={[style.Inputbox, { padding: 13, marginTop: 5, marginBottom: 10, fontSize: 20 },
                                checkPassword ? {
                                    borderColor: 'red'
                                } : null]}
                                placeholder='Confirm new password'
                                secureTextEntry={true}
                                value={password2}
                                onChangeText={(text) => setPassword2(text)}
                            />
                        </View>
                        {
                            checkPassword ?
                                <Text style={{ color: 'red', fontWeight: 'bold' }}>Confirm password doesn't match</Text>
                                : null
                        }
                        <TouchableOpacity
                            style={[style.buttonPrimary, { marginTop: 5 }]}
                            onPress={() => changePassword()}
                        >
                            <Text style={{ color: 'white', fontSize: 15, fontWeight: '700' }}>Save Change</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default ChangePassword