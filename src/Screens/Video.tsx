import React from 'react';
import {Image, View, StyleSheet, TouchableOpacity} from 'react-native';
import { nativeViewProps } from 'react-native-gesture-handler/lib/typescript/handlers/NativeViewGestureHandler';
import Video from 'react-native-video';

export default function VPage( {route, navigation}) {
    const {vLink} = route.params
    return (
        <View>
                
              <Video
              source={{vLink}}
              ref={(ref) => {
                  this.player = ref
              }}        
              />
            
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



    