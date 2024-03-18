import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import React from 'react';
import RoundedButton from '../../components/RoundedButton';


const HomeScreen = ({navigation}: any) => {

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/bg-1.jpg')}
        resizeMode="cover"
        style={styles.image}>
        <RoundedButton
          text="Sign Up"
          onPress={() => navigation.navigate('Register')}
        />
        <RoundedButton
          text="Log in"
          onPress={() => navigation.navigate('Login')}
        />
        <Text
          style={{
            color: 'black',
            fontWeight: '600',
            textDecorationLine: 'underline',
          }}>
          Explore the app without an account
        </Text>
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
