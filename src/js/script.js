let buttonNavbar = document.querySelector("#botoesContainer")
let ulProducts = document.querySelector("ul")

function listCards (array) {
    
    ulProducts.innerHTML = ""
    
    array.forEach((element) => {

        let product = element
        
        let cardProduct = createCardProduct(product)
        
        ulProducts.appendChild(cardProduct)
        
        createCardProduct(product)
        addingPrice(array)

    })
    
}

listCards(produtos)

function searchSpecificCard (array, section) {

    let specificCardMETODO = array.filter((element) => element.secao == section)

    return specificCardMETODO
}


buttonNavbar.addEventListener("click", (event) => {

    let btn = event.target
    
    if(btn.tagName == "BUTTON" && btn.innerText == 'Hortifruti') {

        let section = 'Hortifruti'
        specificCard = searchSpecificCard(produtos, section)
    
        listCards(specificCard)

    } else if(btn.tagName == "BUTTON" && btn.innerText == 'Panificadora') {

        let section = 'Panificadora'
        specificCard = searchSpecificCard(produtos, section)

        listCards(specificCard)

    } else if(btn.tagName == "BUTTON" && btn.innerText == 'Laticínios') {

        let section = 'Laticínio'
        specificCard = searchSpecificCard(produtos, section)
        listCards(specificCard)

    } else if(btn.tagName == "BUTTON" && btn.innerText == 'Todos Produtos') {

        listCards(produtos)
    }
})

function createCardProduct (array) {

    let ul = document.querySelector("ul")
    let li = document.createElement("li")
    let img = document.createElement("img")
    let h3 = document.createElement("h3")
    let span = document.createElement("span")
    let p = document.createElement("p")

    img.src = array.img
    h3.innerText = array.nome
    span.innerText = array.categoria
    p.innerText = `R$ ${array.preco},00`

    li.append(img, h3, span, p)
    
    return li

}

// PESQUISA DO PRODUTO POR NOME 

let inputSearch = document.querySelector(".campoBuscaPorNome")
let buttonSearch = document.querySelector(".estiloGeralBotoes--botaoBuscaPorNome")

buttonSearch.addEventListener("click", () => {

    let textUser = inputSearch.value

    let resultSearch = searchProduct(textUser)

    listCards(resultSearch)

    inputSearch.value = ""

})

function searchProduct (searchValue) {

    let resultSearch = produtos.filter((element) => {

        if(searchValue == element.nome) {

            return element
        } else if(searchValue == '') {

            return element
        }

    
        
    })

    return resultSearch

}

function addingPrice (array) {
    
    let spanTotal = document.querySelector(".price")

    spanTotal.innerText = sum(array)
    
}

function sum (array) {
    
    let priceTotal = array.reduce((previousValue, currentValue) => {

        return previousValue += currentValue.preco
    }, 0)

    return `R$ ${priceTotal},00`
}
