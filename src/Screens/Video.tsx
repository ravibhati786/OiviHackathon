import React from 'react';
import {Image, View, StyleSheet, TouchableOpacity} from 'react-native';
import { nativeViewProps } from 'react-native-gesture-handler/lib/typescript/handlers/NativeViewGestureHandler';
import Video from 'react-native-video';

export default function VPage( {route, navigation}) {
    const {vLink} = route.params
    return (
        <View style={{flex:1}}>
                
              <Video
              source={{uri:'file:///storage/emulated/0/Pictures/Oivi/p1/1/recording.mp4'}}
              resizeMode="cover"
              style={{
                aspectRatio: 1,
                width: "100%"
              }}
              controls={true}
              />
            
        </View>
        
    );


}

const styles = StyleSheet.create({
    backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
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



    