//Abrir e fechar menu mobile
let btnMenu = document.getElementById('btn-menu')
let menuMobile = document.getElementById('menu-mobile')
let overlay = document.getElementById('overlay-menu')

btnMenu.addEventListener('click', ()=>{
    menuMobile.classList.add('abir-menu')
})

menuMobile.addEventListener('click', ()=>{
    menuMobile.classList.remove('abir-menu')
})

overlay.addEventListener('click', ()=>{
    menuMobile.classList.remove('abir-menu')
})


//header subindo
document.addEventListener("scroll", function() {
    const header = document.getElementById("header");

    if (window.scrollY > 200) {
        header.style.backgroundColor = "#003B30";
    } else {
        header.style.backgroundColor = "transparent";
    }
});