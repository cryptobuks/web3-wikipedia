import * as React from "react";
import {useFormContext} from "react-hook-form";
import './css/InputForm.css';

export default function InputArea(props){
    const methods = useFormContext()
    return <input id={props.id} {...methods.register(props.val)}/>
}