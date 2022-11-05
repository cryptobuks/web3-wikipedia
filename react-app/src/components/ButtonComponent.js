import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

const ButtonComponent = (props) => {
  return (
    <Button
      variant="contained"
      color="primary"
      component={Link}
      to={ props.to }
      size="large"
    >
      { props.name }
    </Button>
  )
}

export default ButtonComponent;