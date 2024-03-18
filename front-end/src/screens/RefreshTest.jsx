import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  RefreshControl,
  View,
  Text,
  Button,
  DevSettings,
} from 'react-native';

function RefreshTest() {
  const [refreshing, setRefreshing] = useState(false);

  // Function to simulate a data refresh
  const onRefresh = () => {
    setRefreshing(true);
    DevSettings.reload();

    // Perform data refresh or any necessary operations here
    // You can replace the setTimeout with an API request, for example.
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}
        />
      }
    
    >
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          height: 500,
        }}>
        <Text>Scroll down to refresh</Text>
        <Button title="Refresh" onPress={onRefresh} />
      </View>

    </ScrollView>
  );
}

export default RefreshTest;

// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const RefreshTest = () => {
//   return (
//     <View>
//       <Text>RefreshTest</Text>
//     </View>
//   )
// }

// export default RefreshTest

// const styles = StyleSheet.create({})
