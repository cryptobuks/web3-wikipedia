import { Link } from "react-router-dom";
import './css/SearchResultItem.css'

const SearchResultItem = (props) => {
  return (
    <div className="SearchResultItem">
      <a href="/"></a>
      <h2>Title: { props.title }</h2>
      <div style={{ padding: 30 }}>
        <h3>Content: { props.content }</h3>
      </div>
    </div>
  );
};

export default SearchResultItem;
