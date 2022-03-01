import {
	Avatar,
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Divider,
	Typography,
} from "@mui/material";
import { useRef, useState, useEffect } from "react"

import {
	ref,
	uploadBytesResumable,
	getDownloadURL,
	getStorage } from "firebase/storage";
	import { doc, getDoc, updateDoc } from "firebase/firestore";
	import { db } from "../../firebase-config";
	
const AccountProfile = ({ profile, id }) => {
 
	const inputRef = useRef(null);
	const [avatarUrl, setAvatarUrl] = useState( profile?.photoUrl || " ");
	const [message, setMessage] = useState("");

useEffect(async () => {
  if(avatarUrl !== " ") {
	const userRef = doc(db, "users", id);
	await updateDoc(userRef, {
		photoUrl: avatarUrl
	});
  }
}, [avatarUrl])

	const handleUploadFile = (event) => {
    
            const reader = new FileReader();
            reader.onload = (e) => {
            //   poImg.current = e.target.result;
            };
            const file = event.target.files[0];
            reader.readAsDataURL(file);
            setMessage("Uploading...");
            const storage = getStorage();
            const storageRef = ref(storage, `profiles/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file, "data_url");
			uploadTask.on(
				"state_changed",
				(snapshot) => {
				  const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				  setMessage(`Upload is  ${progress}% done`);
				},
				(error) => {
				  // Handle unsuccessful uploads
				  throw error;
				},
				() => { 
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					
				
					setAvatarUrl(downloadURL)
				

				
				  });

				});
			}
			

	return (
		<Card>
			<CardContent>
				<Box
					sx={{
						alignItems: "center",
						display: "flex",
						flexDirection: "column",
					}}
				>
					<Avatar
						src={avatarUrl}
						sx={{
							height: 64,
							mb: 2,
							width: 64,
						}}
					/>
					<Typography color="textPrimary" gutterBottom variant="h5">
						{profile?.displayName}
					</Typography>
					<Typography color="textSecondary" variant="body2">
						{`${profile?.role}`}
					</Typography>
				</Box>
			</CardContent>
			<Divider />
			<CardActions>
				<Button onClick={() => {
					inputRef.current.value = "";
					console.log("hereis current: inref:", inputRef.current)
					inputRef.current.click();

				}} color="primary" fullWidth variant="text">
					Upload picture
				</Button>
			</CardActions>
			<input onChange={handleUploadFile}  type="file" id="my_photo" accept="image/*" ref={inputRef} style={{
				display: 'none'
			}} />
		</Card>
	)};

export default AccountProfile;
