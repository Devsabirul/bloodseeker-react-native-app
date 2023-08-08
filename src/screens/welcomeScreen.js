import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native'
import React from 'react'
import welcomeImage from '../assets/images/wlclogo.png'
import { buttonPrimary } from '../assets/globals/style'
import tw from 'twrnc'


const WelcomeScreen = ({ navigation }) => {
    return (
        <View style={tw`flex-1`}>
            <StatusBar
                backgroundColor="#FF3334"
                hidden={false}
                barStyle="light-content"
            />
            <View style={tw`flex-2 items-center p-10`}>
                <Image
                    style={{
                        height: "100%",
                        width: "100%",
                    }}
                    source={welcomeImage} />
            </View>
            <View style={tw`flex-1 pt-5 items-center`}>
                <Text style={tw`font-bold text-3xl text-gray-800`} >
                    Find Donators
                </Text>
                <Text style={{ textAlign: 'center', width: "90%", marginTop: 10, fontFamily: 'roboto', fontSize: 15, lineHeight: 20, letterSpacing: 0.5, color: '#6B7B6B' }}>
                    Find Blood easily nearby your location or others location and get number.
                </Text>
            </View>
            <View style={tw`flex-1 items-center justify-center`}>
                <TouchableOpacity
                    style={[buttonPrimary, { width: "90%" }]}
                    onPress={() => navigation.navigate('HomePage')}>
                    <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', fontFamily: 'roboto' }}>
                        Let's Begin
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={tw`mt-3`}
                    onPress={() => navigation.navigate('HomePage')}
                >
                    <Text style={tw`font-bold`}>
                        Skip Step
                    </Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}

export default WelcomeScreen