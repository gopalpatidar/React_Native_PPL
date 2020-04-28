import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Button,
  Image,
  AsyncStorage,
  ScrollView,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {DrawerActions} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../myStyles';
import axios from 'axios';

function UploadCategory({route, navigation}) {
  const [category, setCategory] = useState('');
  const [userData, setUserData] = useState();
  const [image, setImage] = useState();

  const handleChoosePhoto = async () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        setImage(response);
        console.log(response);
      }
    });
  };

  const _onPressButton = async e => {
    try {
      await AsyncStorage.getItem('userData').then(value => {
        let ImageData = {
          name: image.fileName,
          type: image.type,
          uri: image.uri,
        };
        if (category && image) {
        } else {
          alert('all Field is Required');
        }

        var formData = new FormData();
        formData.append('Category', category);
        formData.append('Icon', ImageData);
        formData.append('Gmail', JSON.parse(value).email);
        setCategory();
        setImage();
        axios
          .post('http://192.168.43.248:9000/category/auth/categories', formData)
          .then(response => {
            if (response.data) {
              ToastAndroid.showWithGravity(
                'Category Upload Successful',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
              );
            } else {
              alert('not upload');
            }
          })
          .catch(err => {
            alert(err);
            console.log(err, 'aaaaeee');
          });
      });
    } catch (err) {
      navigation.navigate('Login');
    }
  };
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
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          </Icon.Button>
        </View>

        <View style={styles.container}>
          {/* <Button title="Go to Home" onPress={() => navigation.push('login')} /> */}
          <View style={styles.login_sec}>
            <Image
              style={{width: 200, height: 100, alignSelf: 'center'}}
              source={require('../image/logo.png')}
            />
            <Text style={styles.mainWord}>UploadCategory</Text>
            <Text>Category</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={category => {
                setCategory(category);
              }}
              placeholder="Enter Category"
              value={category}
            />

            {image && (
              <Image
                source={{uri: image.uri}}
                style={{width: 100, height: 100}}
              />
            )}
            <Button
              title="Choose Icon"
              color="#ffa21d"
              onPress={handleChoosePhoto}
            />
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
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default UploadCategory;
