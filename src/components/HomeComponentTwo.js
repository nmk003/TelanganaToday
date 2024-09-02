/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Alert, Text, TouchableOpacity, View, Image} from 'react-native';

import {blackcolor, commonstyles} from '../styles/commonstyles';
import moment from 'moment/moment';

class HomeComponentTwo extends React.PureComponent {
  render() {
    const defaultImage = require('../Assets/Images/no_image.png');
    const imageUrl = this.props?.item?.web_featured_image
      ? {uri: this.props?.item?.web_featured_image}
      : defaultImage;
    let decode = require('html-entities-decoder');
    const now = moment.utc();
    const date = moment.utc(this.props?.item?.date_gmt || now);
    const diffSeconds = now.diff(date, 'seconds');
    const diffMinutes = now.diff(date, 'minutes');
    const diffHours = now.diff(date, 'hours');
    const diffDays = now.diff(date, 'days');

    let formattedDate;
    if (diffSeconds < 60) {
      formattedDate = `${diffSeconds} SECONDS AGO`;
    } else if (diffMinutes < 60) {
      formattedDate = `${diffMinutes} MINUTES AGO`;
    } else if (diffHours < 24) {
      formattedDate = `${diffHours} HOURS AGO`;
    } else {
      formattedDate = `${diffDays} DAYS AGO`;
    }
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            this.props?.navigation.navigate('Details', {
              item: this.props?.item,
              detailsData: this.props?.propsdata,
            });
          }}>
          <View style={commonstyles.HomeComp2MainView}>
            <View style={commonstyles.HomeComp2DotView}>
              <View style={commonstyles.cateviewText}>
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={commonstyles.latestText}>
                  {decode(this.props?.item?.title?.rendered)}
                </Text>
                <View style={commonstyles.timeview}>
                  <Text style={commonstyles.latesttime}>{formattedDate}</Text>
                </View>
              </View>
              <View style={commonstyles.cateviewImg}>
                <Image source={imageUrl} style={commonstyles.cateImage} />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
export default HomeComponentTwo;
