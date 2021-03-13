import { useNavigation } from '@react-navigation/core';
import React, {useState} from 'react';
import { View, TextInput, Button, ActivityIndicator, PermissionsAndroid }  from 'react-native';
import { useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react/cjs/react.development';
import Loader from '../Loader'
import {fetchURLs, saveId, fetchFiles} from '../actions/userActions'

function FirstView({navigation}) {
  
    const {navigate} = useNavigation()
    const [pId, setPID] = useState('')
    const dispatch = useDispatch()

    const fetchedURL = useSelector(state => state.fetchedURL)
    const { error, loading, userURL} = fetchedURL

    const listFiles = useSelector(state => state.fetchedFiles)
    const {userFiles} = listFiles
    
    async function requestWriteStoragePermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Storage Permission",
          message:
            "We need your storage permission " ,
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the Storage");
      } else {
        console.log("Storage permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  
    async function requestReadStoragePermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Read Storage Permission",
          message:
            "Need access to read storage ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("you can use the app");
      } else {
        console.log("Read Storage permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    if(userURL) {
      if(userFiles){
        navigation.navigate('Second')
      }
    }
  })

    const onSubmit = () => {

        requestWriteStoragePermission();
        requestReadStoragePermission();
        dispatch(saveId(pId));
        dispatch(fetchURLs(pId));
        dispatch(fetchFiles(userURL, pId));
        console.log("onSubmit complete")
        
    }
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {loading && <Loader/>}
        <TextInput
            style={{height: 40, borderColor: 'gray', borderBottomWidth: 1 }}
            placeholder="Please Enter Person Id "
            onChangeText={text => setPID(text)}
        />

        <View style={{marginHorizontal: 30, marginTop: 10}}>
        <Button
            onPress = {onSubmit}
            title="Submit"
            color="green"
        />
        </View>
        
      </View>
    );
}

export default FirstView;