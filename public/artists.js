function accessProfile() {
  container.style.display = "none";
  artistpage.style.display = "flex";
}
manager1.addEventListener("click", () => {
  container.style.display = "none";
  artistpage.style.display = "none";
  claimprofile.style.display = "flex";
});
function cont() {
  container.style.display = "none";
  artistpage.style.display = "none";
  claimprofile.style.display = "none";
  usercont.style.display = "flex";
}
goback.addEventListener("click", () => {
  container.style.display = "none";
  artistpage.style.display = "none";
  claimprofile.style.display = "flex";
  usercont.style.display = "none";
});
function next() {
  usercont.style.display = "none";
  claimprofile.style.display = "none";
  searchartist.style.display = "flex";
}
function back() {
  searchartist.style.display = "none";
  usercont.style.display = "flex";
}
