import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Modal from 'react-native-modal';
import Comment from '../../components/Comment';
import {TextInput} from 'react-native-paper';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import BottomNavigator from '../navigator/BottomNavigator';
import axios from 'axios';
import AuthContext from '../context/authContext';
import config from '../../config';
import {useTheme} from '../../components/context/ThemeContext';

const UserScreen = () => {
  const authcontext = useContext(AuthContext);
  const {theme, updateTheme, background, updateBackground} = useTheme();

  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
  const [image, setImage] = useState([]);
  const [postdData, setPostData] = useState([]);
  const [idforComment, setIdForComment] = useState('');

  const [loading, setLoading] = useState(false);

  // const [comment, setComment] = useState({
  //   UserId: '',
  //   comment: '',
  //   isAdmin: '',
  // });

  const [allcomment, setAllComment] = useState('');

  const [comment, setComment] = useState('');

  const toggleCommentModal = () => {
    setIsCommentModalVisible(!isCommentModalVisible);
  };

  const submitComment = async () => {
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
              Authorization: `Bearer ${authcontext.userToken}`,
            },
          },
        );

        if (response.status == 200) {
          // console.log(response.data.createdComment);
          // console.log("all comment",...allcomment);
          // setAllComment(...allcomment, response.data.createdComment);
          console.log(
            '...allcomment, response.data.createdComment',
            ...allcomment,
            response.data.createdComment,
          );

          setComment('');
          setLoading(false);

          getAllComments(idforComment);
        }
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
        `${config.baseURL}/api/comments/get-comments/${detailId}`,
        {
          headers: {
            Authorization: `Bearer ${authcontext.userToken}`,
          },
        },
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

  // console.log('AllComments', allcomment);

  // console.log('postData', postdData);

  useFocusEffect(
    React.useCallback(() => {
      // settingContext.getSettings(authcontext.userToken);
      console.log('user posts details..');

      const getLocationDetails = async () => {
        const response = await axios.get(
          `${config.baseURL}/api/location/get-location-details`,
          {
            headers: {
              Authorization: `Bearer ${authcontext.userToken}`,
            },
          },
        );

        // console.log(response.data.locationDetails);
        setPostData(response.data.locationDetails);

        // console.log(response.data.locationDetails.imagesDetails.images[0].url);
        // setImage(response.data.locationDetails.imagesDetails.images[0].url);
      };

      getLocationDetails();
    }, [allcomment]),
  );

  // type ItemProps = {location: string};

  const Item = ({location, imageUrl, detailId}) => (
    <View style={styles.item}>
      <Image
        style={{width: '100%', height: 200, borderRadius: 20}}
        // source={require('../../assets/images/post1.jpg')}
        // source={{
        //   uri: 'https://s3.us-east-2.amazonaws.com/classitree.sg/1000003836.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAXSPNXFMRGQ4MO3PW%2F20231221%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20231221T044159Z&X-Amz-Expires=900&X-Amz-Signature=38470e75dc24ae591571b96e36da67b73d03e253c8de93167d0a78dce2cb13f4&X-Amz-SignedHeaders=host&x-id=GetObject',
        // }}
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
            color={`${theme.textColor}`}
            style={{marginRight: 5}}
          />
          <Text style={{fontSize: 16, color: `${theme.textColor}`}}>
            {location}
          </Text>
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
            color={`${theme.textColor}`}
            solid
          />
          <Text style={{fontSize: 16, color: `${theme.textColor}`}}>
            Comments
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        // source={require('../../assets/images/bg-1.jpg')}
        source={{uri: background.backgroundImage}}
        resizeMode="cover"
        style={styles.bgImage}>
        <Text
          style={{
            marginTop: 40,
            textAlign: 'center',
            fontSize: 20,
            fontWeight: '900',
            color: `${theme.textColor}`,
          }}>
          Your Posts
        </Text>

        <View style={{backgroundColor: 'red'}}>
          <Modal
            style={styles.commentmodal}
            onBackButtonPress={toggleCommentModal}
            animationInTiming={1500}
            animationOutTiming={1000}
            animationIn={'fadeInUp'}
            animationOut={'fadeOutDown'}
            isVisible={isCommentModalVisible}>
            <Comment allcomment={allcomment} loading={loading} />
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
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

        <FlatList
          data={postdData}
          // renderItem={({item, index}) =>
          //   console.log('item from rendr', item.name, index)
          //   console.log('item from rendr', item.imagesDetails.images[0].url, index)
          //   console.log('item from rendr location', item.name, index)
          // }
          // keyExtractor={item =>
          //   console.log('keyextr', item.imagesDetails.images[0]._id)
          // }

          renderItem={({item}) => (
            <Item
              detailId={item._id}
              location={item.name}
              imageUrl={item.imagesDetails.images[0].url}
            />
          )}
          keyExtractor={item => item._id}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#049A5B',
    padding: 10,
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  commentmodal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 300,
    height: 40,
    margin: 12,
    padding: 5,
    borderRadius: 40,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderColor: 'white',
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
