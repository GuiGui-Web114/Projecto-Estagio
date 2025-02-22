import { useState } from "react";
import { Container, Row, Col, Card, Table, Button, Form, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../../navbar";

// Dados iniciais com o campo "passe"
const motoristasIniciais = [
  { id: 1, nome: "João Silva", email: "joao.silva@email.com", passe: "P001", imagem: "" },
  { id: 2, nome: "Carlos Mendes", email: "carlos.mendes@email.com", passe: "P002", imagem: "" },
  { id: 3, nome: "Ana Costa", email: "ana.costa@email.com", passe: "P003", imagem: "" },
];

function MotoristasPage() {
  const [motoristas, setMotoristas] = useState(motoristasIniciais);
  const [novoMotorista, setNovoMotorista] = useState({ nome: "", email: "", passe: "", imagem: "" });
  const [imagemPreview, setImagemPreview] = useState(null);
  const [motoristaEditando, setMotoristaEditando] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovoMotorista({ ...novoMotorista, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNovoMotorista({ ...novoMotorista, imagem: reader.result });
        setImagemPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (novoMotorista.nome && novoMotorista.email && novoMotorista.passe) {
      if (motoristaEditando) {
        setMotoristas(
          motoristas.map((m) =>
            m.id === motoristaEditando.id ? { ...m, ...novoMotorista } : m
          )
        );
      } else {
        setMotoristas([
          ...motoristas,
          { id: motoristas.length + 1, ...novoMotorista },
        ]);
      }
      setNovoMotorista({ nome: "", email: "", passe: "", imagem: "" });
      setImagemPreview(null);
      setMotoristaEditando(null);
      setShowModal(false);
    }
  };

  const abrirModal = (motorista = null) => {
    if (motorista) {
      setMotoristaEditando(motorista);
      setNovoMotorista(motorista);
      setImagemPreview(motorista.imagem);
    } else {
      setMotoristaEditando(null);
      setNovoMotorista({ nome: "", email: "", passe: "", imagem: "" });
      setImagemPreview(null);
    }
    setShowModal(true);
  };

  // Função para excluir motorista
  const handleExcluir = (id) => {
    setMotoristas(motoristas.filter((m) => m.id !== id));
  };

  const motoristasFiltrados = motoristas.filter((motorista) =>
    motorista.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    motorista.passe.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <NavBar/>
      <Container fluid style={{ padding: "40px", backgroundColor: "#fff" }}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Pesquisar por nome ou nº do passe..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col md={6} className="text-end">
            <Button variant="primary" onClick={() => abrirModal()} style={{ minWidth: "200px" }}>
              Cadastrar Motorista
            </Button>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card style={{ padding: "20px", backgroundColor: "#fff", border: "1px solid #ddd" }}>
              <h4>Lista de Motoristas</h4>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Nº do Passe</th>
                    <th>Imagem</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {motoristasFiltrados.length > 0 ? (
                    motoristasFiltrados.map((motorista) => (
                      <tr key={motorista.id}>
                        <td>{motorista.nome}</td>
                        <td>{motorista.email}</td>
                        <td>{motorista.passe}</td>
                        <td>
                          {motorista.imagem ? (
                            <img
                              src={motorista.imagem}
                              alt={motorista.nome}
                              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                            />
                          ) : (
                            "Sem imagem"
                          )}
                        </td>
                        <td>
                          <Button variant="warning" size="sm" onClick={() => abrirModal(motorista)}>
                            Editar
                          </Button>
                          <Button variant="danger" size="sm" onClick={() => handleExcluir(motorista.id)} className="ms-2">
                            Excluir
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" style={{ textAlign: "center" }}>
                        Nenhum motorista encontrado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>

        <Modal show={showModal} onHide={() => setShowModal(false)} centered size="md">
          <Modal.Header closeButton>
            <Modal.Title>{motoristaEditando ? "Editar Motorista" : "Cadastrar Motorista"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  name="nome"
                  value={novoMotorista.nome}
                  onChange={handleChange}
                  maxLength={20}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={novoMotorista.email}
                  onChange={handleChange}
                  maxLength={25}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Nº do Passe</Form.Label>
                <Form.Control
                  type="text"
                  name="passe"
                  value={novoMotorista.passe}
                  onChange={handleChange}
                  maxLength={10}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Imagem</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
                {imagemPreview && (
                  <img src={imagemPreview} alt="Preview" style={{ width: "100%", marginTop: "10px", borderRadius: "10px" }} />
                )}
              </Form.Group>
              <Button variant="success" type="submit" style={{ width: "100%" }}>
                {motoristaEditando ? "Salvar" : "Adicionar"}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
      <footer
        style={{
          backgroundColor: "#000",
          color: "#fff",
          textAlign: "center",
          padding: "20px",
          marginTop: "40px",
        }}
      >
        <p>&copy; {new Date().getFullYear()} Ango-Real. Todos os direitos reservados.</p>
      </footer>
    </>
  );
}

export default MotoristasPage;
