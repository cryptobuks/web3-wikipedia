import { ErrorResponse } from "@remix-run/router";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import BackHome from "./BackHome";
import InputArea from "./InputArea";
import ButtonComponent from "./ButtonComponent";
import Grid from "@mui/material/Grid";
import IpfsCreateObject from "./ipfs/IpfsCreateObject";

export function InputForm() {
  const [value, setvalue] = useState(null);
  const methods = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  const navigate = useNavigate();
  return (
    <div>
      <FormProvider {...methods}>
        <form
          onSubmit={ handleSubmit((data) => {
            data = JSON.stringify(data);
            console.log(data);
            setvalue(data);

            // Dummy settings
            const bucket = "web3-wiki";
            const key = "test-content-1.json";
            IpfsCreateObject(data, bucket, key, "text/plain");
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
