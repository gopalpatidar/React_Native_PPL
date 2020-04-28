import React from 'react';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import Profile from './Profile';

const Drawer = createDrawerNavigator();
function CustomDrawerContent(props) {
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      props.navigation.navigate('login');
    } catch (exception) {
      return false;
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="LogOut" onPress={logout} />
    </DrawerContentScrollView>
  );
}

function App() {
  return (
    <Drawer.Navigator
      initialRouteName="profile"
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="profile" component={Profile} />
    </Drawer.Navigator>
  );
}

export default App;
