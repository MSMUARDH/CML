import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useTheme} from './context/ThemeContext';

const RoundedButton = ({onPress, text}) => {
  const {theme, updateTheme} = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, {backgroundColor: `${theme.buttonColor}`}]}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    // marginHorizontal: 20,
    marginBottom: 10,
    width: 219,
    height: 49,
    // backgroundColor: '#146F14', // Change to your desired button color
    borderRadius: 100, // Adjust the border radius for the desired roundness
    paddingVertical: 10, // Adjust vertical padding as needed
    paddingHorizontal: 20, // Adjust horizontal padding as needed
  },
  buttonText: {
    color: 'white', // Text color
    fontSize: 16, // Text size
    fontWeight: 'bold', // Text weight
    textAlign: 'center', // Text alignment
  },
});

export default RoundedButton;
