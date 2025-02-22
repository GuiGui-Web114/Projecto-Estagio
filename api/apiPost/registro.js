export const registerUser = async (userData) => {
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Erro ao registrar usuário!");
      }
  
      return data;
    } catch (error) {
      console.error("Erro:", error.message);
      throw error;
    }
  };
  