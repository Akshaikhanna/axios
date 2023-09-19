import "../styles/Api.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Navbar, Container, Button, Form, Nav } from "react-bootstrap";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { firebaseConfig } from "./Auth";

function Api() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const nav = useNavigate();
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);

  // For Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // fetch data from API using async and axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setData(res.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching data");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // post method
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://jsonplaceholder.typicode.com/users", {
        name: name,
        email: email,
      })
      .then((res) => setData([...data, res.data]))
      .catch((error) => console.error(error));
  };

  // pagination
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // logout function
  const handlelogout = () => {
    signOut(auth)
      .then(() => {
        nav("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Navbar bg="secondary" data-bs-theme="dark" className="mx">
        <Container>
          <Navbar.Brand>Axios</Navbar.Brand>
          <Nav>
            <Nav.Link onClick={handlelogout}>LogOut</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* set the loading and error */}
      <div className="table-responsive">
        {loading ? (
          <AiOutlineLoading3Quarters className="loading" size={100} />
        ) : error ? (
          <h2>Error: {error}</h2>
        ) : (
          <>
            <Table className="table table-striped mt=1">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {/* map the items from api */}
                {currentItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="pagination">
              {/* pagination calculation  */}
              {data.length > itemsPerPage && (
                <ul className="pagination-list">
                  {Array.from(
                    { length: Math.ceil(data.length / itemsPerPage) },
                    (_, i) => (
                      <li
                        key={i}
                        className={`page-item ${
                          currentPage === i + 1 ? "active" : ""
                        }`}
                      >
                        <Button
                          onClick={() => paginate(i + 1)}
                          variant="secondary"
                        >
                          {i + 1}
                        </Button>
                      </li>
                    )
                  )}
                </ul>
              )}
            </div>
          </>
        )}
      </div>
      <div className="Form">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Button variant="success" type="submit" className="post">
            POST
          </Button>
        </Form>
      </div>
    </>
  );
}

export default Api;
