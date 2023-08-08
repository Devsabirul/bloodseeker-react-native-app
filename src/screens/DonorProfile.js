import { View, Text, BackHandler, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';

const DonorProfile = ({ navigation }) => {
    const { logout, userToken, userInfo } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }, [navigation])

    useEffect(() => {
        // Disable the back button functionality
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            alert("You can't use back button!")
            return true;
        });

        return () => {
            backHandler.remove();
        };
    }, []);

    useEffect(() => {
        if (userToken === null) {
            navigation.navigate('HomePage')
        }
    }, [logout])

    return (
        <View style={{ flex: 1 }}>
            {
                isLoading ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size='large' />
                    </View>
                    :
                    <View>
                        <Text>User name : {userInfo.username}</Text>
                        <TouchableOpacity
                            onPress={() => logout()}
                        >
                            <Text>Logout</Text>
                        </TouchableOpacity>
                    </View>
            }

        </View>
    )
}

export default DonorProfile