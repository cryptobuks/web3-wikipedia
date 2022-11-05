import Box from '@mui/material/Box';
import { Link } from "react-router-dom";

import './css/SearchedItem.css';


const SearchedItem = (props) => {
  return (
    <Box>
      <div className="SearchedItem">
    <Link to={"/Detail"} state={{ title: props.title, contents: props.content }}>
          <h2>Title: { props.title }</h2>
        </Link>
        <div style={{ padding: 30 }}>
          <h3>Content: { props.content }</h3>
        </div>
      {/* <a href="/Detail"></a> */}
      </div>
    </Box>
  );
};

export default SearchedItem;
