import Spinner from 'react-bootstrap/Spinner';

function MySpinner() {
  return (
    <>
      <Spinner animation="grow" size="sm" />
      <Spinner animation="grow" />
    </>
  );
}

export default MySpinner;