import { create } from "ipfs-http-client";
import { useEffect, useState } from "react";

const client = create('https://ipfs.infura.io:5001/api/v0');

const Ipfs = async () => {
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

  return (
    <div className="Ipfs">
      <div className="button">
        <button type="button" onClick={handleSubmit}>submit</button>
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