import { Grid } from '@mui/material';
import SearchResultItem from "../components/SearchResultItem";

const ListView = () => {
  // ダミーデータ
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