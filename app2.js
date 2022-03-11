let dQS = id => document.querySelector(id);
let getItem = () => {
  let item = localStorage.getItem("mainData");
  let mainData;
  if (item) {
    item = JSON.parse(item);
    mainData = item;
  } else {
    let singleItem = [];
    mainData = { singleItem };
  }
  return mainData;
};
let createId = () => {
  let uniqueId = 0;
  let allData = getItem();
  if (Array.isArray(allData)) {
    let allId = [];
    for (let item of allData) {
      allId.push(item.id);
    }
    while (true) {
      uniqueId++;
      let isGet = allId.indexOf(uniqueId);
      if (isGet == -1) {
        break;
      }
    }
  }
  return uniqueId;
};
let createItem = (amount, price, fees) => {
  let quantity = amount / price;
  quantity = quantity.toFixed(3);
  let id = createId();
  let item = {
    id: id,
    amount: amount,
    price: price,
    fees: fees,
    quantity: quantity,
  };
  return item;
};
let combineData = (data, mainData) => {
  if (Array.isArray(mainData)) {
    mainData.push(data);
  } else {
    mainData = mainData.singleItem;
    mainData.push(data);
  }
  return mainData;
};
let saveData = data => {
  let dataStr = JSON.stringify(data);
  localStorage.setItem("mainData", dataStr);
};
let printingData = (data = true) => {
  let parents = dQS("#parents");
  parents.textContent = "";
  let getData = getItem();
  if (Array.isArray(getData)) {
    dQS("#nodata").style.display = "none";
    for (let item of getData) {
      let div = document.createElement("div");
      div.classList.add("row");
      div.innerHTML = `
        <div class="col-12 m-2">
            <div class="alert alert-primary" role="alert">
                Amount: ${item.amount} | Price:  ${item.price} | fees:  ${item.fees} | Quantity: ${item.quantity}
                <button onclick="deleteDiv('${item.id}')" type="button" class="btn-close float-end" data-bs-dismiss="alert"
                    aria-label="Close"></button>
            </div>
        </div>
    `;
      parents.appendChild(div);
    }
  } else {
    dQS("#nodata").style.display = "block";
    dQS("#nodata-span").innerText = "Ops! Nothing was found.";
    if (data == false) {
      dQS("#nodata-span").innerText = "All Data has been Deleted";
    }
  }
};
dQS("#calculate").addEventListener("click", () => {
  let amount = dQS("#input-amount").value;
  let price = dQS("#input-price").value;
  let fees = dQS("#input-fees").value;
  let data = createItem(amount, price, fees);
  let mainData = getItem();
  let newData = combineData(data, mainData);
  saveData(newData);
  printingData();
});
dQS("#clear-data").addEventListener("click", () => {
  localStorage.removeItem("mainData");
  console.clear();
  dQS("#parents").textContent = "";
  printingData(false);
});
printingData();
