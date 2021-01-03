class ProductInCart {
    constructor(uniqueId, productId) {
        this.uniqueId = uniqueId;
        this.productId = productId;
    }
}

const products = [
    {
        productName: "Produkt nr.1",
        price: 250,
        id: 'p1'
    },
    {
        productName: "Produkt nr.2",
        price: 220,
        id: 'p2'
    },
    {
        productName: "Produkt nr.3",
        price: 230,
        id: 'p3'
    },
    {
        productName: "Produkt nr.4",
        price: 250,
        id: 'p4'
    },
    {
        productName: "Produkt nr.5",
        price: 220,
        id: 'p5'
    },
    {
        productName: "Produkt nr.6",
        price: 210,
        id: 'p6'
    },
    {
        productName: "Produkt nr.7",
        price: 270,
        id: 'p7'
    },
    {
        productName: "Produkt nr.8",
        price: 250,
        id: 'p1'
    },
    {
        productName: "Produkt nr.9",
        price: 220,
        id: 'p9'
    },
    {
        productName: "Produkt nr.10",
        price: 230,
        id: 'p10'
    },
    {
        productName: "Produkt nr.11",
        price: 250,
        id: 'p11'
    },
    {
        productName: "Produkt nr.12",
        price: 220,
        id: 'p12'
    },
    {
        productName: "Produkt nr.13",
        price: 210,
        id: 'p13'
    },
    {
        productName: "Produkt nr.14",
        price: 270,
        id: 'p14'
    },
    {
        productName: "Produkt nr.15",
        price: 250,
        id: 'p15'
    },
]

let productsInCart = [];

const generateProducts = () => {
    var productContainer = document.getElementById("productsContainer");

    products.forEach(i => {
        var product = document.createElement('div');
        product.className = "boxS";
        product.id = "product-" + i.id;

        var productImageSection = document.createElement('div');
        productImageSection.className = "boxSo";

        var productImage = document.createElement('img');
        productImage.src = "obrazek.PNG";
        productImage.alt = "obrazek.PNG";
        productImageSection.appendChild(productImage);

        var productNameSection = document.createElement('div');
        productNameSection.className = "boxSz1";

        var productName = document.createElement('div');
        productName.className = "boxSn";
        productName.innerText = i.productName;
        productNameSection.appendChild(productName);

        var productPriceSection = document.createElement('div');
        productPriceSection.className = "boxSz2";

        var productPrice = document.createElement('div');
        productPrice.className = "boxSc";
        productPrice.innerText = i.price + " zł";

        var productAdd = document.createElement('div');
        productAdd.className = "boxSd";
        productAdd.innerText = "Dodaj";
        productAdd.addEventListener('click', () => addProduct(i.id))

        productPriceSection.appendChild(productPrice);
        productPriceSection.appendChild(productAdd);

        product.appendChild(productImageSection);
        product.appendChild(productNameSection);
        product.appendChild(productPriceSection);

        productContainer.appendChild(product);
    })
}

const addProduct = (productId) => {
    if (productsInCart.length < 8) {
        productsInCart.push(new ProductInCart(new Date().valueOf(), productId));

        console.log(productsInCart);
        renderCurrentCart(productsInCart);
        updateCost();
    } else {
        window.alert('Maksymalna ilość produktów w koszyku wynosi: 8')
    }
}

const removeProduct = (id) => {
    productsInCart = productsInCart.filter(i => i.uniqueId !== id)
    console.log(productsInCart);
    renderCurrentCart(productsInCart);
    updateCost()
}

const renderCurrentCart = (productsInCart) => {
    productsInCart.forEach(i => {
        if (!document.getElementById(i.uniqueId))
            renderProductInCart(i.uniqueId);
    })
}

const renderProductInCart = (uniqueId) => {
    const cartItem = productsInCart.find(i => i.uniqueId === uniqueId);
    const product = products.find(i => i.id === cartItem.productId);
    var container = document.createElement('div');
    container.id = uniqueId;
    var newElementB1 = document.createElement('class');
    var newElementB2 = document.createElement('class');
    var newElementB3 = document.createElement('class');
    var newElementB4 = document.createElement('class');
    var newElementB5 = document.createElement('class');

    newElementB5.classList.add('ProduktB2');
    container.appendChild(newElementB5);

    newElementB1.classList.add('ProduktB1');
    newElementB1.innerText = product.productName;
    container.appendChild(newElementB1);

    newElementB2.classList.add('ProduktB1');
    newElementB2.innerText = 'Cena: ' + product.price + ' zł';
    container.appendChild(newElementB2);

    newElementB3.classList.add('ProduktB1');
    newElementB3.innerText = 'Usuń';
    var deleteId = 'delete' + uniqueId;
    newElementB3.id = deleteId;
    container.appendChild(newElementB3);

    newElementB4.classList.add('ProduktB2');
    container.appendChild(newElementB4);

    var cart = document.getElementById('boxZk');

    cart.appendChild(container);

    var UsunProdukt = document.getElementById(deleteId);

    UsunProdukt.addEventListener('click', function (e) {
        removeProduct(i);
        if (e.target.className.includes('ProduktB1')) {
            cart.removeChild(container);
        }
    });

}

const updateCost = () => {
    const sumContainer = document.getElementById("CenaSuma");
    sumContainer.innerText = "Cena Koszyka: " + sumOfCurrentCart() + " zł";
}

const sumOfCurrentCart = () => {
    let sum = 0;
    productsInCart.forEach(i => {

        const product = products.find(k => k.id === i.productId);
        sum += product.price;
    })
    return sum;
}

const clear = () => {
    productsInCart.forEach(i => {
        const productTodelete = document.getElementById(i.uniqueId);
        var cart = document.getElementById('boxZk');
        cart.removeChild(productTodelete)
    })
    productsInCart = [];
    updateCost();
}

const buy = () => {
    if (sumOfCurrentCart() !== 0) {
        window.alert('Zakup wykonany - Cena koszyka: ' + sumOfCurrentCart() + ' zł')
        clear();
    } else {
        window.alert('Niedodano produktow do koszyka')
    }
}

window.onload = function () {
    generateProducts();
    updateCost();

    const clearButton = document.getElementById("clear");
    clearButton.addEventListener('click', clear);

    const buyButton = document.getElementById("buy");
    buyButton.addEventListener('click', buy);
}