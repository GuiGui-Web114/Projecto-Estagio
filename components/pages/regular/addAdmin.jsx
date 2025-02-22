import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../../navbar";
import { useNavigate } from "react-router-dom";

function AdminRegistro() {
  const [admin, setAdmin] = useState({ nome: "", codigo: "", senha: "", confirmarSenha: "", imagem: "" });
  const [imagemPreview, setImagemPreview] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAdmin({ ...admin, imagem: reader.result });
        setImagemPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (admin.senha !== admin.confirmarSenha) {
      setError("As senhas não conferem.");
      return;
    }
    // Aqui você pode adicionar a lógica para enviar os dados ao backend
    console.log("Registrando administrador:", admin);
    // Resetar o formulário após o registro
    setAdmin({ nome: "", codigo: "", senha: "", confirmarSenha: "", imagem: "" });
    setImagemPreview(null);
    setError("");
    // Redireciona para /Admins após o cadastro bem-sucedido
    navigate("/Admins");
  };

  return (
    <>
      <NavBar />
      <Container fluid style={{ padding: "40px", backgroundColor: "#f8f9fa" }}>
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="p-4 shadow">
              <h3 className="text-center mb-4">Registro de Administrador</h3>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    name="nome"
                    value={admin.nome}
                    onChange={handleChange}
                    placeholder="Digite seu nome"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Código do Passe</Form.Label>
                  <Form.Control
                    type="text"
                    name="codigo"
                    value={admin.codigo}
                    onChange={handleChange}
                    placeholder="Digite seu código do passe"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control
                    type="password"
                    name="senha"
                    value={admin.senha}
                    onChange={handleChange}
                    placeholder="Digite sua senha"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Confirmar Senha</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmarSenha"
                    value={admin.confirmarSenha}
                    onChange={handleChange}
                    placeholder="Confirme sua senha"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Imagem de Perfil</Form.Label>
                  <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
                  {imagemPreview && (
                    <img
                      src={imagemPreview}
                      alt="Preview"
                      style={{ width: "100%", marginTop: "10px", borderRadius: "10px" }}
                    />
                  )}
                </Form.Group>
                <Button variant="primary" type="submit" style={{ width: "100%" }}>
                  Registrar
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AdminRegistro;
