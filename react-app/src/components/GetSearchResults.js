import {useState} from "react";
import IpfsGetObject from "./ipfs/IpfsGetObject";


const GetSearchReults = async (pages, setPages) => {
  // Now, using dummy data
  let dummy = [
    {title: "Japan", content: "hogehoge"},
    {title: "Australia", content: "hogehoge"}
  ];
  setPages(dummy);
  await IpfsGetObject(setPages, "web3-wiki", "test-content-0.json", dummy);
};

export default GetSearchReults;
