import { useEffect, useState } from "react";
import { Grid } from '@mui/material';
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Box from '@mui/material/Box';
import '../components/css/font.css'
import SearchedItem from "../components/SearchedItem";
import GetSearchReults from "../components/GetSearchResults";
import PageTitle from "../components/PageTitle";
import ButtonComponent from "../components/ButtonComponent";

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
      <Header /> 
      <Box mt={10}>
      <Grid container rowSpacing={3} alignItems='center' justifyContent='center' direction="column">
        <PageTitle title="Search Result"></PageTitle>
      </Grid>
      <Box ml={30}>
        <Grid container rowSpacing={3} alignItems='center' justifyContent='center' direction="column">
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
     {/* for demo */}
      <Grid container rowSpacing={3} alignItems='center' justifyContent='center' direction="column">
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
      <Grid container rowSpacing={3} alignItems='center' justifyContent='center' direction="column">
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
      {/* for demo */}
      <Grid item xs={12}>
            <ButtonComponent color="success" name="Back Home" to="/"/>
        </Grid>
      </Box>
      </Box>
    </div>

  )
};

export default ListView;
