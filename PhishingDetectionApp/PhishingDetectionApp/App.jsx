import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, PermissionsAndroid, Alert } from 'react-native';
import SmsListener from 'react-native-android-sms-listener';
import { extractFeatures } from './urlFeatureExtractor'; // Adjust the path as needed

const App = () => {
  const [sms, setSms] = useState('');
  const [links,setlinks]=useState('');
  const [url, setUrl] = useState('');
  const [features, setFeatures] = useState([]);
  const handleExtractFeatures = () => {
    const extractedFeatures = extractFeatures(url);
    setFeatures(extractedFeatures);
  };
  const requestSMSPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
        PermissionsAndroid.PERMISSIONS.READ_SMS,
      ]);

      if (
        granted[PermissionsAndroid.PERMISSIONS.RECEIVE_SMS] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted[PermissionsAndroid.PERMISSIONS.READ_SMS] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log("SMS permissions granted");
      } else {
        console.log("SMS permission denied");
      }
    } catch (err) {
      console.warn('Permission error:', err);
    }
  };

useEffect(() => {
  requestSMSPermission();

  // Add SMS Listener with try-catch to handle errors
  try {
    const subscription = SmsListener.addListener(message => {
      console.log('SMS listener triggered'); // Log when listener is triggered
      console.log(`Received SMS: ${message.body}`); // Log the received SMS message
      setSms(message.body); // Set the SMS in state
      const extractedLinks = extractLinks(message.body); // Extract URLs
        setlinks(extractedLinks); 
        setUrl(extractedLinks);
        handleExtractFeatures();
    });

    return () => {
      subscription.remove();
    };
  } catch (error) {
    console.error('Error in SMS listener:', error);
    Alert.alert('Error', 'Something went wrong while receiving the SMS.');
  }
}, []);
const extractLinks = (message) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g; // Regular expression to match URLs
  return message.match(urlRegex) || []; // Return the matched URLs or an empty array
};
  return (
    <View style={styles.container}>
      <Text>Received SMS: {sms}</Text>
      <Text>links: {links}</Text>
      <Text style={styles.title}>Extracted Features:</Text>
      {features.length > 0 && (
        <Text>{JSON.stringify(features)}</Text>
      )}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
