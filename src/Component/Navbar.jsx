import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function MyNavbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="/home">My Website</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
          <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
