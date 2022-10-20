let arr1 = document.querySelectorAll(".h3")
let arr2 = document.querySelectorAll(".a")
for (var i = 0; i < arr1.length; i++) {
  let word = arr1[i].textContent
  arr2[i].setAttribute("href", "/posts/" + word);
}
