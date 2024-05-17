import { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Modal } from 'react-native';
import { DateTime } from 'luxon';
import { Entypo, FontAwesome6 } from '@expo/vector-icons';
import { useUserContext } from '../contexts/userContext';
import { useTripsContext } from '../contexts/tripsContext';
import { useCurrencyContext } from '../contexts/currencyContext';
import { deleteTrip } from '../api/api';
import ExpenseList from './ExpenseList';

export default function TripNameScreen({ navigation }) {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isDeleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);

  const { user, setUser } = useUserContext();
  const {
    trips,
    dispatch,
    pinnedTrip,
    setPinnedTrip,
    calculateTripDuration,
    calculateTotalSpent,
    calculateDailyAverage,
    calculateBalance,
  } = useTripsContext();

  const { getCurrencySymbol } = useCurrencyContext();

  const { selectedTrip } = user;

  // const {
  //   calculateTotalExpenses,
  //   calculateDailyAverage,
  //   calculateRemainingBalance,
  // } = useCurrencyContext();

  const totalSpent = calculateTotalSpent(pinnedTrip);
  const tripDuration = calculateTripDuration(pinnedTrip);
  const dailyAverage = calculateDailyAverage(totalSpent, tripDuration);
  const balance =
    pinnedTrip.budget && calculateBalance(pinnedTrip.budget, totalSpent);

  const tripCurrencySymbol = getCurrencySymbol(pinnedTrip.currency);

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const toggleDeleteConfirmation = () => {
    setDeleteConfirmationVisible(!isDeleteConfirmationVisible);
  };

  const handleDownload = () => {
    toggleMenu();
  };

  const handleEdit = () => {
    toggleMenu();
  };

  const handleDelete = () => {
    toggleMenu();
    toggleDeleteConfirmation();
  };

  const handleAddPress = () => {
    navigation.navigate('Category', { screen: 'CategoryScreen' });
  };

  return (
    <>
      <View className="absolute top-6 right-0 z-50 mt-10 mr-10">
        <TouchableOpacity onPress={toggleMenu}>
          <Entypo name="dots-three-vertical" size={24} color="darkgrey" />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isMenuVisible}
        onRequestClose={toggleMenu}
      >
        <View className="absolute top-16 right-4 bg-white rounded-md p-4 shadow">
          <TouchableOpacity onPress={handleDownload} className="p-2">
            <View className="flex-row items-center">
              <Entypo name="download" size={16} color="black" />
              <Text className="ml-2">Download trip</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleEdit} className="p-2">
            <View className="flex-row items-center">
              <Entypo name="edit" size={16} color="black" />
              <Text className="ml-2">Edit trip</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleDelete} className="p-2">
            <View className="flex-row items-center">
              <FontAwesome6 name="trash-can" size={16} color="red" />
              <Text className="ml-3 text-[#FF0000]">Delete trip</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isDeleteConfirmationVisible}
        onRequestClose={toggleDeleteConfirmation}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <View className="bg-white p-5 rounded-lg">
            <Text className="font-bold mb-4 text-center ">Delete Trip?</Text>
            <Text>Are you sure you want to delete this trip?</Text>
            <View className="flex-row justify-between mt-5">
              <TouchableOpacity
                onPress={toggleDeleteConfirmation}
                className="bg-lightGray p-4 rounded-md"
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDelete}
                className="bg-red-500 p-4 rounded-md"
              >
                <Text className="text-white">Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View className="mt-20 ml-7 justify-start items-left">
        <Text className="text-3xl mt-20 text-[#00b0a3]  font-bold items-start">
          {pinnedTrip ? pinnedTrip.name : 'Trip name'}
        </Text>
        <Text className="text-lg mb-4 font-bold text-[#999]">
          {new Date(pinnedTrip.start).toLocaleDateString()} –{' '}
          {new Date(pinnedTrip.end).toLocaleDateString()}
        </Text>
      </View>

      <View className="flex-1 items-center">
        {/* {isTripOver && (
          <View className="bg-[#f24f13] rounded-md mb-4">
            <Text className="w-[310px] p-3 text-[#fdfdfd] text-center font-bold">
              This trip ended in {new Date(pinnedTrip.end).toLocaleDateString()}
            </Text>
          </View>
        )} */}

        <View>
          <View className="bg-lightGray rounded-md mb-4">
            <Text className="w-[380px] p-3 text-lg text-[#999]">
              Total Spent{' '}
            </Text>
            <Text className="ml-auto mr-4 text-xl">
              {totalSpent + tripCurrencySymbol}
            </Text>
          </View>
        </View>

        <View className="flex-row justify-between items-center">
          <View className="bg-lightGray rounded-md">
            <Text className="w-[182px] p-3 text-lg text-[#999]">Balance</Text>
            <Text className="ml-auto mr-4 text-xl">
              {balance + tripCurrencySymbol}
            </Text>
          </View>

          <View className="bg-lightGray rounded-md ml-4">
            <Text className="w-[182px] p-3 text-lg text-[#999]">
              Daily Average
            </Text>
            <Text className="ml-auto mr-4 text-xl">
              {dailyAverage + tripCurrencySymbol}
            </Text>
          </View>
        </View>
      </View>

      <View className="flex-1 text-lg items-center">
        <View>
          <ExpenseList
            expenses={pinnedTrip.expenses}
            tripCurrencySymbol={tripCurrencySymbol}
          />
        </View>
      </View>

      <View className="flex flex-row justify-end">
        <TouchableOpacity onPress={handleAddPress}>
          <Image
            source={require('../../assets/images/plus.png')}
            className="mr-6 w-28 h-28"
          />
        </TouchableOpacity>
      </View>
    </>
  );
}
