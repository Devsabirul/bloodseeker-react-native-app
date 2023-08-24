import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import tw from 'twrnc'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import style from '../assets/globals/style'
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import ProgressDialog from '../components/progressbar';
import { useFocusEffect } from '@react-navigation/native';
import { donorProfileApi, donorProfileUpdate } from '../assets/globals/apiurl';

const AccountSettings = ({ navigation }) => {
    const { deleteDonorProfile, userInfo } = useContext(AuthContext);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [id, setId] = useState();
    const [checkValidEmail, setCheckValidEmail] = useState(false)
    const [btnDone, setBtnDone] = useState(false)

    const showConfirmDialog = () => {
        return Alert.alert(
            "Are your sure?",
            "Are you sure you want to remove your account?",
            [
                {
                    text: "Yes",
                    onPress: () => deleteDonorProfile(),
                },
                {
                    text: "No",
                },
            ]
        );
    };

    const userProfileInformation = async () => {
        try {
            const res = await axios.get(donorProfileApi + userInfo.username)
            if (res.data.status === 'success') {
                let response = res.data.userprofile;
                setName(response.name)
                setEmail(response.email)
                setPhone(response.phone)
                setId(response.id)
            }
        } catch (error) { }

    }

    const updateAccountDetails = () => {
        try {
            axios(donorProfileUpdate + id, {
                method: 'patch',
                data: {
                    name: name,
                    email: email,
                    phone: phone
                }
            })
                .then((res) => {
                    Alert.alert("Success", res.data.msg)
                    setTimeout(() => {
                        navigation.navigate("DonorProfile")
                    }, 2000);
                })
        } catch (error) { }
    }

    const handleCheckEmail = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        setEmail(text)
        if (reg.test(text)) {
            setCheckValidEmail(false)
            setBtnDone(false)
        } else {
            setCheckValidEmail(true)
            setBtnDone(true)
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            userProfileInformation();
        }, [])
    );
    
    return (
        <View style={[tw`flex-1`]}>
            <View style={[tw`p-3 pl-4 flex-row items-center pr-4`, { backgroundColor: '#FF3334' }]}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('DonorProfile')}
                >
                    <FontAwesome5 name={'arrow-left'} size={20} color="white" />
                </TouchableOpacity>
                <Text style={[style.headerH1, { marginLeft: 15 }]}>
                    Personal and account information
                </Text>

            </View>
            <ScrollView style={[tw`flex-1`]}>

                <View style={tw`pl-4 pr-4 mt-2`}>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={{ fontWeight: '600' }}>You can update account information :</Text>
                    </View>
                    <View>
                        <TextInput
                            style={[style.Inputbox, { padding: 13, marginTop: 0, marginBottom: 10, fontSize: 20 }]}
                            placeholder='Name'
                            value={name}
                            onChangeText={(text) => setName(text)}
                        />
                    </View>
                    <View>
                        <TextInput
                            style={[style.Inputbox, { padding: 13, marginTop: 0, fontSize: 20, marginBottom: 10 },
                            checkValidEmail ? {
                                borderColor: 'red'
                            } : null]}
                            value={email}
                            placeholder='Email'
                            onChangeText={(text) => handleCheckEmail(text)}
                        />
                    </View>
                    <View>
                        <TextInput
                            style={[style.Inputbox, { padding: 13, marginTop: 0, marginBottom: 15, fontSize: 20 }]}
                            placeholder='Phone'
                            value={phone}
                            onChangeText={(text) => setPhone(text)}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => showConfirmDialog()}
                        style={{ borderWidth: 1, padding: 8, borderColor: 'lightgray', borderRadius: 5, marginBottom: 15 }}>
                        <View>
                            <Text style={{ fontSize: 18, fontWeight: 500 }}>
                                Deactivation and deletion
                            </Text>
                            <Text>
                                Temporarily or Permanently delete your account
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <ProgressDialog visible={false} />
                <View style={[tw`pr-4 pl-4`, { margintop: 15 }]}>
                    <TouchableOpacity
                        style={[style.buttonPrimary]}
                        disabled={btnDone}
                        onPress={() => updateAccountDetails()}
                    >
                        <Text style={{ textAlign: 'center', color: 'white', fontSize: 15, fontWeight: '600' }}>Save Changes</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View >
    )
}

export default AccountSettings