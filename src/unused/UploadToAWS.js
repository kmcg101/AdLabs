// url
// https://vmqol5cpr5.execute-api.us-east-1.amazonaws.com/default/mcgurn-twoway-lambda

import React, { useState, useEffect } from 'react';
import AWS from 'aws-sdk'
import axios from 'axios'


/////////////////////////
// for direct upload
const S3_BUCKET = "mcg-s3-upload";
const REGION = 'us-east-1';
const myAccessKeyId = "AKIATYMGDTQ4MFBTTH6M"
const mySecretAccessKey = "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"

AWS.config.update({
    accessKeyId: myAccessKeyId,
    secretAccessKey: mySecretAccessKey
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
})
////////////////////////////

const API_ENDPOINT = 'https://vmqol5cpr5.execute-api.us-east-1.amazonaws.com/default/mcgurn-twoway-lambda';


// enumeration
const uploadStatus = {
    disabled: 'drop file here',
    ready: 'ready to upload',
    inProgress: 'in progress',
    complete: 'complete',
    error: 'error'
}


const UploadToAWS = (props) => {

    const [progress, setProgress] = useState(0);
    const [uploadState, setUploadState] = useState(uploadStatus.disabled)

    useEffect(() => {

        // disable button if no files
        if (props.selectedFiles.length === 0) {
            setUploadState(uploadStatus.disabled)
        }
        else {
            setUploadState(uploadStatus.ready)
        }
    }
        , [props.selectedFiles]);

    // upload file button handler for direct upload to s3
    const uploadFileDirect = () => {
        const file = props.selectedFiles[0];
        const params = {
            Body: file,
            Bucket: S3_BUCKET,
            Key: file.name
        };

        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress(Math.round((evt.loaded / evt.total) * 100))
                setUploadState(uploadStatus.inProgress)
            })
            .on('success', (evt) => {
                console.log("done")
                setUploadState(uploadStatus.complete)
            })
            .send((err) => {
                if (err) {
                    setUploadState(uploadStatus.error)
                }
            })
    }
    // function for presigned URL
    const uploadFilePresignedURL = async (files) => {
        // * GET request: presigned URL
        const f = files[0];
        console.log(f)
        const response = await axios({
            method: 'GET',
            url: API_ENDPOINT
        })
        console.log('Response', response)
        const newURL = response.data.uploadURL
        const substituteURLPrefix = 'https://mcgurn-twoway-bucket.s3.amazonaws.com/' + f.name + '?';
        const urlSplit = newURL.split('?')
        let finalURL = substituteURLPrefix + urlSplit[1]
       // console.log(substituteURLPrefix + urlSplit[1])
        //https://mcgurn-twoway-bucket.s3.amazonaws.com/                               3843193.jpg?
        //https://mcgurn-twoway-bucket.s3.amazonaws.com/refreshtest_15_widget1_us_image_e-bint.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIATYMGDTQ4MHDTCUUV%2F20220414%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220414T205029Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIH0dLUs8x9BOpB%2FZMmVLwGbDBNxuWkiN7aw0e9Pc2fpcAiEA5n8wipSwXKFA7FVGFPqapNIfdIOZKFDmxK9BPELyOwQqmQIIfhAAGgwyNTg1MTYxNjM2NDAiDGR0CZTjouWWJUloYyr2AU2HDG1MxgV3FpuTl9RnGxkBBs7sHTlcp4WBPa0QxB4ccQkTh5ZHXzO0BmP7WGkBDfZ6aoO%2BVS9w%2FLiovlbhTjEZXAnFRZ9yf%2FrZIe43%2B2D163CrMz%2BmNVzmSqOSdXPgORXPuzqosnUP2RZVRzH1DNeLh6Fau4ZMgVWvaby19fJbIyS8lspNI14OnaifFuc%2FJK0%2B3sXfH7wEHqbaQZU7lb9dPPOxCJsw1jF%2B9St1GlYozVZVi1iZhz4x9fBqRbuKexNXJ2mfD3kGk1Sv675wpCGxsIz0bya2T7x5oxiRyxAeBzdyjBpXE8zZFb9dua2XwVIwrzPxBTDpkeKSBjqaAQhedLmXZB%2FMu7PI2uIUIsAliFEpdXnKoUqw5DHVHCCEEj2fWIwfDIEQND2KwRdUmhhgEgzG%2FEIWhkJSzKSpVRUTgSqHwep5zDzABTQLNnH49kUnOqM0qGO16oRzjbp7aBxkBwiJ0uvJ7r1EjyrNPkzmAn2rF3lkbG8%2BiiIV0zO3GveC5AiBeByi84Z1ZHOvVuRiRUY1f2llDP4%3D&X-Amz-Signature=27801cc592cd12d4213f9af17d988b94c8e0aeb20071cec216fcbb5707cc3fbc&X-Amz-SignedHeaders=host
        //https://mcgurn-twoway-bucket.s3.amazonaws.com/1264445.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIATYMGDTQ4MHDTCUUV%2F20220414%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220414T205254Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIH0dLUs8x9BOpB%2FZMmVLwGbDBNxuWkiN7aw0e9Pc2fpcAiEA5n8wipSwXKFA7FVGFPqapNIfdIOZKFDmxK9BPELyOwQqmQIIfhAAGgwyNTg1MTYxNjM2NDAiDGR0CZTjouWWJUloYyr2AU2HDG1MxgV3FpuTl9RnGxkBBs7sHTlcp4WBPa0QxB4ccQkTh5ZHXzO0BmP7WGkBDfZ6aoO%2BVS9w%2FLiovlbhTjEZXAnFRZ9yf%2FrZIe43%2B2D163CrMz%2BmNVzmSqOSdXPgORXPuzqosnUP2RZVRzH1DNeLh6Fau4ZMgVWvaby19fJbIyS8lspNI14OnaifFuc%2FJK0%2B3sXfH7wEHqbaQZU7lb9dPPOxCJsw1jF%2B9St1GlYozVZVi1iZhz4x9fBqRbuKexNXJ2mfD3kGk1Sv675wpCGxsIz0bya2T7x5oxiRyxAeBzdyjBpXE8zZFb9dua2XwVIwrzPxBTDpkeKSBjqaAQhedLmXZB%2FMu7PI2uIUIsAliFEpdXnKoUqw5DHVHCCEEj2fWIwfDIEQND2KwRdUmhhgEgzG%2FEIWhkJSzKSpVRUTgSqHwep5zDzABTQLNnH49kUnOqM0qGO16oRzjbp7aBxkBwiJ0uvJ7r1EjyrNPkzmAn2rF3lkbG8%2BiiIV0zO3GveC5AiBeByi84Z1ZHOvVuRiRUY1f2llDP4%3D&X-Amz-Signature=aa2900bae8a4072288519cbad5fbc862a7bab07d7f6290645593916dd9aa88b1&X-Amz-SignedHeaders=host
        //https://mcgurn-twoway-bucket.s3.amazonaws.com/refreshtest_15_widget1_us_image_e-bint.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIATYMGDTQ4MHDTCUUV%2F20220414%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220414T205254Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIH0dLUs8x9BOpB%2FZMmVLwGbDBNxuWkiN7aw0e9Pc2fpcAiEA5n8wipSwXKFA7FVGFPqapNIfdIOZKFDmxK9BPELyOwQqmQIIfhAAGgwyNTg1MTYxNjM2NDAiDGR0CZTjouWWJUloYyr2AU2HDG1MxgV3FpuTl9RnGxkBBs7sHTlcp4WBPa0QxB4ccQkTh5ZHXzO0BmP7WGkBDfZ6aoO%2BVS9w%2FLiovlbhTjEZXAnFRZ9yf%2FrZIe43%2B2D163CrMz%2BmNVzmSqOSdXPgORXPuzqosnUP2RZVRzH1DNeLh6Fau4ZMgVWvaby19fJbIyS8lspNI14OnaifFuc%2FJK0%2B3sXfH7wEHqbaQZU7lb9dPPOxCJsw1jF%2B9St1GlYozVZVi1iZhz4x9fBqRbuKexNXJ2mfD3kGk1Sv675wpCGxsIz0bya2T7x5oxiRyxAeBzdyjBpXE8zZFb9dua2XwVIwrzPxBTDpkeKSBjqaAQhedLmXZB%2FMu7PI2uIUIsAliFEpdXnKoUqw5DHVHCCEEj2fWIwfDIEQND2KwRdUmhhgEgzG%2FEIWhkJSzKSpVRUTgSqHwep5zDzABTQLNnH49kUnOqM0qGO16oRzjbp7aBxkBwiJ0uvJ7r1EjyrNPkzmAn2rF3lkbG8%2BiiIV0zO3GveC5AiBeByi84Z1ZHOvVuRiRUY1f2llDP4%3D&X-Amz-Signature=aa2900bae8a4072288519cbad5fbc862a7bab07d7f6290645593916dd9aa88b1&X-Amz-SignedHeaders=host
        //  * PUT request: presigned URL
        const result = await fetch(finalURL, {
            method: 'PUT',
            body: f,

        })


    }


    return (
        <div>
            {/* <div>Progress: {progress}%</div> */}
            {/* <button disabled={props.selectedFiles.length === 0} onClick={() => uploadFileDirect()}>{uploadState}</button> */}
            <button disabled={props.selectedFiles.length === 0} onClick={() => uploadFilePresignedURL(props.selectedFiles)}>{uploadState}</button>
            <div></div>

        </div>
    )
}

export default UploadToAWS;