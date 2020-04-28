import React from 'react';
import {View, Text, Image, Button, TouchableHighlight} from 'react-native';
import {DrawerActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SinglePost from './SinglePost';
import ShowPost from './ShowPost';
import UploadPost from './UploadPost';
import UploadCategory from './UploadCategory';
import styles from '../myStyles';
import SinglePic from './SinglePic';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
function Profile({route, navigation}) {
  const [userData, setUserData] = React.useState({
    firstName: '',
    lastName: '',
  });
  const [isLoaded, setIsLoaded] = React.useState(true);
  const fetchData = async () => {
    try {
      let value = await AsyncStorage.getItem('userData');
      if (value) {
        setUserData(JSON.parse(value));
      } else {
        navigation.navigate('login');
      }
    } catch (error) {
      navigation.navigate('login');
    }
  };
  React.useEffect(() => {
    fetchData().then(() => {
      setIsLoaded(false);
    });
  }, []);

  return (
    <>
      {isLoaded ? null : (
        <View style={{flex: 1}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}>
            <Icon.Button
              name="reorder"
              backgroundColor="#ffa21d"
              onPress={() =>
                navigation.dispatch(DrawerActions.openDrawer())
              }></Icon.Button>
          </View>
          <View style={styles.profile}>
            <View>
              <Image
                style={{width: 100, height: 100}}
                source={require('../image/img_6.png')}
              />
              <Text>Change Profile Pic</Text>
            </View>
            <View>
              <View>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  FirstName : {userData.firstName}
                </Text>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  LastName : {userData.lastName}
                </Text>
              </View>
              <View>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  Description :
                </Text>
              </View>
              <View>
                <Text>
                  This is an example of a comment. You can create as many
                  comments like this one or sub comments as you like and manage
                  all of your content inside Account.
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </>
  );
}
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainProfile1() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'profile') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'showpost') {
            iconName = focused ? 'google-photos' : 'google-photos';
          } else if (route.name === 'uploadpost') {
            iconName = focused ? 'upload' : 'upload-outline';
          } else if (route.name === 'uploadcategory') {
            iconName = focused ? 'cloud-upload' : 'cloud-upload-outline';
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={30} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        activeBackgroundColor: '#ffa21d',
        inactiveBackgroundColor: '#c7ccbe',
        allowFontScaling: true,
        labelStyle: {
          fontSize: 10,
          paddingBottom: 8,
        },
      }}>
      <Tab.Screen name="profile" component={Profile} />
      <Tab.Screen name="showpost" component={ShowPost} />
      <Tab.Screen name="uploadpost" component={UploadPost} />
      <Tab.Screen name="uploadcategory" component={UploadCategory} />
    </Tab.Navigator>
  );
}

function MainProfile2() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="mainprofile1" component={MainProfile1} />
      <Stack.Screen name="singlepost" component={SinglePost} />
      <Stack.Screen name="singlepic" component={SinglePic} />
    </Stack.Navigator>
  );
}

export default MainProfile2;

// import * as React from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Home!</Text>
//     </View>
//   );
// }

// function SettingsScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Settings!</Text>
//     </View>
//   );
// }

// function MyTabBar({ state, descriptors, navigation }) {
//   return (
//     <View style={{ flexDirection: 'row' }}>
//       {state.routes.map((route, index) => {
//         const { options } = descriptors[route.key];
//         const label =
//           options.tabBarLabel !== undefined
//             ? options.tabBarLabel
//             : options.title !== undefined
//             ? options.title
//             : route.name;

//         const isFocused = state.index === index;

//         const onPress = () => {
//           const event = navigation.emit({
//             type: 'tabPress',
//             target: route.key,
//           });

//           if (!isFocused && !event.defaultPrevented) {
//             navigation.navigate(route.name);
//           }
//         };

//         const onLongPress = () => {
//           navigation.emit({
//             type: 'tabLongPress',
//             target: route.key,
//           });
//         };

//         return (
//           <TouchableOpacity
//             accessibilityRole="button"
//             accessibilityStates={isFocused ? ['selected'] : []}
//             accessibilityLabel={options.tabBarAccessibilityLabel}
//             testID={options.tabBarTestID}
//             onPress={onPress}
//             onLongPress={onLongPress}
//             style={{ flex: 1 }}
//           >
//             <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
//               {label}
//             </Text>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// }

// const Tab = createBottomTabNavigator();

// export default function App() {
//   return (
//       <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
//         <Tab.Screen name="Home" component={HomeScreen} />
//         <Tab.Screen name="Settings" component={SettingsScreen} />
//       </Tab.Navigator>
//   );
// }

// import * as React from 'react';
// import { Text, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { MaterialCommunityIcons } from 'react-native-vector-icons';

// function Feed() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Feed!</Text>
//     </View>
//   );
// }

// function Profile() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Profile!</Text>
//     </View>
//   );
// }

// function Notifications() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Notifications!</Text>
//     </View>
//   );
// }

// const Tab = createBottomTabNavigator();

// function MyTabs() {
//   return (
//     <Tab.Navigator
//       initialRouteName="Feed"
//       tabBarOptions={{
//         activeTintColor: '#e91e63',
//       }}
//     >
//       <Tab.Screen
//         name="Feed"
//         component={Feed}
//         options={{
//           tabBarLabel: 'Home',
//           tabBarIcon: ({ color, size }) => (
//             <MaterialCommunityIcons name="home" color={color} size={size} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Notifications"
//         component={Notifications}
//         options={{
//           tabBarLabel: 'Updates',
//           tabBarIcon: ({ color, size }) => (
//             <MaterialCommunityIcons name="bell" color={color} size={size} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={Profile}
//         options={{
//           tabBarLabel: 'Profile',
//           tabBarIcon: ({ color, size }) => (
//             <MaterialCommunityIcons name="account" color={color} size={size} />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// }

// export default function App() {
//   return (
//       <MyTabs />
//   );
// }
