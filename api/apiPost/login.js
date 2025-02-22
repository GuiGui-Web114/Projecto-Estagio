export async function logar(email, password) {
    const origem = "127.0.0.1:5000";
    
    const response = await fetch(`http://${origem}/login`, { // Agora apenas "/login"
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password }) // Enviamos os dados de forma segura no body
    });

    const data = await response.json();

    if (data.estado === "sucesso") {
        localStorage.setItem("userID", data.id); // Guarda o ID do usuário
        localStorage.setItem("userTipo", data.tipo); // Guarda o tipo de usuário (Regular/Admin)
    }

    return data;
}
