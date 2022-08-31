document.addEventListener("DOMContentLoaded", function (event) {


    //-------------------fonction principale-------------------//
    //--------------------------------------------------------//
    async function main() {

        let ApiArray = [];

        // Stockage des informations de notre localstorage.
        let localStorageArray = getLocalStorageProduct();

        for (let i = 0; i < localStorageArray.length; i++) {
            ApiArray.push(await GetApi(localStorageArray[i]));
        }

        let AllProducts = ConcatArray(localStorageArray, ApiArray);

        DisplayProduct(AllProducts);

        DisplayTotalPrice(AllProducts);

        Listen(AllProducts);

    }

    main();

    //------------------------Récupération du LocalStorage -----------------------//
    //-------------------------------------------------------------------------//
    function getLocalStorageProduct() {

        //déclaration de variable
        let getLocalStorage = [];
        for (let i = 0; i < localStorage.length; i++) {
            getLocalStorage[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));

        }
        return getLocalStorage;
    }

    //------------------------Récupération de l'API -----------------------//
    //--------------------------------------------------------------------//
    function GetApi(localStorageArray) {

        return fetch("http://localhost:3000/api/products/" + localStorageArray.id)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    //------------------------Récupération du LocalStorage -----------------------//
    //-------------------------------------------------------------------------//
    class ProductClass {
        constructor(id, name, color, qty, alttxt, description, imageurl, price) {
            this.id = id;
            this.name = name;
            this.color = color;
            this.qty = qty;
            this.alttxt = alttxt;
            this.description = description;
            this.imageurl = imageurl;
            this.price = price;
        }
    }

    //----------------Concaténer localStorage et api -----------------------//
    //----------------------------------------------------------------------//
    function ConcatArray(localStorageArray, ApiArray) {

        let AllProducts = [];

        for (let i = 0; i < localStorageArray.length; i++) {

            let ObjectProduct = new ProductClass(
                localStorageArray[i].id,
                ApiArray[i].name,
                localStorageArray[i].color,
                localStorageArray[i].qty,
                ApiArray[i].altTxt,
                ApiArray[i].description,
                ApiArray[i].imageUrl,
                ApiArray[i].price,

            );

            AllProducts.push(ObjectProduct);
        }
        return AllProducts;

    }


    //-------------------Fonction d'affichage des produits-------------------//
    //-----------------------------------------------------------------------//
    function DisplayProduct(AllProducts) {

        for (product of AllProducts) {

            // On stock notre balise Html.
            const domCreation = document.getElementById("cart__items");
            // On push nos nouvels informations dans notre Html.
            domCreation.insertAdjacentHTML(
                "beforeend",
                `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
                <div class="cart__item__img">
                  <img src="${product.imageurl}" alt="${product.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${product.name}</h2>
                    <p>${product.color}</p>
                    <p>${product.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.qty}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
              `
            );
        }
    }

    //-------------------Fonction affichage prix total-------------------//
    //------------------------------------------------------------------//
    function DisplayTotalPrice(AllProducts) {
        // de base 2 variable a 0
        let totalPrice = 0;
        let totalQty = 0;

        for (product of AllProducts) {
            totalPrice += parseInt(product.qty * product.price);
            totalQty += parseInt(product.qty);
        }

        const DtotalQty = document.getElementById("totalQuantity");
        const DtotalPrice = document.getElementById("totalPrice");

        DtotalQty.innerText = totalQty;
        DtotalPrice.innerText = totalPrice;
    }



    //-------------------Fonction principal d'écoute-------------------//
    //----------------------------------------------------------------//
    function Listen(AllProducts) {
        // Fonction si changement dans notre input quantity.
        ecoutequantity(AllProducts);
        // Fonction si on veux supprimer un éléments de la liste.
        ecoutedeleteProduct(AllProducts);
        // Fonction si on veut passer commande
        decouteFormSubmit(AllProducts);


    }

    //-------------------Fonction d'écoute de quantité-------------------//
    //-------------------------------------------------------------------//
    function ecoutequantity(AllProducts) {
        // On récupère l'ensemble des inputs number (changement de quantité des articles) (Renvoie un tableau)
        let qtyinput = document.querySelectorAll(".itemQuantity");

        //On fait une boucle autour de ce tableau (voir boucle foreach)
        qtyinput.forEach(function (input) {
            //On ajoute un évènemnet à chacun des inputs
            input.addEventListener("change", function (inputevent) {
                //A chaque fois que l'utilisateur viens changer la quantité, on execute le code suivant :

                // inputQty vient stocker la valeur que l'utilisateur à rentré dans le formulaire
                let inputQty = inputevent.target.value;

                //InputQtyHtml vient stocker l'élément html (l'input de type number)
                let inputQtyHtml = inputevent.target;

                // cartItemContainerHtml vient stocker le parent le plus proche qui contient la classe "cart__item"
                let cartItemContainerHtml = inputQtyHtml.closest(".cart__item");

                //On va chercher dans le localstorage l'élément qui à le même id et la même couleur que cartItemContainer
                let itemFromLocalStorage = JSON.parse(localStorage.getItem(cartItemContainerHtml.dataset.id + " " + cartItemContainerHtml.dataset.color));

                //On vient mettre à jour la quantité de notre variable, avec la quantité entrée par l'utilisateur
                itemFromLocalStorage.qty = inputQty;


                // On sauvegarde notre variable dans le localstorage
                localStorage.setItem(cartItemContainerHtml.dataset.id + " " + cartItemContainerHtml.dataset.color, JSON.stringify(itemFromLocalStorage));


                //On vient faire une boucle autour de tous les produits (voir ligne 17)
                AllProducts.forEach((item) => {
                    // Si l'item recherché à la même ID et la même couleur
                    if (item.id === cartItemContainerHtml.dataset.id && item.color === cartItemContainerHtml.dataset.color) {
                        //on met à jour la quantité
                        item.qty = inputQty;
                    }
                })

                // On recalcul le total
                DisplayTotalPrice(AllProducts);

            })
        })
    }

    //-------------------Fonction ecoute produit supprimé-------------------//
    //-----------------------------------------------------------------------//

    function ecoutedeleteProduct(AllProducts) {

        // On récupère l'ensemble des bouttons "supprimer" (Renvoie un array)
        let deleteItemButtons = document.querySelectorAll(".deleteItem");

        // On vient faire une boucle autour du tableau
        deleteItemButtons.forEach((deleteItemButton) => {

            //On vient attacher un évènement à chacun des bouton, évènement "click"
            deleteItemButton.addEventListener("click", (event) => {

                let cartItemContainerHtml = event.target.closest(".cart__item");
                localStorage.removeItem(cartItemContainerHtml.dataset.id + " " + cartItemContainerHtml.dataset.color);

                // On utilise la méthode filter, qui permet de supprimer des éléments d'un tableau en fonction des paramètres 
                // On stock ce nouveau tableau dans une variable updatedProducts
                let updatedProducts = AllProducts.filter((item) => item.id !== cartItemContainerHtml.dataset.id && item.color !== cartItemContainerHtml.dataset.color)

                // On met à jours la liste de tous nos produits, avec la liste mise à jour (celle avec l'élément supprimé)
                AllProducts = updatedProducts;

                //On appel la méthode remove, qui s'appelle sur un élément HTML, pour le supprimer du DOM (du document object model, soit, ta page html)
                cartItemContainerHtml.remove();

                //On vient recalculer le total
                DisplayTotalPrice(AllProducts);
            })
        })
    }




    //Fonction pour vérifier la cohérence des données avant de les envoyer au serveur
    //TODO : CHANGER LES ERREURS HEIN
    function verifyData(data) {


        let goldenPath = true;
        if (data.contact.firstName.length <= 0 || !typeof string) {
            document.querySelector('#firstNameErrorMsg').innerHTML = "Veuillez entrer un Prénom valide"
            goldenPath = false;
        }
        if (data.contact.lastName.length <= 0 || !typeof string) {
            document.querySelector('#lastNameErrorMsg').innerHTML = "Veuillez entrer un Nom valide"
            goldenPath = false;
        }
        if (data.contact.address.length <= 0 || !typeof string) {
            document.querySelector('#addressErrorMsg').innerHTML = "Veuillez entrer une adresse valide"
            goldenPath = false;
        }
        if (data.contact.city <= 0 || !typeof string) {
            document.querySelector('#cityErrorMsg').innerHTML = "Veuillez entrer une ville valide"
            goldenPath = false;
        }
        if (data.contact.email <= 0 || !typeof string) {
            document.querySelector('#emailErrorMsg').innerHTML = "Veuillez entrer un email valide"
            goldenPath = false;
        }
        if (data.products.length <= 0) {
            goldenPath = false;
        }


        return goldenPath;
    }

    function decouteFormSubmit(AllProducts) {
        //Je récupère le formulaire 
        const form = document.querySelector('.cart__order__form');

        //Je lui plug un évènement de type submit
        form.addEventListener('submit', async function (e) {

            //On empêche la page de se recharger pour ne pas perdre les données
            e.preventDefault();

            //Je créer le "payload" (l'objet qui va contenir les données)
            const payload = {
                contact: {
                    firstName: document.querySelector('[name="firstName"]').value,
                    lastName: document.querySelector('[name="lastName"]').value,
                    address: document.querySelector('[name="address"]').value,
                    city: document.querySelector('[name="city"]').value,
                    email: document.querySelector('[name="email"]').value
                },
                products: AllProducts.map(product => product.id)
            }

            //Je vérifie si les données sont corrects
            if (verifyData(payload)) {
                //J'envoie l'ordre
                await sendOrder(payload);
            }
        })
    }

    //Fonction d'envoie de commande
    async function sendOrder(payload) {
        // J'utilise la méthode Fetch (en post pour envoyer les data)
        let result = await fetch('http://localhost:3000/api/products/order', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload),
        })
        let data = await result.json();

        //Si le serveur me renvoie un orderId
        if (data.orderId) {
            //Je redirige sur la page confirmation avec l'orderId dans l'URL
            window.location.href = `/front/html/confirmation.html?orderId=${data.orderId}`
        }

    }

});