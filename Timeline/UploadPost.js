import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Button,
  Image,
  ScrollView,
  ToastAndroid,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {DrawerActions} from '@react-navigation/native';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../myStyles';
import axios from 'axios';

function UploadPost({route, navigation}) {
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [userData, setUserData] = useState();
  const [image, setImage] = useState();

  const dimensions = Dimensions.get('window');
  const imageHeight = Math.round((dimensions.width * 12) / 16);
  const imageWidth = dimensions.width - 2;

  const handleChoosePhoto = async () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      ImageResizer.createResizedImage(
        response.path,
        imageWidth,
        imageHeight,
        'JPEG',
        50,
      )
        .then(response => {
          setImage(response);
        })
        .catch(err => {
          console.log('%%%%%%%', err);
        });
    });
  };

  const _onPressButton = async e => {
    try {
      await AsyncStorage.getItem('userData').then(value => {
        let ImageData = {
          name: image.fileName || image.name,
          type: 'image/jpeg',
          uri: image.uri,
        };
        if (title && category && image) {
        } else {
          alert('all Field is Required');
          return false;
        }

        var formData = new FormData();
        formData.append('Title', title);
        formData.append('Category', category);
        formData.append('Post', ImageData);
        formData.append('UserName', JSON.parse(value).email);
        setCategory();
        setImage();
        setTitle();

        axios
          .post('http://192.168.43.248:9000/post/auth/post', formData)
          .then(response => {
            if (response.data) {
              ToastAndroid.showWithGravity(
                'Post Upload Successful',
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
    } catch (error) {
      navigation.navigate('Login');
    }
  };
  onBuffer = () => {};
  videoError = () => {};
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
          {/* <Button title="Go to Home" onPress={() => navigation.push('login')} /> */}
          <View style={styles.login_sec}>
            <Image
              style={{width: 200, height: 100, alignSelf: 'center'}}
              source={require('../image/logo.png')}
            />
            <Text style={styles.mainWord}>UploadPost</Text>
            <Text>Category</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={category => {
                setCategory(category);
              }}
              placeholder="Enter Category"
              value={category}
            />
            <Text>Title</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter Title"
              onChangeText={title => {
                setTitle(title);
              }}
              value={title}
            />
            <View
              style={{
                width: 100,
                height: 100,
                borderWidth: 2,
                borderColor: 'black',
                margin: 5,
                alignSelf: 'center',
              }}>
              {image && (
                <Image
                  source={{uri: image.uri}}
                  style={{
                    width: 100,
                    height: 100,
                    borderWidth: 2,
                    borderColor: 'black',
                    margin: 5,
                    alignSelf: 'center',
                  }}
                />
              )}
            </View>
            <Button
              title="Choose Photo"
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

export default UploadPost;
