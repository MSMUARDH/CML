import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';

const FilterSearchComponent = () => {
  return (
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
          // onChangeText={onChangeNumber}
          // value={number}
        />
      </View>
    </View>
  );
};

export default FilterSearchComponent;

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
});
