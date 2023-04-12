document.addEventListener("click", (e) => {
  if (e.target.classList.contains("expand-button")) {
    const button = e.target;
    button.innerText = button.innerText === "Expand" ? "Collapse" : "Expand";
    const li = button.closest(".card").querySelector(".card-body");
    if (li.classList.contains("show")) {
      li.classList.remove("show");
    } else {
      li.classList.add("show");
    }
  }
});
