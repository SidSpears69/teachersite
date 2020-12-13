"use strict";
const button = document.querySelectorAll(".menu__dropdown-button");
button.forEach(function(item){
  item.addEventListener('click', function(){
    this.getAttribute("aria-expanded") == "false" ? this.setAttribute("aria-expanded", "true") : this.setAttribute("aria-expanded", "false");
  })
})
