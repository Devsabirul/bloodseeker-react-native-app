import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { loginApi } from "../assets/globals/apiurl";
import axios from "axios";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(null)
    const [userInfo, setUserInfo] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const login = (username, password) => {
        setIsLoading(true)
        axios.post(`${loginApi}`, {
            username,
            password
        })
            .then((response) => {
                let userInfo = response.data;
                setUserInfo(userInfo);
                setUserToken(userInfo.tokens.access);
                AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
                AsyncStorage.setItem('userToken', userInfo.tokens.access);
            })
            .catch((error) => {
                console.log(error)
            });
        setIsLoading(false)
    };
    const logout = () => {
        setIsLoading(true)
        setUserToken(null)
        AsyncStorage.removeItem('userInfo')
        AsyncStorage.removeItem('userToken')
        setIsLoading(false)
    }

    const isLoggedIn = async () => {
        try {
            setIsLoading(true)
            let userInfo = await AsyncStorage.getItem('userInfo')
            let usertoken = await AsyncStorage.getItem('userToken')
            userInfo = JSON.parse(userInfo)
            if (userInfo) {
                setUserInfo(userInfo)
                setUserToken(usertoken)
            }
            setIsLoading(false)
        } catch (e) {

        }
    }

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{ login, logout, userToken, userInfo, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}