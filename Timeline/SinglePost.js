import React from 'react';
import {View,
   Text,
    ScrollView,
    TouchableHighlight,
    Image,
    Dimensions,
  } from 'react-native';
import styles from '../myStyles';

function SinglePost({route, navigation}) {
  const {data} = route.params;
  const dimensions = Dimensions.get('window'); 
  const imageHeight = Math.round(dimensions.width * 9 / 16);
  const imageWidth = dimensions.width; 
  let path = 'http://192.168.43.248:9000/UploadImage/' + data.Post;
  return (
    <ScrollView>
      <TouchableHighlight
        onPress={() => navigation.navigate('showpost')}
        underlayColor="white">
        <View style={styles.button}>
          <Text style={styles.buttonText}>View All Post</Text>
        </View>
      </TouchableHighlight>
      <View style={styles.container}>
        {/* {inputs.postArray.map((data, id) => { */}
        <View style={styles.post}>
          <View style={styles.postHeader}>
            <View style={styles.postLeft}>
              <View>
                <Text style={{fontSize: 20}}>{data.Title}</Text>
              </View>
              <View style={styles.postIcon}>
                <View>
                  <Image
                    style={{width: 20, height: 20}}
                    source={{
                      uri:
                        'http://192.168.43.248:9000/UploadImage/images/img_6.png',
                    }}
                  />
                </View>
                <View>
                  <Text style={{color: 'white', paddingHorizontal: 10}}>
                    {' '}
                    {data.UserName}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.postRight}>
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    backgroundColor: '#ffa21d',
                    padding: 5,
                  }}>
                  {data.Category}
                </Text>
              </View>
              <View>
                <Text>{data.Date}</Text>
              </View>
            </View>
          </View>
          <View>
            <Image
              style={{width: imageWidth, height: imageHeight}}
              source={{
                uri: path,
              }}
            />
          </View>
          <View>
            <View style={styles.postHeader}>
              <View style={styles.postIcon}>
                <View>
                  <Image
                    style={{width: 20, height: 20}}
                    source={{
                      uri:
                        'http://192.168.43.248:9000/UploadImage/images/icon_001.png',
                    }}
                  />
                </View>
                <View>
                  <Text style={{color: 'white'}}> Share </Text>
                </View>
              </View>
              <View style={styles.postIcon}>
                <View>
                  <Image
                    style={{width: 20, height: 20}}
                    source={{
                      uri:
                        'http://192.168.43.248:9000/UploadImage/images/icon_003.png',
                    }}
                  />
                </View>
                <View>
                  <Text style={{color: 'white'}}>
                    {' '}
                    {data.likes.length} Likes{' '}
                  </Text>
                </View>
              </View>
              <View style={styles.postIcon}>
                <View>
                  <Image
                    style={{width: 20, height: 20}}
                    source={{
                      uri:
                        'http://192.168.43.248:9000/UploadImage/images/icon_004.png',
                    }}
                  />
                </View>
                <View>
                  <Text style={{color: 'white'}}>
                    {data.comments.length} Comments{' '}
                  </Text>
                </View>
              </View>
            </View>
            {data.comments.map((data, id1) => {
              return (
                <View style={styles.Comment} key={id1}>
                  <Text style={{fontSize: 15}}>{data.userName}</Text>

                  <View style={styles.Comment2}>
                    <Image
                      style={{width: 30, height: 30}}
                      source={{
                        uri:
                          'http://192.168.43.248:9000/UploadImage/images/post_img.png',
                      }}
                    />
                    <Text style={{fontSize: 20, marginLeft: 15}}>
                      {data.Comments}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default SinglePost;
