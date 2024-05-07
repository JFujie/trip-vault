import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { UserProvider } from './app/contexts/userContext';
import { TripsProvider } from './app/contexts/tripsContext';

import WelcomeScreen from './app/screens/WelcomeScreen';
import LoginScreen from './app/screens/LoginScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import TabNavigation from './app/navigations/TabNavigation';
import TripScreen from './app/screens/TripScreen';
import MyAccountScreen from './app/screens/MyAccountScreen';
import AvatarScreen from './app/screens/AvatarScreen';
import CategoryScreen from './app/screens/CategoryScreen';

import UnlockFirstTripScreen from './app/screens/UnlockFirstTripScreen';
import TrackFirstExpenseScreen from './app/screens/TrackFirstExpenseScreen';
import InitiateTripScreen from './app/screens/InitiateTripScreen';
import DropdownCurrency from './app/screens/DropdownCurrency';
import SearchBar from './app/screens/SearchBar';
import TripNameScreen from './app/screens/TripNameScreen';
import TripNameEndScreen from './app/screens/TripNameEndScreen';
import NewExpenseScreen from './app/screens/NewExpenseScreen';
import MyTripsScreen from './app/screens/MyTripsScreen';
import StatsScreen from './app/screens/StatsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <TripsProvider>
        <NavigationContainer>
          <Stack.Navigator>
            {/* <Stack.Screen
          name="TabNavigation"
          component={TabNavigation}
          options={{ headerShown: false }}
        /> */}
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerBackTitleVisible: false, title: '' }}
            />
            <Stack.Screen
              name="Avatar"
              component={AvatarScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerBackTitleVisible: false, title: '' }}
            />

            {/* <Stack.Screen
          name="Category"
          component={CategoryScreen}
          options={{ headerShown: false }}
        /> */}

            <Stack.Screen
              name="UnlockFirstTrip"
              component={UnlockFirstTripScreen}
            />

            {/* <Stack.Screen
          name="InitiateTrip"
          component={InitiateTripScreen}
          options={{ headerShown: false }}
        /> */}

            {/* <Stack.Screen
          name="TrackFirstExpenseScreen"
          component={TrackFirstExpenseScreen}

        /> */}

            {/* <Stack.Screen
          name="InitiateTripScreen"
          component={InitiateTripScreen}
          options={{ headerShown: false }}
        /> */}

            {/* <Stack.Screen
          name="TripNameScreen"
          component={TripNameScreen}
          options={{ headerShown: false }}
        /> */}
            {/* <Stack.Screen
          name="TripNameEndScreen"
          component={TripNameEndScreen}
          options={{ headerShown: false }}
        /> */}
            {/* <Stack.Screen
          name="DropdownCurrency"
          component={DropdownCurrency}
          options={{ headerShown: false }}
        /> */}
            {/* <Stack.Screen
          name="SearchBar"
          component={SearchBar}
          options={{ headerShown: false }}
        /> */}

            {/* <Stack.Screen name="Trip" component={TripScreen} /> */}

            {/* <Stack.Screen name="NewExpense" component={NewExpenseScreen} /> */}
            {/* <Stack.Screen name="MyAccount" component={MyAccountScreen} /> */}
            {/* <Stack.Screen
          name="MyTrips"
          component={MyTripsScreen}
          options={{ headerShown: false }}
        /> */}
            {/* <Stack.Screen name="Stats" component={StatsScreen} /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </TripsProvider>
    </UserProvider>
  );
}