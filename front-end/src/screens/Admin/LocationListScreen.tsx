import {FlatList, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28b1',
    title: 'First Item',
    location: 'Location 1',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f62',
    title: 'Second Item',
    location: 'Location 2',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d73',
    title: 'Third Item',
    location: 'Location 3',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d74',
    title: 'Third Item',
    location: 'Location 4',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e6765',
    title: 'Third Item',
    location: 'Location 5',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d67562',
    title: 'Third Item',
    location: 'Location 6',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e25675',
    title: 'Third Item',
    location: 'Location 7',
  },
  {
    id: '58694a0f-3da1-471f-bd96-8989234',
    title: 'Third Item',
    location: 'Location 8',
  },
  {
    id: '58694a0f-3da1-471f-bd96-898932343',
    title: 'Third Item',
    location: 'Location 9',
  },
  {
    id: '58694a0f-3da1-471f-bd96-8989344354',
    title: 'Third Item',
    location: 'Location 10',
  },
  {
    id: '58694a0f-3da1-471f-bd96-89893443094',
    title: 'Third Item',
    location: 'Location 11',
  },
  {
    id: '58694a0f-3da1-471f-bd96-89893443694',
    title: 'Third Item',
    location: 'Location 12',
  },
  {
    id: '58694a0f-3da1-471f-bd96-89893441111',
    title: 'Third Item',
    location: 'Location 13',
  },
  {
    id: '58694a0f-3da1-471f-bd96-89893442244',
    title: 'Third Item',
    location: 'Location 14',
  },
];

const Item = ({title}: any) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const LocationListScreen = () => {
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
          Locations
        </Text>

        <SafeAreaView style={styles.container}>
          <FlatList
            data={DATA}
            renderItem={({item}) => <Item title={item.location} />}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default LocationListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    // justifyContent: 'center',
  },
  item: {
    backgroundColor: 'rgba(20, 111, 67, 0.85)',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 17,
  },
});
