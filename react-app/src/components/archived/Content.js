import { useEffect, useState } from "react";
import { useIPFS } from 'use-ipfs';

const Content = () => {
  const ipfs = useIPFS()

  useEffect(()=>{
      ipfs.node.id().then(console.log);
  },[])

}

export default Content;
