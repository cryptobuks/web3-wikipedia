import Alert from '@mui/material/Alert';

const Popup = (props) => {
  return (
    <Alert severity="info">{ props.content }</Alert>
  )
}

export default Popup;