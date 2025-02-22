
import NavBar  from "../../navbar"; 
import { Container, Row, Col, Card } from "react-bootstrap";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend, LabelList } from "recharts";


const entregasMensais = [
  { mes: "Jan", entregas: 120 },
  { mes: "Fev", entregas: 98 },
  { mes: "Mar", entregas: 150 },
  { mes: "Abr", entregas: 170 },
  { mes: "Mai", entregas: 140 },
  { mes: "Jun", entregas: 180 },
];

const dadosPie = [
  { name: "Motoristas Ativos", value: 20 },
  { name: "Veículos Disponíveis", value: 15 },
  { name: "Falhas nas Entregas", value: 5 },
  { name: "Veículos com Problema", value: 3 },
];

const desempenhoMotoristas = [
  { mes: "Jan", eficiencia: 85 },
  { mes: "Fev", eficiencia: 87 },
  { mes: "Mar", eficiencia: 82 },
  { mes: "Abr", eficiencia: 90 },
  { mes: "Mai", eficiencia: 88 },
  { mes: "Jun", eficiencia: 86 },
  { mes: "Jun", eficiencia: 86 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF4444"];

function Dashboard() {
  return (
    <>
    
    <NavBar/>
     <Container fluid style={{ padding: "40px" }}>
      <Row>
        <Col md={12} style={{ textAlign: "center", marginBottom: "20px" }}>
          <h1 style={{ color: "#d32f2f", fontWeight: "bold" }}>Dashboard</h1>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Card style={{ padding: "20px", marginBottom: "20px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>
            <h4>Total de Entregas por Mês</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={entregasMensais}>
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="entregas" fill="#d32f2f" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col md={6}>
          <Card style={{ padding: "20px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>
            <h4>Estatísticas Gerais</h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={dadosPie} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value" label>
                  {dadosPie.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                  <LabelList dataKey="value" position="inside" fill="#fff" fontSize={14} fontWeight="bold" />
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Card style={{ padding: "20px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>
            <h4>Desempenho dos Motoristas</h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={desempenhoMotoristas}>
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
                <Line type="monotone" dataKey="eficiencia" stroke="#00C49F" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
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

export default Dashboard;

