import InputForm from "../components/InputForm";
import Header from "../components/Header";
import PageTitle from "../components/PageTitle";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { ErrorResponse } from "@remix-run/router";
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import InputArea from "../components/InputArea";
import ButtonComponent from "../components/ButtonComponent";
import { ethers } from "ethers";
import IpfsCreateObject from "../components/ipfs/IpfsCreateObject";
import store from "../store";


const Create = () => {
  const navigate = useNavigate();

  const [value, setvalue] = useState(null);

  const account = store.getState().setter.word;
  const provider = store.getState().setter.provider;
  const signer = store.getState().setter.signer;
  const daoInst = store.getState().setter.daoInst;

  const methods = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const contractCreateDocument = async (key) => {
    const contentId = "cloud";
    await daoInst.createDocument(key, contentId);
  }


    return (
    <div className="Create">
        <Header />
        <Box mt={10}>
          <Grid container rowSpacing={3} alignItems='center' justifyContent='center' direction="column">
            <PageTitle title="Create Page"></PageTitle>
          </Grid>
          <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit((data) => {
            data = JSON.stringify(data);
            console.log(data);
            setvalue(data);

            // Dummy settings
            const bucket = "web3-wiki";
            const key = "test-content-1.json";

            console.log(daoInst);
            IpfsCreateObject(data, bucket, key, "text/plain");
            contractCreateDocument(key);
            alert(`${key} has uploaded!`);
            navigate("/");
          })}
        >
        <InputForm />
        </form>
        </FormProvider>
        <Grid container rowSpacing={3} alignItems='center' justifyContent='center' direction="column">
        <Grid item xs={12}>
            <ButtonComponent color="success" name="Back Home" to="/" />
        </Grid>
        </Grid>
        </Box>
    </div>
  )
};

export default Create;

