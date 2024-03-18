import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ActivityIndicator} from 'react-native';

const Comment = ({allcomment, loading}) => {
  // setComments(allcomment);

  // console.log('comments', allcomment);

  // const comments = [
  //   {
  //     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28b1',
  //     user: 'Admin',
  //     message: 'message 1',
  //   },
  //   {
  //     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f62',
  //     user: 'User',
  //     message: 'message 2',
  //   },
  //   {
  //     id: '58694a0f-3da1-471f-bd96-145571e29d73',
  //     user: 'User',
  //     message: 'message 3',
  //   },
  //   {
  //     id: '58694a0f-3da1-471f-bd96-145571e29d74',
  //     user: 'User',
  //     message: 'message 4',
  //   },
  //   {
  //     id: '58694a0f-3da1-471f-bd96-145571e29d75',
  //     user: 'Admin',
  //     message: 'message 5',
  //   },
  //   {
  //     id: '58694a0f-3da1-471f-bd96-145571e29d76',
  //     user: 'User',
  //     message: 'message 6',
  //   },
  //   {
  //     id: '58694a0f-3da1-471f-bd96-145571e29d77',
  //     user: 'Admin',
  //     message: 'message 7',
  //   },
  //   {
  //     id: '58694a0f-3da1-471f-bd96-145571e29d78',
  //     user: 'User',
  //     message: 'message 8',
  //   },
  //   {
  //     id: '58694a0f-3da1-471f-bd96-145571e29d79',
  //     user: 'Admin',
  //     message: 'message 9',
  //   },
  // ];

  // console.log('idforComment inside comment', idforComment);
  // console.log('all comments inside comment', allcomment);

  const flatListRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom when the component mounts or when allcomment changes
    flatListRef.current?.scrollToOffset({offset: 0, animated: false});
  }, [allcomment, loading]);

  // console.log('loading', loading);

  const Item = ({comments}) => (
    // <View>
    //   {console.log(
    //     'comments',
    //     comments != undefined ? comments : 'comments undefind',
    //   )}
    // </View>
    <View>
      {comments.isAdmin == true ? (
        <View style={styles.admincomment}>
          {/* <Text style={{color: '#049A5B'}}>{comment.user}</Text> */}
          <Text style={{marginLeft: 10, color: '#ffffff'}}>
            {comments.comment}
          </Text>
        </View>
      ) : (
        <View style={styles.usercomment}>
          {/* <Text style={{color: '#049A5B'}}>{comment.user}</Text> */}
          <Text style={{marginLeft: 10, color: 'rgba(0, 0, 0, 0.66)'}}>
            {comments.comment}
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={{height: 300}}>
      {/* {console.log('allcomment', allcomment)} */}
      {allcomment != '' && !loading ? (
        <FlatList
          ref={flatListRef}
          style={{height: 50}}
          data={allcomment}
          renderItem={
            comment => <Item comments={comment.item} key={comment._id} />

            // console.log(comment.item)
          }
          // renderItem={comment => console.log(comment.item.message)}
          // renderItem={({comment}) => <Item comment={comment.item.message} />}
          // keyExtractor={comment => comment.item._id}
        />
      ) : !loading ? (
        <Text style={{marginTop: 90}}>No any Comments</Text>
      ) : (
        <ActivityIndicator style={{marginTop: 100}} size="large" />
      )}
    </SafeAreaView>
  );
};

export default Comment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: 50,
  },
  admincomment: {
    display: 'flex',
    // shadowOpacity: '1',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: 300,
    backgroundColor: '#7CCEA7',
    padding: 20,
    marginVertical: 8,
    // marginHorizontal: 16,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    borderTopRightRadius: 40,
    shadowColor: 'red',
  },

  usercomment: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: 300,
    backgroundColor: '#C0FFCE',
    padding: 20,
    marginVertical: 8,
    // marginHorizontal: 16,
    // borderRadius: 40,
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  title: {
    fontSize: 32,
  },
});
