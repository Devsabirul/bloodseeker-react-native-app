import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import AppBar from '../components/appbar'
import tw from 'twrnc'
import filterBlood from '../assets/globals/apiurl'
import axios from 'axios'
import styles from '../assets/globals/style'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const SearchBloodList = ({ route, navigation }) => {
    const [data, setData] = useState([])
    const [query, setQuery] = useState('')
    const [refresh, setRefresh] = useState(false)
    let queryData = route.params.search

    const pullMe = () => {
        setRefresh(true)
        setTimeout(() => {
            setRefresh(false)
        }, 2000)
    }

    const getSearchData = async () => {
        try {
            const response = await axios.get(`${filterBlood.filterBlood}${query}`);
            setData(response.data.blood_list);
        } catch (error) {
            setData([]);
        }
    }

    useEffect(() => {
        setQuery(queryData)
        getSearchData()
    }, [queryData])

    // refresh 
    useEffect(() => {
        if (refresh === true) {
            getSearchData()
        }
    }, [refresh])

    // when change query 
    useEffect(() => {
        getSearchData()
    }, [query])


    return (
        <View>
            <AppBar navigation={navigation} title="Search Blood" goBacks='HomePage' />
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                <View style={tw`flex-row pl-1 pr-1`}>
                    <TouchableOpacity onPress={() => setQuery("A+")}>
                        <Text style={style.headerText}>A+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setQuery("A-")}>
                        <Text style={style.headerText}>A-</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setQuery("B+")}>
                        <Text style={style.headerText}>B+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setQuery("B-")}>
                        <Text style={style.headerText}>B-</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setQuery("O+")}>
                        <Text style={style.headerText}>O+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setQuery("O-")}>
                        <Text style={style.headerText}>O-</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setQuery("AB+")}>
                        <Text style={style.headerText}>AB+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setQuery("AB-")}>
                        <Text style={style.headerText}>AB-</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
            <View style={tw`flex-row justify-between p-2`}>
                <View>
                    <Text style={style.headerBoxText} >Selected Blood: {query.toUpperCase()}</Text>
                </View>
                <View>
                    <Text style={style.headerBoxText} >
                        Total Available Blood: {data.length}
                    </Text>
                </View>
            </View>
            <View style={style.hr}></View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refresh}
                        onRefresh={() => pullMe()}
                    />
                }

            >
                {
                    data && data.length > 0 ?
                        data.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                onPress={() => navigation.navigate('DonorDetails', { id: item.id })}
                            >
                                <View
                                    style={[tw`flex-row justify-between p-4 pb-5 pl-3`,
                                    { borderBottomWidth: 1, borderBottomColor: 'lightgray' }]}
                                >
                                    <View style={tw`flex-row`}>
                                        <View>
                                            <Image
                                                source={{ uri: item.profile_img }}
                                                resizeMode='contain'
                                                style={styles.avatar}
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
                        ))
                        :
                        <Text style={{ textAlign: 'center', color: 'red', fontSize: 18, marginTop: 10, fontWeight: '600', letterSpacing: 1 }}>
                            Blood not found
                        </Text>
                }
            </ScrollView>


        </View>
    )
}

const style = StyleSheet.create({
    headerText: {
        height: 48,
        width: 50,
        backgroundColor: "#FF3334",
        color: "white",
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        margin: 5,
        marginTop: 10,
        borderRadius: 8
    },
    headerBoxText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#686868'
    },
    hr: {
        width: "100%",
        height: 1,
        backgroundColor: 'gray'
    }
})
export default SearchBloodList