import {useLocation,useNavigate} from "react-router-dom"
import store from "../store"
import BackHome from "../components/BackHome";
import db from '../model/firebase';
import {collection,addDoc,deleteDoc,doc,setDoc,getDoc} from "firebase/firestore";
import { useEffect, useState } from "react";
import {useForm,FormProvider, set} from "react-hook-form";
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
import IpfsCreateObject from "../components/ipfs/IpfsCreateObject";

const Modify = () => {
    // values from the previous page
    let location = useLocation();
    const navigate = useNavigate();

    //values from the provider
    const walletId = store.getState().setter.word;

    // check if has some data in location and wallet
    const checkerror = (walletId != null) && (location.state);


    //initial the value for store change of db
    const initialTitle = location.state ? location.state.title : "NaN";
    const initialcontents = location.state ? location.state.contents : "NaN";
    const [title,setTitle] = useState(initialTitle);
    const [contents,setContents] = useState(initialcontents);
    const usersRef = collection(db,"users");

    const daoInst = store.getState().setter.daoInst;

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

    useEffect(()=>{
        const fetch_data = async () => {
            const docSnap = await getDoc(doc(usersRef,walletId));
            if (docSnap.exists()){
                const newTitle = await docSnap.data().title;
                const newContent = await docSnap.data().content;
                setTitle((pre_state)=>newTitle);
                setContents((pre_state)=>newContent);
            }
        };
        fetch_data();
    },[]);



    // values for form
    const [value,setvalue] = useState(null);
    const methods = useForm({defaultValues:{title:title,content:contents}});
    methods.setValue('content',contents);
    methods.setValue('title',title);
    const {register,handleSubmit,formState:{errors}} = methods;

    // values for modal
    const [modalIsopen,setModalOpen] = useState(false);

    const call_modal = () =>{
        setModalOpen(true);
        console.log(modalIsopen);
    }

    const submit_Modify = async() => {
        console.log(methods.getValues());
        await setTitle(methods.getValues().title);
        await setContents(methods.getValues().content);

        const docRef = await setDoc(doc(usersRef,walletId),{
            title:title,
            content:contents,
        })
        console.log(docRef);
        setModalOpen(false);
    }

    const contractOpenProposal = async (key) => {
        const proposalId = "0";
        const contentId = "cloud";
        await daoInst.openProposal(proposalId, contentId, 3);
    }

    return (checkerror
    ? <div className="Modify">
        <Header />
        <Box mt={10}>
        <Grid container rowSpacing={3} alignItems='center' justifyContent='center' direction="column">
            <PageTitle title="Modify"></PageTitle>
        </Grid>
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(async(data)=>{
                data = JSON.stringify(data);
                //console.log(data)
                setvalue(data);

                // Dummy settings
                const bucket = "web3-wiki";
                const key = "test-content-1.json";
                const updatedKey = `modified-${key}`;
                IpfsCreateObject(data, bucket, updatedKey, "text/plain");
                contractOpenProposal(key);
                alert(`Proposal to modify ${key} has opened!`);

                await deleteDoc(doc(usersRef,walletId));
                navigate("/");
            })}>
            <InputForm />
            </form>
        </FormProvider>

        <Grid container rowSpacing={3} alignItems='center' justifyContent='center' direction="column">
        <Button variant="contained" onClick={call_modal}>Save as Draft</Button>
        <Modal open={modalIsopen} onClose={modalIsopen}>
        <Box sx={style}>
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
    :
    <div>
        <Modal open={true}>
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            You don't have any selected contents.
            </Typography>
            <BackHome />
        </Box>
        </Modal>
    </div>
    )
};

export default Modify;
