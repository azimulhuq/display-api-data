/* ################# Navigation Section ################# */

window.addEventListener("scroll", () => {
  const activePage = window.location.pathname;

  document
    .querySelector("header")
    .classList.toggle("window-scroll", window.scrollY > 0);

  document.querySelectorAll("nav ul li a").forEach((link) => {
    if (link.href.includes(`${activePage}`)) {
      link.classList.add("active");
    }
  });
});

/* ################# Render Peoples, Films & Vehicles Module on index.html ################# */

const homeModules = [
  "https://swapi.dev/api/people/",
  "https://swapi.dev/api/films/",
  "https://swapi.dev/api/vehicles/",
];

async function renderModulesOnHome(url, limit) {
  let message = "";

  if (url.split("/").at(-2) === "people") {
    message =
      "There was a problem with fetching the peoples module content in home page.";
  } else if (url.split("/").at(-2) === "films") {
    message =
      "There was a problem with fetching the films module content in home page.";
  } else {
    message =
      "There was a problem with fetching the vehicles module content in home page.";
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    getModulesOnHome(data, limit);
  } catch (error) {
    console.log(message);
  }
}

function getModulesOnHome(modules, limit) {
  let html = "";
  let homeModuleHeading = "";
  let sectionContainer = "";
  let htmlPage = "";
  let componentArrayName = "";
  let segment = "";
  let sectionsegment = "";

  modules.results.forEach((moduleHome) => {
    if (moduleHome.url.split("/").at(-3) === "people") {
      componentArrayName = moduleHome.films;
      segment = `
          <article class="people h-people">
            <h3>${moduleHome.name}</h3>
            <p><strong>Height: </strong>${moduleHome.height}</p>
            <p><strong>Hair Color: </strong>${moduleHome.hair_color}</p>
            <p><strong>Birth Year: </strong>${moduleHome.birth_year}</p>
            <p><strong>Gender: </strong>${moduleHome.gender}</p>
            <p><strong>Films: </strong><span class="link-film">${getElements(
              moduleHome.films
            )}</span></p>
            <p><strong>Vehicles: </strong><span class="link-vehicle">${
              moduleHome.vehicles.length > 0
                ? getElements(moduleHome.vehicles)
                : "N/A"
            }</span></p>
          </article>
        `;
      sectionContainer = document.querySelector("#render-people");
      homeModuleHeading = "Peoples";
      htmlPage = "peoples";
    } else if (moduleHome.url.split("/").at(-3) === "films") {
      componentArrayName = moduleHome.vehicles;
      segment = `
          <article class="movie h-movie">
              <h3>${moduleHome.title}</h3>
              <p><strong>Director: </strong>${moduleHome.director}</p>
              <p><strong>Producer: </strong>${moduleHome.producer}</p>
              <p><strong>Release Date: </strong>${moduleHome.release_date}</p>
              <p><strong>Plot: </strong>${moduleHome.opening_crawl
                .slice(0, 150)
                .concat("...")}</p>
              <p class="fav-char"><strong>Characters: </strong><span class="film">${getElements(
                moduleHome.characters.slice(0, 8).map((char) => {
                  return char;
                })
              )}</a></span></p>
          </article>        
        `;
      sectionContainer = document.querySelector("#render-film");
      homeModuleHeading = "Films";
      htmlPage = "films";
    } else {
      componentArrayName = moduleHome.films;
      segment = `
          <article class="vehicle h-vehicle">
              <h3>${moduleHome.name}</h3>
              <p><strong>Model: </strong>${moduleHome.model}</p>
              <p><strong>Manufacturer: </strong>${
                moduleHome.manufacturer
              }</p>            
              <p><strong>Passengers: </strong>${
                moduleHome.passengers
              }</p>            
              <p><strong>Cost: </strong>${
                moduleHome.cost_in_credits
              }</p>            
              <p><strong>Films: </strong>${getElements(
                moduleHome.films
              )}</p>            
          </article>       
        `;
      sectionContainer = document.querySelector("#render-vehicle");
      homeModuleHeading = "Vehicles";
      htmlPage = "vehicles";
    }

    if (componentArrayName.length > limit) {
      sectionsegment = segment;

      html += sectionsegment;
    }
  });

  sectionContainer.innerHTML = `
    <h2>${homeModuleHeading}</h2>
    ${html}
    <article class="view-all"><p><a href="templates/${htmlPage}.html">View All ${homeModuleHeading}</a></p></article>
   `;
}

function getElements(arrayData) {
  let holder = "";
  let href = "";
  let apiModule = "";

  if (moduleName(arrayData) === "films") {
    href = "../../views/film-view.html";
    apiModule = "films";
  } else if (moduleName(arrayData) === "vehicles") {
    href = "../../views/vehicle-view.html";
    apiModule = "vehicles";
  } else {
    href = "../../views/people-view.html";
    apiModule = "people";
  }

  for (let index = 0; index < arrayData.length; index++) {
    const id = arrayData[index].split("/").at(-2);

    let elemHolder = `<a href="" data-id="${id}">${arrayData[index]}</a>`;

    holder += elemHolder + ", ";
  }

  return holder;
}

function moduleName(moduleNames) {
  let first = "";
  if (moduleNames.length > 0) {
    first = moduleNames[0];
  }

  return first.split("/").at(-3);
}

async function showData(link) {
  console.log(link);
  let message = "";

  if (link.split("/").at(-3) === "people") {
    message =
      "There was a problem with fetching the single peoples content in view page.";
  } else if (link.split("/").at(-3) === "films") {
    message =
      "There was a problem with fetching the single films content in view page.";
  } else {
    message =
      "There was a problem with fetching the single vehicles content in view page.";
  }

  try {
    const response = await fetch(link);
    const data = await response.json();
    getDetailsOnModuleLinkClick(data);
  } catch (error) {
    console.log(message);
  }
}

function getDetailsOnModuleLinkClick(module) {
  let sectionsegment = "";
  let headingView = "";
  let container = "";

  if ("films" === module.url.split("/").at(-3)) {
    headingView = "Film View";
    sectionsegment = `
          <article class="movie v-film">
              <h3>${module.title}</h3>
              <p><strong>Director: </strong>${module.director}</p>
              <p><strong>Producer: </strong>${module.producer}</p>
              <p><strong>Release Date: </strong>${module.release_date}</p>
              <p><strong>Plot: </strong>${module.opening_crawl}</p>
              <p class="fav-char"><strong>Characters: </strong><span class="film"><a href="../../templates/peoples.html" target="_blank">${module.characters.join(
                ", "
              )}</a></span></p>
          </article>  
        `;
    container = document.querySelector("#film-view");
  } else if ("vehicles" === module.url.split("/").at(-3)) {
    headingView = "Vehicle View";
    sectionsegment = `
          <article class="vehicle v-vehicle">
            <h3>${module.name}</h3>
            <p><strong>Model: </strong>${module.model}</p>
            <p><strong>Manufacturer: </strong>${
              module.manufacturer
            }</p>            
            <p><strong>Passengers: </strong>${module.passengers}</p>            
            <p><strong>Cost: </strong>${module.cost_in_credits}</p>            
            <p><strong>Films: </strong><a href="../templates/films.html" target="_blank">${module.films.join(
              ", "
            )}</a></p>                    
          </article>
        `;
    container = document.querySelector("#vehicle-view");
  } else {
    headingView = "Character View";
    sectionsegment = `
          <article class="people h-people">
            <h3>${module.name}</h3>
            <p><strong>Height: </strong>${module.height}</p>
            <p><strong>Hair Color: </strong>${module.hair_color}</p>
            <p><strong>Birth Year: </strong>${module.birth_year}</p>
            <p><strong>Gender: </strong>${module.gender}</p>
            <p><strong>Films: </strong><span class="link-film"><a href="../templates/films.html" target="_blank">${module.films.join(
              ", "
            )}</a></span></p>
            <p><strong>Vehicles: </strong><span class="link-vehicle">${
              module.vehicles.length > 0
                ? `<a href="../templates/vehicles.html" target="_blank">
                  ${module.vehicles.join(", ")}
                </a>`
                : "N/A"
            }</span></p>           
          </article>
        `;
    container = document.querySelector("#people-view");
  }

  container.innerHTML = `
    <h2>${headingView}</h2>
    ${sectionsegment}    
   `;
}

renderModulesOnHome(homeModules[0], 3).then(() => {
  const elm = document.querySelectorAll(".home-section article p span a");
  elm.forEach((selector) => {
    selector.addEventListener("click", (event) => {
      event.target.setAttribute("href", "../../views/film-view.html");
      showData(event.target.innerHTML);
      // console.log(event);
    });
  });
});
renderModulesOnHome(homeModules[1], 5);
renderModulesOnHome(homeModules[2], 1);

/* ################# Peoples Page ################# */

async function renderPeoples() {
  try {
    const response = await fetch("https://swapi.dev/api/people/");
    const data = await response.json();
    getPeoples(data);
  } catch (error) {
    console.log(
      "There was a problem with fetching the peoples content on peoples page."
    );
  }
}

function getPeoples(peoples) {
  let html = "";

  peoples.results.forEach((people) => {
    let sectionsegment = `
        <article id="" class="people">
          <h3>${people.name}</h3>
          <p><strong>Height: </strong>${people.height}</p>
          <p><strong>Hair Color: </strong>${people.hair_color}</p>
          <p><strong>Birth Year: </strong>${people.birth_year}</p>
          <p><strong>Gender: </strong>${people.gender}</p>
          <p><strong>Films: </strong><span class="link-film"><a href="../../templates/films.html" target="_blank">${people.films.join(
            ", "
          )}</a></span></p>
          <p><strong>Vehicles: </strong><span class="link-vehicle">${
            people.vehicles.length > 0
              ? `<a href="../../templates/vehicles.html" target="_blank">${people.vehicles.join(
                  ", "
                )}</a>`
              : "N/A"
          }</span></p>
        </article>
        `;

    html += sectionsegment;
  });

  let container = document.querySelector("#people");
  container.innerHTML = `
    <h2>Peoples</h2>
    ${html}
   `;
}

renderPeoples();

/* ################# Films Page ################# */

async function renderMovies() {
  try {
    const response = await fetch("https://swapi.dev/api/films/");
    const data = await response.json();
    getMovies(data);
  } catch (error) {
    console.log(
      "There was a problem with fetching the movies content on films page."
    );
  }
}

async function getMovies(movies) {
  let html = "";

  movies.results.forEach((movie) => {
    let sectionsegment = `        
          <article class="movie">
              <h3>${movie.title}</h3>
              <p><strong>Director: </strong>${movie.director}</p>
              <p><strong>Producer: </strong>${movie.producer}</p>
              <p><strong>Release Date: </strong>${movie.release_date}</p>
              <p><strong>Plot: </strong>${movie.opening_crawl}</p>
              <p class="fav-char"><strong>Characters: </strong><span class="film"><a href="../../templates/peoples.html" target="_blank">${movie.characters.join(
                ", "
              )}</a></span></p>
          </article>        
          `;

    html += sectionsegment;
  });

  let moviecontainer = document.querySelector("#film");
  moviecontainer.innerHTML = `    
      <h2>Films</h2>
      ${html}      
     `;
}

renderMovies();

/* ################# Vehicles Page ################# */

async function renderVehicles() {
  try {
    const response = await fetch("https://swapi.dev/api/vehicles/");
    const data = await response.json();
    getVehicles(data);
  } catch (error) {
    console.log(
      "There was a problem with fetching the vehicles content on vehicles page."
    );
  }
}

async function getVehicles(vehicles) {
  let html = "";

  vehicles.results.forEach((vehicle) => {
    let sectionsegment = `
        <article class="vehicle h-vehicle">
            <h3>${vehicle.name}</h3>
            <p><strong>Model: </strong>${vehicle.model}</p>
            <p><strong>Manufacturer: </strong>${
              vehicle.manufacturer
            }</p>            
            <p><strong>Passengers: </strong>${
              vehicle.passengers
            }</p>            
            <p><strong>Cost: </strong>${vehicle.cost_in_credits}</p>            
            <p><strong>Films: </strong><a href="../../templates/films.html" target="_blank">${vehicle.films.join(
              ", "
            )}</a></p>            
        </article>
        `;

    html += sectionsegment;
  });

  let container = document.querySelector("#vehicle");
  container.innerHTML = `
    <h2>Vehicles</h2>
    ${html}
   `;
}

renderVehicles();
