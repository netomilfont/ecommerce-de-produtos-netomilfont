let buttonNavbar = document.querySelector("#botoesContainer")
let ulProducts = document.querySelector(".productsList")
let ulCarProduct = document.querySelector(".carProduct")
let cartShopping = []

function listCards (array) {
    
    ulProducts.innerText = ''

    array.forEach((element) => {

        let cardProduct = createCardProduct(element)
        
        ulProducts.appendChild(cardProduct)

    })
    
}

listCards(produtos, ulProducts)

buttonNavbar.addEventListener("click", (event) => {

    let btn = event.target
    
    if(btn.tagName == "BUTTON" && btn.innerText == 'Hortifruti') {

        const hortiArray = produtos.filter(element => element.secao == 'Hortifruti')

        listCards(hortiArray)

    } else if(btn.tagName == "BUTTON" && btn.innerText == 'Panificadora') {

        const paniArray = produtos.filter(element => element.secao == 'Panificadora')

        listCards(paniArray)

    } else if(btn.tagName == "BUTTON" && btn.innerText == 'Laticínios') {

        const latiArray = produtos.filter(element => element.secao == 'Laticínio')

        listCards(latiArray)

    } else if(btn.tagName == "BUTTON" && btn.innerText == 'Todos Produtos') {
        
        listCards(produtos)
    }
})

function createCardProduct (array) {

    const id = array.id

    const ul = document.querySelector("ul")
    const li = document.createElement("li")
    const divImg = document.createElement("div")
    const img = document.createElement("img")
    const div1 = document.createElement("div")
    const div = document.createElement("div")
    const h3 = document.createElement("h3")
    const span = document.createElement("span")
    const ol = document.createElement("ol")
    const li2 = document.createElement("li")
    const p = document.createElement("p")
    const div3 = document.createElement("div")
    const button = document.createElement("button")

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
    divImg.classList.add("divImage")
    div1.classList.add("infoProduct")
    div.classList.add("titleAndPrice")
    div3.classList.add("divButton")
    
    div3.append(p, button)
    ol.append(li2)
    div.append(h3, span, ol)
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

        if(searchValue.toLowerCase().trim() == element.nome.toLowerCase() || searchValue.toLowerCase().trim() == element.categoria.toLowerCase() || searchValue.toLowerCase().trim() == element.secao.toLowerCase()) {

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
    
        const idProduct = btnBuy.id
    
        const product = produtos.find(function(product) {
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

        listCart(cartShopping, ulCarProduct)
    }
    
}

ulCarProduct.addEventListener("click", (event) => {

    let btnRemove = event.target

    if(btnRemove.tagName == 'BUTTON') {

        const id = btnRemove.id

        const index = cartShopping.findIndex((produto) => produto.id == id)
        
        cartShopping.splice(index, 1)

    }
    
    listCart(cartShopping, ulCarProduct)
    createCartTotal(cartShopping)
})

function createCartElement (array) {

    const id = array.id

    const li = document.createElement("li")
    const divImg = document.createElement("div")
    const img = document.createElement("img")
    const div1 = document.createElement("div")
    const div = document.createElement("div")
    const h3 = document.createElement("h3")
    const span = document.createElement("span")
    const ol = document.createElement("ol")
    const li2 = document.createElement("li")
    const p = document.createElement("p")
    const div3 = document.createElement("div")
    const button = document.createElement("button")

    if(id != undefined){

        button.id =  id
    }

    img.src = array.img
    h3.innerText = array.nome
    span.innerText = array.categoria
    p.innerText = `R$ ${array.preco}`
    li2.innerText = array.componentes
    button.innerText = 'x'
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
    ulCarProduct.append(li)

    return li

}

console.log(cartShopping)

function listCart (array, section) {

    section.innerHTML = ''

    array.forEach((element) => {
        
        const cardProduct = createCartElement(element)
        
        section.appendChild(cardProduct)
        
        createCartTotal(cartShopping)

    })
    
}
