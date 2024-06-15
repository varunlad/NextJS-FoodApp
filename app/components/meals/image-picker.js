'use client'
import { useRef, useState } from 'react'
import classes from './image-picker.module.css';
import Image from 'next/image';

export default function ImagePicker({ label, name }) {
    const [pickedImage, setPickedImage] = useState()
    const imageInput = useRef();
    function handelImagePicker() {
        imageInput.current.click();
    }
    function handelImageChange(e) {
        const file = e.target.files[0];
        if (!file) {
            setPickedImage(null);
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPickedImage(fileReader.result);
        }
        fileReader.readAsDataURL(file);
    }
    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {pickedImage ? <Image src={pickedImage} alt="Image Selected by user" fill />
                        :
                        <p>No image picked yet.</p>
                    }
                </div>
                <input
                    type="file"
                    className={classes.input}
                    id={name}
                    name={name}
                    accept="image/png, image/jpeg"
                    ref={imageInput}
                    onChange={handelImageChange}
                    required
                />
                <button onClick={handelImagePicker} className={classes.button} type="button">
                    Pick an Image
                </button>
            </div>
        </div>
    )
}