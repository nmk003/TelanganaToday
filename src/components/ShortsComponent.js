/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useRef } from 'react';
import {
    Alert,
    Dimensions,
    Image,
    ImageBackground,
    ScrollView,
    Share,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import moment from 'moment';
import { appThemeColor, blackcolor, commonstyles, graycolor, Header_text, whitecolor } from '../styles/commonstyles';
import AutoHeightWebView from 'react-native-autoheight-webview';

class ShortsComponent extends React.PureComponent {

    render() {

        const sharecall = () => {
            const Link_Url = this.props?.item?.link;
            Share.share({
                message: Link_Url,
            })
                .then((result) => console.log(result))
                .then((error) => console.log(error));
        };
        let decode = require('html-entities-decoder');
        const now = moment.utc();
        const date = moment.utc(this.props?.item?.date_gmt || now);
        const diffSeconds = now.diff(date, 'seconds');
        const diffMinutes = now.diff(date, 'minutes');
        const diffHours = now.diff(date, 'hours');
        const diffDays = now.diff(date, 'days');

        let formattedDate;
        if (diffSeconds < 60) {
            formattedDate = `${diffSeconds} seconds ago`;
        } else if (diffMinutes < 60) {
            formattedDate = `${diffMinutes} minutes ago`;
        } else if (diffHours < 24) {
            formattedDate = `${diffHours} hours ago`;
        } else {
            formattedDate = `${diffDays} days ago`;
        }
        const defaultImage = require('../Assets/Images/no_image.png');
        const imageUrl = this.props?.item?.web_featured_image
            ? { uri: this.props?.item?.web_featured_image }
            : defaultImage;
        const source = this.props?.item?.excerpt?.rendered || '';
        var source1 = source.replace('lazyload', 'text/javascript');

        const screenWidth = Dimensions.get('window').width;

        return (
            <View style={{  backgroundColor: whitecolor, borderRadius: 20 
          
            }}>
                <ScrollView>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('Details', {
                                item: this.props.item,
                                detailsData: this.props?.propsdata,
                            });
                        }}>


                        <View stye={{}}>
                            {/* Image */}
                            <View style={{ }}>
                                <Image
                                    source={imageUrl}
                                    style={{
                                        width: '100%',
                                    height: 200,
                                    // maxHeight: 250,
                                    resizeMode: 'contain',
                                    borderTopLeftRadius: 20,
                                    borderTopRightRadius: 20,
                                    }}
                                />
                            </View>
                            {/* Titttle */}
                            <View style={commonstyles.shortstittleview}>

                                <Text style={commonstyles.shortstittletext}>
                                    {decode(this.props?.item?.title?.rendered)}

                                </Text>
                            </View>
                            <View style={{

                            }}>
                                {/* Time and Share View */}
                                <View style={commonstyles.shortstimeview}>

                                    <View style={{}}>
                                        <Text style={commonstyles.detailTime}>{formattedDate}</Text>
                                    </View>

                                    <View>
                                        <TouchableOpacity onPress={() => {
                                            sharecall();
                                        }}>
                                            <Image
                                                style={commonstyles.shortsshareimage}
                                                source={require('../Assets/Images/new_share.png')}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>



                                {/* description */}

                                <View
                                    style={{
                                        // width: screenWidth - 15,
                                        justifyContent: 'center',
                                        padding: 10,
                                    }}>

                                    <AutoHeightWebView style={{ width: Dimensions.get('window').width - 25,paddingLeft:5 }}
                                        customStyle={`
              * {
                font-family: 'Roboto-Medium';
                line-height: 1.5;
                -webkit-user-select: none;
                  -webkit-touch-callout: none; 
                 }
                
              p {
                font-size: 14px;
                text-align:left;
                font-family:'Faustina';
                line-height:30px;
                font-weight:none;
                                              }
                                              p img{
                                                width:100%;
                                                height:inherit
                                              }
                                              p iframe{
                                                width:100%;
                                                height:inherit
                                              }
                                              img{
                                                width:100%;
                                                height:inherit
                                              }
                                              div[id*=attachment]{
                                                max-width:100%!important;
                                                height:inherit
                                              }
                                             
                                            
            `}
                                        source={{
                                            html: (source1 +=
                                                "<style>@import url('https://fonts.googleapis.com/css2?family=Faustina&display=swap');p strong, span, p span{font-family: 'Faustina', sans-serif;}p,li{font-family: 'Faustina', sans-serif;line-height:1.6;padding:0px 8px;color:#000;font-weight:500;font-size:18px}</style>"),
                                            baseUrl: 'https://twitter.com',
                                        }}
                                        scalesPageToFit={false}
                                        viewportContent={'width=device-width, user-scalable=no'}

                                    />




                                </View>


                            </View>

                        </View>
                    </TouchableOpacity>
                </ScrollView>

            </View>
        );
    };
};
export default ShortsComponent;
