let dQS = (id) => document.querySelector(id)
let itemData = []
let mainData = { itemData }

// Add item to item Data
let addData = (amount, price, fees) => {
    const item = {
        amount: 100,
        price: 92,
        fees: 1.85
    }
    item.amount = amount
    item.price = price
    item.fees = fees
    itemData.push(item)
    printData()
    return item
}
let printData = () => {
    printingToDiv()
}
let printingToDiv = () => {
    const parents = dQS('#parents')
    let div = document.createElement('div')
    div.classList.add('row')
    div.innerHTML = `
        <div class="col-12 m-2">
            <div class="alert alert-primary" role="alert">
                Amount: $ {amount} | Price:  $ {price} | fees:  $ {fees} | Quantity: $ {quantity}
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
    console.log(array)
    console.log(mainData)
})