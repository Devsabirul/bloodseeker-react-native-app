import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View, Image, TextInput, StatusBar, RefreshControl } from 'react-native';
import tw from 'twrnc'
import BloodLogo from '../assets/images/blood.png'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DonatorList from '../components/donatorList';
import { TouchableOpacity } from 'react-native-gesture-handler';

const HomePage = ({ navigation, route }) => {
    const [refresh, setRefresh] = useState(false)
    const [search, setSearch] = useState("")
    const goBackeValue = route.params?.goBackNav;

    const pullMe = () => {
        setRefresh(true)
        setTimeout(() => {
            setRefresh(false)
        }, 2000)
    }

    const searchQuery = () => {
        if (search != "") {
            navigation.navigate('SearchBloodList', { search: search })
        } else {
            alert("Please Enter Blood Group!")
        }
    }

    return (
        <View>
            <StatusBar
                backgroundColor="#FF3334"
                hidden={false}
            />
            <View style={[{ backgroundColor: 'red' }]}>
                <View style={{ backgroundColor: "#FF3334" }}>
                    <View style={tw`flex-row  justify-between items-center p-4 pb-3`}>
                        <View style={tw`flex-row justify-center items-center`}>
                            <Image
                                source={BloodLogo}
                            />
                            <Text style={{ fontSize: 20, color: "white", fontWeight: '400', marginLeft: 7 }}>Blood</Text>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => navigation.openDrawer()}
                            >
                                <FontAwesome5 name={'bars'} size={25} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[tw`pl-4 pr-4 pb-4`,]}>
                        <View style={[style.searchBar, tw`flex-row justify-evenly items-center`]}>
                            <TextInput
                                style={style.inputField}
                                placeholder='Search...'
                                onChangeText={(q) => setSearch(q)}
                            />
                            <TouchableOpacity onPress={() => searchQuery()}>
                                <FontAwesome5
                                    style={{ paddingRight: 15 }}
                                    name={'search'}
                                    size={25}
                                    color="#D1D1D1"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refresh}
                        onRefresh={() => pullMe()}
                    />
                }
                showsVerticalScrollIndicator={false}
                style={tw`h-5/6`}
            >
                <DonatorList navigation={navigation} refresh={refresh} />
            </ScrollView>
        </View>
    )
}

const style = StyleSheet.create({
    searchBar: {
        // padding: 10,
        backgroundColor: "white",
        borderRadius: 6,
        height: 50
    },
    inputField: {
        padding: 15,
        fontSize: 18,
        width: "90%",
    }
})

export default HomePage