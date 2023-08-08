import React from 'react';
import { Text, View } from 'react-native';

const SplashPage = ({ params, }) => (
    <View>
        <Text>Hello World</Text>
        <View style={{ flex: 1 }}>
            {/* -------------- phone section  ------------- */}
            <View>
                <Text style={style.highlightText}>Phone</Text>
                <View style={tw`flex-row items-center p-4`}>
                    <FontAwesome5 name={'phone-alt'} size={20} color="black" />
                    <Text style={{ fontSize: 20, marginLeft: 15, fontWeight: '700' }}>01929-323539</Text>
                </View>
            </View>
            {/* -------------- Email section  ------------- */}
            <View>
                <Text style={style.highlightText}>Email</Text>
                <View style={tw`flex-row items-center p-4`}>
                    <FontAwesome5 name={'envelope'} size={20} color="black" />
                    <Text style={{ fontSize: 20, marginLeft: 15, fontWeight: '700' }}>shishir8089@gmail.com</Text>
                </View>
            </View>
            {/* -------------- Address section  ------------- */}
            <View>
                <Text style={style.highlightText}>Present Address</Text>
                <View style={tw`flex-row items-center p-4 pb-0`}>
                    <FontAwesome5 name={'building'} size={20} color="black" />
                    <Text style={{ fontSize: 20, marginLeft: 15, fontWeight: '700' }}>Homma</Text>
                </View>
                <View style={tw`flex-row items-center p-4 pb-0`}>
                    <FontAwesome5 name={'city'} size={20} color="black" />
                    <Text style={{ fontSize: 20, marginLeft: 15, fontWeight: '700' }}>Cumilla</Text>
                </View>
                <View style={tw`flex-row items-center p-4 pb-0`}>
                    <FontAwesome5 name={'globe'} size={20} color="black" />
                    <Text style={{ fontSize: 20, marginLeft: 15, fontWeight: '700' }}>Bangladesh</Text>
                </View>
            </View>
        </View>
    </View>
);

export default SplashPage;
