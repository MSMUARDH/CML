import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useEffect, useContext, useState} from 'react';

import {SafeAreaView} from 'react-native-safe-area-context';

import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import RoundedButton from '../../../components/RoundedButton';

import Modal from 'react-native-modal';
import Comment from '../../../components/Comment';
import {TextInput} from 'react-native-paper';
import RoundedButtonWithIcon from '../../../components/RoundedButtonWithIcon';
import FilterSearchComponent from '../../../components/FilterSearchComponent';
import AuthContext from '../../context/authContext';
import {useTheme} from '../../../components/context/ThemeContext';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';

import config from '../../../config';
import AdminComment from '../../../components/AdminComment';

const AdminScreen = ({navigation}) => {
  const authContext = useContext(AuthContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);

  const {theme, updateTheme, background, updateBackground} = useTheme();

  const [image, setImage] = useState([]);
  const [postdData, setPostData] = useState([]);
  const [idforComment, setIdForComment] = useState('');

  const [loading, setLoading] = useState(false);

  const [allcomment, setAllComment] = useState('');
  const [comment, setComment] = useState('');
  const [searchText, setSearchText] = useState('');

  //* dimensions
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get('window').width,
  );
  const [screenHeight, setScreenHeight] = useState(
    Dimensions.get('window').height,
  );

  // Function to update screen dimensions when the orientation changes
  const updateDimensions = () => {
    const {width, height} = Dimensions.get('window');
    setScreenWidth(width);
    setScreenHeight(height);
  };

  // Add an event listener to detect changes in screen dimensions
  useEffect(() => {
    Dimensions.addEventListener('change', updateDimensions);

    // Remove the event listener when the component unmounts
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleCommentModal = () => {
    setIsCommentModalVisible(!isCommentModalVisible);
  };

  const submitComment = async () => {
    console.log('submitted');
    try {
      if (comment != '') {
        setLoading(true);

        const response = await axios.post(
          `${config.baseURL}/api/comments/adding-comment/${idforComment}`,

          {
            // userId: '654da270de22fc98bbecf1b2',
            comment: comment,
          },
          {
            headers: {
              Authorization: `Bearer ${authContext.userToken}`,
            },
          },
        );

        console.log(response.data);

        getAllComments(idforComment);

        // if (response.status == 200) {
        //   // console.log(response.data.createdComment);
        //   // console.log("all comment",...allcomment);
        //   // setAllComment(...allcomment, response.data.createdComment);
        //   console.log(
        //     '...allcomment, response.data.createdComment',
        //     ...allcomment,
        //     response.data.createdComment,
        //   );

        //   setComment('');
        //   setLoading(false);

        //   getAllComments(idforComment);
        // }
      }
    } catch (error) {
      console.log('error', error);
      setLoading(false);
    }
  };

  const getAllComments = async detailId => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${config.baseURL}/api/comments/get-comments-admin/${detailId}`,
        // {
        //   headers: {
        //     Authorization: `Bearer ${authcontext.userToken}`,
        //   },
        // },
      );

      // console.log('comments', response.data.comments[0].comments);

      if (response.status == 200) {
        // console.log('test', response.data);
        setAllComment(response.data.comments[0].comments);
        setLoading(false);

        // setComment({
        //   UserId: '',
        //   comment: '',
        //   isAdmin: '',
        // });

        // response.data.comments[0].comments.map(cmt => {
        //   console.log('cmt', cmt);
        // });
      }
      // else if () {

      // }
    } catch (error) {
      console.log('error', error);
      setAllComment('');
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // settingContext.getSettings(authcontext.userToken);
      console.log('user posts details..');

      const getAllLocationDetails = async () => {
        const response = await axios.get(
          `${config.baseURL}/api/location/get-all-location-details`,
          // {
          //   headers: {
          //     Authorization: `Bearer ${authcontext.userToken}`,
          //   },
          // },
        );

        console.log(
          'response.data.locationDetails',
          response.data.locationDetails,
        );
        setPostData(response.data.locationDetails);

        // console.log(response.data.locationDetails.imagesDetails.images[0].url);
        // setImage(response.data.locationDetails.imagesDetails.images[0].url);
      };

      getAllLocationDetails();
    }, []),
  );

  const Item = ({location, imageUrl, detailId}) => (
    <View style={styles.item}>
      <Image
        style={{width: '100%', height: 200, borderRadius: 20}}
        source={{uri: `${imageUrl}`}}
        resizeMode="cover"
      />
      <View style={styles.iconcontainer}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <FontAwesome6
            name="location-dot"
            size={25}
            color="#7CCEA7"
            style={{marginRight: 5}}
          />
          <Text style={{fontSize: 16, color: '#7CCEA7'}}>{location}</Text>
        </View>
        <TouchableOpacity
          // onPress={toggleCommentModal}
          onPress={() => {
            toggleCommentModal();
            console.log('detailId', detailId);
            setIdForComment(detailId);
            getAllComments(detailId);
          }}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <FontAwesome5
            style={{marginRight: 5}}
            name="comment-dots"
            size={25}
            color="#7CCEA7"
            solid
          />
          <Text style={{fontSize: 16, color: '#7CCEA7'}}>Comments</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const filteredPosts = postdData.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/bg-1.jpg')}
        resizeMode="cover"
        style={styles.bgImage}>
        <Text
          style={{
            marginTop: 40,
            textAlign: 'center',
            fontSize: 20,
            fontWeight: '900',
            color: '#146F43',
          }}>
          User's Posts
        </Text>
        <View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 100,
            }}>
            <TextInput
              cursorColor="green"
              textColor="black"
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              placeholderTextColor="gray"
              style={styles.searchInput}
              placeholder="Search Post"
              onChangeText={value => setSearchText(value)}
              // value={number}
            />
          </View>
        </View>

        <FlatList
          data={filteredPosts}
          renderItem={({item}) => (
            <Item
              detailId={item._id}
              location={item.name}
              imageUrl={item.imagesDetails.images[0].url}
            />
          )}
          keyExtractor={item => item._id}
        />

        <View>
          <Modal
            onBackButtonPress={toggleModal}
            style={{
              marginTop: screenHeight * 0.6,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(20, 111, 67, 0.87)',
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
            }}
            animationIn={'fadeInUp'}
            animationOut={'fadeOutDown'}
            animationOutTiming={1200}
            animationInTiming={1200}
            isVisible={isModalVisible}>
            <View>
              <View style={{marginTop: 5}}>
                <RoundedButtonWithIcon
                  background="#049A5B"
                  onPress={() => {
                    navigation.navigate('LocationListScreen');
                    toggleModal();
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                      alignItems: 'center',
                    }}>
                    <FontAwesome6
                      name="location-dot"
                      size={25}
                      color="#7CCEA7"
                      style={{marginRight: 5}}
                    />
                    <Text style={{fontSize: 20, fontWeight: '900'}}>
                      Location
                    </Text>
                  </View>
                </RoundedButtonWithIcon>
              </View>
              <View style={{marginTop: 5}}>
                <RoundedButtonWithIcon
                  background="#049A5B"
                  onPress={() => {
                    navigation.navigate('AdminScreen');
                    toggleModal();
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                      alignItems: 'center',
                    }}>
                    <FontAwesome5
                      name="photo-video"
                      size={25}
                      color="#7CCEA7"
                      style={{marginRight: 5}}
                    />
                    <Text style={{fontSize: 20, fontWeight: '900'}}>
                      View Posts
                    </Text>
                  </View>
                </RoundedButtonWithIcon>
              </View>
              <View style={{marginTop: 5}}>
                <RoundedButtonWithIcon
                  background="#049A5B"
                  onPress={() => {
                    navigation.navigate('SettingScreen');
                    toggleModal();
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                      alignItems: 'center',
                    }}>
                    <FontAwesome5
                      name="tools"
                      size={25}
                      color="#7CCEA7"
                      style={{marginRight: 5}}
                    />
                    <Text style={{fontSize: 20, fontWeight: '900'}}>
                      Settings
                    </Text>
                  </View>
                </RoundedButtonWithIcon>
              </View>
            </View>
          </Modal>
        </View>

        <View style={{backgroundColor: 'red'}}>
          <Modal
            style={styles.commentmodal}
            onBackButtonPress={toggleCommentModal}
            animationInTiming={1500}
            animationOutTiming={1000}
            animationIn={'fadeInUp'}
            animationOut={'fadeOutDown'}
            isVisible={isCommentModalVisible}>
            <AdminComment allcomment={allcomment} loading={loading} />
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
                // marginHorizontal: 20,
              }}>
              <TextInput
                style={styles.input}
                onChangeText={text => setComment(text)}
                value={comment}
                placeholder="Type your comment here"
              />

              <TouchableOpacity style={styles.button} onPress={submitComment}>
                <MaterialIcons name="send" size={30} color="white" />
              </TouchableOpacity>
            </View>
          </Modal>
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 8,
          }}>
          <RoundedButton
            text="Menu"
            onPress={() => {
              toggleModal();
            }}
          />
          <RoundedButton
            text="Logout"
            onPress={() => {
              authContext.signOut();
            }}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default AdminScreen;

const styles = StyleSheet.create({
  searchInput: {
    width: 250,
    height: 40,
    margin: 12,
    padding: 5,
    borderRadius: 40,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderColor: 'white',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#049A5B',
    padding: 10,
    width: 50,
    height: 50,
    borderRadius: 50,
    marginLeft: 5,
  },
  input: {
    width: 250,
    height: 40,
    padding: 5,
    borderRadius: 40,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderColor: 'white',
  },
  commentmodal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },

  iconcontainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
  },

  containertest: {
    display: 'flex',
    alignItems: 'center',
    // flexDirection: 'column',
    // flex: 1,
  },
  item: {
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(20, 111, 67, 0.85)',
    padding: 20,
    marginVertical: 20,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  image: {
    width: 300, // Adjust the width as needed
    height: 200, // Adjust the height as needed

    marginBottom: 10, // Add spacing between images
    resizeMode: 'cover', // You can adjust the image resizeMode
    marginHorizontal: 20,
  },

  postContainer: {
    // display: 'flex',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    // Add any additional styles for the scroll content here
  },
  post: {
    width: 150,
    height: 150,
    backgroundColor: 'green',
    margin: 10,
  },
  bgImage: {
    flex: 1,
    // justifyContent: 'center',
  },
});
