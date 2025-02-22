import { useState } from "react";
import { Container, Row, Col, Card, Table, Button, Form, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../../navbar";

const entregasIniciais = [];
const agencias = ["Agência Central", "Agência Norte", "Agência Sul"];
const viaturas = ["Caminhão 01", "Caminhão 02", "Caminhão 03"];
const motoristas = ["João Silva", "Carlos Mendes", "Ana Costa"];

function RegistroEntregas() {
  const [entregas, setEntregas] = useState(entregasIniciais);
  const [novaEntrega, setNovaEntrega] = useState({
    origem: "",
    destino: "",
    viatura: "",
    motorista: "",
    destinatarioNome: "",
    destinatarioBI: "",
    tipoCarga: "",
    nomeCarga: ""
  });
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovaEntrega({ ...novaEntrega, [name]: value });
  };

  const adicionarEntrega = () => {
    if (novaEntrega.origem && novaEntrega.destino && novaEntrega.viatura && novaEntrega.motorista) {
      setEntregas([...entregas, { id: entregas.length + 1, ...novaEntrega }]);
      setNovaEntrega({
        origem: "",
        destino: "",
        viatura: "",
        motorista: "",
        destinatarioNome: "",
        destinatarioBI: "",
        tipoCarga: "",
        nomeCarga: ""
      });
      setShowModal(false);
    }
  };

  return (
    <>
    <NavBar/>
    <Container fluid style={{ padding: "40px", backgroundColor: "#FFFFFF" }}>
      <Row>
        <Col className="text-center mb-4">
          <h2>Registro de Entregas</h2>
        </Col>
      </Row>
      <Row>
        <Col className="mb-3">
          <Button variant="primary" onClick={() => setShowModal(true)}>Nova Entrega</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card style={{ padding: "20px" }}>
            <h4>Lista de Entregas</h4>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Origem</th>
                  <th>Destino</th>
                  <th>Viatura</th>
                  <th>Motorista</th>
                  <th>Destinatário</th>
                  <th>Tipo de Carga</th>
                  <th>Nome da Carga</th>
                </tr>
              </thead>
              <tbody>
                {entregas.map((entrega) => (
                  <tr key={entrega.id}>
                    <td>{entrega.origem}</td>
                    <td>{entrega.destino}</td>
                    <td>{entrega.viatura}</td>
                    <td>{entrega.motorista}</td>
                    <td>{entrega.destinatarioNome} ({entrega.destinatarioBI})</td>
                    <td>{entrega.tipoCarga}</td>
                    <td>{entrega.nomeCarga}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
      
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Nova Entrega</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Origem</Form.Label>
              <Form.Select name="origem" value={novaEntrega.origem} onChange={handleChange}>
                <option value="">Selecione...</option>
                {agencias.map((agencia, index) => (
                  <option key={index} value={agencia}>{agencia}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Destino</Form.Label>
              <Form.Select name="destino" value={novaEntrega.destino} onChange={handleChange}>
                <option value="">Selecione...</option>
                {agencias.map((agencia, index) => (
                  <option key={index} value={agencia}>{agencia}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Viatura</Form.Label>
              <Form.Select name="viatura" value={novaEntrega.viatura} onChange={handleChange}>
                <option value="">Selecione...</option>
                {viaturas.map((viatura, index) => (
                  <option key={index} value={viatura}>{viatura}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Motorista</Form.Label>
              <Form.Select name="motorista" value={novaEntrega.motorista} onChange={handleChange}>
                <option value="">Selecione...</option>
                {motoristas.map((motorista, index) => (
                  <option key={index} value={motorista}>{motorista}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nome do Destinatário</Form.Label>
              <Form.Control type="text" name="destinatarioNome" value={novaEntrega.destinatarioNome} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>BI do Destinatário</Form.Label>
              <Form.Control type="text" name="destinatarioBI" value={novaEntrega.destinatarioBI} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tipo de Carga</Form.Label>
              <Form.Control type="text" name="tipoCarga" value={novaEntrega.tipoCarga} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nome da Carga</Form.Label>
              <Form.Control type="text" name="nomeCarga" value={novaEntrega.nomeCarga} onChange={handleChange} required />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={adicionarEntrega}>Salvar</Button>
        </Modal.Footer>
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
    </footer></>
  );
}

export default RegistroEntregas;
