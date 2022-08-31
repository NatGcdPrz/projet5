document.addEventListener("DOMContentLoaded", function () {

    async function main() {

        //Je récupère la balise P pour afficher le numéro de commande 
        const orderIdContainer = document.querySelector('#orderId');

        //Je récupère le paramètre dans l'URL
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const orderId = urlParams.get('orderId');

        //Je vérifie si j'ai bien un order ID
        if (orderId) {
            //J'insière l'order id dans le html
            orderIdContainer.innerHTML = orderId;
            //Je supprime le localstorage
            localStorage.clear();
        }
        else {
            //Si je passe ici, c'est que mon utilisateur s'est rendu sur la page sans orderId, je le redirige donc sur la page d'accueil
            window.location.href = '/front/html/index.html';
        }
    }


    main();
});