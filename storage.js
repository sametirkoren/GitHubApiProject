class Storage{
    static getSearchedUsersFromStorage(){
        // Tüm kullanıcı al
        let users ; 

        if(localStorage.getItem("searched") === null ){
            users = [];
        }
        else{
            users = JSON.parse(localStorage.getItem("searched"));
        }
        return users;
    }
    static addSearchedUserToStorage(username){
        // Kullanıcı Ekle

        let users = this.getSearchedUsersFromStorage();

        // Indexof

        if(users.indexOf(username) === -1){
            users.push(username);
        }
        localStorage.setItem("searched",JSON.stringify(users));
    }
    static clearAllSearchedUsersFromStorage(){
        // Tüm kullanıcıları sil
        localStorage.removeItem("searched");
    }

    static deleteSearchedUsersFromStorage(deleteSearched){

        let users = this.getSearchedUsersFromStorage();
        
        users.forEach(function(user,index){
            if(user === deleteSearched){
                users.splice(index,1);
            }
        });
        localStorage.setItem("searched",JSON.stringify(users));
    }
}