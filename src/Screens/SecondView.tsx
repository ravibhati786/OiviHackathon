import React, {useState, useEffect} from 'react';
import { View, Image, StyleSheet, ActivityIndicator} from "react-native";
import Images from './Images';
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../Loader'
import { fetchFiles } from '../actions/userActions'

function SecondView( {route, navigation}) {

    const dispatch = useDispatch()
    const listFiles = useSelector(state => state.fetchedFiles)
    const { loading, error, userFiles} = listFiles

    const fetchedURL = useSelector(state => state.fetchedURL)
    const {userURL} = fetchedURL

    // useEffect(() => {
    //     if(userURL){
    //       dispatch(fetchFiles())
    //     }
        
    // }, [dispatch, userURL]) 
 

    return (
      <View style={[styles.container, styles.horizontal]}>
        {loading && <Loader />}
        {userFiles && userFiles.map(item => (
            <Image
            key={item}
            style={styles.retinaImg}
            source={{uri: 'file://'+item+'retina.png'}}
            />
        ))}
          {/* console.log("item log ",item)
            return (
              <Image
              key={item}
              style={styles.retinaImg}
              source={{uri: 'file://'+item+'retina.png'}}
              />
            )
          })
         } */}
      
            {/* <FlatList
              data={detailsList}
              renderItem={renderItem()}/>} 
            /> */}
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  retinaImg: {
    width: 100,
    height: 100,
  },
  logo: {
    width: 66,
    height: 58,
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});


export default SecondView;


