const toggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');
const links = document.querySelectorAll('#menu a');

toggle.addEventListener('click', () => {
  menu.classList.toggle('show');
});

links.forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('show');
  });
});
