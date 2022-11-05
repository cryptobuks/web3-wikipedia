import { IPFSProvider } from "react-ipfs";
import Content from "./Content";

const ReactIpfs = () => {
  return (
    <div>
    <IPFSProvider fallback={<>loading</>}>
      <Content />
    </IPFSProvider>
    </div>
  )
}

export default ReactIpfs;
