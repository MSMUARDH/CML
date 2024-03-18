import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const UserRating = () => {
  return (
    <View style={styles.starContainer}>
      <FontAwesome style={styles.star} name="star" size={30} color="gold" />
      <FontAwesome style={styles.star} name="star" size={30} color="gold" />
      <FontAwesome style={styles.star} name="star" size={30} color="gold" />
      <FontAwesome
        style={styles.star}
        name="star-half-empty"
        size={30}
        color="gold"
      />
      <FontAwesome style={styles.star} name="star-o" size={30} color="gold" />
    </View>
  );
};

export default UserRating;

const styles = StyleSheet.create({
  star: {
    marginRight: 10,
  },
  starContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
});

// import {View, Text} from 'react-native';
// import React from 'react';

// const UserRating = () => {
//   return (

//   );
// };

// export default UserRating;
