import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ActivityIndicator} from 'react-native';

const AdminComment = ({allcomment, loading}) => {
  // console.log('idforComment inside comment', idforComment);
  // console.log('all comments inside comment', allcomment);

  const flatListRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom when the component mounts or when allcomment changes
    flatListRef.current?.scrollToOffset({offset: 0, animated: false});
  }, [allcomment, loading]);

  console.log('loading', loading);

  const Item = ({comments}) => (
    // <View>
    //   {console.log(
    //     'comments',
    //     comments != undefined ? comments : 'comments undefind',
    //   )}
    // </View>
    <View>
      {comments.isAdmin == false ? (
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

export default AdminComment;

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

// import {StyleSheet, Text, View} from 'react-native';
// import React from 'react';

// const AdminComment = () => {
//   return (
//     <View>
//       <Text>AdminComment</Text>
//     </View>
//   );
// };

// export default AdminComment;

// const styles = StyleSheet.create({});
