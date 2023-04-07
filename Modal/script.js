let modal = document.getElementById("modal");
let open = document.getElementById("open-modal-btn");
let close = document.getElementById("close-modal-btn");
console.log(open);
let overlay = document.getElementById("overlay");

open.addEventListener("click", function () {
  modal.classList.add("open");
  overlay.classList.add("open");
});

close.addEventListener("click", function () {
  modal.classList.remove("open");
  overlay.classList.remove("open");
});

overlay.addEventListener("click", function () {
  modal.classList.remove("open");
  overlay.classList.remove("open");
});
