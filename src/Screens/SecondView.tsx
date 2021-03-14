import React, {useState, useEffect} from 'react';
import { View, ActivityIndicator, StyleSheet, TouchableOpacity, Image, Alert} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import { zip, unzip, unzipAssets, subscribe } from 'react-native-zip-archive';
import { MainBundlePath, DocumentDirectoryPath } from 'react-native-fs';
import { cos } from 'react-native-reanimated';
import Images from './Images';

function SecondView( {route, navigation}) {

    const {pId} = route.params
    const [isLoading, setIsLoading] = useState(false)
    const [detailsList, setDetailsList] = useState([])


    useEffect(() => {
        
        console.log(pId)
        setIsLoading(true)
        fetch('http://hackingoivi.redirectme.net:5000/get/api/v1.0/data', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                person_id: pId,
                
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
                console.log("RESULTS HERE:", responseData)
                fetchZips(responseData.data)
                console.log("details ",detailsList)
      })
      .catch((error) =>{
        console.error(error);
      })     
      setIsLoading(false)
    }, [pId]) 
     

    const fetchZips = (urls) => {
        // let arr = []
        console.log(urls)
        let dirs = RNFetchBlob.fs.dirs;
        console.log("urls count",urls.length)
        for(let count =1; count <= urls.length ; count++)
        {
          RNFetchBlob.config({
            trusty: true,
            fileCache : true,
            path: dirs.PictureDir+'/'+count+'.zip'})
            .fetch('GET',urls[count-1])
            .progress((received, total) => {console.log('progress', received / total)})
            .then((res) => {// the temp file path
              console.log('The file saved to ', res.path());
              const sourcePath = res.path()
              const targetPath = dirs.PictureDir+ '/Oivi/' + pId + '/' 
              const charset = 'UTF-8'
                unzip(sourcePath, targetPath, charset)
                .then((path) => {
                  console.log(`unzip completed at ${path}`)
                  setDetailsList(oldData => [...oldData, targetPath+count+'/'])
                  // arr.push(targetPath+count+'/retina.png')
                  // console.log("arr values",arr)
                  //console.log("details list",detailsList)
                })
                .catch((error) => {
                  console.error(error)
                })
            });

        }

    }

    // renderItem() = ({image}) =>{
    //   return (
    //     <View>
    //       <Image style={styles.retinaImg}
    //       source={{uir: 'file://'+image}} />
    //     </View>
    //   )
    // }

    const onSubmit = (item) => {
      navigation.navigate('Video', {vLink:item})
  }

    return (

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      
        {/* {isLoading ? 
                        <ActivityIndicator size="small" color="#00ff00" />
                      
        :
          <Images  images={detailsList} />
        } */}
        {detailsList && detailsList.map(item => {
            console.log("item log ",item)
            return (
             <TouchableOpacity key={item} onPress={() => onSubmit(item)}>    
              <Image
              key={item}
              style={styles.retinaImg}
              source={{uri: 'file://'+item+'retina.png',}}
              />
            </TouchableOpacity>
            )
          })
        }
        {/* {detailsList && detailsList.map(item => {
          console.log("item log ",item)
            return (
              <Image
              key={item}
              style={styles.retinaImg}
              source={{uri: 'file://'+item,}}
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
    flex:1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    
  },
  retinaImg: {
    width: 150,
    height: 150,
  },

});
export default SecondView;


