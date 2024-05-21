document.getElementById("btn_submit").addEventListener("click", function (event) {
    event.preventDefault()

    validateUser();
});

function validateUser() {
    const user = document.querySelector("#txt_user").value;
    console.log(user);
    const pass = document.querySelector("#txt_password").value;
    const url = `http://168.194.207.98:8081/tp/login.php?user=${user}&pass=${pass}`;
    fetch(url)
        .then(response => response.json()
        )
        .then(data => {
            if (data.respuesta === "ERROR") {
                showErrorMessage(data.mje);
            }else if(data.respuesta === "OK"){
                window.location.href = 'lista.html';
            }
        })
        .catch(error => {
            // Capturar y manejar errores
            console.error('Se produjo un error:', error);
        });
}

function showErrorMessage(message) {
    const errorText = document.querySelector("#error-message")
    errorText.innerText = message;
    errorText.style.display = 'block';
    //Mensaje desaparece luego de unos segundos
    setTimeout(function () {
        errorText.style.display = 'none';
    }, 2000); // 2 segundos
}