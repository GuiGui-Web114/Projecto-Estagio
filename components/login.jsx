import { useState } from "react";
import { Modal,Container,Row,Col,Form, Button,Card,Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {logar} from "../api/apiPost/login";




function Login(params) {

    const Nav = useNavigate()
    const [email,setEmail]= useState('')
    const [loading,setLoading]= useState(false)
    const [smShow, setSmShow] = useState(false);
    const [password,setPassword]= useState('')
    const [errorMessage,setErrorMessage]=useState('')
    

const Validate_Login = async (e)=>{
e.preventDefault()
setLoading(true)

    const resposta =await logar(email,password)

    
    if (resposta.estado =='sucesso') {

        setTimeout(() => {
             if (resposta.tipo=='Regular') {
            Nav('/home')
        } else {
            Nav('/admin/home')
        }
        }, 1000);
       
    } else {
        setTimeout(() => {
        setLoading(false)
        setSmShow(true)
        setPassword('')
    }, 2000);
    }
    

}

const cadastro = (e)=>{
    e.preventDefault()
    Nav('/cadastro')
}

    return(
        <>
         <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="modal-error"
        centered
        style={{
          backdropFilter: "blur(5px)", 
        }}
      >
        <Modal.Header
          closeButton
          style={{
            background: "#d32f2f",
            color: "#fff",
            borderBottom: "3px solid #000",
          }}
        >
          <Modal.Title id="modal-error">⚠️ Credenciais Incorrectas</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#333",
            padding: "20px",
          }}
        >
          Volte a inserir o seu email e palavra passe corretamente.
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "center" }}>
          <Button
            variant="danger"
            onClick={() => setSmShow(false)}
            style={{
              backgroundColor: "#d32f2f",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              fontWeight: "bold",
            }}
          >
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

      <Container
  fluid
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #d32f2f, #000)",
    padding: "20px",
    margin: "0",
    maxWidth: "100%",
  }}
>
       
        <Row style={{ width: "100%", maxWidth: "400px" }}>
          <Col xs={12}>
            <Card
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Card.Body>
                <div style={{ textAlign: "center", marginBottom: "15px" }}>
                  <img
                    src="src/assets/logo.png"
                    alt="Logo"
                    style={{ width: "80px", maxWidth: "100%" }}
                  />
                </div>
                <Form onSubmit={Validate_Login}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Insira o seu Email"
                      required
                      style={{
                        borderRadius: "5px",
                        border: "1px solid #d32f2f",
                        padding: "10px",
                      }}
                    />
                    <Form.Text>Email usado durante o cadastro</Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Palavra Passe</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Insira a sua Palavra passe"
                      required
                      style={{
                        borderRadius: "5px",
                        border: "1px solid #d32f2f",
                        padding: "10px",
                      }}
                    />
                  </Form.Group>

                  <div style={{ textAlign: "center", color: "red", marginBottom: "10px" }}>
                    {errorMessage}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: "10px",
                    }}
                  >
                    <Button
                      variant="danger"
                      type="submit"
                      style={{
                        backgroundColor: "#d32f2f",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "5px",
                        flex: "1",
                      }}
                    >
                      {loading ? <Spinner animation="border" size="sm" /> : "Entrar"}
                    </Button>
                    <Button
                      variant="warning"
                      type="button"
                      onClick={cadastro}
                      style={{
                        backgroundColor: "#ffcc00",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "5px",
                        color: "#000",
                        fontWeight: "bold",
                        flex: "1",
                      }}
                    >
                      Cadastrar
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
        </>
    )
}

export default Login







  