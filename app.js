// Elementleri Seçme 


const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");
const github = new Github();
const ui = new UI();

eventListeners();

function eventListeners(){
    githubForm.addEventListener("submit",getData);
    clearLastUsers.addEventListener("click",clearAllSearched);
    document.addEventListener("DOMContentLoaded",getAllSearched);
    lastUsers.addEventListener("click",deleteSearched);
}

function getData(e){
    let username = nameInput.value.trim();
    if(username === ""){
        alert("Lütfen geçerli bir kullanıcı adı girin.");
    }
    else{
        github.getGithubData(username)
        .then(response => {
            if(response.user.message=== "Not Found"){
                ui.showError("Kullanıcı Bulunamadı.");
            }
                
            else{
                ui.addSearchedUserToUI(username);
                Storage.addSearchedUserToStorage(username);
                ui.showUserInfo(response.user);
                ui.showRepoInfo(response.repo);
                
            }
               
        })
        .catch(err => ui.showError(err));
    }
    ui.clearInput(); // Input Temizleme
    e.preventDefault();
}

function clearAllSearched(){
    // Tüm arananları temizle
    if(confirm("Emin misiniz ? ")){
        //Silme
        Storage.clearAllSearchedUsersFromStorage(); // Storagedan Temizlicek.
        ui.clearAllSearchedFromUI();
    }
}

function getAllSearched(){
    // Arananları  Storageden al ve Ui'ye ekle
    let users = Storage.getSearchedUsersFromStorage();

    let  result = "";
    users.forEach(user => {
        //<li class="list-group-item">asdaskdjkasjkşdjşasjd</li>
        result += `<li class="list-group-item d-flex justify-content-between">
        <a href ="https://www.github.com/${user}">${user}</a>
            <a href = "#" class="delete-item">
                <i class="fa fa-remove"></i>
            </a>
        </li>`
    });
    lastUsers.innerHTML = result ;
}

function deleteSearched(e){
    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        console.log(e.target.parentElement.parentElement.textContent);
        Storage.deleteSearchedUsersFromStorage(e.target.parentElement.parentElement.textContent);
        ui.showSuccess("Son aranan kişiyi başarıyla sildiniz.");
        
    }
}

