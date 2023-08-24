import { View, Text, Switch, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import style from '../assets/globals/style'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const ProfileScreenSettings = ({ navigation }) => {
    const [isPushEnabled, setIsPushEnabled] = useState(true)
    const [isEmailEnabled, setIsEmailEnabled] = useState(false)

    const togglePushSwitch = () => {
        setIsPushEnabled(previousState => !previousState)
    }
    const toggleEmailSwitch = () => {
        setIsEmailEnabled(previousState => !previousState)
    }

    return (
        <View style={tw`p-4 pt-2`}>
            <View>
                <Text style={{ color: "#C4C4C4", fontWeight: 'bold', fontSize: 18 }}>PROFILE</Text>
            </View>

            <TouchableOpacity
                onPress={() => navigation.navigate('UpdateProfileDetails')}
            >
                <View style={[tw`flex-row justify-between items-center mt-4`]}>
                    <View style={tw`flex-row`}>
                        <FontAwesome5 name='user' size={20} color="#579BEF" style={{ marginTop: 4, width: 40 }} />
                        <View>
                            <Text style={{ fontSize: 20, fontWeight: '600', color: "#444F62" }}>
                                Profile Details
                            </Text>
                            <Text style={{ color: '#C5C5C5' }}>View & edit details</Text>
                        </View>
                    </View>
                    <FontAwesome5
                        name={'angle-right'}
                        size={30}
                        color="#579BEF" />
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate('AccountSettings')}
            >
                <View style={[tw`flex-row justify-between items-center mt-4`]}>
                    <View style={tw`flex-row`}>
                        <FontAwesome5 name='user-plus' size={20} color="#579BEF" style={{ marginTop: 4, width: 40 }} />
                        <View >
                            <Text style={{ fontSize: 20, fontWeight: '600', color: "#444F62" }}>
                                Account Settings
                            </Text>
                            <Text style={{ color: '#C5C5C5' }}>view & edit settings</Text>
                        </View>
                    </View>
                    <FontAwesome5
                        name={'angle-right'}
                        size={30}
                        color="#579BEF" />
                </View>
            </TouchableOpacity>

            <View>
                <Text style={{ color: "#C4C4C4", fontWeight: 'bold', fontSize: 18, marginTop: 20 }}>SETTINGS</Text>
            </View>

            <TouchableOpacity
                onPress={() => navigation.navigate('ChangePassword')}
            >
                <View style={[tw`flex-row justify-between items-center mt-4`]}>
                    <View style={tw`flex-row`}>
                        <FontAwesome5 name='key' size={20} color="#579BEF" style={{ marginTop: 4, width: 40 }} />
                        <View>
                            <Text style={{ fontSize: 20, fontWeight: '600', color: "#444F62" }}>
                                Change Password
                            </Text>
                            <Text style={{ color: '#C5C5C5', fontSize: 17 }}>
                                it's a good to use strong password.
                            </Text>
                        </View>
                    </View>
                    <FontAwesome5
                        name={'angle-right'}
                        size={30}
                        color="#579BEF" />
                </View>
            </TouchableOpacity>

            <View style={[tw`flex-row justify-between items-center mt-4`]}>
                <View style={tw`flex-row`}>
                    <FontAwesome5 name='bell' size={20} color="#579BEF" style={{ marginTop: 4, width: 40 }} />
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: '600', color: "#444F62" }}>
                            Push Notification
                        </Text>
                        <Text style={{ color: '#C5C5C5', fontSize: 17 }}>On</Text>
                    </View>
                </View>
                <Switch
                    onValueChange={togglePushSwitch}
                    value={isPushEnabled}
                />
            </View>

            <View style={[tw`flex-row justify-between items-center mt-3`]}>
                <View style={tw`flex-row`}>
                    <FontAwesome5 name='envelope' size={20} color="#579BEF" style={{ marginTop: 4, width: 40 }} />
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: '600', color: "#444F62" }}>
                            Email Notification
                        </Text>
                        <Text style={{ color: '#C5C5C5', fontSize: 17 }}>Off</Text>
                    </View>
                </View>
                <Switch
                    onValueChange={toggleEmailSwitch}
                    value={isEmailEnabled}
                />
            </View>

            <TouchableOpacity>
                <View style={[tw`flex-row justify-between items-center mt-4`]}>
                    <View style={tw`flex-row`}>
                        <FontAwesome5 name='chart-line' size={20} color="#579BEF" style={{ marginTop: 4, width: 40 }} />
                        <View>
                            <Text style={{ fontSize: 20, fontWeight: '600', color: "#444F62" }}>
                                Activity Details
                            </Text>
                            <Text style={{ color: '#C5C5C5', fontSize: 17 }}>
                                your all activity here.
                            </Text>
                        </View>
                    </View>
                    <FontAwesome5
                        name={'angle-right'}
                        size={30}
                        color="#579BEF" />
                </View>
            </TouchableOpacity>

            <TouchableOpacity>
                <View style={[tw`flex-row justify-between items-center mt-4`]}>
                    <View style={tw`flex-row`}>
                        <FontAwesome5 name='clock' size={20} color="#579BEF" style={{ marginTop: 4, width: 40 }} />
                        <View>
                            <Text style={{ fontSize: 20, fontWeight: '600', color: "#444F62" }}>
                                History
                            </Text>
                            <Text style={{ color: '#C5C5C5', fontSize: 17 }}>
                                all your history here.
                            </Text>
                        </View>
                    </View>
                    <FontAwesome5
                        name={'angle-right'}
                        size={30}
                        color="#579BEF" />
                </View>
            </TouchableOpacity>

            <TouchableOpacity>
                <View style={[tw`flex-row justify-between items-center mt-4`]}>
                    <View style={tw`flex-row`}>
                        <FontAwesome5 name='newspaper' size={20} color="#579BEF" style={{ marginTop: 4, width: 40 }} />
                        <View>
                            <Text style={{ fontSize: 20, fontWeight: '600', color: "#444F62" }}>
                                Terms of user
                            </Text>
                            <Text style={{ color: '#C5C5C5', fontSize: 17 }}>
                                user terms and condition.
                            </Text>
                        </View>
                    </View>
                    <FontAwesome5
                        name={'angle-right'}
                        size={30}
                        color="#579BEF" />
                </View>
            </TouchableOpacity>

            <TouchableOpacity>
                <View style={[tw`flex-row justify-between items-center mt-4`]}>
                    <View style={tw`flex-row`}>
                        <FontAwesome5 name='flag' size={20} color="#579BEF" style={{ marginTop: 4, width: 40 }} />
                        <View>
                            <Text style={{ fontSize: 20, fontWeight: '600', color: "#444F62" }}>
                                Privacy Policy
                            </Text>
                            <Text style={{ color: '#C5C5C5', fontSize: 17 }}>
                                app privacy & policy details.
                            </Text>
                        </View>
                    </View>
                    <FontAwesome5
                        name={'angle-right'}
                        size={30}
                        color="#579BEF" />
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default ProfileScreenSettings