import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
  const navigation = useNavigation();

  const handleLoginPress = () => {
    navigation.navigate('Login', { screen: 'LoginScreen' });
  };

  const handleRegisterPress = () => {
    navigation.navigate('Avatar', { screen: 'AvatarScreen' });
  };

  return (
    <View className="flex-1 mt-[130px] items-center">
      <Image
        source={require('./../../assets/images/TripVault-LogoBig.png')}
        className="w-[350px] h-[350px]"
      />
      <TouchableOpacity
        onPress={handleLoginPress}
        className="bg-orange w-[300px] rounded-lg mt-36"
      >
        <Text className="text-white text-center p-4">Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleRegisterPress}
        className="bg-green w-[300px] rounded-lg m-6"
      >
        <Text className="text-white text-center p-4">Register</Text>
      </TouchableOpacity>
    </View>
  );
}
