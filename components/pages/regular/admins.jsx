import React, { useState } from "react";
import { Container, Row, Col, Card, Table, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../../navbar";
import { useNavigate } from "react-router-dom";

// Dados iniciais dos administradores
const adminInicial = [
  { id: 1, nome: "Admin One", codigo: "P001", imagem: "https://via.placeholder.com/50" },
  { id: 2, nome: "Admin Two", codigo: "P002", imagem: "https://via.placeholder.com/50" },
  { id: 3, nome: "Admin Three", codigo: "P003", imagem: "" },
];

function AdminsLista() {
  const [admins, setAdmins] = useState(adminInicial);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const adminsFiltrados = admins.filter((admin) =>
    admin.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.codigo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <NavBar />
      <Container fluid style={{ padding: "40px", backgroundColor: "#f8f9fa" }}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Pesquisar por nome ou código do passe..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col md={6} className="text-end">
            <Button variant="primary" onClick={() => navigate("/newadmin")}>
              Adicionar Administrador
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card style={{ padding: "20px", backgroundColor: "#fff", border: "1px solid #ddd" }}>
              <h4>Lista de Administradores</h4>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Código do Passe</th>
                    <th>Imagem</th>
                  </tr>
                </thead>
                <tbody>
                  {adminsFiltrados.length > 0 ? (
                    adminsFiltrados.map((admin) => (
                      <tr key={admin.id}>
                        <td>{admin.nome}</td>
                        <td>{admin.codigo}</td>
                        <td>
                          {admin.imagem ? (
                            <img
                              src={admin.imagem}
                              alt={admin.nome}
                              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                            />
                          ) : (
                            "Sem imagem"
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" style={{ textAlign: "center" }}>
                        Nenhum administrador encontrado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AdminsLista;
