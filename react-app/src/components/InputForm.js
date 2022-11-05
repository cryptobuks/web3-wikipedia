import { ErrorResponse } from "@remix-run/router";
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InputArea from "./InputArea";
import ButtonComponent from "./ButtonComponent";
import Grid from "@mui/material/Grid";
import { ethers } from "ethers";

import BackHome from "./BackHome";
import IpfsCreateObject from "./ipfs/IpfsCreateObject";
import store from "../store";
import daoArtifact from "../contracts/DAO.json";

const daoAbi = daoArtifact.abi;
const daoAddr = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
const loginAccount = store.getState().setter.word;

export function InputForm() {
  const [value, setvalue] = useState(null);
  const [daoInst, setDaoInst] = useState();
  const methods = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  const navigate = useNavigate();

  const contractCreateDocument = async (key) => {
    const contentId = "cloud";
    await daoInst.createDocument(key, contentId);
  }

  useEffect(() => {
    const setDaoInst = async() => {
      if (loginAccount) {
        await setDaoInst(
          new ethers.Contract(daoAddr, daoAbi, loginAccount)
        );
      }
    };
  },[]);

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
