import React, {useState, useEffect} from 'react';
import { View, Image, StyleSheet, Button, SafeAreaView, SectionList, ListView, FlatList, ListItem, TouchableOpacity } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import { zip, unzip, unzipAssets, subscribe } from 'react-native-zip-archive';
import { MainBundlePath, DocumentDirectoryPath } from 'react-native-fs';
import { cos } from 'react-native-reanimated';
import Images from './Images';

function SecondView( {route, navigation}) {

    const {pId} = route.params
    const [isLoading, setIsLoading] = useState(false)
    const [URL, setURL] = useState()
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
                const data = fetchZips(responseData.data)
                setDetailsList(data)
                console.log("details ",detailsList)
      })
      .catch((error) =>{
        console.error(error);
      })     
      setIsLoading(false)
    }, [pId]) 
     

    const fetchZips = (urls) => {
        let arr = []
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
                  arr.push(targetPath+count+'/retina.png')
                })
                .catch((error) => {
                  console.error(error)
                })
            });

        }
        console.log("details ",detailsList)
        return (arr)

    }

    // renderItem() = ({image}) =>{
    //   return (
    //     <View>
    //       <Image style={styles.retinaImg}
    //       source={{uir: 'file://'+image}} />
    //     </View>
    //   )
    // }

   

    return (

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      
        {isLoading ? <View style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}>
                        <ActivityIndicator animating={isLoading} size="small" color="#00ff00" />
                      </View>
        :
          <Images images={detailsList} />
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

export default SecondView;


