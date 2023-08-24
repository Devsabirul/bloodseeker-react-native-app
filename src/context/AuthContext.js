import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";
import { loginApi, donorProfileDelete } from "../assets/globals/apiurl";
import axios from "axios";
import { Alert } from "react-native";
export const AuthContext = createContext();
import { BackHandler } from 'react-native';

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
                Alert.alert('Login Error', "Something wrong.")
            });
        setIsLoading(false)
    };

    const logoutToken = () => {
        setIsLoading(true)
        setUserToken(null)
        AsyncStorage.removeItem('userInfo')
        AsyncStorage.removeItem('userToken')
        setIsLoading(false)
    }

    const logout = () => {
        setIsLoading(true)
        setUserToken(null)
        AsyncStorage.removeItem('userInfo')
        AsyncStorage.removeItem('userToken')
        BackHandler.exitApp();
        setIsLoading(false)
    }

    const isLoggedIn = async () => {
        try {
            setIsLoading(true)
            let userInfos = await AsyncStorage.getItem('userInfo')
            let usertoken = await AsyncStorage.getItem('userToken')
            userInfos = JSON.parse(userInfos)
            if (userInfos) {
                setUserInfo(userInfos)
                setUserToken(usertoken)
            }
            setIsLoading(false)
        } catch (e) { }
    }

    const deleteDonorProfile = async () => {
        try {
            const res = await axios.delete(donorProfileDelete + userInfo.username)
            if (res.data.status === 'success') {
                setIsLoading(true)
                setUserToken(null)
                AsyncStorage.removeItem('userInfo')
                AsyncStorage.removeItem('userToken')
                BackHandler.exitApp();
                setIsLoading(false)
            }
        } catch (error) { }
    }

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{ login, logout, userToken, userInfo, isLoading, deleteDonorProfile, logoutToken }}>
            {children}
        </AuthContext.Provider>
    )
}