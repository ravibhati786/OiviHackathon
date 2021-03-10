import React from 'react';
import {Image, View, StyleSheet, TouchableOpacity} from 'react-native';
import { nativeViewProps } from 'react-native-gesture-handler/lib/typescript/handlers/NativeViewGestureHandler';

export default function Images( {images, navigation}) {

    return (
        <View>
            {images && images.map(item => {
          console.log("item log ",item)
            return (
            <TouchableOpacity onPress={navigation.navigate('Video', {vLink:'file://'+item})}>    
              <Image
              key={item}
              style={styles.retinaImg}
              source={{uri: 'file://'+item,}}
              />
            </TouchableOpacity>
            )
          })
        }
        </View>
        
    );


}

const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
    },
    retinaImg: {
      width: 100,
      height: 100,
    },
    logo: {
      width: 66,
      height: 58,
    },
  });



    