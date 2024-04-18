let input = document.querySelector('input');
let button = document.querySelector('button');
let frontImg = document.querySelector('.front');
let backImg = document.querySelector('.back');
let pokemonName = document.querySelector('.PokemonName');
let typeTag = document.querySelector('.type');
let imgPokemons = document.querySelectorAll('.mainInfo img');
let recommendBox = document.querySelector('.recommend');

async function getPokemonInfo(searchValue) {
    let dataPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchValue}`).then(res=>res.json());
    let Pokemon = await fetch(dataPokemon.forms[0].url).then(res => res.json());
    let typesPokemon = Pokemon.types;

    frontImg.src = Pokemon.sprites.front_default;
    backImg.src = Pokemon.sprites.back_default;
    pokemonName.innerText = `Name: ${Pokemon.pokemon.name}`;

    let typePokemon = typesPokemon.reduce((textType, typePoke, index) => {
        return textType + `${typePoke.type.name}${(index == typesPokemon.length-1) ? '':', '}`;
    }, 'Type: ');
    
    imgPokemons.forEach(imgPokemon => {
        imgPokemon.setAttribute('style', 'display: block');
    });
    typeTag.innerText = typePokemon;
};

async function suggestBox(search) {
    let namesPokemon = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0').then(res=>res.json());
    let recommendUl = recommendBox.querySelector('ul');
    recommendUl.innerHTML = '';
    namesPokemon.results.forEach(pokemon => {
        if (pokemon.name.startsWith(search)) {
            recommendUl.innerHTML += `<li onclick='input.value=this.innerText; input.focus()'>${pokemon.name}<li>`;
        };
    });
};

function renderPokemonInfo() {
    let validateValue = input.value.trim();
    getPokemonInfo(validateValue);
    input.value = '';
}

input.addEventListener('keyup', function() {
    if (input.value !== '') {
        recommendBox.setAttribute('style', 'display: block');
        suggestBox(input.value);
    } else {
        recommendBox.setAttribute('style', '');
    }
});

button.addEventListener('click', function(e) {
    renderPokemonInfo();
    recommendBox.setAttribute('style', '');
});

document.addEventListener('keypress', function(e) {
    if (e.code === 'Enter') {
        renderPokemonInfo();
    }
});

// setTimeout(() => {
//     console.log(1);
// }, 2000);
// setTimeout(() => {
//     console.log(2);
// }, 5000);
// setTimeout(() => {
//     console.log(3);
// }, 3000);
// setTimeout(() => {
//     console.log(4);
// }, 1000);
// let printData = (data, clock) => {
//     return new Promise ((res, rej) => {
//         setTimeout(() => {
//             res(data);
//         }, clock)
//     }) 
// }
// //call back
// printData(1, 2000, (d) => {
//     console.log(d);
//     printData(2, 5000, (d) => {
//         console.log(d);
//         printData(3, 3000, (d) => {
//             console.log(d);
//             printData(4, 1000, (d) => {
//                 console.log(d);
//             })
//         })
//     })
// })

// //promise
// printData(1, 2000)
//     .then(data => {
//         console.log(data);
//         return printData(2, 5000);
//     })
//     .then(data => {
//         console.log(data);
//         return printData(3, 3000);
//     })
//     .then(data => {
//         console.log(data);
//         return printData(4, 1000);
//     })
//     .then(data => {
//         console.log(data);
//     })

// //async, await
// async function printD() {
//     await printData(1, 2000).then(data => console.log(data));
//     await printData(2, 5000).then(data => console.log(data));
//     await printData(3, 3000).then(data => console.log(data));
//     await printData(4, 1000).then(data => console.log(data));
// }
// printD();



