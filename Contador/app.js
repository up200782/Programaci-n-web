let containerClicks = document.getElementById('container-clicks');
let btnIncrement = document.querySelector('.btn-primary');
let btnDecrement = document.querySelector('.btn-secondary');
let btnReset = document.querySelector('.btn-reset');
let count = 0;

document.addEventListener('DOMContentLoaded', () => {
  
    containerClicks.innerText = count;

  btnIncrement.addEventListener("click", function() {
    count++;
    containerClicks.innerText = count;
  });

  btnDecrement.onclick = function() {
    if (count > 0) {
      count--;
      containerClicks.innerText = count;
    } else {
      alert("Ya es cero, mijo");
    
    }
  };

  btnReset.addEventListener("click", () => {
    count = 0;
    containerClicks.innerText = count;
  });
});