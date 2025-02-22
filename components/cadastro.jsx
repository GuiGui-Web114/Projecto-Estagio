import { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/apiPost/registro"; // Importando a API

function Cadastro() {
    const NAV = useNavigate();
    const [form, setForm] = useState({ nome: "", telefone: "", bi: "", email: "", senha: "", confirmarSenha: "" });
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.senha.length < 6) return setErro("A senha deve ter pelo menos 6 caracteres.");
        if (form.senha !== form.confirmarSenha) return setErro("As senhas não coincidem.");
        
        try {
            const userData = {
                nome: form.nome,
                email: form.email,
                contacto: form.telefone,
                bi: form.bi,
                password: form.senha,
                tipo:'Regular'
            };

            await registerUser(userData);

            setErro(""); 
            setSucesso(true); 
            setForm({ nome: "", telefone: "", bi: "", email: "", senha: "", confirmarSenha: "" });

            setTimeout(() => {
                NAV('/home'); 
            }, 100);
        } catch (error) {
            setErro(error.message || "Erro ao cadastrar usuário.");
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <Card className="p-4 shadow" style={{ width: "100%", maxWidth: "400px", borderRadius: "10px" }}>
                <h4 className="text-center mb-3" style={{ color: "#d32f2f" }}>Cadastro</h4>
                {sucesso && <Alert variant="success">Usuário cadastrado com sucesso!</Alert>}
                {erro && <Alert variant="danger">{erro}</Alert>}
                <Form onSubmit={handleSubmit}>
                    {["nome", "telefone", "bi", "email"].map((field) => (
                        <Form.Group className="mb-2" key={field}>
                            <Form.Control type="text" placeholder={field} name={field} value={form[field]} onChange={handleChange} required />
                        </Form.Group>
                    ))}
                    {["senha", "confirmarSenha"].map((field) => (
                        <Form.Group className="mb-2" key={field}>
                            <Form.Control type="password" placeholder={field === "senha" ? "Senha" : "Confirmar Senha"} name={field} value={form[field]} onChange={handleChange} required />
                        </Form.Group>
                    ))}
                    <Button type="submit" className="w-100" style={{ backgroundColor: "#d32f2f", border: "none" }}>Cadastrar</Button>
                </Form>
            </Card>
        </Container>
    );
}

export default Cadastro;
