const form = document.getElementsByClassName("formLogin")[0].elements;
const loginUrl = "http://localhost:5678/api/users/login";

form["btnLogin"].addEventListener("click", function (event) {
    event.preventDefault();

    fetch(loginUrl, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            email: form.email.value,
            password: form.password.value,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            localStorage.setItem("auth", JSON.stringify(data));
            const auth = JSON.parse(localStorage.getItem("auth"));
            if (auth && auth.token) {
                window.location = "index.html";
            } else {
                console.log("error");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
});

const logout = document.querySelector('[href="login.html"]');
let filtres = null;

function recuperationToken() {
    const authData = JSON.parse(localStorage.getItem("auth"));
    if (authData && authData.token) {
        return authData.token;
    } else {
        return null;
    }
}

function isConnected() {
    const connected = recuperationToken() ? true : false;
    return connected;
}

if (isConnected()) {
    logout.textContent = "logout";
    logout.setAttribute("href", "#");
    const buttonsContainer = document.getElementById("buttonsContainer");
    const banner = document.getElementById("banner");
    buttonsContainer.style.display = "none";
    banner.style.display = "flex";

    logout.addEventListener("click", () => {
        localStorage.removeItem("auth");
        window.location.reload();
    });
}
