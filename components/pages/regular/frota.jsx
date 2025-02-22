import NavBar from "../../navbar";
import { Container, Row, Col, Card, Table, Modal, Button, Form } from "react-bootstrap";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const frotaInicial = [
  { id: 1, matricula: "ABC-1234", codigo: "V001", modelo: "Ford Transit", motorista: "João Silva", imagens: ["./assets/veiculo1_frente.jpg", "./assets/veiculo1_lado.jpg", "./assets/veiculo1_traseira.jpg", "./assets/veiculo1_interior.jpg"], status: "Disponível" },
  { id: 2, matricula: "XYZ-5678", codigo: "V002", modelo: "Mercedes Sprinter", motorista: "Carlos Mendes", imagens: ["./assets/veiculo2_frente.jpg", "./assets/veiculo2_lado.jpg", "./assets/veiculo2_traseira.jpg", "./assets/veiculo2_interior.jpg"], status: "Em Viagem" },
];

const motoristas = ["João Silva", "Carlos Mendes", "Ana Pereira", "Bruno Souza"];
const COLORS = ["#00C49F", "#FFBB28", "#0088FE", "#FF4444"];

function Frota() {
  const [frota, setFrota] = useState(frotaInicial);
  const [search, setSearch] = useState("");
  
  // Modal "Ver Mais"
  const [showDetalhes, setShowDetalhes] = useState(false);
  const [veiculoSelecionado, setVeiculoSelecionado] = useState(null);
  
  // Modal Estatísticas
  const [showEstatisticas, setShowEstatisticas] = useState(false);
  
  // Modal Cadastro
  const [showCadastro, setShowCadastro] = useState(false);
  const [novoVeiculo, setNovoVeiculo] = useState({ matricula: "", codigo: "", modelo: "", motorista: "", imagens: [], status: "Disponível" });
  
  // Modal Edição
  const [showEdicao, setShowEdicao] = useState(false);
  const [veiculoEditado, setVeiculoEditado] = useState(null);

  // Exibe detalhes do veículo
  const handleShowDetalhes = (veiculo) => {
    setVeiculoSelecionado(veiculo);
    setShowDetalhes(true);
  };

  const handleCadastro = () => {
    setFrota([...frota, { ...novoVeiculo, id: frota.length + 1 }]);
    setShowCadastro(false);
    setNovoVeiculo({ matricula: "", codigo: "", modelo: "", motorista: "", imagens: [], status: "Disponível" });
  };

  const handleEditar = () => {
    setFrota(frota.map(v => (v.id === veiculoEditado.id ? veiculoEditado : v)));
    setShowEdicao(false);
    setVeiculoEditado(null);
  };

  const handleExcluir = (id) => {
    setFrota(frota.filter(v => v.id !== id));
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleImageUpload = (e, setVeiculo) => {
    const files = Array.from(e.target.files).map(file => URL.createObjectURL(file));
    setVeiculo(prev => ({ ...prev, imagens: files }));
  };

  const frotaFiltrada = frota.filter(v =>
    v.matricula.includes(search) ||
    v.codigo.includes(search) ||
    v.modelo.toLowerCase().includes(search.toLowerCase()) ||
    v.motorista.toLowerCase().includes(search.toLowerCase())
  );

  const estatisticas = Object.values(frota.reduce((acc, v) => {
    acc[v.status] = acc[v.status]
      ? { name: v.status, value: acc[v.status].value + 1 }
      : { name: v.status, value: 1 };
    return acc;
  }, {}));

  return (
    <>
      <NavBar />
      <Container fluid style={{ padding: "40px", background: "#f8f9fa" }}>
        <Row className="mb-4">
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Pesquisar Veículo"
              value={search}
              onChange={handleSearch}
            />
          </Col>
          <Col md={6} className="text-end">
            <Button onClick={() => setShowCadastro(true)}>Cadastrar Veículo</Button>
            <Button className="ms-2" variant="secondary" onClick={() => setShowEstatisticas(true)}>Ver Estatísticas</Button>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Card className="shadow-lg p-4">
              <h4 className="mb-3 text-center">Lista de Veículos</h4>
              <Table responsive hover className="table-borderless">
                <thead className="bg-dark text-white">
                  <tr>
                    <th>Matrícula</th>
                    <th>Código</th>
                    <th>Modelo</th>
                    <th>Motorista</th>
                    <th>Status</th>
                    <th>Imagem</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {frotaFiltrada.map((veiculo) => (
                    <tr key={veiculo.id}>
                      <td>{veiculo.matricula}</td>
                      <td>{veiculo.codigo}</td>
                      <td>{veiculo.modelo}</td>
                      <td>{veiculo.motorista}</td>
                      <td>{veiculo.status}</td>
                      <td>
                        <img src={veiculo.imagens[0]} alt="Veículo" style={{ width: "60px" }} />
                      </td>
                      <td>
                        <Button variant="info" onClick={() => handleShowDetalhes(veiculo)}>Ver Mais</Button>
                        <Button variant="warning" className="ms-2" onClick={() => { setVeiculoEditado({ ...veiculo }); setShowEdicao(true); }}>Editar</Button>
                        <Button variant="danger" className="ms-2" onClick={() => handleExcluir(veiculo.id)}>Excluir</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>

        {/* Modal Estatísticas */}
        <Modal show={showEstatisticas} onHide={() => setShowEstatisticas(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Estatísticas da Frota</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={estatisticas} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
                  {estatisticas.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </Modal.Body>
        </Modal>

        {/* Modal Cadastro */}
        <Modal show={showCadastro} onHide={() => setShowCadastro(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Cadastrar Veículo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Matrícula</Form.Label>
                <Form.Control
                  type="text"
                  value={novoVeiculo.matricula}
                  onChange={(e) => setNovoVeiculo({ ...novoVeiculo, matricula: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Código</Form.Label>
                <Form.Control
                  type="text"
                  value={novoVeiculo.codigo}
                  onChange={(e) => setNovoVeiculo({ ...novoVeiculo, codigo: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Modelo</Form.Label>
                <Form.Control
                  type="text"
                  value={novoVeiculo.modelo}
                  onChange={(e) => setNovoVeiculo({ ...novoVeiculo, modelo: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Motorista</Form.Label>
                <Form.Select
                  value={novoVeiculo.motorista}
                  onChange={(e) => setNovoVeiculo({ ...novoVeiculo, motorista: e.target.value })}
                >
                  <option value="">Selecione um motorista</option>
                  {motoristas.map((motorista, index) => (
                    <option key={index} value={motorista}>{motorista}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Control
                  type="text"
                  value={novoVeiculo.status}
                  onChange={(e) => setNovoVeiculo({ ...novoVeiculo, status: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Imagens</Form.Label>
                <Form.Control
                  type="file"
                  multiple
                  onChange={(e) => handleImageUpload(e, setNovoVeiculo)}
                />
              </Form.Group>
              <Button onClick={handleCadastro} className="mt-3">Cadastrar</Button>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Modal Edição */}
        <Modal show={showEdicao} onHide={() => setShowEdicao(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Editar Veículo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {veiculoEditado && (
              <Form>
                <Form.Group>
                  <Form.Label>Matrícula</Form.Label>
                  <Form.Control
                    type="text"
                    value={veiculoEditado.matricula}
                    onChange={(e) => setVeiculoEditado({ ...veiculoEditado, matricula: e.target.value })}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Código</Form.Label>
                  <Form.Control
                    type="text"
                    value={veiculoEditado.codigo}
                    onChange={(e) => setVeiculoEditado({ ...veiculoEditado, codigo: e.target.value })}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Modelo</Form.Label>
                  <Form.Control
                    type="text"
                    value={veiculoEditado.modelo}
                    onChange={(e) => setVeiculoEditado({ ...veiculoEditado, modelo: e.target.value })}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Motorista</Form.Label>
                  <Form.Select
                    value={veiculoEditado.motorista}
                    onChange={(e) => setVeiculoEditado({ ...veiculoEditado, motorista: e.target.value })}
                  >
                    <option value="">Selecione um motorista</option>
                    {motoristas.map((motorista, index) => (
                      <option key={index} value={motorista}>{motorista}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    type="text"
                    value={veiculoEditado.status}
                    onChange={(e) => setVeiculoEditado({ ...veiculoEditado, status: e.target.value })}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Imagens</Form.Label>
                  <Form.Control
                    type="file"
                    multiple
                    onChange={(e) => handleImageUpload(e, setVeiculoEditado)}
                  />
                </Form.Group>
                <Button onClick={handleEditar} className="mt-3">Salvar</Button>
              </Form>
            )}
          </Modal.Body>
        </Modal>

        {/* Modal Ver Mais */}
        <Modal show={showDetalhes} onHide={() => setShowDetalhes(false)} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Detalhes do Veículo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {veiculoSelecionado && (
              <>
                <p><strong>Matrícula:</strong> {veiculoSelecionado.matricula}</p>
                <p><strong>Código:</strong> {veiculoSelecionado.codigo}</p>
                <p><strong>Modelo:</strong> {veiculoSelecionado.modelo}</p>
                <p><strong>Motorista:</strong> {veiculoSelecionado.motorista}</p>
                <p><strong>Status:</strong> {veiculoSelecionado.status}</p>
                <div className="d-flex flex-wrap gap-2">
                  {veiculoSelecionado.imagens.map((img, index) => (
                    <img key={index} src={img} alt={`Imagem ${index + 1}`} style={{ width: "150px", objectFit: "cover" }} />
                  ))}
                </div>
              </>
            )}
          </Modal.Body>
        </Modal>

      </Container>
    </>
  );
}

export default Frota;
