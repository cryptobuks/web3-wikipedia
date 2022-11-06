import { ErrorResponse } from "@remix-run/router";
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import InputArea from "./InputArea";
import ButtonComponent from "./ButtonComponent";
import Grid from "@mui/material/Grid";
import { ethers } from "ethers";

import BackHome from "./BackHome";
import IpfsCreateObject from "./ipfs/IpfsCreateObject";
import store from "../store";


const InputForm = () => {
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
    <div>
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
          <label>Title</label>
          <InputArea id="title" val="Title" valid={{ required: true }} />
          {errors.Title && <span>You need to input a title</span>}

          <label>Contents</label>
          <InputArea id="contents" val="Contents" valid={{ required: true }} />
          {errors.InputArea && <span>You need to input some contents</span>}

          <input type="submit" />

          <Grid item xs={12}>
            <ButtonComponent color="success" name="Back Home" to="/" />
          </Grid>
        </form>
      </FormProvider>
    </div>
  );
}

export default InputForm;
