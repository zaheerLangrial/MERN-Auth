import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from "../firebase";

function Profile() {
  const fileRef = useRef(null);
  const [img , setImg] = useState(undefined);
  const [imgPercent , setImgPercent] = useState(0)
  const { currentUser } = useSelector((state) => state.user);
  const [imgError , setImgError] = useState(false)
  const [formData , setFormData] = useState({})
  useEffect(() => {
    if(img) {
      handleFileUpload(img);
    }
  }, [img])
  const handleFileUpload = async (img) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + img[0].name;
    const storageRef = ref(storage , fileName);
    const uplaodTask = uploadBytesResumable(storageRef , img[0]);
    uplaodTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes ) * 100;
        setImgPercent(Math.round(progress))
      },
      (error) => {
        setImgError(true)
      },
      () => {
        getDownloadURL(uplaodTask.snapshot.ref).then
        ((downloadURL) => setFormData({...formData , profilePicture : downloadURL}))
      }
    )
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        {/* 
      FireBase Allowance condition
      allow read;
      allow write : if 
      request.resource.size < 2 * 1024 * 1024 && 
      request.resource.contentType.matches('image/.*') */}
        <input type="file" ref={fileRef} hidden accept="image/*" onChange={(e) => setImg(e.target.files)} />
        <img
          src={formData.profilePicture || currentUser.profilePicture}
          alt="Profile Picture"
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
          onClick={() => fileRef.current.click()}
        />
        <p className=" self-center text-sm">
          {
            imgError ? (
              <span className="text-red-700">Error uploading image (file size must be less then 2 MB)</span>
            )
            : imgPercent > 0 && imgPercent < 100 ? (
              <span className=" text-slate-700">{`Uploading: ${imgPercent}%`}</span>
            ) : imgPercent === 100 ? (
              <span className="text-green-700 ">Image upload successfully</span>
            ) : (
              ''
            )
            
          }
        </p>
        <input
          defaultValue={currentUser.username}
          type="text"
          id="username"
          placeholder="Username"
          className=" bg-slate-100 rounded-lg p-3"
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          id="email"
          placeholder="Email"
          className=" bg-slate-100 rounded-lg p-3"
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className=" bg-slate-100 rounded-lg p-3"
        />
        <button className=" bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5 text-red-700">
        <span className="cursor-pointer">Delete Account</span>
        <span className=" cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}

export default Profile;
