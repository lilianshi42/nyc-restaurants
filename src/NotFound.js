import { useHistory } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

function NotFound() {
  const history = useHistory();

  return (
    <>
      <Card border="warning">
        <Card.Body>
          <Card.Title>Page Not Found</Card.Title>
          <Button
            variant="warning"
            size="lg"
            onClick={() => {
              history.push("/");
            }}
          >
            Back
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default NotFound;
