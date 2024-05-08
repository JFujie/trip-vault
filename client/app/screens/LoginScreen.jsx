import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { loginUser } from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserContext } from '../contexts/userContext';
import { useTripsContext } from '../contexts/tripsContext';

export default function LoginScreen({ navigation }) {
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { user, setUser, isLogged, setIsLogged } = useUserContext();

  const handleLoginPress = async () => {
    try {
      const userData = {
        credential,
        password,
      };
      const { token, user } = await loginUser(userData);
      await AsyncStorage.setItem('token', token);
      setUser(user);
      setIsLogged(true);
    } catch (err) {
      console.error(err);
    }
    navigation.navigate('UnlockFirstTrip', {
      screen: 'UnlockFirstTripScreen',
    });
  };

  const handleRegisterPress = () => {
    navigation.navigate('Register', { screen: 'RegisterScreen' });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View className="flex-1 items-center">
      <Image
        source={require('./../../assets/images/trip-vault-logo.png')}
        className="w-[120px] h-[120px] mt-24"
      />
      <Text className="mt-12 text-3xl font-semibold">Login</Text>
      <Text className="text-[19px]">Login to your account</Text>
      <TextInput
        className="w-[380px] mt-8 bg-lightGray rounded-md p-3 text-[19px]"
        placeholder="username / email"
        placeholderTextColor="#999"
        onChangeText={text => setCredential(text)}
      ></TextInput>
      <View className="flex flex-row justify-between w-[380px] mt-4 bg-lightGray rounded-md p-3">
        <TextInput
          className="text-[19px]"
          placeholder="password"
          placeholderTextColor="#999"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <Ionicons
          name={showPassword ? 'eye-off' : 'eye'}
          size={24}
          color="black"
          onPress={togglePasswordVisibility}
        />
      </View>

      <Text className="mt-36 text-[19px]">Don't have an account?</Text>
      <TouchableOpacity onPress={handleRegisterPress}>
        <Text className="mt-2 text-orange text-[19px]">Register</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleLoginPress}
        className="bg-green w-[300px] rounded-lg mt-4"
      >
        <Text className="text-white text-center p-4 text-[19px]">Login</Text>
      </TouchableOpacity>
    </View>
  );
}
