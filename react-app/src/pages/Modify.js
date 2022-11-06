import {useLocation,useNavigate} from "react-router-dom"
import store from "../store"
import BackHome from "../components/BackHome";
import db from '../model/firebase';
import {collection,addDoc,deleteDoc,doc,setDoc,getDoc} from "firebase/firestore";
import { useEffect, useState } from "react";
import {useForm,FormProvider} from "react-hook-form";
import InputArea from "../components/InputArea";
import { async } from "@firebase/util";
import { Modal,Box,Typography } from "@mui/material";
import Header from "../components/Header";
import '../components/css/font.css'
import PageTitle from "../components/PageTitle";

const Modify = () => {
    // values from the previous page
    let location = useLocation();
    const navigate = useNavigate();

    //values from the provider
    const walletId = store.getState().setter.word;
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    //initial the value for store change of db
    const initialTitle = location.state ? location.state.title : "NaN";
    const initialcontents = location.state ? location.state.contents : "NaN";
    const [title,setTitle] = useState(initialTitle);
    const [contents,setContents] = useState(initialcontents);
    const usersRef = collection(db,"users");


    useEffect(()=>{
        const fetch_data = async () => {
            const docSnap = await getDoc(doc(usersRef,walletId));
            if (docSnap.exists()){
                setTitle(docSnap.data().title);
                setContents(docSnap.data().contents);
            }
        };
        fetch_data();
    },[]);

    // values for form
    const [value,setvalue] = useState(null);
    const methods = useForm({defaultValues:{Title:title,Contents:contents}});
    const {register,handleSubmit,formState:{errors}} = methods;

    // values for modal
    const [modalIsopen,setModalOpen] = useState(false);

    const call_modal = () =>{
        setModalOpen(true);
        console.log(modalIsopen);
    }

    const submit_Modify = async() => {
        const docRef = await setDoc(doc(usersRef,walletId),{
            title:title,
            contents:contents,
        })
        console.log(docRef);
        setModalOpen(false);
    }

    return <div className="Modify">
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(async(data)=>{
                        console.log(data)
                        setvalue(data);
                        await deleteDoc(doc(usersRef,walletId));
                        //TO DO: send value to ipfs
                        navigate("/");
                    })}>
                <h1>Modify Page</h1>
                <label>Title</label>
                <InputArea val="Title" valid={{required:true}}/>
                {errors.Title && <span>You need to input a title</span>}
                <label>Contents</label>
                <InputArea val="Contents" valid={{required:true}}/>
                {errors.InputArea && <span>You need to input some contents</span>}
                <input type="submit" value="submit"/>
            </form>
        </FormProvider>
        <button onClick={call_modal}>Save as Draft</button>
        <Modal open={modalIsopen} onClose={modalIsopen}>
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirm to save the draft
            </Typography>
            <button onClick = {submit_Modify}>Yes</button>
            <button onClick = {()=>{
                setModalOpen(false);
            }}>No</button>
        </Box>
        </Modal>
        <BackHome />
    </div>
}

export default Modify;