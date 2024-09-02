/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
  Easing,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { blackcolor, commonstyles, graycolor, whitecolor } from '../styles/commonstyles';
import ShortsComponent from '../components/ShortsComponent';
import { useSelector } from 'react-redux';

const ShortsScreen = ({ navigation }) => {
  const latestNews = useSelector(state => state.latestNewsReducer.latestNews);
  const [currentIndex, setCurrentIndex] = useState(0);
  const windowHeight = Dimensions.get('window').height;

  const renderItemOne = ({ item, index }) => (
    <ShortsComponent
      item={item}
      index={index}
      propsdata={latestNews?.data}
      navigation={navigation}
    />
  );

  return (
    <SafeAreaView style={{}}>
      <View style={commonstyles.shortsmainView}>
        <View>
          <TouchableOpacity onPress={() => {
            navigation.goBack();
          }}>
            <Image
              style={{ width: 25, height: 25, top: 5 }}
              source={require('../Assets/Images/close.png')}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={commonstyles.shortsheading}>Shorts</Text>
        </View>
        <View>
          {/* <Text style={{ top: 5, color: blackcolor }}>{`${currentIndex + 1}/${latestNews?.data.length}`}</Text> */}
        </View>
      </View>
      <View style={{}}>
      <Carousel
        data={latestNews?.data}
        renderItem={renderItemOne}
        sliderHeight={windowHeight}
        itemHeight={windowHeight}
                vertical={true}
        onSnapToItem={(index) => setCurrentIndex(index)}
        // autoplay={true}
        // autoplayInterval={1000} // 1 second interval between slides
        animationOptions={{
          duration: 200, // Animation duration for slide transition
          easing: Easing.inOut(Easing.ease),
          isInteraction: false,
          useNativeDriver: true,

        }}

      />
      </View>
    </SafeAreaView>
  );
}


export default ShortsScreen;
