import React from 'react';
import {Image, View, StyleSheet, TouchableOpacity} from 'react-native';
import { nativeViewProps } from 'react-native-gesture-handler/lib/typescript/handlers/NativeViewGestureHandler';
import { useNavigation } from '@react-navigation/native';

export default function Images( {images}) {
    const navigation = useNavigation();
  
    console.log("images in images component",images)
    return (
        <View style={styles.container}>
            {images && images.map(item => {
            console.log("item log ",item)
            return (
             <TouchableOpacity onPress={navigation.navigate('Video', {vLink:'file://'+item+'recording.mp4'})}>    
              <Image
              key={item}
              style={styles.retinaImg}
              source={{uri: 'file://'+item+'retina.png',}}
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
      flex:1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      
    },
    retinaImg: {
      width: 150,
      height: 150,
    },

  });



    