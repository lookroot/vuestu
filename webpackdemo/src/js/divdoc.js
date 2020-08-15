import logo from "../asserts/img/logo.jpg"
export default function divdoc() {
    // let element = document.createElement("div");
    // element.innerHTML = "webpack init";
    // element.classList.add("init")
    // document.body.appendChild(element);

    let element = document.createElement("img");
    element.src=logo
    document.body.appendChild(element);

}