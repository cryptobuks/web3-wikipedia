import { Link } from "react-router-dom";

const SearchResultItem = (props) => {
  return (
    <div className="SearchResultItem">
      <h2>{ props.title }</h2>
      <div style={{ padding: 30 }}>
        <h3>{ props.content }</h3>
      </div>
    </div>
  );
};

export default SearchResultItem;
