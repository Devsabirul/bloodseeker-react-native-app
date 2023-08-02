import { View, Text, ActivityIndicator, Image, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import tw from 'twrnc'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const DonatorList = () => {
    const [data, setData] = useState()
    const getDonor = async () => {
        try {
            const response = await axios.get('http://192.168.0.110:8000/api/blood-lists');
            setData(response.data.blood_list)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    useEffect(() => {
        getDonor()

    }, [data])

    return (
        <View style={tw`flex-1 `}>
            {
                data ?
                    data.map((item) =>
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
                    )
                    :
                    <View style={tw`flex-1 mt-3 justify-center items-center`}>
                        <ActivityIndicator size={50} />
                    </View>
            }
        </View >
    )
}

const style = StyleSheet.create({
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: 'gray'
    }
})

export default DonatorList