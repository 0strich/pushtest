import React, {useState, useEffect} from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import NotifService from './NotifService';
import messaging from '@react-native-firebase/messaging';

const Push = () => {
  const [register, setRegister] = useState();

  const onRegister = (token) => {
    setRegister({registerToken: token.token, fcmRegistered: true});
  };

  const onNotif = (notif) => {
    Alert.alert(notif.title, notif.message);
  };

  const notif = new NotifService(onRegister);

  useEffect(() => {
    messaging().setBackgroundMessageHandler(async (msg) => {
      notif.localNotif(msg.notification.title, msg.notification.body);
    });
    messaging().onMessage((msg) => {
      notif.localNotif(msg.notification.title, msg.notification.body);
    });
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={notif.localNotif()}>
        <Text>Local Notification (now)</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: '#000000',
    margin: 5,
    padding: 5,
    width: '70%',
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
  },
  textField: {
    borderWidth: 1,
    borderColor: '#AAAAAA',
    margin: 5,
    padding: 5,
    width: '70%',
  },
  spacer: {
    height: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default Push;
