import Typography from '@mui/material/Typography';
import './css/font.css'

const PageTitle = (props) => {
    return (
    <Typography id="page-title">{ props.title }</Typography>
  )
}

export default PageTitle;