import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Grid } from '@material-ui/core';
import SearchResultItem from "../components/SearchResultItem";

const ListView = () => {
  const pages = [
    {title: "Japan", content: "hogehoge"},
    {title: "Australia", content: "hogehoge"}
  ];

  return (
    <div className="ListView">
      <h1>ListView</h1>
      {
        pages.map((page) =>(
          <Grid container direction="column">
            <SearchResultItem
              title={page.title}
              content={page.content}
            />
          </Grid>
        ))
      }
    </div>
  )
};

export default ListView;