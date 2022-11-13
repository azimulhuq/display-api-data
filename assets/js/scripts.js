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

/* ################# Render Peoples on index.html ################# */
async function renderPeoplesOnHome() {
  try {
    const response = await fetch("https://swapi.dev/api/people/");
    const data = await response.json();
    getPeoplesOnHome(data);
  } catch (error) {
    console.log(
      "There was a problem with fetching the peoples content in home page."
    );
  }
}

function getPeoplesOnHome(peoples) {
  let html = "";

  peoples.results.forEach((people) => {
    if (people.films.length > 3) {
      let sectionsegment = `
        <article id="" class="people h-people">
          <h3>${people.name}</h3>
          <p><strong>Height: </strong>${people.height}</p>
          <p><strong>Hair Color: </strong>${people.hair_color}</p>
          <p><strong>Birth Year: </strong>${people.birth_year}</p>
          <p><strong>Gender: </strong>${people.gender}</p>
          <p><strong>Films: </strong><span class="link-film"><a href="../../templates/films.html" target="_blank">${people.films.join(
            ", "
          )}</a></span></p>
          <p><strong>Vehicles: </strong><span class="link-vehicle">${
            people.vehicles.length > 0 ? getElements(people.vehicles) : "N/A"
          }</span></p>
        </article>
        `;

      html += sectionsegment;
    }
  });

  let container = document.querySelector("#render-people");
  container.innerHTML = `
    <h2>Peoples</h2>
    ${html}
    <article class="view-all"><p><a href="templates/peoples.html">View All Peoples</a></p></article>
   `;
}

function getElements(arrayData) {
  for (let index = 0; index < arrayData.length; index++) {
    return `<a href="../../views/vehicles-views.html" data-url="${arrayData[index]}">${arrayData[index]}</a>`;
  }
}

renderPeoplesOnHome();

/* ################# Render Films on index.html ################# */

async function renderMoviesOnHome() {
  try {
    const response = await fetch("https://swapi.dev/api/films/");
    const data = await response.json();
    getMoviesOnHome(data);
  } catch (error) {
    console.log(
      "There was a problem with fetching the movies content on home page."
    );
  }
}

async function getMoviesOnHome(movies) {
  let html = "";

  movies.results.forEach((movie) => {
    if (movie.vehicles.length > 5) {
      let sectionsegment = `        
            <article class="movie h-movie">
                <h3>${movie.title}</h3>
                <p><strong>Director: </strong>${movie.director}</p>
                <p><strong>Producer: </strong>${movie.producer}</p>
                <p><strong>Release Date: </strong>${movie.release_date}</p>
                <p><strong>Plot: </strong>${movie.opening_crawl
                  .slice(0, 150)
                  .concat("...")}</p>
                <p class="fav-char"><strong>Characters: </strong><span class="film"><a href="../../templates/peoples.html" target="_blank">${movie.characters
                  .slice(0, 8)
                  .map((char) => {
                    return char;
                  })
                  .join(", ")}</a></span></p>
            </article>        
            `;

      html += sectionsegment;
    }
  });

  let moviecontainer = document.querySelector("#render-film");
  moviecontainer.innerHTML = `    
      <h2>Films</h2>
      ${html}
      <article class="view-all"><p><a href="templates/films.html">View All Films</a></p></article>      
     `;
}

renderMoviesOnHome();

/* ################# Render Vehicles on index.html ################# */

async function renderVehiclesOnHome() {
  try {
    const response = await fetch("https://swapi.dev/api/vehicles/");
    const data = await response.json();
    getVehiclesOnHome(data);
  } catch (error) {
    console.log(
      "There was a problem with fetching the vehicles content on home page."
    );
  }
}

async function getVehiclesOnHome(vehicles) {
  let html = "";

  vehicles.results.forEach((vehicle) => {
    if (vehicle.films.length > 1) {
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
              <p><strong>Cost: </strong>${
                vehicle.cost_in_credits
              }</p>            
              <p><strong>Films: </strong><a href="../../templates/films.html" target="_blank">${vehicle.films.join(
                ", "
              )}</a></p>            
          </article>
          `;

      html += sectionsegment;
    }
  });

  let container = document.querySelector("#render-vehicle");
  container.innerHTML = `
    <h2>Vehicles</h2>
    ${html}
    <article class="view-all"><p><a href="templates/vehicles.html">View All Vehicles</a></p></article>
   `;
}

renderVehiclesOnHome();

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
