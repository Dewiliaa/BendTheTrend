const select = document.getElementById("select-reaction");
const reaper = document.querySelector(".grim-reaper");

select.addEventListener("change", () => {
  reaper.dataset.reaction = select.value;
});
