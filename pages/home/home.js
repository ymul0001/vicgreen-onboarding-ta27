/**
 * Define all query selectors
 */
const nav = document.querySelector('.nav')
const factValues = document.querySelectorAll('.facts-number');


/**
 * Define all variables
 */
 const speed = 200;


/**
 * Define all functions
 */
function fixNav() {
    if(window.scrollY > nav.offsetHeight + 150) {
        nav.classList.add('active')
    } else {
        nav.classList.remove('active')
    }
}

const onLoadCheckCredentials = () => {
    if (sessionStorage.getItem('loggedIn') === null) {
        window.location.href = "./pages/login/login.html";
    }    
}

/**
 * call functions
 */
window.addEventListener('scroll', fixNav);


//call functions
onLoadCheckCredentials();



