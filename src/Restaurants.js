import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";
import { Card, Pagination, Button, Spinner } from "react-bootstrap";
import Table from "react-bootstrap/Table";

function Restaurants() {
  const [restaurants, setRestaurants] = useState(null);
  const [page, setPage] = useState(1);
  const perPage = 10;

  const history = useHistory();
  const location = useLocation();
  let borough = queryString.parse(location.search).borough;

  useEffect(() => {
    if (!borough) {
      fetch(
        `https://api-project1-lshi53.herokuapp.com/api/restaurants?page=${page}&perPage=${perPage}`
      )
        .then((response) => response.json())
        .then((data) => setRestaurants(data))
        .catch((err) => console.log(err));
    } else {
      fetch(
        `https://api-project1-lshi53.herokuapp.com/api/restaurants?page=${page}&perPage=${perPage}&borough=${borough}`
      )
        .then((response) => response.json())
        .then((data) => setRestaurants(data))
        .catch((err) => console.log(err));
    }
  }, [borough, page]);

  //utility functions
  const previousPage = () => {
    if (page > 0) {
      setPage((prev) => prev - 1);
    }
  };

  const nextPage = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <>
      <Card border="light" bg="info" text="light">
        <Card.Body>
          <Card.Title>Restaurants List</Card.Title>
          <Card.Text >
            Full list of restaurants. Optionally sorted by borough.
          </Card.Text>
        </Card.Body>
      </Card>
      {restaurants !== null && restaurants.length > 0 ? (
        <Table striped borderless hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Address</th>
              <th>Borough</th>
              <th>Cuisine</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((restaurant, index) => (
              <tr
                key={index}
                onClick={() => {
                  history.push(`/restaurant/${restaurant._id}`);
                }}
              >
                <td>{index + 1}</td>
                <td>{restaurant.name}</td>
                <td>
                  {restaurant.address.building} {restaurant.address.street}
                </td>
                <td>{restaurant.borough}</td>
                <td>{restaurant.cuisine}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : restaurants !== null && restaurants.length === 0 ? (
        <Card border="light" text="danger">
          <Card.Body>
            <Card.Title>
              No Data Found!
            </Card.Title>
          </Card.Body>
        </Card>
      ) : (
        <Button variant="light" disabled>
          <Spinner as="span" animation="border" variant="info" role="status" />
          Loading...
        </Button>
      )}
      <Pagination>
        <Pagination.Prev onClick={previousPage} />
        <Pagination.Item>{page}</Pagination.Item>
        <Pagination.Next onClick={nextPage} />
      </Pagination>
    </>
  );
}

export default Restaurants;
