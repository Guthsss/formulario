const formulario = document.querySelector("#form-produto");
const campoNome = document.querySelector("#nome");
const campoPreco = document.querySelector("#preco");
const listaProdutos = document.querySelector("#lista-produtos");
const botaoSalvar = document.querySelector("#botao-salvar");
const botaoCancelar = document.querySelector("#botao-cancelar");
const mensagemVazia = document.querySelector("#mensagem-vazia");

// Recuper os produtos salvos ou começar uma lista nova

let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

// NULL significa que estamos cadastrando um novo produto

let indiceEdicao = null;

// Função para armazenar a lista no navegador

function salvarProdutos() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

// READ: 

// CREATE e UPDATE: Função para adicionar ou atualizar um produto

formulario.addEventListener("submit", function (event) {
    // Evita que o formulário seja enviado e a página seja recarregada
    event.preventDefault();

    const nome = campoNome.value.trim();
    const preco = Number(campoPreco.value.trim());

    if (nome === "" || !Number.isFinite(preco) || preco <= 0) {
        alert("Meu deus, tinha que ser petista");
        return;
    }

    const produto = {nome, preco};
}