let buttonNavbar = document.querySelector("#botoesContainer")
let ulProducts = document.querySelector(".productsList")
let ulCarProduct = document.querySelector(".carProduct")
let cartShopping = []

function listCards (array, section) {
    
    section.innerHTML = ''

    array.forEach((element) => {

        let product = element
        
        let cardProduct = createCardProduct(product)
        
        section.appendChild(cardProduct)

    })
    
}

listCards(produtos, ulProducts)

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

    let id = array.id

    let ul = document.querySelector("ul")
    let li = document.createElement("li")
    let divImg = document.createElement("div")
    let img = document.createElement("img")
    let div1 = document.createElement("div")
    let div = document.createElement("div")
    let h3 = document.createElement("h3")
    let span = document.createElement("span")
    let ol = document.createElement("ol")
    let li2 = document.createElement("li")
    let p = document.createElement("p")
    let div3 = document.createElement("div")
    let button = document.createElement("button")

    if(id != undefined){

        button.id =  id
    }

    img.src = array.img
    h3.innerText = array.nome
    span.innerText = array.categoria
    p.innerText = `R$ ${array.preco}`
    li2.innerText = array.componentes
    button.innerText = 'Comprar'
    button.classList.add("buyButton")
    li2.classList.add("hiddenComponentes")
    div1.classList.add("infoProduct")
    div.classList.add("titleAndPrice")
    div3.classList.add("divButton")
    
    div3.append(button)
    ol.append(li2)
    div.append(h3, span, ol, p)
    div1.append(div, div3)
    divImg.append(img)
    li.append(divImg, div1)
    
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

        if(searchValue == element.nome || searchValue == element.categoria || searchValue == element.secao) {

            return element
        } else if(searchValue == '') {

            return element
        }
    })

    return resultSearch

}

function createCartTotal (cart) {

    let span1 = document.querySelector(".quantity")
    let span2 = document.querySelector(".total")
    
    span1.innerText = cart.length
    span2.innerText = sum(cart)

}

function sum (array) {
    
    let priceTotal = array.reduce((previousValue, currentValue) => {

        return previousValue += Number(currentValue.preco)
    }, 0)

    return `R$ ${priceTotal},00`

}

ulProducts.addEventListener("click",(event) => {
    
    let btnBuy = event.target
    
    if(btnBuy.tagName == "BUTTON") {
    
        let idProduct = btnBuy.id
    
        let product = produtos.find(function(product) {
            if(product.id == idProduct) {
                
                return product
            }
        })
        addCart(product)
    }
})

function addCart (product) {

    if(product !== undefined) {

        cartShopping.push(product)

        listCards(cartShopping, ulCarProduct)
        createCartTotal(cartShopping)
    }
    
}

ulCarProduct.addEventListener("click", (event) => {

    let btnRemove = event.target

    if(btnRemove.tagName == 'BUTTON') {

        let id = btnRemove.id

        let index = cartShopping.findIndex((produto) => produto.id == id)
        
        cartShopping.splice(index, 1)

        createCartTotal(cartShopping)
        listCards(cartShopping, ulCarProduct)
    }

})

// function createCartElement () {

//     let ul = document.querySelector(".carProduct")
//     let li = document.createElement("li")
//     let 

// }