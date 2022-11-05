import { Grid } from '@mui/material';
import { Link } from "react-router-dom";
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
      <Link to="/Detail"><input class="form-control" placeholder="to detail"></input></Link>
    </div>
  )
};

export default ListView;