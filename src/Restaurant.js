import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardDeck, Button, Spinner } from "react-bootstrap";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import moment from "moment";

function Restaurant() {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  let { id } = useParams();

  useEffect(() => {
    setLoading(true);
    fetch(`https://api-project1-lshi53.herokuapp.com/api/restaurants/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.hasOwnProperty("_id")) {
          setRestaurant(data);
        } else {
          setRestaurant(null);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <>
      {!loading && restaurant !== null ? (
        <div>
          <Card border="light" bg="info" text="light">
            <Card.Body>
              <Card.Title>{restaurant.name}</Card.Title>
              <Card.Text>
                {restaurant.address.building} {restaurant.address.street}
              </Card.Text>
            </Card.Body>
          </Card>
          <MapContainer
            style={{ height: "400px" }}
            center={[restaurant.address.coord[1], restaurant.address.coord[0]]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker
              position={[
                restaurant.address.coord[1],
                restaurant.address.coord[0],
              ]}
            ></Marker>
          </MapContainer>
          <Card border="light">
            <Card.Body>
              <Card.Title>Ratings</Card.Title>
            </Card.Body>
          </Card>
          <CardDeck>
            {restaurant.grades.map((grade, index) => (
              <Card key={index} border="info">
                <Card.Body>
                  <Card.Title>Grade: {grade.grade}</Card.Title>
                  <Card.Text>
                    Date: {moment(grade.date).format("YYYY-MM-DD")}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </CardDeck>
        </div>
      ) : !loading && restaurant === null ? (
        <Card text="danger">
          <Card.Body>
            <Card.Text>Unable to find restaurant with id: {id}</Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <Button variant="light" disabled>
          <Spinner as="span" animation="border" variant="info" role="status" />
          Loading...
        </Button>
      )}
    </>
  );
}

export default Restaurant;
