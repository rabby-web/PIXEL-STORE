let dataSet;
fetch("./data.json")
.then(res => res.json())
.then((data) => {
  dataSet = data;
  displayData(data)
});
console.log(dataSet)


// const phoneData = async () => {
//   const res = await fetch("../data.json");
//   const data = await res.json();
//   displayData(data);
// }
// phoneData();

function displayData(data){
    const cardContainer = document.getElementById('homepage-content');
    data.forEach(element => {
        // console.log(element);
        const {id, img, price, name} = element;
        const divContainer = document.createElement('div');
        divContainer.classList.add("card", "bg-base-100", "shadow-2xl")
        divContainer.innerHTML = `
        <div class="p-3">
          <figure><img src="${img}" class="rounded-xl" alt="Shoes" /></figure>
        </div>
        <div class="card-body">
          <div class="flex justify-between">
            <h2 class="card-title">${name}</h2>
            <div>
              <span><i class="fa-solid fa-heart text-slate-700 mr-2"></i></span>
              <span><i class="fa-regular fa-square-minus text-red-600"></i></span>
            </div>
          </div>
          
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <h2 class="text-lg">Price: <span>${price}</span></h2>
          <div class="secondary flex justify-between">
            <label onclick="handleModal('${id}')" for="my-modal-3" class="btn btn-primary btn-outline"><i class="fa-solid fa-circle-info mr-2"></i>Details</label>
            <button onclick="handleByNow('${id}')" class="btn btn-secondary btn-outline"><i class="fa-solid fa-bag-shopping mr-2"></i>Buy Now</button>
          </div>
        </div>
        `;
        cardContainer.appendChild(divContainer);
    })
}
function handleModal(id){
  const product = dataSet.find((item) => item.id === id);
  const {name, price, img} = product;
  const modalContainer = document.getElementById("modal-info");
  modalContainer.innerHTML = `
    <div class="modal-box relative">
        <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">???</label>
        <div class="py-4">
          <figure><img src="${img}" class="rounded-xl" alt="Shoes" /></figure>
          <h1 class="text-2xl"><span class="text-violet-700">Product:</span> ${name}</h1>
          <p class="text-lg text-gray-500">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam ab error architecto molestias sint assumenda, tenetur fuga nam accusamus qui rerum veniam, numquam animi aliquid magnam consequatur, nihil ad tempora.</p>
          <h1 class="text-2xl text-violet-700">Feature:</h1>
          <p class="text-lg text-gray-500">Feature01, Feature03, Feature03</p>
          <h1 class="text-2xl"><span class="text-violet-700">Price:</span> ${price}</h1>
        </div>
      </div>
  `;
  product.appendChild(modalContainer)
}
let count = 0;
let newPrice = 0;
let tax = 0;
let total = 0;
function handleByNow(id){
  // count++
  count = count + 1;
  const product = dataSet.find((item) => item.id === id);
  const {name, price, img} = product;
  newPrice = newPrice + product.price; 
  tax = newPrice * 0.1;
  total = newPrice + tax;
  const cardContainer = document.getElementById('card-item-container');
  const div = document.createElement('div');
  div.innerHTML = `
    <div class="bg-slate-500 rounded-lg border-[2px] border-slate-900 flex items-center justify-between px-1">
      <img src="${img}" class="w-[15%] p-1" alt="Shoes" />
      <p>${name}</p>
      <p class="border-[2px] rounded-lg px-[10px] py-[1px]">1</p>
      <i class="fa-solid fa-trash  text-red-500 text-xl p-1 cursor-pointer"></i>
    </div>
  `;
  cardContainer.appendChild(div);
  document.getElementById('badge-count').innerText = count;
  document.getElementById('badge-count-sm').innerText = count;
  document.getElementById('product-count').innerText = count;
  document.getElementById('price').innerText = newPrice.toFixed(2);
  document.getElementById('tax-count').innerText = tax.toFixed(2);
  document.getElementById('total').innerText = total.toFixed(2);

}
function handleClear(){
  document.getElementById('card-item-container').innerHTML = '';
}
// ------------