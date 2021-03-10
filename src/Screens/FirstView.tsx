import { useNavigation } from '@react-navigation/core';
import React, {useState} from 'react';
import { View, TextInput, Button, ActivityIndicator, PermissionsAndroid }  from 'react-native';

function FirstView({navigation}) {
    const {navigate} = useNavigation()
    const [pId, setPID] = useState()
    const [isLoading, setIsLoading] = useState(false)

    
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

    const onSubmit = () => {
        requestWriteStoragePermission()
        requestReadStoragePermission()
        navigation.navigate('Second', {pId:pId})
    }

    

    

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
        <View style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}>
              <ActivityIndicator animating={isLoading} size="small" color="#00ff00" />
        </View>
      </View>
    );
}

export default FirstView;