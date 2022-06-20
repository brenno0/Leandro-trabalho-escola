export const errorMessages = {
    SERVER_ERROR: "Erro desconhecido no servidor. Tente mais Tarde.",
    catch_error: (e:any) => {
      console.error(e);
      console.error("Resposta do back do erro acima: ", e.response);
      return (
        e.response?.data?.message ??
        e.response?.data?.detalhes ??
        "Erro desconhecido no servidor. Tente mais Tarde."
      );
    },
  };
  