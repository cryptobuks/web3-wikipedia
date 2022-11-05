import Popup from "../components/Popup"

const Detail = () => {
  const popupContent = "Voting is closed.";
  const title = "title";
  const content = "content";

  return (
    <div className="Detail">
      <Popup
        content={popupContent}
      />
      <h1>{ title }</h1>
      <p>{ content }</p>
    </div>
  )
};

export default Detail;
