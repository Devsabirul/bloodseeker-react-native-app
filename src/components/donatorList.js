import { View, Text, ActivityIndicator, Image, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import tw from 'twrnc'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native-gesture-handler';
import allBloodList from '../assets/globals/apiurl'
import style from '../assets/globals/style';
const DonatorList = ({ navigation, refresh }) => {
    const [data, setData] = useState()

    const getDonor = async () => {
        try {
            const response = await axios.get(allBloodList.allBloodList);
            setData(response.data.blood_list)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        if (refresh === true) {
            getDonor()
        }
    }, [refresh])

    useEffect(() => {
        getDonor()
    }, [])
    return (
        <View style={tw`flex-1 `}>
            {
                data ?
                    data.map((item) =>
                        <TouchableOpacity
                            key={item.id}
                            onPress={() => navigation.navigate('DonorDetails', { id: item.id })}
                        >
                            <View
                                style={[tw`flex-row justify-between p-4 pb-5 pl-3`,
                                { borderBottomWidth: 1, borderBottomColor: 'lightgray' }]}
                                key={item.id}
                            >
                                <View style={tw`flex-row`}>
                                    <View>
                                        <Image
                                            source={{ uri: item.profile_img }}
                                            resizeMode='contain'
                                            style={style.avatar}
                                        />
                                    </View>
                                    <View style={[tw`ml-3`, { width: "70%" }]}>
                                        <Text
                                            style={[tw`font-medium mr-2`,
                                            { color: '#6C6A6A', fontSize: 20 }]}
                                        >
                                            {item.name}
                                        </Text>
                                        <View
                                            style={tw`flex-row items-center mt-0`}
                                        >
                                            <FontAwesome5
                                                style={{ paddingRight: 5 }}
                                                name={'phone-alt'}
                                                size={10}
                                                color="#8CBB9B"
                                            />
                                            <Text style={{ fontSize: 15 }}>
                                                {item.phone}
                                            </Text>
                                        </View>
                                        <View style={tw`flex-row items-center mt-0`}>
                                            <FontAwesome5
                                                style={{ paddingRight: 5 }}
                                                name={'map-marker-alt'}
                                                size={12}
                                                color="#F78F8F" />
                                            <Text style={{ fontSize: 15 }}>
                                                {item.state}, {item.city}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <View>
                                    <Text
                                        style={tw`text-red-500 font-bold text-2xl mr-2 mt-1`}
                                    >
                                        {item.blood_type}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                    :
                    <View style={tw`flex-1 mt-3 justify-center items-center`}>
                        <ActivityIndicator size={50} />
                    </View>
            }
        </View >
    )
}

export default DonatorList