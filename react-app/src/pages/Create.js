import { InputForm } from "../components/InputForm";
import Header from "../components/Header";
import PageTitle from "../components/PageTitle";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const Create = ()=>{
    return (
    <div className="Create">
        <Header />
        <Box mt={10}>
          <Grid container rowSpacing={3} alignItems='center' justifyContent='center' direction="column">
            <PageTitle title="Create Page"></PageTitle>
          </Grid>
        </Box>
        <InputForm />
    </div>
  )
};

export default Create;
