import { View, Text, TouchableOpacity, TextInput, ScrollView, Switch, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import tw from 'twrnc'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import style from '../assets/globals/style'
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { donorProfileApi, donorProfileUpdate } from '../assets/globals/apiurl';
import { useFocusEffect } from '@react-navigation/native';


const UpdateProfileDetails = ({ navigation }) => {
    const [isEnabled, setIsEnabled] = useState();
    const [status, setStatus] = useState('');
    const { userInfo } = useContext(AuthContext);
    const [blood_type, setBlood_type] = useState(null);
    const [district, setDistrict] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [checkBloodGroup, setCheckBloodGroup] = useState(false);
    const [btnDone, setBtnDone] = useState(false);
    const [id, setId] = useState();

    const toggleSwitch = () => {
        if (isEnabled) {
            setStatus('unavailable')
        } else {
            setStatus('available')
        }
        setIsEnabled(previousState => !previousState)
    }

    const handleCheckBloodGroup = (text) => {
        let bloodGroup = text.toUpperCase()
        if (bloodGroup === "A+" || bloodGroup === "A-" || bloodGroup === "B+" || bloodGroup === "B-" || bloodGroup === "O+" || bloodGroup === "O-" || bloodGroup === "AB+" || bloodGroup === "AB-") {
            setCheckBloodGroup(false)
            setBlood_type(bloodGroup)
            setBtnDone(false)
        } else {
            setCheckBloodGroup(true)
            setBtnDone(true)
            setBlood_type(null)
        }
    }

    const userProfileInformation = async () => {
        try {
            const res = await axios.get(donorProfileApi + userInfo.username)
            if (res.data.status === 'success') {
                let response = res.data.userprofile;
                setBlood_type(response.blood_type)
                setDistrict(response.district)
                setCity(response.city)
                setState(response.state)
                setId(response.id)
                if (response.status === 'available') {
                    setIsEnabled(true)
                } else {
                    setIsEnabled(false)
                }
            }
        } catch (error) { }

    }

    const personalInfoSet = async () => {
        try {
            axios(donorProfileUpdate + id, {
                method: 'patch',
                data: {
                    blood_type: blood_type,
                    district: district,
                    city: city,
                    state: state,
                    status: status
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


    useFocusEffect(
        React.useCallback(() => {
            userProfileInformation();
        }, [])
    );

    return (
        <View style={tw`flex-1`}>
            <View style={[tw`p-3 pl-4 flex-row items-center pr-4`, { backgroundColor: '#FF3334' }]}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('DonorProfile')}
                >
                    <FontAwesome5 name={'arrow-left'} size={20} color="white" />
                </TouchableOpacity>
                <Text style={[style.headerH1, { marginLeft: 15 }]}>
                    Personal and profile information
                </Text>
            </View>
            <View style={[tw`flex-1 p-4 pt-1`]}>
                <View>
                    <Text style={{ fontSize: 14, fontWeight: 600 }}>
                        You can edit you personal information :-
                    </Text>
                </View>
                <ScrollView style={[tw`flex-1`]} showsVerticalScrollIndicator={false}>
                    <View style={{ marginTop: 10 }}>
                        <View>
                            <TextInput
                                style={[style.Inputbox, { padding: 13, marginTop: 0, marginBottom: 10, fontSize: 20 },
                                checkBloodGroup ? {
                                    borderColor: 'red'
                                } : null]}
                                placeholder='Blood Group'
                                value={blood_type}
                                onChangeText={(text) => handleCheckBloodGroup(text)}
                            />
                        </View>
                        <View>
                            <TextInput
                                style={[style.Inputbox, { padding: 13, marginTop: 0, marginBottom: 10, fontSize: 20 }]}
                                placeholder='District'
                                value={district}
                                onChangeText={(text) => setDistrict(text)}
                            />
                        </View>
                        <View>
                            <TextInput
                                style={[style.Inputbox, { padding: 13, marginTop: 0, marginBottom: 10, fontSize: 20 }]}
                                placeholder='City'
                                value={city}
                                onChangeText={(text) => setCity(text)}
                            />
                        </View>
                        <View>
                            <TextInput
                                style={[style.Inputbox, { padding: 13, marginTop: 0, marginBottom: 10, fontSize: 20 }]}
                                placeholder='State'
                                value={state}
                                onChangeText={(text) => setState(text)}
                            />
                        </View>
                        <View style={tw`flex-row justify-between`}>
                            <View style={tw`flex-row items-center`}>
                                <FontAwesome5 name={'heart'} size={16} color="red" style={{ marginTop: 2 }} />
                                <Text style={{ fontSize: 16, fontWeight: '600', marginLeft: 10 }}>I want to donate blood</Text>
                            </View>
                            <Switch
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </View>
                        <TouchableOpacity
                            style={[style.buttonPrimary, { marginTop: 20 }]}
                            disabled={btnDone}
                            onPress={personalInfoSet}
                        >
                            <Text style={{ color: 'white', fontSize: 15, fontWeight: '700' }}>Save Change</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default UpdateProfileDetails