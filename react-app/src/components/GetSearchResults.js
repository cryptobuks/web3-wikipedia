import IpfsGetObject from "./ipfs/IpfsGetObject";

const GetSearchReults = async () => {
  // Now, using dummy data
  let pages = [
    {title: "Japan", content: "hogehoge"},
    {title: "Australia", content: "hogehoge"}
  ];
  const res = await IpfsGetObject("web3-wiki", "test-content-0.json");
  pages[pages.length] = res;
  return pages;
};

export default GetSearchReults;
