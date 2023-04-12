let form = document.querySelector("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let input = document.querySelector("input");
  let ul = document.querySelector("#list");
  let li = document.createElement("div");
  li.classList.add("list-item");
  li.innerHTML = input.value;
  input.value = "";
  ul.appendChild(li);

  li.addEventListener("click", function () {
    li.remove();
  });
});
