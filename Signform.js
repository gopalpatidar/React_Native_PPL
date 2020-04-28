import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableHighlight,
  Button,
  ScrollView,
} from 'react-native';
import {DrawerActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './myStyles';
import axios from 'axios';
import countries from './counrtries';
function Header({navigation}) {
  const [userName, setUserName] = useState('');
  const [email, setGmail] = useState('');
  const [passWord, setPass] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [country, setCountry] = useState('');
  const [sugg, setSugg] = useState([]);
  const [checkData, setCheckData] = useState({userName: '#', email: '#'});
  const [validation, setValidation] = useState({
    email: '',
    passWord: '',
  });

  const _onPressButton = e => {
    // use that ref to get the form value

    if (email && userName && firstName && lastName && passWord) {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (reg.test(email) === false) {
        setValidation({...validation, email: 'wrong'});
        return false;
      }
      var passw = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{5,}$/;
      if (passw.test(passWord) === false) {
        setValidation({...validation, passWord: 'wrong'});
        return false;
      }
    } else {
      alert('Required All Data');
      return false;
    }
    let user = {
      email: email,
      userName: userName,
      firstName: firstName,
      lastName: lastName,
      passWord: passWord,
    };

    axios
      .post('http://192.168.43.248:9000/auth/header', user)
      .then(response => {
        if (
          response.data.email === '%#check%' &&
          response.data.userName === '#####'
        ) {
          console.log(response.data);
          navigation.navigate('login', {
            otherParam: user,
          });
          setFirstName();
          setGmail();
          setLastName();
          setPass();
          setUserName();
          setValidation();
        } else {
          setCheckData(response.data);
        }
      })
      .catch(err => {
        console.log(err, 'login catch axios');
      });
  };
  //start functinality of auto suggestion
  var items = countries.countryList;
  const onTextChanged = e => {
    const value = e;
    let suggestion = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      suggestion = items.sort().filter(v => regex.test(v));
    }
    setSugg(suggestion);
    setCountry(value);
  };
  const suggestionSelected = value => {
    setCountry(value);
    setSugg([]);
  };

  const renderSuggestion = () => {
    const suggestion = sugg;
    if (suggestion.length === 0) {
      return null;
    }
    return (
      <View style={styles.autoSuggestion}>
        {suggestion.map(item => (
          <TouchableHighlight
            key={item}
            onPress={() => suggestionSelected(item)}>
            <View style={{padding: 10, fontSize: 20}}>
              <Text>{item}</Text>
            </View>
          </TouchableHighlight>
        ))}
      </View>
    );
  };

  //end functionality of auto Suggestion
  return (
    <ScrollView>
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
            <Text style={styles.mainWord}>Create an Account</Text>
            {/*  */}
            <Text>Country Name</Text>
            <TextInput
              id="usd"
              style={styles.textInput}
              placeholder="Enter Country"
              onChangeText={co => onTextChanged(co)}
              name="Country"
              value={country}
            />
            <View>{renderSuggestion()}</View>
            {/*  */}

            <Text>UserName</Text>
            <TextInput
              id="usd"
              style={styles.textInput}
              placeholder="UserName"
              onChangeText={userName => setUserName(userName)}
              name="userName"
              value={userName}
            />
            {checkData.userName == userName ? (
              <Text style={{color: 'red'}}>Enter valid userName</Text>
            ) : (
              <></>
            )}
            <Text>Email-ID</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Gmail"
              onChangeText={email => {
                setGmail(email);
                setValidation({...validation, email: ''});
              }}
              value={email}
            />
            {checkData.email == email ? (
              <Text style={{color: 'red'}}>Enter valid email</Text>
            ) : (
              <></>
            )}
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
                setValidation({...validation, passWord: ''});
              }}
              value={passWord}
              secureTextEntry
            />
            {validation.passWord === 'wrong' && (
              <Text style={{color: 'red'}}>
                Try Another PassWord like As Example@123
              </Text>
            )}
            <Text>FirstName</Text>
            <TextInput
              style={styles.textInput}
              placeholder="FirstName"
              onChangeText={firstName => setFirstName(firstName)}
              value={firstName}
            />
            <Text>LastName</Text>
            <TextInput
              style={styles.textInput}
              placeholder="LastName"
              onChangeText={lastName => setLastName(lastName)}
              value={lastName}
            />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <View>
                <TouchableHighlight
                  onPress={_onPressButton}
                  underlayColor="white">
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>SignUp</Text>
                  </View>
                </TouchableHighlight>
              </View>
              <View>
                <TouchableHighlight
                  onPress={() => navigation.navigate('login')}
                  underlayColor="white">
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>Go to Login</Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
export default Header;
