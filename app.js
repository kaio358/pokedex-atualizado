const getTypeColor = type => {
  const normal = '#F5F5F5'
  return {
    normal,
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    ice: '#DEF3FD',
    water: '#DEF3FD',
    ground: '#F4E7DA',
    rock: '#D5D5D4',
    fairy: '#FCEAFF',
    poison: '#98D7A5',
    bug: '#F8D5A3',
    ghost: '#CAC0F7',
    dragon: '#97B3E6',
    psychic: '#EAEDA1',
    fighting: '#E6E0D4'
  }[type] || normal
}

// contagens de scroll
let itemsPorPagina = 15;
let numeroDeItensCarregados = 0;
let cont = 0

const fragment = document.createDocumentFragment()
const pokemon_list = document.querySelector(".pokedex");

function criarTags(poke_array) {
  const card = document.createElement("li")
  card.classList.add("card");
  card.style.setProperty('--type-color',getTypeColor(poke_array[2][0]))
  
  fragment.appendChild(card);

  // tags dentro do card 
  const conteudo_card = [
    {type: "img",classe:"card-image"},
    {type: "h1",classe:"card-title"},
    {type: "h2",classe:"card-subtitle"}]
  
    
  conteudo_card.forEach((child,indice) => {
    const element = document.createElement(child.type);
    element.classList.add(child.classe)
    
    
    if(child.type == "img"){
      element.src = "./assets/img/"+poke_array[1]+".png"
    }
    else{
      if (child.type == "h1") {
        element.innerText =poke_array[indice] +". "+ poke_array[indice -1] 
      }else{
        element.innerText = poke_array[indice]
      }
      
    }
   
    
  
    card.appendChild(element);
  });  

}

async function  apiPokemon() {
  const dados_poke = []
  for(let i = 1;i<=151;i++){
    const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then(T => T.json())
    dados_poke.push(
      {
        nome:pokemon.forms[0].name,
        id:pokemon.id,
        tipo:pokemon.types && pokemon.types.map(element=>element.type.name)
      }
    )

   
  }
   return dados_poke
}



async function main() {
  
  const dados = await apiPokemon();
  const itensIniciais = dados.slice(numeroDeItensCarregados, itemsPorPagina);
  itensIniciais.forEach(element=>{
    let var_array = []
    for(e in element){
      var_array.push(element[e]);
    }
    criarTags(var_array);
    
  }) 
  pokemon_list.append(fragment)
  console.log(numeroDeItensCarregados,itemsPorPagina);
  numeroDeItensCarregados +=15
  itemsPorPagina += 15

  
  
}
main()



window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight ) {
    
    main()
    
  }
});




