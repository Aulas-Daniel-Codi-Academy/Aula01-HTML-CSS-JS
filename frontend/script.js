// Função que busca o preço do Bitcoin e converte o valor inserido
async function converter() {
  // Obtém o valor digitado pelo usuário no input
  const realInput = document.getElementById("real-value").value;

  try {
    // Faz uma requisição para a API CoinDesk que retorna o preço do Bitcoin em USD
    const response = await fetch(
      "https://api.coindesk.com/v1/bpi/currentprice/USD.json"
    );
    const data = await response.json();

    // Obtém o preço do Bitcoin em dólares e multiplica por 6 para aproximar o valor em reais
    const precoEmReal = data.bpi.USD.rate_float * 6;

    // Atualiza o preço do Bitcoin na interface
    document.getElementById(
      "btc-price"
    ).innerText = `R$ ${precoEmReal.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
    })}`;

    // Verifica se o usuário digitou um valor válido
    if (realInput <= 0 || isNaN(realInput)) {
      alert("Digite um valor válido!");
      return;
    }

    // Calcula o valor em Bitcoin
    const btcConvertido = realInput / precoEmReal;

    // Atualiza o valor convertido na tela
    document.getElementById("btc-result").innerText =
      btcConvertido.toFixed(8) + " BTC";
  } catch (error) {
    // Exibe uma mensagem de erro caso a API não funcione corretamente
    document.getElementById("btc-price").innerText = "Erro ao carregar preço.";
    console.error("Erro ao buscar cotação:", error);
  }
}

// Atualiza o preço do Bitcoin ao carregar a página
converter();
