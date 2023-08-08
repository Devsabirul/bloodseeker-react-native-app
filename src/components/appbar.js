import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import style from '../assets/globals/style'

const AppBar = ({ title, goBacks, navigation }) => {
    return (
        <View>{/* ----------------- App Bar ----------------  */}
            <View style={[tw`p-3 pl-4 flex-row items-center justify-between pr-4`, { backgroundColor: '#FF3334' }]}>
                <TouchableOpacity
                    onPress={() => navigation.navigate(goBacks, { goBackNav: true })}
                >
                    <FontAwesome5 name={'arrow-left'} size={25} color="white" />
                </TouchableOpacity>
                <Text style={style.headerH1}>
                    {title}
                </Text>
                <TouchableOpacity
                    onPress={() => navigation.openDrawer()}
                >
                    <FontAwesome5 name={'bars'} size={20} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AppBar