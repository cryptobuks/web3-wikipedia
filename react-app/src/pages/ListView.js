import { useEffect, useState } from "react";
import { Grid } from '@mui/material';
import SearchedItem from "../components/SearchedItem";
import GetSearchReults from "../components/GetSearchResults";

const ListView = () => {
  // Dummy data
  const [pages, setPages] = useState([{title: "", content: ""}]);
  useEffect(() => {
    (async () => {
      await GetSearchReults(pages, setPages);
    })()
  },[])

  return (
    <div className="ListView">
      <h1>ListView</h1>
      {
        pages.map((page) =>(
          <Grid container direction="column">
            {
            <SearchedItem
              title={page.title}
              content={page.content}
            />
            }
          </Grid>
        ))
      }
    </div>
  )
};

export default ListView;
