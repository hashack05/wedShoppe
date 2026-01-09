
let foodList = [
    { name: "ข้าวผัด", type: "จานเดียว", price: 45, img: "rice.png" },
    { name: "ผัดกะเพรา", type: "จานเดียว", price: 50, img: "kaponr.jpg" },
    { name: "ต้มยำกุ้ง", type: "ของแกง", price: 120, img: "toyumgu.jpg" },
    { name: "แกงเขียวหวาน", type: "ของแกง", price: 80, img: "green.jpg" },
    { name: "ส้มตำ", type: "ยำ", price: 40, img: "tamtam.jpg" },
    { name: "ลาบหมู", type: "ยำ", price: 60, img: "krua.jpg" },
    { name: "ผัดไทย", type: "ก่วยเตี๋ยว", price: 50, img: "padthai.jpg" },
    { name: "ก่วยเตี๋ยวเนื้อ", type: "ก่วยเตี๋ยว", price: 55, img: "noodle.jpg" },
    { name: "ข้าวมันไก่", type: "จานเดียว", price: 50, img: "ricemann.jpg" },
    { name: "ข้าวหมูกรอบ", type: "จานเดียว", price: 55, img: "mugrob.jpg" },
    { name: "ผัดซีอิ๊ว", type: "จานเดียว", price: 45, img: "C.jpg" },
    { name: "ข้าวต้มปลา", type: "จานเดียว", price: 60, img: "ricetum.jpg" },
    { name: "แกงจืดเต้าหู้", type: "ของแกง", price: 40, img: "j.jpg" },
    { name: "ผัดผักบุ้งไฟแดง", type: "ผัด", price: 40, img: "puk.jpg" },
    { name: "ไก่ทอด", type: "ทอด", price: 70, img: "FriedChicken.jpg"},
    { name: "ปลาทอด", type: "ทอด", price: 90, img: "riedfish.jpg" },
    { name: "ยำวุ้นเส้น", type: "ยำ", price: 50, img: "Noodle spicy.jpg"},
    { name: "ข้าวเปล่า", type: "ข้าว", price: 10, img: "r.jpg" },
    { name: "น้ำเปล่า", type: "เครื่องดื่ม", price: 10, img: "warter.jpg" },
    { name: "น้ำอัดลม", type: "เครื่องดื่ม", price: 20, img: "CocaCORA.jpg"  }
];

let shopList = [];
function displayFoods(list = foodList){
    const foodListDiv = document.getElementById("foodList");
    foodListDiv.innerHTML = ""; // ล้างรายการเก่าออกก่อน
       list.forEach((item) => {
        const originalIndex = foodList.findIndex(f => f.name === item.name);
        
        const food = document.createElement("div");
        food.innerHTML = `
        <div class="flex flex-col shadow-lg gap-4">
            <div class="flex items-center gap-3 mt-5"> 
                <img src="${item.img}" class="w-16 h-16 object-cover rounded-lg shadow-sm ml-3">
                <div class="flex flex-col">
                    <span class="font-bold text-gray-800">${item.name}</span>
                    <span class="text-xs text-gray-500">${item.type} | ราคา ${item.price}.-</span>
                </div>
            </div>
            <div class="flex gap-4 m-3">
                <button onclick="order(${originalIndex})"
                    class="bg-blue-500 text-white px-3 py-1 w-full rounded-md shadow hover:bg-blue-700 transition active:scale-95">
                    <b>+ เพิ่มลงตะกร้า</b>
                </button>
            </div>
        </div>
        `;
        foodListDiv.appendChild(food);
    });
}

function displayshop(){
    const cartListDiv = document.getElementById("cartList");
    const totalPriceDiv = document.getElementById("totalPrice");
    const totalMenu = document.getElementById("totalMenu");
    const totalshop = document.getElementById("totalshop");
    cartListDiv.innerHTML = "";
    let total = 0;
    let totalM = 0;
    let totals = 0;
    shopList.forEach((item, index) => {
       total += item.price * item.quantity;
       totalM += 1;
       totals += item.quantity;
       const food = document.createElement("div");
       food.innerHTML = `
        <div class="flex flex-col shadow-lg gap-4">
            <div class="flex items-center gap-3 mt-5"> 
                <img src="${item.img}" class="w-16 h-16 object-cover rounded-lg shadow-sm ml-3">
                <div class="flex flex-col">
                    <span class="font-bold text-gray-800">${item.name}</span>
                    <span class="text-xs text-gray-500">${item.type} | ราคา ${item.price}.- |<span class="text-blue-700 text-lg"><b>x${item.quantity}</b></span></span>
                </div>
            </div>
            <div class="flex sm-16 gap-4 m-3">
                <button onclick="reduce(${index})"
                    class="bg-blue-500 text-white px-3 py-1 w-full rounded-md shadow hover:bg-blue-700 transition active:scale-95">
                    <b>ลด</b>
                </button>
                <button onclick="deleted(${index})"
                    class="bg-gray-300 text-black px-3 py-1 w-full rounded-md shadow hover:bg-gray-700 hover:text-white   transition active:scale-95">
                    <b>ลบ</b>
                </button>
            </div>
        </div>
        `;
       cartListDiv.appendChild(food);
    });
    if (totalPriceDiv) {
        totalPriceDiv.innerText = total.toLocaleString() + ".-";
    }
    if (totalMenu) {
        totalMenu.innerText = totalM.toLocaleString();
    }
    if (totalshop) {
        totalshop.innerText = totals.toLocaleString();
    }
}

function order(index){
    let food = foodList[index];
    let itemInCart = shopList.find(item => item.name === food.name);
    if (itemInCart) {
        itemInCart.quantity += 1;
        console.log(`เพิ่มจำนวน ${food.name} เป็น ${itemInCart.quantity}`);
    } else {
        shopList.push({ ...food, quantity: 1 });
        console.log(`เพิ่ม ${food.name} ลงในตะกร้าครั้งแรก`);
    }
    // อัปเดตการแสดงผลตะกร้า
    displayFoods();
    displayshop();
}
function deleted(index){
    shopList.splice(index,1)
    displayshop();
}
function reduce(index){
    if (shopList[index].quantity > 1) {
        shopList[index].quantity -= 1;
    } else {
        shopList.splice(index, 1);
    }
    displayshop();
}
function clearMenu() {
    if (confirm("ต้องการล้างตะกร้าทั้งหมดใช่หรือไม่?")) {
        shopList = [];
        displayshop();
    }
}
function confirmMenu() {
    if (confirm("ต้องการสั่งซื้อเมนูทั้งหมดใช่หรือไม่?")) {
        shopList = [];
        displayshop();
    }
}
function searchFood() {
    // 1. ดึงคำที่พิมพ์ออกมา และเปลี่ยนเป็นตัวพิมพ์เล็ก (เพื่อให้ค้นหาง่ายขึ้น)
    const searchText = document.getElementById("searchInput").value.toLowerCase();

    // 2. กรองข้อมูลใน foodList ให้เหลือเฉพาะที่มีชื่อตรงกับที่พิมพ์
    const filteredFoods = foodList.filter(item => {
        return item.name.toLowerCase().includes(searchText);
    });

    // 3. เรียกฟังก์ชันแสดงผลใหม่ โดยส่งข้อมูลที่กรองแล้วไปให้ (ต้องปรับ displayFoods นิดหน่อย)
    displayFoods(filteredFoods);
}
// เรียกใช้ฟังก์ชันเมื่อโหลดหน้าเว็บเสร็จ
window.onload = function() {
    displayFoods();
    displayshop();

}
