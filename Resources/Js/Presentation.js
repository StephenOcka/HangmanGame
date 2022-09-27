let byline = document.getElementById("byLine");
let bylineText = byline.innerHTML;
let bylineArr = bylineText.split("");
byline.innerHTML = "";
for(i=0;i<bylineArr.length;i++)
{
  let span = document.createElement("span");
  let letter = document.createTextNode(bylineArr[i]);
  if(bylineArr[i] == " ") {
  byline.appendChild(letter);
  } else {
  span.appendChild(letter);
  byline.appendChild(span);
  }
}
setTimeout(function()
{
  window.location = "Resources/Pages/Home.html";
}, 9000);