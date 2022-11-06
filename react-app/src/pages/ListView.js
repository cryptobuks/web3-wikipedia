import { useEffect, useState } from "react";
import { Grid } from '@mui/material';
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Box from '@mui/material/Box';
import '../components/css/font.css'
import SearchedItem from "../components/SearchedItem";
import GetSearchReults from "../components/GetSearchResults";
import PageTitle from "../components/PageTitle";

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
      {/*
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
        <Link to="/Detail"><input class="form-control" placeholder="to detail"></input></Link>
      */}

      <Header /> 
      <Box mt={10}>
        <Grid container rowSpacing={3} alignItems='center' justifyContent='center' direction="column">
        <PageTitle title="Search Result"></PageTitle>
          {
            pages.map((page) =>(
              <Grid container direction="column">
                {
                <SearchedItem
                  title={page.title}
                  content={page.content}
                  key={page.Key}
                />
                }
              </Grid>
            ))
          }
      </Grid>
      </Box>
    </div>

  )
};

export default ListView;
