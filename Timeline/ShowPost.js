import React from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
  Text,
  TouchableHighlight,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {DrawerActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import SinglePic from './SinglePic';
import styles from '../myStyles';
var latestFirst = 1;
var oldestFirst = 0;
var mostComment = 0;
var mostLikes = 0;
var checkSort = 'latestFirst';
function ShowPost({navigation}) {
  let obj = {
    sort: 'latestFirst',
    limit: latestFirst,
  };
  const [inputs, setInput] = React.useState({
    postArray: [],
    picpath: '/home/com114/Project/UploadImage/',
  });
  const [userData, setUserData] = React.useState();
  const [fetchingStatus, setFetchingStatus] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(true);
  const [hide, setHide] = React.useState(false);
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
    fetchData();
    axios
      .post('http://192.168.43.248:9000/post/auth/sort', obj)
      .then(response => {
        if (response.data) {
          setInput(inputs => ({
            ...inputs,
            postArray: response.data,
          }));
          setIsLoading(false);
        } else {
          alert('Please Post');
        }
      })
      .catch(err => {
        alert(err);
        console.log(err);
      });
  }, []);
  const handleChange = text => {
    if (text) {
      setHide(false);
      checkSort = text;
    }
    if (checkSort == 'mostComment') {
      latestFirst = 0;
      oldestFirst = 0;
      mostComment += 1;
      mostLikes = 0;
      obj = {
        sort: checkSort,
        limit: mostComment,
      };
    } else if (checkSort == 'mostLikes') {
      latestFirst = 0;
      oldestFirst = 0;
      mostComment = 0;
      mostLikes += 1;
      obj = {
        sort: checkSort,
        limit: mostLikes,
      };
    } else if (checkSort == 'latestFirst') {
      latestFirst += 1;
      oldestFirst = 0;
      mostComment = 0;
      mostLikes = 0;
      obj = {
        sort: checkSort,
        limit: latestFirst,
      };
    } else if (checkSort == 'oldestFirst') {
      latestFirst = 0;
      oldestFirst += 1;
      mostComment = 0;
      mostLikes = 0;
      obj = {
        sort: checkSort,
        limit: oldestFirst,
      };
    }

    axios
      .post('http://192.168.43.248:9000/post/auth/sort', obj)
      .then(response => {
        if (response.data) {
          setInput(inputs => ({
            ...inputs,
            postArray: response.data,
          }));
        } else {
          alert('Please Post');
        }
      })
      .catch(err => {
        alert(err);
        console.log(err);
      });
  };
  const ItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#607D8B',
        }}
      />
    );
  };

  const BottomView = () => {
    return (
      <View>
        {fetchingStatus ? (
          <ActivityIndicator
            size="large"
            color="#F44336"
            style={{marginLeft: 6}}
          />
        ) : (
          <View>
            <Text>No Post Available</Text>
          </View>
        )}
      </View>
    );
  };
  var data = [['latestFirst', 'oldestFirst', 'mostLikes', 'mostComment']];
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#c7ccbe',
        }}>
        <View>
          <Icon.Button
            name="reorder"
            backgroundColor="#ffa21d"
            onPress={() =>
              navigation.dispatch(DrawerActions.openDrawer())
            }></Icon.Button>
        </View>
        <View>
          <Icon.Button
            name="filter"
            backgroundColor="#ffa21d"
            onPress={() => (hide ? setHide(false) : setHide(true))}>
            Filter Post</Icon.Button>
        </View>
      </View>

      <View>
        {hide && (
          <View style={styles.filterPost}>
            <TouchableHighlight onPress={() => handleChange('latestFirst')}>
              <View style={{padding: 10, fontSize: 20}}>
                <Text>latestFirst</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => handleChange('oldestFirst')}>
              <View style={{padding: 10, fontSize: 20}}>
                <Text>oldestFirst</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => handleChange('mostLikes')}>
              <View style={{padding: 10, fontSize: 20}}>
                <Text>mostLikes</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => handleChange('mostComment')}>
              <View style={{padding: 10, fontSize: 20}}>
                <Text>mostComment</Text>
              </View>
            </TouchableHighlight>
          </View>
        )}
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            style={{width: '100%'}}
            keyExtractor={(item, index) => index}
            data={inputs.postArray}
            ItemSeparatorComponent={ItemSeparator}
            // onScrollEndDrag={() => console.log(' *********end')}
            onScrollBeginDrag={() => setFetchingStatus(true)}
            initialNumToRender={2}
            maxToRenderPerBatch={1}
            onEndReachedThreshold={0.5}
            onEndReached={({distanceFromEnd}) => {
              if (distanceFromEnd == 0) {
                setFetchingStatus(false);
              }
              handleChange();
            }}
            renderItem={({item, index}) => (
              <View key={index}>
                <SinglePic
                  data1={item}
                  email={userData.email}
                  navigation={navigation}
                />
              </View>
            )}
            ListFooterComponent={BottomView}
          />
        )}
      </View>
    </View>
  );
}

export default ShowPost;
