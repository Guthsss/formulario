const formulario = document.querySelector("#form-produto");
const campoNome = document.querySelector("#nome");
const campoPreco = document.querySelector("#preco");
const listaProdutos = document.querySelector("#lista-produtos");
const botaoSalvar = document.querySelector("#botao-salvar");
const botaoCancelar = document.querySelector("#botao-cancelar");
const mensagemVazia = document.querySelector("#mensagem-vazia");

//recuperar os produtos salvos ou comecar uma lista nova
let produtos = JSON.parse(localStorage.getItem("produtos")) || []

//null significa que estamos cadastrando um novo produto
let indiceEdicao = null

//funcao para armazenar a lista no navegador 
function salvarProdutos() {
    localStorage.setItem("produtos", JSON.stringify(produtos))
}

//read: LISTAR OS PRODUTOS

function listarProdutos(){
    listaProdutos.innerHTML = ""

    mensagemVazia.hidden = produtos.length > 0

    produtos.forEach(function(produto,indice){
        const linha = document.createElement("tr")

        const colunaNome = document.createElement("td")
        colunaNome.textContent = produto.nome

        const colunaPreco = document.createElement("td")
        colunaPreco.textContent = produto.preco.toLocaleString("pt-BR",{ 
            style: "currency",
            currency: "BRL"})

        const colunaAcoes = document.createElement("td")
        const acoes = document.createElement("div")
        acoes.className = "acoes"

        const botaoEditar = document.createElement("button")
        botaoEditar.textContent = "editar"
        botaoEditar.className = "botao-editar"

        botaoEditar.addEventListener("click", function(){
            editarProduto(indice)
        })

        const botaoExcluir = document.createElement("button")
        botaoExcluir.textContent = "excluir"
        botaoExcluir.className = "botao-excluir"

        botaoExcluir.addEventListener("click", function(){
            excluirProdutos()
        })

        acoes.append(botaoEditar, botaoExcluir)
        colunaAcoes.appendChild(acoes)

        linha.append(colunaNome, colunaPreco, colunaAcoes)
        listaProdutos.appendChild(linha)
    })
}


//create e update
formulario.addEventListener("submit", function(evento){
    //evita que o formulario recarregue a pagina
    evento.preventDefault()

    const nome = campoNome.value.trim()
    const preco = Number(campoPreco.value)

    if(nome === "" || !Number.isFinite(preco) || preco < 0){
        alert("Informe o nome e um preço válido!")
        return
    }

    const produto = {
        nome: nome,
        preco: preco
    }

    if(indiceEdicao === null){
        //create adiciona ao final da lista o produto
        produtos.push(produto)
    }else{
        //update: substitui o produto que esta sendo editado
        produtos[indiceEdicao] = produto;
    }
    
    salvarProdutos()
    listarProdutos()
    limparFormulario()
})

//preenche o formulario com os produtos escolhidos
function editarProduto(indice){
    campoNome.value = produtos[indice].nome
    campoPreco.value = produtos[indice].preco

    indiceEdicao = indice

    botaoSalvar.textContent = "Salvar Alteração"
    botaoCancelar.hidden = false 

    campoNome.focus()

}

//deletar
function excluirProdutos(indice){
    const confirmou = confirm ("Deseja excluir este produto?")

    if(confirmou){
        produtos.splice(indice, 1)
    }

    limparFormulario()
    salvarProdutos()
    listarProdutos()
}

//limpar o form
function limparFormulario(){
    formulario.reset()
    indiceEdicao = null

    botaoSalvar.textContent = "Cadastrar"
    botaoCancelar.hidden = true
}

botaoCancelar.addEventListener("click", limparFormulario)

listarProdutos()