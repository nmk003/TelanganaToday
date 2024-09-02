/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Image, TouchableOpacity, Text, Linking } from 'react-native';
import HomeStackNavigator from '../navigation/stack-navigators/HomeStackNavigator';
import { HeaderStyle } from '../styles/Header.Styles';
import { whitecolor, dark_graycolor, blackcolor, off_white, marooncolor, redcolor } from '../styles/commonstyles';
import SideMenu from '../components/SideMenu';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#f0f0f0', // Change this color to your desired background color
          width: 240,
        },
        tabBarStyle: {
          backgroundColor: whitecolor,
          borderBottomWidth: 1.3,
          borderBottomColor: dark_graycolor,
        },
        headerStyle: {
          backgroundColor: off_white,
          justifyContent:'space-between'        },
      }}
      drawerContent={props => <SideMenu {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={HomeStackNavigator}
        options={({ navigation }) => ({
          headerLeft: () => (
            <View style={HeaderStyle.headerLeftView}>
              <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <Image
                  style={HeaderStyle.headerLeftImg}
                  source={require('../Assets/Images/menu_red.png')}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: () => (
            <View style={{}}>
              {/* <TouchableOpacity onPress={() => navigation.navigate('Home')}> */}
                <Image
                  style={HeaderStyle.HeadTitleImg}
                  source={require('../Assets/Images/logo1.png')}
                />
              {/* </TouchableOpacity> */}
            </View>
          ),
          headerRight: () => (
            <View style={{ marginRight: 10 }}>
              <TouchableOpacity style={{
                flexDirection: 'row', 
                borderRadius: 5, width: 50, justifyContent: 'center',
                alignSelf: 'center', alignContent: 'center', height: 27,
              }}
                onPress={() => {
                  Linking.openURL('https://epaper.telanganatoday.com');
                }}>
                <Text style={{
                  color: marooncolor, fontSize: 12, fontWeight: '700', top: 5,
                  textAlign: 'center',
                }}>EPaper</Text>
              </TouchableOpacity>
            </View>
          ),
          headerShown: true,
        })}
      />

    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
