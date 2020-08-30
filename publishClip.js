
function publish(event){
  if (event.target.getAttribute("data-a-target") == "tw-core-button-label-text"){
    console.log("helloooooooooooooooooooooooo");
  }
}

document.addEventListener("click", publish);
