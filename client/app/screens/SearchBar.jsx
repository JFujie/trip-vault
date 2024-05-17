import { useState } from 'react';
import { View, TextInput, TouchableOpacity, Modal, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

const SearchBar = ({ trips, setFilteredTrips }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    const filteredTrips = trips.filter(trip =>
      trip.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredTrips(filteredTrips);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setFilteredTrips(trips);
  };

  return (
    <View className="flex-1 items-center">
      <View className="flex-row w-[380px] mt-2 bg-lightGray rounded-md p-2 ">
        <Feather name="search" size={32} color="gray" className="mr-2" />
        <TextInput
          placeholder="Search trip by name..."
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
          className="flex-1 pl-4 text-lg text-[#999] placeholder-gray-500"
        />
        <TouchableOpacity>
          <Feather name="x" size={24} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchBar;
