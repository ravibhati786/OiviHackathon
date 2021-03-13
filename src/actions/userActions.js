import axios from 'axios'
import {
    FETCH_URL_LIST_FAIL,
    FETCH_URL_LIST_SUCCESS,
    FETCH_URL_LIST_REQUEST,

    FETCH_LIST_FILES_FAIL,
    FETCH_LIST_FILES_SUCCESS,
    FETCH_LIST_FILES_REQUEST,

    SAVE_USER_ID,

} from '../constants/FetchWithIdConstants'
import RNFetchBlob from 'react-native-fetch-blob';
import { zip, unzip, unzipAssets, subscribe } from 'react-native-zip-archive';

export const fetchURLs = (id) => async (dispatch) => {
    try {
        console.log("hello")
        dispatch({
            type: FETCH_URL_LIST_REQUEST
        })

        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        const {data} = await axios.post(
            'http://hackingoivi.redirectme.net:5000/get/api/v1.0/data',
            {'person_id':id},
            config
        )
        console.log(data)
        dispatch({
            type: FETCH_URL_LIST_SUCCESS,
            payload: data,
        })
    }
    catch(error){
        console.log("Error", error.message)
        dispatch({
            
            type: FETCH_URL_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const saveId = (id) => async (dispatch) => {
        console.log("save id function")
        dispatch({
            type: SAVE_USER_ID,
            payload: id,
        })

}


export const fetchFiles = (userURL, pId)  => async(dispatch) => {
    try {

        console.log("Fetch Files Function")
        dispatch({
            type: FETCH_LIST_FILES_REQUEST
        })

        // const{
        //     fetchedURL : { userURL },
        //     userInfo : { userID}
        // } = getState()

        console.log(userURL.data)
        console.log("urls count",userURL.data.length)
        console.log("userId",pId)

        const {data} = await fetchFilesByZipUnzip(userURL.data, pId)
        

        dispatch({
            type: FETCH_LIST_FILES_SUCCESS,
            payload: data
        })
        console.log("files data",data)

    }
    catch(error){
        dispatch({
            type: FETCH_LIST_FILES_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


function fetchFilesByZipUnzip(urls, pId) {
    let arr = []
    console.log("Out of For Loop",pId)
    let dirs = RNFetchBlob.fs.dirs;
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
                  arr.push(targetPath+count+'/')
                })
                .catch((error) => {
                  console.error(error)
                })
            });
    }
    console.log("array",arr)
    return arr
}