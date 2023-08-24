import { View, Text, TextInput, ScrollView, Switch, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import AppBar from '../components/appbar'
import tw from 'twrnc'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import style from '../assets/globals/style'
import { AuthContext } from '../context/AuthContext';
import { launchImageLibrary } from 'react-native-image-picker';
import { bloodRegister, donorProfileApi } from '../assets/globals/apiurl';
import axios from 'axios';
import ProgressDialog from '../components/progressbar';


const BecomeDonor = ({ navigation }) => {
    const [isEnabled, setIsEnabled] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [status, setStatus] = useState('available')
    const { userInfo } = useContext(AuthContext)
    const [email, setEmail] = useState(null)
    const [checkValidEmail, setCheckValidEmail] = useState(false)
    const [checkBloodGroup, setCheckBloodGroup] = useState(false)
    const [btnDone, setBtnDone] = useState(true)
    const [uploadImageName, setUploadImageName] = useState('Upload Profile Picture')
    const [images, setImages] = useState()
    const [name, setName] = useState(null)
    const [phone, setPhone] = useState()
    const [blood_type, setBlood_type] = useState(null)
    const [district, setDistrict] = useState()
    const [city, setCity] = useState()
    const [state, setState] = useState()

    const toggleSwitch = () => {
        if (isEnabled) {
            setStatus('unavailable')
        } else {
            setStatus('available')
        }
        setIsEnabled(previousState => !previousState)
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

    const options = {
        title: 'Select Image',
        type: 'library',
        options: {
            selectionLimit: 0,
            mediaType: 'photo',
            includeBase64: false,
        },
    }


    const openGallery = async () => {
        try {
            const images = await launchImageLibrary(options);
            setUploadImageName(images.assets[0].fileName)
            setImages(images)
        } catch (error) { }
    }

    const resetForm = () => {
        setName(null)
        setEmail(null)
        setPhone(null)
        setBlood_type(null)
        setDistrict(null)
        setCity(null)
        setState(null)

    }

    // upload data to api 
    const uploadBloodData = () => {
        setBtnDone(true)
        setIsLoading(true)
        if (images && email !== null && blood_type !== null) {
            const formData = new FormData();
            formData.append('username', userInfo.username)
            formData.append('email', email)
            formData.append('name', name)
            formData.append('phone', phone)
            formData.append('blood_type', blood_type)
            formData.append('district', district)
            formData.append('city', city)
            formData.append('state', state)
            formData.append('status', status)
            formData.append('profile_img', {
                uri: images.assets[0].uri,
                type: images.assets[0].type,
                name: images.assets[0].fileName,
            })
            axios({
                method: 'post',
                url: `${bloodRegister}`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
                .then((res) => {
                    navigation.navigate("DonorProfile")
                })
                .catch((e) => { setIsLoading(false) })
        } else {
            setIsLoading(false)
            Alert.alert(
                'Error',
                'Something wrong! Please Try Again.'
            )
        }
    }

    const validateDonorProfile = async () => {
        try {
            const res = await axios.get(donorProfileApi + userInfo.username)
            if (res.data.status === 'success') {
                navigation.navigate("DonorProfile")
            }
        } catch (error) { }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            validateDonorProfile();
            resetForm();
        });
        return unsubscribe;
    }, [navigation]);

    return (
        <View style={tw`flex-1`}>
            <AppBar navigation={navigation} title="Blood Registraion" goBacks='HomePage' />
            <ProgressDialog visible={isLoading} />
            <View style={tw`p-3 flex-1`}>
                <Text style={{ marginBottom: 10, color: 'gray', fontWeight: '500' }}>Please fill in the required information:-</Text>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{ marginBottom: 10 }}>
                        <TextInput
                            placeholder='Username'
                            style={style.Inputboxs}
                            value={"username is:" + " " + userInfo.username}
                            editable={false}
                            selectTextOnFocus={false}
                        />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <TextInput
                            placeholder='Full Name'
                            style={style.Inputboxs}
                            selectTextOnFocus={true}
                            value={name}
                            onChangeText={text => setName(text)}
                        />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <TextInput
                            placeholder='Email'
                            style={[tw``, style.Inputboxs,
                            checkValidEmail ? {
                                borderColor: 'red'
                            } : null]}
                            selectTextOnFocus={true}
                            value={email}
                            onChangeText={(text) => handleCheckEmail(text)}
                        />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <TextInput
                            placeholder='Phone'
                            style={style.Inputboxs}
                            value={phone}
                            onChangeText={text => setPhone(text)}
                        />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <TextInput
                            placeholder='Blood Group'
                            style={[style.Inputboxs,
                            checkBloodGroup ? {
                                borderColor: 'red'
                            } : null]}
                            value={blood_type}
                            onChangeText={(text) => handleCheckBloodGroup(text)}
                        />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <TextInput
                            placeholder='District'
                            style={style.Inputboxs}
                            value={district}
                            onChangeText={(text) => setDistrict(text)}
                        />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <TextInput
                            placeholder='City'
                            style={style.Inputboxs}
                            value={city}
                            onChangeText={(text) => setCity(text)}
                        />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <TextInput
                            placeholder='State'
                            style={style.Inputboxs}
                            value={state}
                            onChangeText={(text) => setState(text)}
                        />
                    </View>
                    <View style={[{ marginBottom: 10 }]}>
                        <View
                            style={[tw`flex-row items-center`, style.uploadImg]}
                        >
                            <TouchableOpacity
                                style={[style.bgPrimary, { padding: 12, borderRadius: 10 }]}
                                onPress={() => openGallery()}
                            >
                                <FontAwesome5
                                    name={'upload'}
                                    size={25}
                                    color="white"
                                />
                            </TouchableOpacity>
                            <Text
                                style={{ fontSize: 17, fontWeight: '600', marginLeft: 10 }}
                            >
                                {uploadImageName}
                            </Text>
                        </View>
                    </View>
                    <View style={[{ marginBottom: 10 }]}>
                        <View
                            style={[tw`flex-row justify-between items-center`, style.bloodSwitch]}
                        >
                            <Text
                                style={{ fontSize: 18, fontWeight: '600', marginLeft: 5 }}
                            >I Want To Donate</Text>
                            <Switch
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </View>
                    </View>
                    <TouchableOpacity
                        style={[style.buttonPrimary, { marginTop: 15 }]}
                        disabled={btnDone}
                        onPress={() => uploadBloodData()}
                    >
                        <Text style={{ color: 'white', fontSize: 15, fontWeight: '700' }}>Blood Register</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    )
}

export default BecomeDonor