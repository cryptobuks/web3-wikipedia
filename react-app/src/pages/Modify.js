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
import InputForm from "../components/InputForm";
import Grid from '@mui/material/Grid';
import ButtonComponent from "../components/ButtonComponent";
import Button from '@mui/material/Button';

const Modify = () => {
    // values from the previous page
    let location = useLocation();
    const navigate = useNavigate();

    //values from the provider
    const walletId = store.getState().setter.word;

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

    return (
    <div className="Modify">
        <Header />
        <Box mt={10}>
        <Grid container rowSpacing={3} alignItems='center' justifyContent='center' direction="column">
            <PageTitle title="Modify"></PageTitle>
        </Grid>
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(async(data)=>{
                        console.log(data)
                        setvalue(data);
                        await deleteDoc(doc(usersRef,walletId));
                        //TO DO: send value to ipfs
                        navigate("/");
                    })}>
                    <InputForm />    
            </form>
        </FormProvider>
        

        <Grid container rowSpacing={3} alignItems='center' justifyContent='center' direction="column">
        <Button variant="contained" onClick={call_modal}>Save as Draft</Button>
        <Modal open={modalIsopen} onClose={modalIsopen}>
        <Box>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirm to save the draft
            </Typography>
            <Button variant="contained" onClick = {submit_Modify}>Yes</Button>
            <Button variant="contained" onClick = {()=>{
                setModalOpen(false);
            }}>No</Button>
        </Box>
        </Modal>
          <Grid item xs={12}>
              <ButtonComponent color="success" name="Back Home" to="/" />
          </Grid>
        </Grid>
        </Box>
    </div>
    )
};

export default Modify;