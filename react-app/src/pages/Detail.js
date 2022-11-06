import React, { useEffect, useState } from 'react'
import { BottomNavigation } from "@mui/material";
import {useForm,FormProvider} from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom"
import Header from "../components/Header";
import { ethers } from "ethers";

import Popup from "../components/Popup"
import BackHome from '../components/BackHome'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PageTitle from "../components/PageTitle";
import Button from '@mui/material/Button';
import ButtonComponent from "../components/ButtonComponent"
import store from "../store";
import IpfsGetObject from "../components/ipfs/IpfsGetObject";
import IpfsCreateObject from "../components/ipfs/IpfsCreateObject";

const Detail = () => {
  const navigate = useNavigate();

  const { state } = useLocation();
  const title = state.title;
  const contents = state.contents;
  // const key = state.key;
  // For Demo
  const key = "test-content-1.json";
  const proposalId = "2";

  const daoInst = store.getState().setter.daoInst;

  // contents example -> fetch from the ipfs
  // to do: get the data from ipfs
  const contents_example = { title: "apple", contents: "This is an apple", closed: false };

  // TODO: get the exist goodinitState and badinitState from contract
  const goodinitState = 0;
  const badinitState = 0;

  // For Botton status
  const [goodState,setGood] = useState(goodinitState);
  const [badState,setBad] = useState(badinitState);
  const [res, setRes] = useState();
  const [proposalState, setProposal] = useState(false);
  const [ipfsdoc, setIpfsdoc] = useState();

  const updateGood = async (proposalId) => {
    await daoInst.voteProposal(proposalId, true);
    setGood(Number(goodState) + 1);
  };

  const updateBad = async (proposalId) => {
    await daoInst.voteProposal(proposalId, false);
    setBad(Number(badState) + 1);
  };

  const contractCloseProposal = async (proposalId) => {
    await daoInst.closeProposal(proposalId);
  };

  const forceCloseProposal = async (proposalId) => {
    const key = "test-content-1.json";
    const bucket = "web3-wiki";
    await daoInst.forceClose(proposalId);
    if (goodState > badState) {
      alert("This proposal got approval of the majority and be marged.");
      
      console.log(ipfsdoc);
      await IpfsGetObject(setIpfsdoc, bucket, `modified-${key}`);
      contractCloseProposal(proposalId);
    } else {
      alert("This proposal did not get approval of the majority and be rejected.");
      contractCloseProposal(proposalId);
    }
    setProposal(false);
  };

  const getVoteFromContract = async (_proposalId) => {
    const _res = await daoInst.viewProposalInformation(_proposalId);
    setRes(_res);
    setGood(ethers.utils.formatUnits(_res[4], 0));
    setBad(ethers.utils.formatUnits(_res[5], 0));
  };

  useEffect(() => {
    const proposalId = "2";
    getVoteFromContract(proposalId);
    setProposal(true);
  }, [daoInst]);

  useEffect(() => {
    const _getobject = async () => {
      const key = "test-content-1.json";
      const bucket = "web3-wiki";
      await IpfsCreateObject(ipfsdoc, bucket, key, "text/plain");
    };
    _getobject();
  }, [ipfsdoc]);

  return (
    <div className="Detail">
      <Header />
      <Box mt={10}>
        <Grid container rowSpacing={3} alignItems='center' justifyContent='center' direction="column">
          <PageTitle title={title}></PageTitle>
          <Grid>
            {contents}
            </Grid>
              {
                proposalState ? (
                  <div className="NotClosed">
                    <Button variant="contained" type="button" onClick={ async() => await updateGood(proposalId) }>Good: { goodState }</Button>
                    <Button variant="contained" type="button" onClick={async() => await updateBad(proposalId) }>Bad: { badState }</Button>
                  </div>
                ) : (
                  <div className="Closed">
                    <Button disabled variant="contained" type="button">Good: {goodState}</Button>
                    <Button disabled variant="contained" type="button">Bad: {badState}</Button>
                  </div>
                )
              }

              {
                proposalState ? (
                  <div className="NotClosed">
                    <Button  variant="contained" type="button" onClick={ async() => await forceCloseProposal(proposalId) }>forced close button for Demo</Button>
                  </div>
                ) : (
                  <div className="Closed">
                    <Button disabled variant="contained" type="button">forced close button for Demo</Button>
                  </div>
                )
              }
            <ButtonComponent color="success" name="Back Home" to="/" />
    <Button variant="contained" onClick={()=>{navigate("/Modify",{state:{title:title,contents:contents,key:key}})}}>Modify</Button>
        </Grid>
      </Box>
    </div>
  )
};

export default Detail;
