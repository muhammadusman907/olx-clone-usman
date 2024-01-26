import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Form,
    Input,
    Upload,
} from 'antd';
// const {TextArea} = Input ;
import { ref, uploadBytesResumable, getDownloadURL, storage } from "../config/firbase.js"
import { db , collection, addDoc } from "../config/firbase.js"; 
import TextArea from 'antd/es/input/TextArea.js';
export const Dashbord = () => {
    const [productName, setProductName] = useState("");
    const [fileValue, setFileValue] = useState();
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const onFinish = async() => {
        console.log(productName);
        console.log("price" , price);
        console.log("description " , description)
        console.log(fileValue)
       const docRef = await addDoc(collection(db, "products"), {
              productName ,
              price ,
              description,
              ProductImage : fileValue 
});
console.log("Document written with ID: ", docRef.id);

    }
    const imageUrl = (file) => {
        return new Promise((resolve, reject) => {
            const storageRef = ref(storage, 'images/rivers.jpg');

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {

                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {

                },
                () => {

                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        resolve(downloadURL)
                        setFileValue(downloadURL)
                    });
                }
            );

        })




    }

    const normFile = (e) => {
        // console.log(e.target.value)
        console.log(e);
        if (Array.isArray(e)) {
            console.log(e)
            return e;
        }
        return e?.fileList;
    };
    return (
        <>

            <div className='flex justify-center'>

                <Form className='w-[70%]' >
                    <Form.Item label="Title">
                        <Input placeholder='Tittle' onChange={(e) => setProductName(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Price">
                        <Input placeholder='Price' onChange={(e) => setPrice(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Description">
                        <TextArea onChange={(e)=> setDescription(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Upload" valuePropName="fileList"
                        onChange={(e) => imageUrl(e.target.files[0])} getValueFromEvent={normFile}  >
                        <Upload action="/upload.do" listType="picture-card">
                            <button
                                style={{
                                    border: 0,
                                    background: 'none',
                                }}
                                type="button"
                            >
                                <PlusOutlined />
                                <div
                                    style={{
                                        marginTop: 8,
                                    }}
                                >
                                    Upload
                                </div>
                            </button>
                        </Upload>
                    </Form.Item>
                    <Form.Item label="Button">
                        <Button htmlType="submit" onClick={onFinish}>Button</Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};
