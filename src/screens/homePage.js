import React from 'react'
import { ScrollView, StyleSheet, Text, View, Image, TextInput, StatusBar } from 'react-native';
import tw from 'twrnc'
import BloodLogo from '../assets/images/blood.png'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DonatorList from '../components/donatorList';

const HomePage = () => {
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
                            <FontAwesome5 name={'bars'} size={25} color="white" />
                        </View>
                    </View>
                    <View style={[tw`pl-4 pr-4 pb-4`,]}>
                        <View style={[style.searchBar, tw`flex-row justify-evenly items-center`]}>
                            <TextInput
                                style={style.inputField}
                                placeholder='Search...'
                            />
                            <FontAwesome5
                                style={{ paddingRight: 15 }}
                                name={'search'}
                                size={25}
                                color="#D1D1D1"
                            />
                        </View>
                    </View>
                </View>
            </View>
            <ScrollView style={tw`h-5/6`}>
                <DonatorList />
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