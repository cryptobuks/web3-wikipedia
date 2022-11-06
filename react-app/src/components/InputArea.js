import * as React from "react";
import {useFormContext} from "react-hook-form";

export default function InputArea(props){
    const methods = useFormContext()
    return <input id={props.id} {...methods.register(props.val)}/>
}