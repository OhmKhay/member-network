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
import { toast } from "react-toastify"
import {
	ref,
	uploadBytesResumable,
	getDownloadURL,
	getStorage } from "firebase/storage";
	import { doc, updateDoc } from "firebase/firestore";
	import { db } from "../../firebase-config";
	


const AccountProfile = ({ profile, id }) => {
 
	const inputRef = useRef(null);
	const [avatarUrl, setAvatarUrl] = useState(" ");
	const [message, setMessage] = useState("");
	const [isUpload, setUpload] = useState(false);

	useEffect(() => {
	 setAvatarUrl(profile?.photoUrl)
	}, [profile?.photoUrl])

useEffect(async () => {
  if(avatarUrl !== " " && isUpload) {
	const userRef = doc(db, "users", id);
	await updateDoc(userRef, {
		photoUrl: avatarUrl
	});
  }
}, [isUpload])

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
				  toast.success(`Upload is ${progress}% done`);
				},
				(error) => {
				  // Handle unsuccessful uploads
				  throw error;
				},
				() => { 
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					
					setAvatarUrl(downloadURL);
					setUpload(true)
					toast.success(`Upload Image Successfully!`)
			
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
