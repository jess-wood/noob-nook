import React, {Component, useState} from 'react'
import {DropzoneDialog} from 'material-ui-dropzone'
import Button from '@mui/material/Button';
import API from "../../API_Interface/API_Interface";
import {Card, CardMedia} from "@mui/material";

// export default class DropzoneDialogExample extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             open: false,
//             files: []
//         };
//     }
//     handleClose() {
//         this.setState({
//             open: false
//         });
//     }
//     handleSave(files){
//         this.setState({
//             files: files,
//             open: false
//         });
//     }
//     handleOpen(){
//         this.setState({
//             open: true,
//         });
//     }
//     render() {
//         return (
//             <div>
//                 <Button onClick={this.handleOpen.bind(this)} sx={{backgroundColor: '#4fc3f7', borderColor: '#b3e5fc', color: 'black'}}>
//                     Add Image
//                 </Button>
//                 <DropzoneDialog
//                     open={this.state.open}
//                     onSave={this.handleSave.bind(this)}
//                     acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
//                     showPreviews={true}
//                     maxFileSize={5000000}
//                     onClose={this.handleClose.bind(this)}
//                 />
//             </div>
//         );
//     }
// }

const DropZone = (props) => {
    const {userData} = props;
    const [image, setImage ] = useState("");
    const [ url, setUrl ] = useState("");
    const [changedPic, setChangedPic] = useState(false);

    const uploadImage = () => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "default")
        data.append("cloud_name","NoobNook")
        fetch("https://api.cloudinary.com/v1_1/NoobNook/image/upload",{
            method:"post",
            body: data
        })
            .then(resp => resp.json())
            .then(data => {
                setUrl(data.url)
            })
            .catch(err => console.log(err))

        setChangedPic(true);
        //upload url to database
        const thisURL = url.slice(49);
        const api = new API;
        async function changePP() {
            await api.changeUserProfilePic(thisURL, window.currentUserLoggedIn);
        }
        changePP();

    }

    return (
        <div>
            <div>
                <input style={{backgroundColor: '#4a4a70', color: 'white'}} type="file" onChange= {(e)=> setImage(e.target.files[0])}></input>
                <button onClick={uploadImage}>Upload</button>
            </div>
            <div>
                <Card key={"profilePic"} sx={{width: 250, height: 240, borderRadius: '50%',  border: 1, mt: 2, marginLeft: 3}}>
                    <CardMedia style={{width: '100%',
                        height: '100%',
                        justifySelf: 'center'}}
                               image={userData.length > 0 && !changedPic ? userData[0]['user_ProfilePic'] : url} title={"profilePic"}/>
                </Card>
            </div>
        </div> )

}
export default DropZone;