import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const RoundedButtonWithIcon = ({onPress, children, background}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    // marginHorizontal: 20,
    marginBottom: 10,
    width: 219,
    height: 49,
    borderRadius: 100, // Adjust the border radius for the desired roundness
    paddingVertical: 10, // Adjust vertical padding as needed
    paddingHorizontal: 20, // Adjust horizontal padding as needed
    backgroundColor: '#049A5B',
  },

  //   btnbackground: {
  //     backgroundColor: '#049A5B',
  //   },

  buttonText: {
    color: 'white', // Text color
    fontSize: 16, // Text size
    fontWeight: 'bold', // Text weight
    textAlign: 'center', // Text alignment
  },
});

export default RoundedButtonWithIcon;

// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const RoundedButtonWithIcon = () => {
//   return (
//     <View>
//       <Text>RoundedButtonWithIcon</Text>
//     </View>
//   )
// }

// export default RoundedButtonWithIcon

// const styles = StyleSheet.create({})
