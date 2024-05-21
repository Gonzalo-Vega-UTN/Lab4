
document.addEventListener('DOMContentLoaded', () => { //Se ejecuta una vez que se cargue el DOM
    document.getElementById("search-input").value = "";
    const url = "http://168.194.207.98:8081/tp/lista.php?action=BUSCAR";

    fetch(url)
        .then(response => response.json())
        .then(listUsers => {
            populateTable(listUsers);

        }).catch(error => {
            console.error('Error obteniendo datos del servidor: ', error);
        });
});


document.getElementById("btn_submit").addEventListener("click", function (event) {
    event.preventDefault();
    showErrorMessage("");
        const string = document.querySelector("#search-input").value
    const url = "http://168.194.207.98:8081/tp/lista.php?action=BUSCAR&usuario="+string;

    fetch(url)
    .then(response => response.json())
    .then(listUsers => {
        if(listUsers.length === 0){
            showErrorMessage("No hay resultados");
        }
        populateTable(listUsers);

    }).catch(error => {
        showErrorMessage(error);
        console.error('Error obteniendo datos del servidor: ', error);
    });


});

function populateTable(listUsers){
    let tbody = document.querySelector("#tbody");
    tbody.innerHTML = "";
    listUsers.forEach(user => {
        tbody.appendChild(createUserRow(user));
    })
}

function createUserRow(user){
    const tr = document.createElement('tr');
    Object.values(user).forEach(data => {
        const td = document.createElement('td');
        td.textContent = data;
        tr.appendChild(td);
    });
    const blockUserBtn = document.createElement("button");
    blockUserBtn.innerText = "Bloquear"
    blockUserBtn.onclick = function() {
        block(user);
    };
    const tdBlock = document.createElement("td");
    tdBlock.appendChild(blockUserBtn)
    tr.appendChild(tdBlock);
    const unblockUserBtn = document.createElement("button");
    unblockUserBtn.innerText = "Desbloquear"
    unblockUserBtn.onclick = function() {
        unblock(user);
    };
   
    const tdUnblock = document.createElement("td");
    tdUnblock.appendChild(unblockUserBtn)
    tr.appendChild(tdUnblock);


    updateRowColor(user,tr);
    return tr;

}

function updateRowColor(user,tr){
    if (user.bloqueado === 'Y') {
        tr.classList.add('blocked');
    } else {
        tr.classList.add('unblocked');
    }
}

function block(user) {
    if (user.bloqueado === 'Y') {
        alert("El usuario está bloqueado")
    }else{
        const url = `http://168.194.207.98:8081/tp/lista.php?action=BLOQUEAR&idUser=${user.id}&estado=Y`;
        fetch(url)
            .then(response => {
                document.getElementById("btn_submit").click()
            })
            .catch(error => {
                console.error('Se produjo un error al bloquear al usuario:', error);
            });
    }
   
}

function unblock(user) {
    if (user.bloqueado === 'N') {
       alert("El usuario no está bloqueado")
    } else {
        const url = `http://168.194.207.98:8081/tp/lista.php?action=BLOQUEAR&idUser=${user.id}&estado=N`;
        fetch(url)
            .then(response => {
                document.getElementById("btn_submit").click()
            })
            .catch(error => {
                console.error('Se produjo un error al desbloquear al usuario:', error);
            });
    }
   
}


function showErrorMessage(message) {
    const errorText = document.querySelector("#error-message")
    errorText.innerText = message;
    errorText.style.display = 'block';
  
}