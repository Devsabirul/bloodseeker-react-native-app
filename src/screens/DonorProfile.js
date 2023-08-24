import { View, Text, BackHandler, TouchableOpacity, ActivityIndicator, Image, Alert, ScrollView } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import AppBar from '../components/appbar';
import axios from 'axios';
import { donorProfileApi, donorProfileUpdate } from '../assets/globals/apiurl';
import tw from 'twrnc'
import ProfileScreenSettings from '../components/profileScreenSettings';
import { useFocusEffect } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { launchImageLibrary } from 'react-native-image-picker';
import ProgressDialog from '../components/progressbar';
import jwtDecode from 'jwt-decode';


const DonorProfile = ({ navigation }) => {
    const { logout, userToken, userInfo, logoutToken } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(true)
    const [profileInfo, setProfileInfo] = useState()
    const [id, setId] = useState()
    const [isUploadDone, setIsUploadDone] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }, [navigation])

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            Alert.alert('info', "You can't use back button!")
            return true;
        });

        return () => {
            backHandler.remove();
        };

    }, []);

    useEffect(() => {
        if (userToken === null) {
            navigation.navigate('HomePage')
        }
    }, [logout])

    const userProfileInformation = async () => {
        try {
            const res = await axios.get(donorProfileApi + userInfo.username)
            if (res.data.status === 'success') {
                let response = res.data.userprofile;
                setProfileInfo(res.data.userprofile)
                setId(res.data.userprofile.id)
            }
        } catch (error) { }

    }

    const checkTokenExpiration = async () => {
        try {
            const loginToken = userInfo.tokens.access;
            const decodedToken = jwtDecode(loginToken);
            const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
            if (decodedToken.exp && decodedToken.exp < currentTime) {
                logoutToken();
                navigation.navigate('HomePage')
            }
        } catch (error) { }
    };

    useEffect(() => {
        userProfileInformation();
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            checkTokenExpiration()
            userProfileInformation();
        }, [])
    );

    const options = {
        title: 'Select Image',
        type: 'library',
        options: {
            selectionLimit: 0,
            mediaType: 'photo',
            includeBase64: false,
        },
    }

    useEffect(() => {
        userProfileInformation()
    }, [isUploadDone])


    const openGallery = async () => {
        try {
            const images = await launchImageLibrary(options);
            if (images) {
                setIsUploadDone(true)
                const formData = new FormData();
                formData.append('profile_img', {
                    uri: images.assets[0].uri,
                    type: images.assets[0].type,
                    name: images.assets[0].fileName,
                })

                axios(donorProfileUpdate + id, {
                    method: 'patch',
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                })
                    .then((res) => {
                        setIsUploadDone(false)
                    })
            }
        } catch (error) { }
    }

    return (
        <View style={{ flex: 1 }}>
            <ProgressDialog visible={isUploadDone} />
            {
                isLoading ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size='large' />
                    </View>
                    :
                    <View style={tw`flex-1`}>
                        <AppBar navigation={navigation} title="Profile Details" goBacks="HomePage" />
                        {
                            profileInfo ?
                                <View>
                                    <View style={[tw`flex-row p-3`, { height: "23%", }]}>
                                        <View style={[tw`flex-row`, { height: 120, width: 120 }]}>
                                            <Image
                                                source={
                                                    { uri: profileInfo.profile_img }
                                                }
                                                style={{ height: "100%", width: "100%", borderRadius: 10, }}
                                                resizeMode="cover"
                                            />
                                            <TouchableOpacity
                                                style={{ width: 28, height: 28, backgroundColor: 'red', zIndex: 999, marginLeft: -25, marginTop: 0, borderRadius: 10, borderColor: 'white', borderWidth: 2 }}
                                                onPress={() => openGallery()}
                                            >

                                                <FontAwesome5
                                                    name={'pen'}
                                                    size={15} color="white"
                                                    style={{ textAlign: 'center', marginTop: 3 }}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ marginLeft: 15 }}>
                                            <Text style={{ fontSize: 20, fontWeight: '600', color: '#0E1B33', width: 250 }}>
                                                {profileInfo.name}
                                            </Text>
                                            <Text style={{ fontSize: 15, marginTop: 2 }}>
                                                @{profileInfo.username}
                                            </Text>
                                            <Text style={{ fontSize: 15, marginTop: 2 }}>
                                                {profileInfo.phone}
                                            </Text>
                                            <TouchableOpacity
                                                onPress={() => logout()}
                                                style={{ padding: 8, borderWidth: 1, borderColor: 'gray', borderRadius: 5, marginTop: 8, width: '70%' }}
                                            >
                                                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                                                    LOGOUT
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <ScrollView
                                        style={{ height: '70%' }}
                                        showsVerticalScrollIndicator={false}
                                    >
                                        <ProfileScreenSettings navigation={navigation} />
                                    </ScrollView>
                                </View>
                                : null
                        }
                    </View>
            }
        </View>
    )
}

export default DonorProfile