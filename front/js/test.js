/* Une fonction qui prend en parametre un objet de type voiture, cette voiture a des km, une couleur, une marque, Cv, cette fonction devra afficher la couleur de la voiture */

const voiture = {
    color: 'red',
    km: 200000,
    brand: 'Toyota',
    cv: 250,
}

function carColor(car) {
    console.log(car.color);
}

/*Fonction fléchée :
const carColor2 = voiture => {
    console.log(voiture.color);
} */

carColor(voiture);

//Type de données : 
const txt = 'blabla';
const nbre = 200;
const obj = {};
const array = [];
const booleens = true || false;


//Faire une fonction qui prend en paramètre un âge et qui renvoie si la personne est majeure ou mineure
const isMajor = age => {
    if (age >= 18) {
        console.log('Il est majeur');
    } else {
        console.log('Il est mineur');
        console.log("L'utilisateur a : ", age);
        console.log("Modification de l'âge...");
        //Si l'âge rentré dans la fonction est inférieure à 18, je veux que tu m'affiche combien il manque à l'âge pour arriver à 18
        console.log(18 - age);
        let ageManquant = 18 - age;
        console.log("L'utilisateur a maintenant :", age + ageManquant);
        console.log("Utilisateur modifié avec succès, il est majeur");
    }
}

isMajor(12);

/*Faire une fonction qui prend en parametre une arme (uniquement 'r301' ou 'flatline') qui est un texte et qui renvoie si c'est des munitions légères ou lourdes
const typeOfMunitions = arme => {
    if (arme == 'R301') {
        console.log('Munitions légères');
    } else {
        console.log('Munitions lourdes');
    }
}*/

/*const typeOfMunitions = arme => {
    switch (arme) {
        case 'R301':
            console.log('Munitions légères');
            break;

        case 'Flatline':
            console.log('Munitions lourdes');
            break;

        case 'EVA8':
            console.log('Munitions de fusil à pompe');
            break;

        case 'Havoc':
            console.log('Munitions énergétique');
            break;

        case 'ARC':
            console.log('Flèches');
            break;

        case 'Longbow':
            console.log('Munitions de fusil de précision');
            break;

        default:
            console.log('Valeur par défaut');
    }
}

typeOfMunitions('Nathalie');*/

const typeOfMunitions = arme => {
    let armeLegere = ['R301', 'R99', 'RE45'];
    let armeLourde = ['Flatline', '30-30', 'Car'];
    let armeDePrecision = ['Longbow', 'Wingman', 'Sentinel'];

    //Faire un algorythme soit if else soit switch - utiliser la methode include pour afficher les bonnes munitions
    if (armeLegere.includes(arme)) {
        console.log('Munitions légères');
    } else if (armeLourde.includes(arme)) {
        console.log('Munitions lourdes');
    } else if (armeDePrecision.includes(arme)) {
        console.log('Munitions de précision');
    } else {
        console.log('Frerot, donne moi une arme qui existe');
    }

    /*
    case armeLegere.includes(arme):
        console.log('Munitions légères');

    default:
        console.log('Valeur par défaut');
}*/

}
typeOfMunitions('vezfz');


let tableau = [1, 2, 3, 4, 'lol'];
console.log(tableau[3]);

//Rappel : travailler les boucles et les tableaux