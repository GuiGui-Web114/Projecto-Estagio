import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import NavBar  from "./navbar";

function Landing(params) {
 
    return (
        <>
        <NavBar/>
        <section
        style={{
          height: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #d32f2f, #000)",
          color: "#fff",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <h1 style={{ fontSize: "50px", fontWeight: "bold" }}>Gestão de Frotas Ango-Real</h1>
        <p style={{ fontSize: "18px", maxWidth: "600px", marginTop: "10px" }}>
          Plataforma para gerenciamento eficiente de entregas e veículos entre agências.
        </p>
        <Button
          href="/login"
          style={{
            marginTop: "20px",
            backgroundColor: "#ffcc00",
            color: "#000",
            fontWeight: "bold",
            border: "none",
            padding: "12px 20px",
            borderRadius: "5px",
          }}
        >
          Acessar Sistema
        </Button>
      </section>

      <section style={{ padding: "60px 20px", textAlign: "center", backgroundColor: "#fff" }}>
        <Container>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", color: "#d32f2f" }}>Funcionalidades</h2>
          <Row style={{ marginTop: "30px" }}>
            <Col md={4}>
              <Card style={{ border: "none", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>
                <Card.Body>
                  <h4 style={{ color: "#d32f2f", fontWeight: "bold" }}>Registro de Entregas</h4>
                  <p>Registre e acompanhe todas as entregas entre as agências da empresa.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card style={{ border: "none", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>
                <Card.Body>
                  <h4 style={{ color: "#d32f2f", fontWeight: "bold" }}>Gestão de Frota</h4>
                  <p>Gerencie veículos e motoristas para otimizar entregas e logística.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card style={{ border: "none", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>
                <Card.Body>
                  <h4 style={{ color: "#d32f2f", fontWeight: "bold" }}>Dashboard Interativo</h4>
                  <p>Visualize métricas de desempenho e eficiência operacional da frota.</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

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
    )
}
export default Landing