import Popup from "../components/Popup"
import React,{useState} from 'react'
import BackHome from '../components/BackHome'
import { BottomNavigation } from "@mui/material";
import {useNavigate} from "react-router-dom"

const Detail = () => {
  // contents example -> fetch from the ipfs
  // to do: get the data from ipfs
  const contents_example = {title:"apple",contents:"This is an apple",closed:true};
  // to do: get the exist goodinitState and badinitState from contract
  const goodinitState = 2;
  const badinitState = 2;

  //
  const title = contents_example.title;
  const contents = contents_example.contents;

  // For Botton status
  const [goodState,setGood] = useState(goodinitState);
  const [badState,setBad] = useState(badinitState);
  const navigate = useNavigate();

  const updateGood = () =>{
    setGood(goodState+1);
    // to do:send the good state to ipfs and connect with contract
  }

  const updateBad = () =>{
    setBad(badState+1);
    // to do:send the good state to ipfs and connect with contract
  }

  return (
    <div className="Detail">
      <h1>{title}</h1>
      <p>{contents}</p>
      {
        contents_example.closed ? (
          <div className="NotClosed">
          <button type="button">Good:{goodState}</button>
          <button type="button">Bad:{badState}</button>
          </div>
        ) : (
          <div className="Closed">
          <button type="button" onClick={updateGood}>Good:{goodState}</button>
          <button type="button" onClick={updateBad}>Bad:{badState}</button>
          </div>
        )
      }
      <BackHome />
      <button onClick={()=>{navigate("/Modify",{state:{title:title,contents:contents}})}}>Modify</button>
    </div>
  )
};

export default Detail;
