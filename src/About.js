import { useHistory } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

function About() {
  const history = useHistory();

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>About The Creator</Card.Title>
          <Card.Text>
            Developer Lilian Shi is a Computer Programming Student in her fourth
            term, this app is her React-app development with sample restaurants
            data.
          </Card.Text>
          <Button
            variant="info"
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

export default About;
