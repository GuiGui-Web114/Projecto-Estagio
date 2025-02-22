import { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa"; // ícone de menu (hamburger)

function NavBar() {
  const [isAutenticado, setIsAutenticado] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userID = localStorage.getItem("userID");
    const userTipo = localStorage.getItem("userTipo");

    if (!userID || !userTipo) {
      navigate("/");
    } else {
      setIsAutenticado(true);
    }
  }, [navigate]);

  const Logout = () => {
    localStorage.removeItem("userID");
    localStorage.removeItem("userTipo");
    setIsAutenticado(false);
    navigate("/");
  };

  return (
    <Navbar style={{ backgroundColor: "#d32f2f" }} variant="dark">
      <Container>
        <Navbar.Brand
          href="/"
          style={{
            fontWeight: "bold",
            color: "#ffcc00",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src="src/assets/logo.png"
            alt="Logo"
            style={{ width: "40px", height: "40px", marginRight: "10px" }}
          />
          Ango-Real
        </Navbar.Brand>
        <Nav className="ms-auto">
          {isAutenticado ? (
            <Dropdown align="end">
              <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
                <FaBars />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/home">Dashboard</Dropdown.Item>
                <Dropdown.Item href="/entrega">Entrega</Dropdown.Item>
                <Dropdown.Item href="/frota">Frota</Dropdown.Item>
                <Dropdown.Item href="/motoristas">Motoristas</Dropdown.Item>
                <Dropdown.Item href="/admins">Administradores</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={Logout}>Sair</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Button href="/login" variant="outline-light">
              Entrar
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
