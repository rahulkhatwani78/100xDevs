let pokemonMaster = [];
const capitalizeFirstLetter = (str) => {
  return String(str).charAt(0).toUpperCase() + String(str).slice(1);
};
const renderPokemonList = () => {
  const pokemonList = document.querySelector("#pokemonList");
  pokemonList.innerHTML = "";
  const defaultOption = document.createElement("option");
  defaultOption.setAttribute("value", "-1");
  defaultOption.innerHTML = "-- Select --";
  pokemonList.appendChild(defaultOption);
  pokemonMaster.forEach((pokemon) => {
    const optionElement = document.createElement("option");
    optionElement.setAttribute("value", pokemon?.name);
    optionElement.innerHTML = pokemon?.name;
    pokemonList.appendChild(optionElement);
  });
};
const updatePokemonList = (pokemons) => {
  pokemons.sort((a, b) => {
    const nameA = a.name.toUpperCase(); // ignore upper and lowercase
    const nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });
  pokemonMaster = [];
  pokemons.forEach(({ name, url }) => {
    pokemonMaster.push({
      name: capitalizeFirstLetter(name),
      url,
    });
  });
  renderPokemonList();
};
const getPokemonMaster = async () => {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon-species?limit=100000"
  );
  if (!response.ok) {
    console.log(err);
    return;
  }
  const json = await response.json();
  updatePokemonList(json.results);
};

getPokemonMaster();

const cardComponent = (pokemonInfo, index, fromGetAllPokemons) => {
  const mainDivElement = document.createElement("div");
  mainDivElement.setAttribute("class", "card");

  const cardNumDiv = document.createElement("div");
  cardNumDiv.innerHTML = `<b>Card No.: </b>${index + 1}`;

  const splittedURL = pokemonInfo?.url?.split('/');
  const idFromURL = pokemonInfo?.url ? splittedURL?.[splittedURL?.length - 2] : '';
  const idDiv = document.createElement("div");
  idDiv.innerHTML = `<b>Pokémon Id: </b>${capitalizeFirstLetter(
    idFromURL || pokemonInfo?.id || "NA"
  )}`;

  const nameDiv = document.createElement("div");
  nameDiv.innerHTML = `<b>Name: </b>${capitalizeFirstLetter(
    pokemonInfo?.name || "NA"
  )}`;

  const colorDiv = document.createElement("div");
  colorDiv.innerHTML = `<b>Color: </b>${capitalizeFirstLetter(
    pokemonInfo?.color?.name || "NA"
  )}`;

  const shapeDiv = document.createElement("div");
  shapeDiv.innerHTML = `<b>Shape: </b>${capitalizeFirstLetter(
    pokemonInfo?.shape?.name || "NA"
  )}`;

  const baseHappinessDiv = document.createElement("div");
  baseHappinessDiv.innerHTML = `<b>Base Happiness: </b>${
    pokemonInfo?.base_happiness || 0
  }`;

  const captureRateDiv = document.createElement("div");
  captureRateDiv.innerHTML = `<b>Capture Rate: </b>${
    pokemonInfo?.capture_rate || 0
  }`;

  mainDivElement.appendChild(cardNumDiv);
  mainDivElement.appendChild(idDiv);
  mainDivElement.appendChild(nameDiv);
  if (!fromGetAllPokemons) {
    mainDivElement.appendChild(colorDiv);
    mainDivElement.appendChild(shapeDiv);
    mainDivElement.appendChild(baseHappinessDiv);
    mainDivElement.appendChild(captureRateDiv);
  }

  return mainDivElement;
};

const renderCards = (pokemons, fromGetAllPokemons) => {
  const pokemonCards = document.querySelector("#pokemonCards");
  pokemonCards.innerHTML = "";
  document.querySelector("#error").innerHTML = "";
  pokemons.forEach((pokemon, i) => {
    const card = cardComponent(pokemon, i, fromGetAllPokemons);
    pokemonCards.appendChild(card);
  });
};

const getPokemonInfo = async () => {
  const numberOfPokemons = document.querySelector("#numberOfCards").value;
  if (numberOfPokemons <= 0 || numberOfPokemons > 1000) {
    document.querySelector("#error").innerHTML =
      "Number of Pokémon Cards must be between 1 to 1000";
    document.querySelector("#pokemonCards").innerHTML = "";
    return;
  }
  const pokemonName = document.querySelector("#pokemonName").value;
  const pokemonSelected = document.querySelector("#pokemonList").value;
  if (pokemonName && pokemonSelected && pokemonSelected !== "-1") {
    document.querySelector("#error").innerHTML =
      "Please either enter the Pokémon name or select it, don't do the both!";
    document.querySelector("#pokemonCards").innerHTML = "";
    return;
  }
  const pokemonConsidered = pokemonName || pokemonSelected;
  const urlForSelectedPokemon = pokemonMaster.filter((pokemon) => {
    return pokemon.name === pokemonConsidered;
  })?.[0]?.url;
  const response = await fetch(urlForSelectedPokemon);
  if (!response.ok) {
    document.querySelector("#error").innerHTML =
      "Please enter/select the correct Pokemon name";
    document.querySelector("#pokemonCards").innerHTML = "";
    return;
  }
  const json = await response.json();
  const pokemons = [];
  for (let i = 0; i < numberOfPokemons; i++) {
    pokemons.push(json);
  }
  renderCards(pokemons);
};
