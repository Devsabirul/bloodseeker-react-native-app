import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, ScrollView, Image, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import tw from 'twrnc'
import style from '../assets/globals/style'
import blood from '../assets/images/blood-red.png'
import donorProfile from '../assets/globals/apiurl'
import AppBar from '../components/appbar';


const DonorDetails = ({ route, navigation }) => {

    const { id } = route.params;
    const [data, setData] = useState(null);
    const getDonorData = async () => {
        try {
            const response = await axios.get(`${donorProfile.donorProfile}/${id}`);
            setData(response.data.blood_list)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    useEffect(() => {
        getDonorData()
    }, [])
    return (
        <View style={{ flex: 1 }}>
            {/* ----------------- App Bar ----------------  */}
            <AppBar navigation={navigation} title="Donor Profile" goBacks="HomePage" />
            {
                data ?
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {/* ----------- contact info ---------- */}
                        <View style={{ height: 280 }}>
                            <ImageBackground
                                source={{ uri: data.profile_img }}
                                style={{ height: "100%", width: "100%" }}
                                resizeMode="cover" >
                                <View style={[tw`flex-1 justify-end p-5`, { backgroundColor: '#00000040' }]}>
                                    <Text style={{ fontSize: 25, color: 'white', fontWeight: 'bold', letterSpacing: 0.5 }}>
                                        {data.name}
                                    </Text>
                                    <Text style={{ fontSize: 15, color: 'white', marginTop: 2, letterSpacing: 1 }}>
                                        Blood Group {data.blood_type}
                                    </Text>
                                </View>
                            </ImageBackground>
                        </View>
                        {/* --------- main contact info --------- */}
                        <View style={{ flex: 1 }}>
                            {/* -------- important section  -------- */}
                            <View>
                                <Text style={style.highlightText}>Important info</Text>
                                <View style={tw`flex-row items-center p-4 pb-0`}>
                                    <Image
                                        source={blood}
                                    />
                                    <Text style={{ fontSize: 20, marginLeft: 15, fontWeight: '700' }}>{data.blood_type}</Text>
                                </View>
                                <View style={tw`flex-row items-center p-4  pt-3`}>
                                    <FontAwesome5 name={'phone-alt'} size={18} color="black" />
                                    <TouchableOpacity
                                        onPress={() => Linking.openURL(`tel:${data.phone}`)}
                                    >
                                        <Text style={{ fontSize: 18, marginLeft: 15, fontWeight: '700' }}>{data.phone}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* --------- Email section  --------- */}
                            <View>
                                <Text style={style.highlightText}>Email</Text>
                                <View style={tw`flex-row items-center p-4`}>
                                    <FontAwesome5 name={'envelope'} size={18} color="black" />
                                    <Text style={{ fontSize: 18, marginLeft: 15, fontWeight: '700' }}>{data.email}</Text>
                                </View>
                            </View>
                            {/* --------- Address section  -------- */}
                            <View style={{ marginBottom: 15 }}>
                                <Text style={style.highlightText}>Present Address</Text>
                                <View style={tw`flex-row items-center p-4 pb-0`}>
                                    <FontAwesome5 name={'building'} size={18} color="black" />
                                    <Text style={{ fontSize: 18, marginLeft: 15, fontWeight: '700' }}>{data.state}</Text>
                                </View>
                                <View style={tw`flex-row items-center p-4 pb-0`}>
                                    <FontAwesome5 name={'city'} size={18} color="black" />
                                    <Text style={{ fontSize: 18, marginLeft: 10, fontWeight: '700' }}>{data.city}</Text>
                                </View>
                                <View style={tw`flex-row items-center p-4 pb-0`}>
                                    <FontAwesome5 name={'globe'} size={18} color="black" />
                                    <Text style={{ fontSize: 18, marginLeft: 15, fontWeight: '700' }}>Bangladesh</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView> : null
            }
        </View>
    )
}


export default DonorDetails


