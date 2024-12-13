const usdToDoubloonRate = 0.357;
let elonBalance = 400000000000;
let totalSpent = 0;

const items = [
    { name: "Big Mac", priceUSD: 2, image: "images/big-mac.png", quantity: 0 },
    { name: "Flip Flops", priceUSD: 3, image: "images/flipflops.png", quantity: 0 },
    { name: "Fudge", priceUSD: 4, image: "images/fudge.png", quantity: 0 },
    { name: "Coca-Cola Pack", priceUSD: 5, image: "images/coke.png", quantity: 0 },
    { name: "Movie Ticket", priceUSD: 12, image: "images/ticket.png", quantity: 0 },
    { name: "Book", priceUSD: 15, image: "images/book.png", quantity: 0 },
    { name: "Air Jordans", priceUSD: 100, image: "images/jordons.png", quantity: 0 },
    { name: "Cat", priceUSD: 100, image: "images/cat.png", quantity: 0 },
    { name: "Puppy", priceUSD: 500, image: "images/puppy.png", quantity: 0 },
    { name: "Horse", priceUSD: 5000, image: "images/horse.png", quantity: 0 },
    { name: "Hot Tub", priceUSD: 6000, image: "images/Hot Tub.png", quantity: 0 },
    { name: "Jet Ski", priceUSD: 12000, image: "images/Jet Ski.png", quantity: 0 },
    { name: "Rolex", priceUSD: 15000, image: "images/Rolex.png", quantity: 0 },
    { name: "Diamond Ring", priceUSD: 25000, image: "images/Diamond Ring.png", quantity: 0 },
    { name: "Ford F-150", priceUSD: 30000, image: "images/Ford F-150.png", quantity: 0 },
    { name: "Gold Bar", priceUSD: 60000, image: "images/Gold Bar.png", quantity: 0 },
    { name: "Tesla", priceUSD: 75000, image: "images/Tesla.png", quantity: 0 },
    { name: "Ferrari", priceUSD: 250000, image: "images/Ferrari.png", quantity: 0 },
    { name: "Single Family House", priceUSD: 300000, image: "images/Single Family House.png", quantity: 0 },
    { name: "Cruise", priceUSD: 1000000, image: "images/cruise.png", quantity: 0 },
    { name: "McDonald's Franchise", priceUSD: 1500000, image: "images/McDonalds Franchise.png", quantity: 0 },
    { name: "Mansion", priceUSD: 4000000, image: "images/Mansion.png", quantity: 0 },
    { name: "M1 Abrams", priceUSD: 9200000, image: "images/M1 Abrams.png", quantity: 0 },
    { name: "Yacht", priceUSD: 10000000, image: "images/Yacht.png", quantity: 0 },
    { name: "F1 Car", priceUSD: 15000000, image: "images/F1 car.png", quantity: 0 },
    { name: "Apache Helicopter", priceUSD: 31000000, image: "images/Apachehelicopter.png", quantity: 0 },
    { name: "Boeing 747", priceUSD: 150000000, image: "images/Boeing 747.png", quantity: 0 },
    { name: "Skyscraper", priceUSD: 850000000, image: "images/skyscrapper.png", quantity: 0 },
    { name: "Mona Lisa", priceUSD: 870000000, image: "images/monalisa.png", quantity: 0 },
    { name: "Space Shuttle", priceUSD: 1500000000, image: "images/spaceshuttle.png", quantity: 0 },
    { name: "Twitter", priceUSD: 44000000000, image: "images/twitter.png", quantity: 0 },
    { name: "International Space Station", priceUSD: 150000000000, image: "images/iss.png", quantity: 0 },
];
function formatPrice(price) {
    if (price >= 1e12) { // Trillion
        return (price / 1e12).toLocaleString(undefined, { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
        }) + ' Trillion';
    } else if (price >= 1e9) { // Billion
        return (price / 1e9).toLocaleString(undefined, { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
        }) + ' Billion';
    } else if (price >= 1e6) { // Million
        return (price / 1e6).toLocaleString(undefined, { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
        }) + ' Million';
    } else {
        return price.toLocaleString(undefined, { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
        });
    }
}

function updateTotalDisplay() {
    const totalAmount = document.getElementById('total-amount');
    if (!totalAmount) {
        console.error("Element with ID 'total-amount' not found.");
        return;
    }
    const elonTotalDoubloons = elonBalance / usdToDoubloonRate;
    totalAmount.innerText = formatPrice(elonTotalDoubloons);
}

function updateSpentDisplay() {
    const spentAmount = document.getElementById('spent-amount-value');
    if (spentAmount) {
        spentAmount.innerText = formatPrice(totalSpent);
    } else {
        console.error("Element with ID 'spent-amount' not found.");
    }
}

function displayItems() {
    const itemsDiv = document.getElementById('items');
    itemsDiv.innerHTML = '';

    items.forEach(item => {
        const itemPriceDoubloons = formatPrice(item.priceUSD / usdToDoubloonRate);
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        itemDiv.dataset.name = item.name;
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>Price: ${itemPriceDoubloons} Doubloons</p>
            <p>Quantity: <span id="${item.name}-quantity">${item.quantity}</span></p>
            <div class="item-buttons">
                <button class="buy-button" onclick="buyItem('${item.name}')">Buy</button>
                <button class="sell-button" onclick="sellItem('${item.name}')">Sell</button>
            </div>
        `;
        itemsDiv.appendChild(itemDiv);
    });

    updateTotalDisplay();
    updateSpentDisplay();
}

function buyItem(itemName) {
    const item = items.find(i => i.name === itemName);
    if (item) {
        const itemCostUSD = item.priceUSD;
        if (elonBalance >= itemCostUSD) {
            item.quantity++;
            elonBalance -= itemCostUSD;
            totalSpent += itemCostUSD;
            updateCartBubble();
            displayItems();
            updateTotalDisplay();
        } else {
            alert("Not enough balance to buy this item.");
        }
    }
}

function sellItem(itemName) {
    const item = items.find(i => i.name === itemName);
    if (item) {
        if (item.quantity > 0) {
            item.quantity--;
            elonBalance += item.priceUSD;
            totalSpent -= item.priceUSD;
            updateCartBubble();
            displayItems();
            updateTotalDisplay();
        } else {
            alert("You don't have any of this item to sell.");
        }
    }
}

function updateCartBubble() {
    const cartTotal = document.getElementById('cart-total');
    cartTotal.textContent = convertToDoubloons(totalSpent);
}

function convertToDoubloons(usd) {
    return (usd / usdToDoubloonRate).toFixed(2);
}

function showReceipt() {
    const modal = document.getElementById('receipt-modal');
    const receiptItems = document.getElementById('receipt-items');
    const receiptTotal = document.getElementById('receipt-total-amount');

    receiptItems.innerHTML = '';

    items.forEach(item => {
        if (item.quantity > 0) {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'receipt-item';
            itemDiv.innerHTML = `
                <span>${item.name} x${item.quantity}</span>
                <span>${convertToDoubloons(item.priceUSD * item.quantity)} Doubloons</span>
            `;
            receiptItems.appendChild(itemDiv);
        }
    });

    receiptTotal.textContent = convertToDoubloons(totalSpent);
    modal.style.display = 'flex';
    modal.classList.remove('hidden');
    console.log("Receipt modal shown");
}

document.addEventListener('DOMContentLoaded', () => {
    displayItems();
    updateTotalDisplay();
    updateSpentDisplay();

    const viewCartButton = document.getElementById('view-cart');
    if (viewCartButton) {
        viewCartButton.addEventListener('click', () => {
            console.log("Generate Receipt button clicked");
            showReceipt();
        });
    } else {
        console.error("Element with ID 'view-cart' not found.");
    }

    document.querySelector('.close-button').addEventListener('click', () => {
        const modal = document.getElementById('receipt-modal');
        modal.style.display = 'none';
        modal.classList.add('hidden');
    });

    window.addEventListener('click', (event) => {
        const modal = document.getElementById('receipt-modal');
        if (event.target === modal) {
            modal.style.display = 'none';
            modal.classList.add('hidden');
        }
    });
});

function handleScroll() {
    const totalElement = document.getElementById('total');
    const rect = totalElement.getBoundingClientRect();
    if (rect.top <= 0) {
        totalElement.classList.add('fixed');
    } else {
        totalElement.classList.remove('fixed');
    }
}

window.addEventListener('scroll', handleScroll);