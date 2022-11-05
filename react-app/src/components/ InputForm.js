import { useState } from "react"
import {useForm,FormProvider} from "react-hook-form";
import InputArea from "./InputArea";


export function InputForm (){
    const [value,setvalue] = useState(null);
    const methods = useForm();
    const {register,handleSubmit} = methods;
    return (
        <>
            <FormProvider {...methods}>
                <form
                    onSubmit={handleSubmit((data)=>{
                        console.log(data)
                        setvalue(data);
                    })}>
                    <label>Title</label>
                    <InputArea val="Title"/>
                    <label>Contents</label>
                    <InputArea val="Contents"/>
                    <input type="submit"/>
                </form>
            </FormProvider>
        </>
    );
}
