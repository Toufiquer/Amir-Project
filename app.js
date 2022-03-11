let dQS = (id) => document.querySelector(id)
let itemData = []
let mainData = { itemData }
let clearItemData = () => {
    let length = itemData.length
    for (let i = 0; i <= length; i++) {
        itemData.pop(i)
    }
}
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
let uniqueIdF =()=>{
    let id = 0
    return ()=>{
        return id +=1
    }
}
let uniqueId = uniqueIdF()
let addData = (amount, price, fees) => {
    let quantity = amount / price
    const item = {
        id: 1,
        amount: 100,
        price: 92,
        fees: 1.85,
        quantity: 20
    }
    item.amount = amount
    item.price = price
    item.fees = fees
    item.quantity = quantity
    item.id = uniqueId(1)
    itemData.push(item)
    // printData(item.amount, item.price, item.fees, item.quantity)
    printData(item)
    return item
}
let printData = ({ amount, price, fees, quantity,id }) => {
    printingToDiv(amount, price, fees, quantity,id)
}
let printingToDiv = (amount, price, fees, quantity,id) => {
    quantity = quantity.toFixed(3)
    const parents = dQS('#parents')
    let div = document.createElement('div')
    div.classList.add('row')
    div.innerHTML = `
        <div class="col-12 m-2">
            <div class="alert alert-primary" role="alert">
                Amount: ${amount} | Price:  ${price} | fees:  ${fees} | Quantity: ${quantity}
                <button onclick="deleteDiv('${id}')" type="button" class="btn-close float-end" data-bs-dismiss="alert"
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
let clearAll = ()=>{
    localStorage.removeItem('mainData')
    dQS('#parents').textContent = ''
    clearItemData()
}
dQS('#clear-data').addEventListener('click', () => {
    clearAll()
})
let saveItem = () => {
    let allData = JSON.stringify(mainData)
    localStorage.setItem('mainData', allData)
}
let loadData = () => {
    let allData = getData()
    if (allData == "empty") {
        // console.log('empty')
    } else {
        loadAndPrint()
    }
    // console.log(allData)
}
let loadAndPrint = () => {
    let allData = localStorage.getItem('mainData')
    allData = JSON.parse(allData)

    let items = allData.itemData
    for (let item of items) {
        // console.log(item)
        let { amount, price, fees } = item
        addData(amount, price, fees)
    }
}
loadData()
let deleteDiv = (id)=>{
    let newArray = itemData.filter(x=>x.id!=id)
    console.log(newArray)
    clearAll()
    itemData = [...newArray]
    mainData = { itemData }
    console.log(itemData)
    saveItem()
    dQS('#parents').textContent =''
        loadData()
    // // console.log(itemData,newArray)
}