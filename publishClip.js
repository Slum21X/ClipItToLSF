/*jshint esversion: 6 */

function publish(event){
  if (event.target.getAttribute("data-a-target") == "tw-core-button-label-text"){

    let title = document.getElementById("cmgr-title-input").getAttribute("value");

    if (title.length > 0 && title.length <= 100){
      console.log("helloooooooooooooooooooooooo");
    }
  }
}

document.addEventListener("click", publish);
