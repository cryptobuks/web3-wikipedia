import { create } from "ipfs-http-client";
import { useEffect, useState } from "react";
import * as IPFS from 'ipfs-core';

const client = create('https://ipfs.infura.io:5001/api/v0');

const Ipfs = () => {
  
  const wiki = [{title: "DAO", content: "DAO is great!"}];
  const [urlArr, setUrlArr] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const created = await client.add(wiki);
      const url = `https://ipfs.infura.io/ipfs/${created.path}`;
      setUrlArr(prev => [...prev, url]);
    } catch (error) {
      console.log(error.message);
    }
  }

  const aysncfunction = async () => {
    const ipfs = await IPFS.create();
    const { cid } = await ipfs.add('Hello world');
    setUrlArr(cid);
  }

  return (
    <div className="Ipfs">
      <div className="button">
        <button type="button" onClick={aysncfunction}>submit</button>
      </div>
      <div className="display">
        {urlArr.length !== 0
        ? urlArr.map((el) => <p>{el}</p>)
        : <h3>Upload data</h3>}
      </div>
    </div>
  )
}

export default Ipfs;
