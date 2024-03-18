import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import UserScreen from '../screens/UserScreen';
import LocationListScreen from '../screens/Admin/LocationListScreen';
import SettingScreen from '../screens/Admin/SettingScreen';
import AdminScreen from '../screens/Admin/AdminScreen';
import nonAdminProfileScreen from '../screens/NonAdminProfileScreen';
import ManualUploadScreen from '../screens/ManualUploadScreen';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTheme} from '../../components/context/ThemeContext';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

export default function BottomNavigator() {
  const {theme, updateTheme} = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: `${theme.navBarBgColor}`,
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            display: 'flex',
          },
          null,
        ],
      }}>
      <Tab.Screen
        name="Home"
        component={UserScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <View
              style={{
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <FontAwesome5 name="images" size={25} color={color} />
              <Text style={{fontSize: 10, color: color}}>Posts</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Joblist"
        component={SettingScreen}
        options={{
          tabBarLabel: 'Joblist',
          tabBarIcon: ({color}) => (
            <View
              style={{
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <FontAwesome5 name="tools" size={22} color={color} />
              <Text style={{fontSize: 10, color: color}}>Settings</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Searchjobs"
        component={ManualUploadScreen}
        options={{
          tabBarLabel: 'Searchjobs',
          tabBarIcon: ({color}) => (
            <View
              style={{
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Entypo name="upload" size={20} color={color} />
              <Text style={{fontSize: 11, color: color, top: 3}}>Upload</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        initialParams={{userId: '123', otherData: 'example'}}
        name="UserProfile"
        component={nonAdminProfileScreen}
        options={{
          tabBarLabel: 'Me',
          tabBarIcon: ({color}) => (
            <View
              style={{
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <FontAwesome name="user-circle" size={20} color={color} />
              <Text style={{fontSize: 11, color: color, top: 3}}>Me</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
