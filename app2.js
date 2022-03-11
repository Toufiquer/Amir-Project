let dQS = (id) => document.querySelector(id)
let getItem = ()=>{
    let item = localStorage.getItem('mainData')
    let mainData
    if(item){
        mainData = item
    }else{
        let singleItem = []
        mainData = {singleItem}
    }
    return mainData
}
let createItem= (amount, price, fees)=>{
    let singleIndex={
        amount: 100,
        price: 20,
        fees: 10,
        quantity: 5
    }
    singleIndex.amount = amount
    singleIndex.price = price
    singleIndex.fees = fees
    singleIndex.quantity = amount / price
    return singleIndex
}
let addToArray =(item,mainData)=>{

}
let singleOfIndex = createItem(100,10,10)
let mainData = getItem()
console.log(mainData.singleItem.push(singleOfIndex))
console.log(mainData)