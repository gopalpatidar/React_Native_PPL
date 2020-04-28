import React from 'react';
import 'react-native-gesture-handler';
import {useLinking} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Sign from './Signform';
import Login from './Login';

const Drawer = createDrawerNavigator();

function App() {
  const ref = React.useRef();

  const {getInitialState} = useLinking(ref, {
    prefixes: ['https://'],
  });

  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();

  React.useEffect(() => {
    Promise.race([
      getInitialState(),
      new Promise(resolve => {
        // Timeout in 150ms if `getInitialState` doesn't resolve
        // Workaround for https://github.com/facebook/react-native/issues/25675
        setTimeout(resolve, 150);
      }),
    ])
      .catch(e => {
        console.error(e);
      })
      .then(state => {
        if (state !== undefined) {
          setInitialState(state.routes[0].state.routes[0].name);
          console.log('logggg', state.routes[0].state.routes[0].name);
        }

        setIsReady(true);
      });
  }, [getInitialState]);

  if (!isReady) {
    return null;
  }

  // const handleUrl = url => {
  //   if (url) {
  //     let id = url.split('https://ppl.com/')[1];
  //     setInitialState(id);
  //   }
  // };

  // React.useEffect(() => {
  //   if (Platform.OS === 'android') {
  //     Linking.getInitialURL()
  //       .then(url => {
  //         handleUrl(url);
  //       })
  //       .catch(err => {
  //         console.log(err, 'error');
  //       });
  //     Linking.addEventListener('url', ({url}) => {
  //       handleUrl(url);
  //     }); //add on mount
  //   }
  //   return () => {
  //     Linking.removeEventListener('url'); //remove on unmount
  //     console.log('removing lister');
  //   };
  // }, []);

  return (
    <Drawer.Navigator initialRouteName={initialState}>
      <Drawer.Screen name="login" component={Login} />
      <Drawer.Screen name="home" component={Sign} />
    </Drawer.Navigator>
  );
}

export default App;
