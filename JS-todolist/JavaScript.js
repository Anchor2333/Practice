function newTodo() {
    var li = document.createElement("li");
    li.className = "todo__list-item";
    var inputValue = document.querySelector(".todo__input").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);

    if (inputValue === '') {
        alert("You must write something!");
    } else {
        document.querySelector(".todo__list").appendChild(li);
    }
    document.querySelector(".todo__input").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "todo__list-item--close";
    span.appendChild(txt);
    li.appendChild(span);

    var close = document.getElementsByClassName("todo__list-item--close");
    var i;
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }
}

document.querySelector(".todo__button").addEventListener("click", newTodo);
