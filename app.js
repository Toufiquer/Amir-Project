let dQS = (id) => document.querySelector(id)
let itemData = []
let mainData = { itemData }

let getData = () => {
    let data = localStorage.getItem('mainData')
    let mainData
    if (data) {
        mainData = data
    } else {
        mainData = 'empty'
    }
    return mainData
}
// Add item to item Data
let addData = (amount, price, fees) => {
    let quantity = amount / price
    const item = {
        amount: 100,
        price: 92,
        fees: 1.85,
        quantity: 20
    }
    item.amount = amount
    item.price = price
    item.fees = fees
    item.quantity = quantity
    itemData.push(item)
    // printData(item.amount, item.price, item.fees, item.quantity)
    printData(item)
    return item
}
let printData = ({ amount, price, fees, quantity }) => {
    printingToDiv(amount, price, fees, quantity)
}
let printingToDiv = (amount, price, fees, quantity) => {
    const parents = dQS('#parents')
    let div = document.createElement('div')
    div.classList.add('row')
    div.innerHTML = `
        <div class="col-12 m-2">
            <div class="alert alert-primary" role="alert">
                Amount: ${amount} | Price:  ${price} | fees:  ${fees} | Quantity: ${quantity}
                <button type="button" class="btn-close float-end" data-bs-dismiss="alert"
                    aria-label="Close"></button>
            </div>
        </div>
    `
    parents.appendChild(div)
    // console.log(parents)
}
// printData()
// console.log(mainData)
dQS('#calculate').addEventListener('click', () => {
    let amount = dQS('#input-amount').value
    let price = dQS('#input-price').value
    let fees = dQS('#input-fees').value
    // console.log(amount)
    // console.log(price)
    // console.log(fees)
    let array = addData(amount, price, fees)
    // console.log(array)
    // console.log(mainData)
    saveItem()
})
dQS('#clear-data').addEventListener('click', () => {
    localStorage.removeItem('mainData')
    dQS('#parents').textContent = ''
})
let saveItem = () => {
    let allData = JSON.stringify(mainData)
    localStorage.setItem('mainData', allData)
}
let loadData = () => {
    let allData = getData()
    if (allData == "empty") {
        console.log('empty')
    } else {
        loadAndPrint()
    }
    console.log(allData)
}
let loadAndPrint = () => {
    let allData = localStorage.getItem('mainData')
    allData = JSON.parse(allData)

    let items = allData.itemData
    for (let item of items) {
        console.log(item)
        let { amount, price, fees } = item
        addData(amount, price, fees)
    }
}

loadData()