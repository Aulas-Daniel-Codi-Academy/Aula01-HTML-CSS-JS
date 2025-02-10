// Função que busca o preço do Bitcoin e converte o valor inserido
async function converter() {
  // Obtém o valor digitado pelo usuário
  const realInput = document.getElementById("real-value").value;

  try {
    // Faz a requisição para obter o preço do Bitcoin em dólares (USD)
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
    );
    const data = await response.json();

    // Obtém o preço do Bitcoin em dólares
    const precoEmDolar = data.bitcoin.usd;

    // Converte para Reais assumindo a taxa de câmbio fixa (1 USD = 6 BRL)
    const precoEmReal = precoEmDolar * 6;

    // Atualiza o preço do Bitcoin na interface
    document.getElementById(
      "btc-price"
    ).innerText = `R$ ${precoEmReal.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
    })}`;

    // Verifica se o valor inserido pelo usuário é válido
    if (realInput <= 0 || isNaN(realInput)) {
      alert("Digite um valor válido!");
      return;
    }

    // Converte o valor inserido para Bitcoin
    const btcConvertido = realInput / precoEmReal;

    // Atualiza o resultado da conversão
    document.getElementById("btc-result").innerText =
      btcConvertido.toFixed(8) + " BTC";
  } catch (error) {
    document.getElementById("btc-price").innerText = "Erro ao carregar preço.";
    console.error("Erro ao buscar cotação:", error);
  }
}

// Atualiza o preço automaticamente ao carregar a página
converter();
