/*
first way to create the modal effect
all buttons with the same class*/ 
/*
const button = window.document.querySelectorAll(".button");
console.log(button);

//modal overlay div 
const modal_overlay = window.document.querySelector(".modal-overlay");

//modal effect
button.forEach(element => {
    element.addEventListener('click', () => {
        modal_overlay.classList.toggle('active');
    });
});
*/


/*second way to create the modal effect*/
const buttons = window.document.querySelectorAll(".button");//all buttons
const modal_overlay = window.document.querySelector(".modal-overlay");//modal div
//test console.log(buttons);

//object modal
const modal = {
    openOrClose(){
        modal_overlay.classList.toggle('active');
    }
};

//loop to create the effect
buttons.forEach((btn) => {
    btn.addEventListener('click', modal.openOrClose);
});