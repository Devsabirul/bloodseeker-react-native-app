import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, ScrollView, Image, Linking, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import tw from 'twrnc'
import style from '../assets/globals/style'
import blood from '../assets/images/blood-red.png'
import donorProfile from '../assets/globals/apiurl'
import AppBar from '../components/appbar';
import { useFocusEffect } from '@react-navigation/native';


const DonorDetails = ({ route, navigation }) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getDonorData = async (id) => {
        try {
            const response = await axios.get(`${donorProfile.donorProfile}/${id}`);
            setData(response.data.blood_list);
        } catch (error) { }
    };

    const loadingOption = () => {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }

    useFocusEffect(
        React.useCallback(() => {
            const id = route.params.id;
            loadingOption();
            getDonorData(id);
        }, [route.params.id])
    );

    return (
        <View style={{ flex: 1 }}>
            {
                isLoading ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size='large' />
                    </View>
                    :
                    <View>
                        <AppBar navigation={navigation} title="Donor Details" goBacks="HomePage" />
                        <ScrollView
                            ScrollView showsVerticalScrollIndicator={false} >
                            <View style={{ height: 280 }}>
                                <ImageBackground
                                    source={{ uri: data.profile_img }}
                                    style={{ height: "100%", width: "100%" }}
                                    resizeMode="cover" >
                                    <View style={[tw`flex-1 justify-end p-5`, { backgroundColor: '#00000040' }]}>
                                        <Text style={{ fontSize: 25, color: 'white', fontWeight: 'bold', letterSpacing: 0.5 }}>
                                            {data.name}
                                        </Text>

                                        <Text style={{ fontSize: 15, fontWeight: 600, color: 'white', marginTop: 2, letterSpacing: 1 }}>
                                            Status: {data.status}
                                        </Text>
                                    </View>
                                </ImageBackground>
                            </View>

                            <View style={{ flex: 1 }}>
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


                                <View>
                                    <Text style={style.highlightText}>Email</Text>
                                    <View style={tw`flex-row items-center p-4`}>
                                        <FontAwesome5 name={'envelope'} size={18} color="black" />
                                        <Text style={{ fontSize: 18, marginLeft: 15, fontWeight: '700' }}>{data.email}</Text>
                                    </View>
                                </View>

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
                        </ScrollView>
                    </View>
            }
        </View >
    )
}


export default DonorDetails


