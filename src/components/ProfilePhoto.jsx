import { useRef } from "react";
import "./ProfilePhoto.css";

const ProfilePhoto = ({ photo, setPhoto, editMode }) => {
  const fileInputRef = useRef();

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPhoto(previewURL); // later send file to backend
    }
  };

  return (
    <div className="photo-wrapper">
      <div
        className="photo-circle"
        onClick={() => editMode && fileInputRef.current.click()}
      >
        <img
          src={
            photo ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt="Profile"
        />

        {editMode && <div className="photo-overlay">Change Photo</div>}
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handlePhotoChange}
        hidden
      />
    </div>
  );
};

export default ProfilePhoto;
