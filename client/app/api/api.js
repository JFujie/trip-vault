import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseUrl = 'http://192.168.0.237:8080';

const getToken = async () => {
  const token = await AsyncStorage.getItem('token');
  return token;
};

// * all the requests should be called after 'await' keyword

// ? auth requests

export const registerUser = async newUser => {
  // * newUser as parameter
  try {
    const res = await axios.post(`${baseUrl}/auth/register`, newUser, {
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(res.data);
    return res.data; // return object with the registered user info
  } catch (err) {
    console.error(err);
  }
};

export const loginUser = async userData => {
  // * userData {credential, password} as parameter
  try {
    const res = await axios.post(`${baseUrl}/auth/login`, userData, {
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(res.data);
    return res.data; // return object with 'token' and 'user' properties
  } catch (err) {
    console.error(err);
  }
};

// ? user requests (i think we won't need getUser)

export const updateUser = async updatedUser => {
  // * updatedUser (with complete information, not just the changed ones inside) as parameter
  try {
    const token = await getToken();
    const res = await axios.patch(
      `${baseUrl}/user/${updatedUser._id}`,
      updatedUser,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log(res.data);
    return res.data; // return object with the updated user info
  } catch (err) {
    console.error(err);
  }
};
//!remember to setUser(res.data)

export const deleteUser = async user => {
  // * user as parameter (should have _id inside)
  try {
    const token = await getToken();

    const res = await axios.delete(`${baseUrl}/user/${user._id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    return res.data; // return just a message
  } catch (err) {
    console.error(err);
  }
};

// ? trips requests (i think we won't need getTrip)

export const getAllTrips = async () => {
  try {
    const token = await getToken();
    const res = await axios.get(`${baseUrl}/trips`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    return res.data; // return an array with all trips
  } catch (err) {
    console.error(err);
  }
};

export const addTrip = async newTrip => {
  // * newTrip as parameter
  try {
    const token = await getToken();
    const res = await axios.post(`${baseUrl}/trips`, newTrip, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    return res.data; // return object with the new trip info
  } catch (err) {
    console.error(err);
  }
};
// !frontend: remember to update user state, and setUser again, so it will be updated with the new selectedTrip

export const updateTrip = async updatedTrip => {
  // * updatedTrip (with complete information, not just the changed ones inside) as parameter
  try {
    const token = await getToken();
    const res = await axios.patch(
      `${baseUrl}/trips/${updatedTrip._id}`,
      updatedTrip,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log(res.data);
    return res.data; // return object with the updated trip info
  } catch (err) {
    console.error(err);
  }
};
// !refetch allTrips

export const deleteTrip = async trip => {
  // * trip as parameter (should have _id inside)
  try {
    const token = await getToken();

    const res = await axios.delete(`${baseUrl}/trips/${trip._id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    return res.data; // return just a message
  } catch (err) {
    console.error(err);
  }
};

// ? expenses requests (getAll and get????????????)

export const addExpense = async newExpense => {};
// !refetch trip

export const updateExpense = async updatedExpense => {};
// !refetch trip

export const deleteExpense = async expense => {};
// !refetch trip