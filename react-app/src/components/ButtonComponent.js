import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

const ButtonComponent = (props) => {
  return (
    <Button
      variant="contained"
      component={Link}
      color={ props.color }
      to={ props.to }
      size="large"
      provider={ props.provider }
      signer={ props.signer }
      account={ props.account }
    >
      { props.name }
    </Button>
  )
}

export default ButtonComponent;
