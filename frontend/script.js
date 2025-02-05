// Função que busca o preço do Bitcoin e converte o valor inserido
async function converter() {
  // Obtém o valor digitado pelo usuário no campo de input
  const realInput = document.getElementById("real-value").value;

  try {
    // Faz uma requisição para a API CoinDesk que retorna o preço do Bitcoin em USD
    const response = await fetch(
      "https://api.coindesk.com/v1/bpi/currentprice/USD.json"
    );

    // Converte a resposta para um objeto JSON
    const data = await response.json();

    // Obtém o preço do Bitcoin em dólares (USD)
    const precoEmDolar = data.bpi.USD.rate_float;

    // Multiplica o preço do Bitcoin por 6 para obter o valor estimado em Reais (BRL)
    const precoEmReal = precoEmDolar * 6;

    // Atualiza o preço do Bitcoin na interface da página
    document.getElementById(
      "btc-price"
    ).innerText = `R$ ${precoEmReal.toLocaleString("pt-BR", {
      minimumFractionDigits: 2, // Exibe sempre duas casas decimais no valor
    })}`;

    // Verifica se o valor inserido pelo usuário é válido (não pode ser negativo ou vazio)
    if (realInput <= 0 || isNaN(realInput)) {
      alert("Digite um valor válido!"); // Exibe um alerta caso o valor seja inválido
      return; // Sai da função sem fazer a conversão
    }

    // Calcula o valor correspondente em Bitcoin (BTC)
    // Fórmula: Valor em BTC = Valor inserido em BRL ÷ Preço do Bitcoin em BRL
    const btcConvertido = realInput / precoEmReal;

    // Atualiza o valor convertido na tela, exibindo o resultado formatado com 8 casas decimais
    document.getElementById("btc-result").innerText =
      btcConvertido.toFixed(8) + " BTC";
  } catch (error) {
    // Caso ocorra um erro na requisição, exibe uma mensagem de erro na interface
    document.getElementById("btc-price").innerText = "Erro ao carregar preço.";

    // Exibe o erro no console do navegador para depuração
    console.error("Erro ao buscar cotação:", error);
  }
}

// Chama a função converter() automaticamente ao carregar a página
// Isso garante que o preço do Bitcoin seja atualizado assim que o usuário abrir o site
converter();
