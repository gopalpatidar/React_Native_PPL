import React, {useState} from 'react';
import 'react-native-gesture-handler';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Button,
  Image,
  ActivityIndicator,
  ScrollView,
  YellowBox,
} from 'react-native';
import {DrawerActions} from '@react-navigation/native';
import {connect} from 'react-redux';
import styles from './myStyles';
import axios from 'axios';
import TimeLine from './Timeline/TimeLine';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import {pHome} from './Redux/Action/action';

function Login({route, navigation}) {
  // const {data}=route.params
  const [email, setGmail] = useState('');
  const [passWord, setPass] = useState('');
  const [message, setMessage] = useState();
  const [validation, setValidation] = useState({
    email: '',
    passWord: '',
  });
  const [userData, setUserData] = useState();
  YellowBox.ignoreWarnings([
    'Non-serializable values were found in the navigation state',
  ]);

  const storeData = async data => {
    try {
      await AsyncStorage.setItem(
        'userData',
        JSON.stringify(data),
      ).then(() => {});
      return true;
    } catch (error) {
      console.log(error);
    }
  };
  const _onPressButton = async e => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === false) {
      setValidation({...validation, email: 'wrong'});
      return false;
    }

    if (passWord) {
    } else {
      alert('Required all data');
      return false;
    }
    let user = {
      email: email,
      passWord: passWord,
    };
    axios
      .post('http://192.168.43.248:9000/auth/login', user)
      .then(response => {
        if (response.data) {
          setUserData(user);
          setGmail();
          setPass();
          setMessage();
          storeData(response.data[0]).then(() => {
            navigation.navigate('timeline');
          });
        } else {
          setMessage('red');
        }
      })
      .catch(err => {
        alert(err, 'login catch axios');
      });
  };
  const handleChange = e => {};

  const fetchData = async () => {
    try {
      await AsyncStorage.getItem('userData').then(value => {
        if (value) {
          navigation.navigate('timeline');
          setUserData(JSON.parse(value));
        } else {
          setUserData();
        }
        // data.pHome(JSON.parse(value))
      });
    } catch (error) {}
  };

  React.useEffect(() => {
    fetchData();
  }, [userData]);

  return (
    <ScrollView>
      {userData ? (
        <>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size="large" />
            <Text style={{alignSelf: 'center', color: 'red'}}>
              You Need A Logout
            </Text>
          </View>
        </>
      ) : (
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

          <View style={styles.container}>
            <View style={styles.login_sec}>
              <Image
                style={{width: 200, height: 100, alignSelf: 'center'}}
                source={require('./image/logo.png')}
              />
              <Text style={styles.mainWord}>Log In</Text>
              <Text>Email-ID</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={email => {
                  setGmail(email);
                  setValidation({...validation, email: ''});
                }}
                placeholder="Enter your password"
                value={email}
              />
              {validation.email === 'wrong' && (
                <Text style={{color: 'red'}}>
                  Enter Right Mail like As <Text> Example@gmail.com</Text>
                </Text>
              )}
              <Text>PassWord</Text>
              <TextInput
                style={styles.textInput}
                placeholder="PassWord"
                onChangeText={passWord => {
                  setPass(passWord);
                  handleChange();
                }}
                value={passWord}
                secureTextEntry
              />
              {message === 'red' && (
                <Text style={{color: 'red'}}>Enter valid Id PassWord</Text>
              )}
              <View
                style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <View>
                  <TouchableHighlight
                    onPress={_onPressButton}
                    underlayColor="white">
                    <View style={styles.button}>
                      <Text style={styles.buttonText}> Submit</Text>
                    </View>
                  </TouchableHighlight>
                </View>
                <View>
                  <TouchableHighlight
                    onPress={() => navigation.navigate('home')}
                    underlayColor="white">
                    <View style={styles.button}>
                      <Text style={styles.buttonText}>Go to registration</Text>
                    </View>
                  </TouchableHighlight>
                  <Text> I do not have any account yet</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
const Stack = createStackNavigator();

function App1(props) {
  return (
    <>
      <Stack.Navigator
        initialRouteName="login"
        screenOptions={{
          headerShown: false,
        }}
        //     headerStyle: {
        //       backgroundColor: '#f58c20',
        //     },
        //     headerTintColor: '#fff',
        //     headerTitleStyle: {
        //       fontWeight: 'bold',
        //     },
        //     headerTitleAlign: 'center',
        //     headerLeft:null,
        //     headerMode: 'none',
        //     header: null,
        //   })}
      >
        {/* initialParams={{data:props}} */}
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="timeline" component={TimeLine} />
      </Stack.Navigator>
    </>
  );
}
export default connect(null, {pHome})(App1);
