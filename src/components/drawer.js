import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import tw from 'twrnc'
import drawerLogo from '../assets/images/drawerlogo.png'
import style from '../assets/globals/style'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { AuthContext } from '../context/AuthContext'
const CustomeDrawer = ({ navigation }) => {
    const { userToken } = useContext(AuthContext)

    const listMenu = [
        { id: 1, icon: 'home', title: 'Home', goto: 'HomePage' },
        { id: 2, icon: 'chart-line', title: 'Activity', goto: 'HomePage' },
        { id: 3, icon: 'share', title: 'Share', goto: 'HomePage' },
        { id: 4, icon: 'bug', title: 'Reports', goto: 'HomePage' },
        { id: 5, icon: 'eject', title: 'About', goto: 'HomePage' },
    ]

    // route authentication
    const authRoute = () => {
        if (userToken !== null) {
            navigation.navigate('DonorProfile')
        } else {
            navigation.navigate('SignIn')
        }
    }

    return (
        <View style={tw`flex-1`}>
            <View style={tw`flex-1 p-4`}>
                <Image
                    source={drawerLogo}
                    style={{
                        height: '100%',
                        width: '100%',
                    }}
                />
            </View>
            <View style={style.hr}></View>
            <View style={tw`flex-2 mt-3`}>
                {
                    listMenu ?
                        listMenu.map((item) => (
                            <TouchableOpacity
                                style={[tw`flex-row items-center`, styles.sideBtn]}
                                onPress={() => navigation.navigate(item.goto)}
                                key={item.id}
                            >
                                <FontAwesome5 name={item.icon} size={18} color="gray" />
                                <Text style={{ fontSize: 18, marginLeft: 8, fontWeight: '400' }}>{item.title}</Text>
                            </TouchableOpacity>
                        ))
                        : null
                }
            </View>
            <View style={[tw`m-2 mb-3`, { height: 50 }]}>
                <TouchableOpacity
                    style={style.btn}
                    onPress={() => authRoute()}
                >
                    <Text style={{ fontSize: 15, color: 'white', textAlign: 'center', fontWeight: '600' }}>Become a Donor</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    sideBtn: {
        height: 40,
        marginLeft: 15,
    }
})

export default CustomeDrawer