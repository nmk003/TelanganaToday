/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View, Text } from 'react-native';
import HomeStackNavigator from '../navigation/stack-navigators/HomeStackNavigator';
import { blackcolor, redcolor, whitecolor } from '../styles/commonstyles';
import LatestNews from '../screens/LatestNews';
import Home from '../screens/Home';
import Videos from '../screens/TopTabScreens/Videos';
import LinearGradient from 'react-native-linear-gradient';
import ShortsScreen from '../screens/Shorts';
import TopTabNavigator from './TopTabNavigator';
import Hyderabad from '../screens/TopTabScreens/Hyderabad';
import { navigate } from '../navigation/NavigationService';
import { showSearch } from '../redux/actions';
import Telangana from '../screens/TopTabScreens/Telangana';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const topTabNavigatorRef = React.useRef(null);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: redcolor,
        tabBarInactiveTintColor: whitecolor,
        style: { backgroundColor: 'rgba(52, 52, 52, 0.8)' },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
          fontFamily: 'TTLogo',
        },
        tabBarItemStyle: { width: 100 },
        tabBarStyle: {
          backgroundColor: blackcolor,
          height: 55,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        },
        tabBarOptions: {
          showLabel: true,
        },
      })}
    >
      <Tab.Screen
        name="TopTabs"
        component={TopTabNavigator}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            navigate('Home');
          },
        })}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarLabelStyle: {
            fontFamily: 'Roboto-Regular',
            fontWeight: '500', color: whitecolor,
            fontSize: 12,
          },
          tabBarIcon: ({ focused }) => (
            <Image
              style={{
                height: 20,
                width: 20,
                tintColor: focused ? redcolor : whitecolor,
                top: 5,
              }}
              source={require('../Assets/Images/home.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Telangana"
        component={Telangana}

        options={{
          headerShown: false,
          tabBarLabel: 'Telangana',
          tabBarLabelStyle: {
            fontFamily: 'Roboto-Regular',
            fontWeight: '500', color: whitecolor,
            fontSize: 12,
          },
          tabBarIcon: ({ focused }) => (
            <Image
              style={{
                height: 20,
                width: 20,
                tintColor: focused ? redcolor : whitecolor,
                top: 5,
              }}
              source={require('../Assets/Images/sidemenuIcons/telangana.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Shorts"
        component={ShortsScreen}
        options={{
          headerShown: false,
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: -18 }}>
              <View>
                <LinearGradient
                  colors={['#d11921', '#5c0100']}
                  start={{ x: 0.07, y: 0.1 }}
                  end={{ x: 0.87, y: 0.70 }}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Image
                    style={{
                      height: 20,
                      width: 20,
                      tintColor: whitecolor,
                    }}
                    source={require('../Assets/Images/shorts.png')}
                  />
                  <Text style={{ color: whitecolor, fontSize: 12 }}>Shorts</Text>
                </LinearGradient>
              </View>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Latest"
        component={LatestNews}
        options={{
          headerShown: false,
          tabBarLabel: 'Latest',
          tabBarLabelStyle: {
            fontFamily: 'Roboto-Regular',
            fontWeight: '500', color: whitecolor,
            fontSize: 12,
          },
          tabBarIcon: ({ focused }) => (
            <Image
              style={{
                height: 20,
                width: 20,
                tintColor: focused ? redcolor : whitecolor,
                top: 5,
              }}
              source={require('../Assets/Images/paper.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Hyderabad"
        component={Hyderabad}
        options={{
          headerShown: false,
          tabBarLabel: 'Hyd',
          tabBarLabelStyle: {
            fontFamily: 'Roboto-Regular',
            fontWeight: '500', color: whitecolor,
            fontSize: 12,
          },
          tabBarIcon: ({ focused }) => (
            <Image
              style={{
                height: 17,
                width: 17,
                tintColor: focused ? redcolor : whitecolor,
                top: 5,
              }}
              source={require('../Assets/Images/sidemenuIcons/hyd.png')}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
