document.getElementById("sun").onclick = () => {
    document.body.style.backgroundColor = "pink";
}
document.getElementById("moon").onclick = () => {
    document.body.style.backgroundColor = "#181a1b";
    let array = ["fa-regular fa-sun", "fa-regular fa-moon"];
    document.getElementById("moon").firstChild.className = array[index];
    index = (index + 1) % array.length;
}

let index = 1;
document.getElementById("test").onclick = () => {
    let array = ["pink", "white", "#181a1b"];
    document.body.style.backgroundColor = array[index];
    index = (index + 1) % array.length;
}