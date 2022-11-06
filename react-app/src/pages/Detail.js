import React, { useEffect, useState } from 'react'
import { BottomNavigation } from "@mui/material";
import {useForm,FormProvider} from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom"
import Header from "../components/Header";

import Popup from "../components/Popup"
import BackHome from '../components/BackHome'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PageTitle from "../components/PageTitle";
import Button from '@mui/material/Button';
import ButtonComponent from "../components/ButtonComponent"
import Stack from '@mui/material/Stack';

const Detail = () => {
  const { state } = useLocation();
  const title = state.title;
  const contents = state.contents;
  const key = state.key;

  // contents example -> fetch from the ipfs
  // to do: get the data from ipfs
  const contents_example = { title: "apple", contents: "This is an apple", closed: true };

  // TODO: get the exist goodinitState and badinitState from contract
  const goodinitState = 2;
  const badinitState = 2;

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

  useEffect(() => {
    const getVoteFromContract = async () => {
      
    };
  }, []);

  return (
    <div className="Detail">
      <Header />
      <Box mt={10}>
        <Grid container rowSpacing={3} alignItems='center' justifyContent='center' direction="column">
          <PageTitle title={title}></PageTitle>
          <Grid mt={20}>
            {contents}
            </Grid>
            <Grid mt={20}>
              {
                contents_example.closed ? (
                  <div className="NotClosed">
                  <Stack spacing={2} direction="row">
                  <Button variant="contained" color="error" type="button">Good: {goodState}</Button>
                  <Button variant="contained" color="info" type="button">Bad: {badState}</Button>
                  </Stack>
                  </div>
                ) : (
                  <div className="Closed">
                    <Stack spacing={2} direction="row">
                    <Button disabled variant="contained" type="button" onClick={updateGood}>Good:{goodState}</Button>
                    <Button disabled variant="contained" type="button" onClick={updateBad}>Bad:{badState}</Button>
                    </Stack>
                  </div>
                )
              }
              </Grid>
              <Grid mt={10}>
              <Stack spacing={2} direction="row">
              {
                contents_example.closed ? (
                  <div className="NotClosed">
                  <Button variant="contained" type="button">forced close button for Demo</Button>
                  </div>
                ) : (
                  <div className="Closed">
                    <Button disabled variant="contained" type="button">forced close button for Demo</Button>
                  </div>
                )
              }
            <ButtonComponent color="success" name="Back Home" to="/"/>
            <Button variant="contained" onClick={()=>{navigate("/Modify",{state:{title:title,contents:contents}})}}>Modify</Button>
            </Stack>
        </Grid>
        </Grid>
      </Box>
    </div>
  )
};

export default Detail;
