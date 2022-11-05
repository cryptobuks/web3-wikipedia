import {useState} from "react";
import IpfsGetObject from "./ipfs/IpfsGetObject";


const GetSearchReults = async (pages, setPages) => {
  // Now, using dummy data
  let dummy = [
    {Title: "Japan", Contents: "hogehoge", Key: "key"},
    {Title: "Australia", Contents: "hogehoge", Key: "key"}
  ];
  setPages(dummy);
  await IpfsGetObject(setPages, "web3-wiki", "test-content-1.json", dummy);
};

export default GetSearchReults;
