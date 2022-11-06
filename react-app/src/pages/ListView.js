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
  const [pages, setPages] = useState([{title: "", content: ""}]);
  useEffect(() => {
    (async () => {
      await GetSearchReults(pages, setPages);
    })()
  },[])

  return (
    <div className="ListView">
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
