/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Share,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {
  blackcolor,
  commonstyles,
  dark_graycolor,
  graycolor,
  light_gray,
  redcolor,
} from '../styles/commonstyles';
import AutoHeightWebView from 'react-native-autoheight-webview';
import moment from 'moment';
import { connect, useDispatch } from 'react-redux';
import getRelatedAction from '../redux/actions/getRelatedAction';
import getArticleDetailAction from '../redux/actions/getArticleDetailAction';
import DetailsComponentTwo from '../components/DetailsComponentTwo';
import DetailsComponentOne from '../components/DetailsComponentOne';
import DetailsComponentThree from '../components/DetailsComponentThree';
import SubHeader from '../components/SubHeader';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const screenWidth = Dimensions.get('window').width;

const Details = ({
  navigation,
  relatedData,
  latestNews,
  latestLoading,
  route,
}) => {
  const dispatch = useDispatch();
  const [detailsData, setDetailsData] = useState([]);
  const [fontSize, setFontSize] = useState(18); // Initial font size state
  const [showSwipeLabel, setShowSwipeLabel] = useState(true); // State to control the visibility of the swipe label

  useEffect(() => {
    dispatch(getRelatedAction(route?.params?.item?.id));
    setDetailsData(route?.params?.detailsData);
    dispatch(getArticleDetailAction());
  }, [dispatch, route]);

  useEffect(() => {
    goToTop();
  });

  useEffect(() => {
    // console.log('Related Data:', relatedData);
  }, [relatedData]);

  const Scrollref = useRef();

  const goToTop = () => {
    Scrollref.current.scrollTo({ x: 0, y: 0, animated: true });
  };

  const sharecall = () => {
    const Link_Url = route?.params?.item?.link;
    Share.share({
      message: Link_Url,
    })
      .then(result => console.log(result))
      .catch(error => console.log(error));
  };

  const source = route?.params?.item?.content?.rendered || '';
  var source1 = source.replace('lazyload', 'text/javascript');

  const toggleFontSize = () => {
    if (fontSize === 18) {
      setFontSize(20);
    } else if (fontSize === 20) {
      setFontSize(23);
    } else if (fontSize === 23) {
      setFontSize(25);
    } else {
      setFontSize(18);
    }
  };


  const renderItemOne = ({ item }) => (
    <DetailsComponentOne
      item={item}
      propsdata={latestNews?.data}
      navigation={navigation}
    />
  );

  const renderItemTwo = ({ item }) => (
    <DetailsComponentTwo
      item={item}
      propsdata={latestNews?.data}
      navigation={navigation}
    />
  );
  const getIndex = () => {
    // Check if detailsData is defined and has elements
    if (detailsData && detailsData.length > 0) {
      const currentIndex = detailsData.findIndex(x => x.id === route?.params?.item?.id);
      return currentIndex + 1 < detailsData.length ? currentIndex + 1 : 0;
    } else {
      return 0; // Default to the first article if detailsData is undefined or empty
    }
  };
  const renderNextArticle = ({ item }) => (
    <DetailsComponentThree
      item={item}
      propsdata={detailsData}
      navigation={navigation}
    />
  );

  const defaultImage = require('../Assets/Images/no_image.png');
  const imageUrl = route?.params?.item?.web_featured_image
    ? { uri: route?.params?.item?.web_featured_image }
    : defaultImage;
  let decode = require('html-entities-decoder');
  const now = moment.utc();
  const date = moment.utc(route?.params?.item?.date_gmt || now);
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
    <View style={commonstyles.container}>
      <ScrollView ref={Scrollref}>
        <View
          style={{
            position: 'relative',
            height: '100%',
          }}>
          <View>
            <ImageBackground
              source={imageUrl}
              style={commonstyles.Detailslargecard}>
              <TouchableOpacity
                style={{
                  padding: 12,
                  width: '12%',
                  position: 'absolute',
                  justifyContent: 'center',
                }}
                onPress={() => navigation.goBack()}>
                <Image
                  style={{ width: 30, height: 30, right: 5 }}
                  source={require('../Assets/Images/previous.png')}
                />
              </TouchableOpacity>
            </ImageBackground>
          </View>
          <View style={commonstyles.DetailsMainView}>
            {/* category view */}
            <View style={commonstyles.DetailsSubView}>
              <View style={commonstyles.DetailsCategoryTextView}>
                <Text style={commonstyles.DetailsCategoryText}>
                  {route?.params?.item?.category_name}
                </Text>
              </View>
              <View style={{ display: 'flex', alignItems: 'center', width: 50, flexDirection: 'row' }}>
                <View style={{ display: 'flex', alignItems: 'center' }}>
                  <TouchableOpacity onPress={toggleFontSize}>
                    <Image
                      style={{ width: 20, height: 20, marginRight: 10 }}
                      source={require('../Assets/Images/font.png')}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{ display: 'flex', alignItems: 'center' }}>
                  <TouchableOpacity onPress={sharecall}>
                    <Image
                      style={commonstyles.DetailsShareImage}
                      source={require('../Assets/Images/new_share.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {/* Tittle */}
            <View style={{ paddingLeft: 10, paddingTop: 5, paddingRight: 5 }}>
              <Text style={commonstyles.Detailstittle}>
                {decode(route?.params?.item?.title?.rendered)}
              </Text>
            </View>
            {/* Date */}
            <View style={{ paddingLeft: 10 }}>
              <Text style={commonstyles.detailTime}>{formattedDate}</Text>
            </View>
            {/* Author */}
            <View style={{ paddingTop: 5, paddingLeft: 10 }}>
              <Text style={commonstyles.detailauthor}>
                {decode(
                  route?.params?.item?._embedded?.author[0]?.name,
                )?.toUpperCase()}
              </Text>
            </View>
            {/* Content */}
            <View
              style={{

                justifyContent: 'center',
                pointerEvents: 'none',
                paddingLeft: 5,
                paddingBottom: 5,
              }}>
              <AutoHeightWebView
                style={{

                  marginTop: 10,
                }}
                customStyle={`
                    * { font-family: 'Faustina'; line-height: 0.1; -webkit-user-select: none; -webkit-touch-callout: none; }
                    p { font-size: ${fontSize}px; text-align: left; font-family: 'Faustina'; line-height: 20px; font-weight: none; }
                    p img { width: 100%; height: inherit; }
                    p iframe { width: 100%; height: inherit; }
                    img { width: 100%; height: inherit; }
                    div[id*=attachment] { max-width: 100%!important; height: inherit; }
                  `}
                source={{
                  html: `
                      ${source1}
                      <style>
                        @import url('https://fonts.googleapis.com/css2?family=Faustina&display=swap');
                        p strong, span, p span { font-family: 'Faustina', sans-serif; }
                        p, li { font-family: 'Faustina', sans-serif; line-height: 1.2; padding: 0px 8px; color: #000; font-weight: 500; font-size: ${fontSize}px; }
                      </style>
                    `,
                  baseUrl: 'https://twitter.com',
                }}
                scalesPageToFit={false}
                viewportContent={'width=device-width, user-scalable=no'}
              />
            </View>
          </View>

          {/* Next Article */}
          <View>
            <View style={commonstyles.homecategoryView}>
              <View>
                <Text style={commonstyles.Category}>Next Article</Text>
              </View>
            </View>

            {detailsData && detailsData.length > 1 ? ( // Ensure there's at least one more article to display
              <View>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  persistentScrollbar={false}
                  horizontal={false}
                  data={[detailsData[getIndex()]]} // Display only the next article
                  renderItem={renderNextArticle}
                  keyExtractor={item => item?.id?.toString()} // Use optional chaining to avoid errors
                />
              </View>
            ) : (
              <View style={{justifyContent:'center'}}>
                <Text>No Next articles available</Text>
              </View>
               )}
          </View>

          {/* LatestNews */}
          <View>
            <View style={commonstyles.homecategoryView}>
              <View>
                <Text style={commonstyles.Category}>Latest News</Text>
              </View>
            </View>
            {latestNews?.data !== 0 && !latestLoading ? (
              <View style={{ paddingLeft: 10 }}>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  persistentScrollbar={false}
                  data={latestNews?.data?.slice(0, 1)}
                  renderItem={renderItemOne}
                />
                <View
                  style={{
                    borderBottomColor: light_gray,
                    borderBottomWidth: 4,
                  }}>
                  <FlatList
                    showsHorizontalScrollIndicator={true}
                    persistentScrollbar={false}
                    horizontal={true}
                    data={latestNews?.data?.slice(1, 10)}
                    renderItem={renderItemTwo}
                  />
                </View>
              </View>
            ) : (
              <View>
                <Text>Loading</Text>
              </View>
            )}
          </View>


        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  swipeLabelContainer: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  swipeLabel: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    padding: 10,
    borderRadius: 5,
  },
});

const mapStateToProps = state => ({
  relatedData: state.relatedReducer?.relatedData,
  relatedLoading: state.relatedReducer?.relatedLoading,
  sliderData: state.sliderReducer?.sliderData,
  loading: state.sliderReducer?.loading,
  latestNews: state.latestNewsReducer?.latestNews,
  latestLoading: state.latestNewsReducer?.latestLoading,
  articleDetailData: state.articleDetailReducer?.articleDetailData,
  articleDetailLoading: state.articleDetailReducer?.articleDetailLoading,
});

const mapDispatchToProps = {
  getRelatedAction,
  getArticleDetailAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);
