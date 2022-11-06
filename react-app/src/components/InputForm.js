import { ErrorResponse } from "@remix-run/router";
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import InputArea from "./InputArea";
import ButtonComponent from "./ButtonComponent";
import Grid from "@mui/material/Grid";
import { ethers } from "ethers";
import './css/InputForm.css';

import BackHome from "./BackHome";
import IpfsCreateObject from "./ipfs/IpfsCreateObject";
import store from "../store";


const InputForm = () => {
  return (
    <div>
    <label>Title</label>
    <InputArea id="title" val="title" valid={{ required: true }} />
    {/* {props.errors.Title && <span>You need to input a title</span>} */}

    <label>Contents</label>
    <InputArea id="content" val="content" valid={{ required: true }} />
    {/* {props.errors.InputArea && <span>You need to input some contents</span>} */}

    <input type="submit" />
    </div>
  );
}

export default InputForm;