import React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import styles from '../myStyles';
import axios from 'axios';

function SinglePic(props) {
  var {data1, navigation, email} = props;
  const [data, setData] = React.useState(data1);
  const [hide, setHide] = React.useState(false);
  const [comment, setComment] = React.useState();
  const dimensions = Dimensions.get('window');
  const imageHeight = Math.round((dimensions.width * 12) / 16);
  const imageWidth = dimensions.width - 2;

  const likePost = postId => {
    let users = {
      postId: postId,
      userName: email,
    };
    axios
      .post('http://192.168.43.248:9000/post/auth/likepost', users)
      .then(response => {
        if (response.data) {
          setData(response.data[0]);
        } else {
          alert('false');
        }
      })
      .catch(err => {
        alert(err);
        console.log(err);
      });
  };
  const addOnPostComment = postId => {
    if (!comment) {
      return false;
    }
    let comments = {
      postId: postId,
      userName: email,
      Comments: comment,
    };
    axios
      .post('http://192.168.43.248:9000/post/auth/comment', comments)
      .then(response => {
        if (response.data) {
          setData(response.data[0]);
        } else {
        }
      })
      .catch(err => {
        alert(err);
        console.log(err);
      });
    setComment();
    setHide(false);
  };
  React.useEffect(() => {
    setData(data1);
  }, [data1]);

  let path = 'http://192.168.43.248:9000/UploadImage/' + data.Post;
  return (
    <View style={styles.post}>
      <View style={styles.postHeader}>
        <View style={styles.postLeft}>
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
                {data.UserName}
              </Text>
            </View>
          </View>
          <View>
            <Text style={{fontSize: 20, color: '#ffa21d'}}>{data.Title}</Text>
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
      <TouchableHighlight
        onPress={() => navigation.navigate('singlepost', {data: data})}>
        <View>
          <Image
            style={{width: imageWidth, height: imageHeight}}
            source={{
              uri: path,
            }}
          />
        </View>
      </TouchableHighlight>
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
          <TouchableHighlight onPress={likePost.bind('id', data._id)}>
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
                <Text style={{color: 'white'}}> {data.likes.length} Likes</Text>
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => (hide ? setHide(false) : setHide(data._id))}>
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
                  {' '}
                  {data.comments.length} Comments{' '}
                </Text>
              </View>
            </View>
          </TouchableHighlight>
        </View>
        {data._id == hide && (
          <TextInput
            style={styles.textInput}
            onChangeText={comment => {
              setComment(comment);
            }}
            placeholder="Enter your Best Comment"
            value={comment}
            onSubmitEditing={addOnPostComment.bind('coment', data._id)}
          />
        )}
      </View>
    </View>
  );
}

export default SinglePic;
