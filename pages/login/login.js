/**
 * Define all DOM elements
 */
const usernameInput = document.querySelector('.username');
const passwordInput = document.querySelector('.password');
const loginBtn = document.querySelector('.login-btn');
const usernameErrorMessage = document.querySelector('.username-error-message');
const passwordErrorMessage = document.querySelector('.password-error-message');
const wrongErrorMessage = document.querySelector('.wrong-credentials-error');


/**
 * Define all listeners
 */
loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (usernameInput.value.trim() == "" && passwordInput.value.trim() == "") {
        usernameErrorMessage.style.opacity = 1;
        passwordErrorMessage.style.opacity = 1;
    }
    if (usernameInput.value.trim() == "" && passwordInput.value.trim() != "") {
        usernameErrorMessage.style.opacity = 1;
        passwordErrorMessage.style.opacity = 0;
    }
    if (usernameInput.value.trim() != "" && passwordInput.value.trim() == "") {
        usernameErrorMessage.style.opacity = 0;
        passwordErrorMessage.style.opacity = 1;
    }
    if (usernameInput.value.trim() != "" && passwordInput.value.trim() != "") {
        findUserNameAndPassword();
    }
})

/**
 * define all functions
 */
const findUserNameAndPassword = () => {
    axios.get('https://onboarding-ta27.herokuapp.com/v1/user/findUserByUseridAndPassword',{params: {
        userid: usernameInput.value.trim(), 
        password: passwordInput.value.trim()
    }})
    .then(result => {
        usernameErrorMessage.style.opacity = 0;
        passwordErrorMessage.style.opacity = 0;
        if (result.data.status === 200) {
            sessionStorage.setItem('loggedIn', true);
            window.location.href = '../../index.html';
        }       
    }).catch((error) => {
        wrongErrorMessage.style.opacity = 1;
    });
}