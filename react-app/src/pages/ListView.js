import { useEffect, useState } from "react";
import { Grid } from '@mui/material';
import { Link } from "react-router-dom";

import SearchedItem from "../components/SearchedItem";
import GetSearchReults from "../components/GetSearchResults";

const ListView = () => {
  // Dummy data
  const [pages, setPages] = useState([{title: "", content: "", key: ""}]);
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
              title={page.Title}
              content={page.Contents}
              key={page.Key}
            />
            }
          </Grid>
        ))
      }
      {/*
        <Link to="/Detail"><input class="form-control" placeholder="to detail"></input></Link>
      */}
    </div>
  )
};

export default ListView;
