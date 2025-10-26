import React from 'react'
import { useState } from "react";
import "../../styles/PhotoUploader.css"

function PhotoUploader() {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState(null);

    const [previewUrl, setPreviewUrl] = useState(null);

    const handleFileChange = (event) => {

        // if (event.target.files && event.target.files[0]) {
        //     const selectedFile = event.target.files[0];
        //     setFile(selectedFile);
        //     setPreviewUrl(URL.createObjectURL(selectedFile));
        // }
        fetchImage()
    };

    const fetchImage = async () => {
        const response = await fetch("http://127.0.0.1:5000/get_image")
        const data = await response.json()
        setFile(data.fileName)
        console.log(data.fileName)
    }

    // const onSubmitImage = async () => {

    //     const newData = {
    //         file,
    //     } 
    //     const options = {
    //         method: "POST",
    //         headers: {"Content-Type": "application/json"},
    //         body: JSON.stringify(newData)
    //     }
    //     const response = await fetch(`http://127.0.0.1:5000/upload_image`, options)
    //     if (response.status !== 201 && response.status !== 200) {
    //         const error_message = await response.json()
    //         alert(error_message.message)
    //     } else {
    //         updateCallback()
    //     }
    //     setFileName("")
    // }

    return (
        <div>
            {file ?? (
                <div className="image" src={file}></div>
            )}
            <form method="POST" enctype="multipart/form-data" action="http://127.0.0.1:5000/upload_image">
                <input type="file" name="file" value={file} onChange ={handleFileChange}></input>
                <input type="submit" value = "Upload"></input>
            </form>
        </div>
    )
}

export default PhotoUploader