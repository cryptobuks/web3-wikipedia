import { ErrorResponse } from "@remix-run/router";
import { useState } from "react"
import {useForm,FormProvider} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import BackHome from "./BackHome";
import InputArea from "./InputArea";


export function InputForm (){
    const [value,setvalue] = useState(null);
    const methods = useForm();
    const {register,handleSubmit,formState:{errors}} = methods;
    const navigate = useNavigate();
    return (
        <>
            <FormProvider {...methods}>
                <form
                    onSubmit={handleSubmit((data)=>{
                        console.log(data)
                        setvalue(data);
                        navigate("/");
                    })}>
                    <label>Title</label>
                    <InputArea val="Title" valid={{required:true}}/>
                    {errors.Title && <span>You need to input a title</span>}
                    <label>Contents</label>
                    <InputArea val="Contents" valid={{required:true}}/>
                    {errors.InputArea && <span>You need to input some contents</span>}
                    <label>Valid date</label>
                    <InputArea val="ValidDate" valid = {{valueAsNumber:true,validate:(value)=> value > 0}}/>
                    {errors.ValidDate && <span>You need to input a valid date which bigger than 0</span>}
                    <input type="submit"/>
                    <BackHome />
                </form>
            </FormProvider>
        </>
    );
}
