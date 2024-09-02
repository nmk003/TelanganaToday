// ActivityIndicator.js
import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { dark_blue, red_color, whitecolor } from '../styles/commonstyles';

const CustomActivityIndicator = () => {
  return (
    <View style={{ flex: 1,
        justifyContent: 'center',
        alignItems: 'center'}}>
      <ActivityIndicator size="large" color={dark_blue} />
    </View>
  );
};



export default CustomActivityIndicator;
