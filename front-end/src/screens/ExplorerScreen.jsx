import {
  ImageBackground,
  Switch,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {SafeAreaView} from 'react-native-safe-area-context';

const ExplorerScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/bg-1.jpg')}
        resizeMode="cover"
        style={styles.bgImage}>
        <View style={styles.cardContainer}>
          <Text style={styles.text}>Hello!</Text>
          <Text style={[styles.text, {marginTop: 10}]}>
            Welcome to I Clean My Land.With your help,we collect plastic in the
            Land!
          </Text>
          <View style={[styles.card, {marginTop: 30}]}>
            <Text style={styles.cardHeader}>Land</Text>
            <Text style={styles.cardText}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardHeader}>Land</Text>
            <Text style={styles.cardText}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </Text>
          </View>
        </View>

        <View style={styles.iconsContainer}>
          <View>
            <TouchableOpacity>
              <FontAwesome
                // onPress={() => setpasswordModalVisible(true)}
                name="home"
                size={35}
                color="#C0FFCE"
              />
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity>
              <FontAwesome6
                // onPress={() => setpasswordModalVisible(true)}
                name="map-location"
                size={35}
                color="#C0FFCE"
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity>
              <FontAwesome
                // onPress={() => setpasswordModalVisible(true)}
                name="user"
                size={35}
                color="#C0FFCE"
              />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ExplorerScreen;

const styles = StyleSheet.create({
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0, // Position at the bottom of the screen
    width: '100%', // Takes the full width of the screen
    marginBottom: 13,
  },
  cardHeader: {
    // color: 'black',
    fontWeight: '900',
  },
  cardText: {
    // color: 'black',
    textAlign: 'center',
  },
  text: {
    color: '#0C747A',
    textAlign: 'center',
    fontSize: 15,
  },
  container: {
    flex: 1,
  },
  cardContainer: {
    marginTop: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(20, 111, 67, 0.85)',
    marginBottom: 20,
    width: 300,
    height: 130,
    borderRadius: 40,
    marginHorizontal: 20,
    paddingBottom: 30,
  },

  bgImage: {
    flex: 1,
  },
});
