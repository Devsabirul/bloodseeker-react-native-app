import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import AppBar from '../components/appbar'
import tw from 'twrnc'
import { ScrollView } from 'react-native-gesture-handler'

const BecomeDonor = ({ navigation }) => {
    return (
        <View style={tw`flex-1`}>
            <AppBar navigation={navigation} title="Blood Registraion" goBacks='HomePage' />
            <View style={tw`p-3 flex-1`}>
                <Text style={{ marginBottom: 10, color: 'gray', fontWeight: '500' }}>Please fill in the required information:-</Text>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{ marginBottom: 10 }}>
                        <TextInput
                            placeholder='Username'
                            style={style.Inputbox}
                        />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <TextInput
                            placeholder='Full Name'
                            style={style.Inputbox}
                        />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <TextInput
                            placeholder='Email'
                            style={style.Inputbox}
                        />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <TextInput
                            placeholder='Phone'
                            style={style.Inputbox}
                        />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <TextInput
                            placeholder='Blood Group'
                            style={style.Inputbox}
                        />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <TextInput
                            placeholder='District'
                            style={style.Inputbox}
                        />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <TextInput
                            placeholder='City'
                            style={style.Inputbox}
                        />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <TextInput
                            placeholder='State'
                            style={style.Inputbox}
                        />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <TextInput
                            placeholder='State'
                            style={style.Inputbox}
                        />
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    Inputbox: {
        padding: 15,
        borderWidth: 1,
        borderColor: 'lightgray',
        fontSize: 17,
        borderRadius: 5
    }
})

export default BecomeDonor