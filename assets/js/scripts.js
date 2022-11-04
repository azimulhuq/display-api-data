/**********Navigation Section***********/
const sections = document.querySelectorAll("section");
const navList = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.scrollY >= sectionTop - sectionHeight / 2) {
      current = section.getAttribute("id");
    }
  });

  navList.forEach((li) => {
    li.classList.remove("active");
    const href = li.getAttribute("href").substring(1);

    if (href === current) {
      li.classList.add("active");
    }
  });
});

/**********Peoples Section***********/

async function getPeoples() {
  let url = "https://www.swapi.tech/api/people";

  try {
    let response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

async function renderPeoples() {
  let peoples = await getPeoples();
  let html = "";

  peoples.results.forEach((people) => {
    let sectionsegment = `
        <article class="people">
            <h3>${people.name}</h3>
            <p><strong>User ID: </strong>${people.uid}</p>
            <p><strong>User URL: </strong><a href="${people.url}" target="_blank">${people.url}</a></p>            
        </article>
        `;

    html += sectionsegment;
  });

  let container = document.querySelector("#people");
  container.innerHTML = `
    <h2>People</h2>
    ${html}
   `;
}

renderPeoples();

/**********Films Section***********/

async function getMovies() {
  let url = "https://www.swapi.tech/api/films";

  try {
    let response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

async function renderMovies() {
  let movies = await getMovies();
  let html = "";

  movies.result.forEach((movie) => {
    let sectionsegment = `        
          <article class="movie">
              <h3>${movie.properties.title}</h3>
              <p><strong>Director: </strong>${movie.properties.director}</p>
              <p><strong>Producer: </strong>${movie.properties.producer}</p>
              <p><strong>Release Date: </strong>${
                movie.properties.release_date
              }</p>
              <p><strong>Plot: </strong>${movie.properties.opening_crawl}</p>
              <p class="fav-film"><strong>Vehicle: </strong><span class="film">${movie.properties.vehicles.map(
                (vehicle) =>
                  `<a href="${vehicle}" target="_blank">${favouriteVehicle(
                    vehicle
                  )}</a>`
              )}</span></p>
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

async function favouriteVehicle(params) {
  let url = await fetch(params);
  let response = await url.json();
  console.log(response.result.properties.name); // shows desired output in the console but not in html page.
  return await response.result.properties.name;

  // fetch(params)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log(data.result.properties.name); // shows desired output in the console but not in html page.
  //     return data.result.properties.name;
  //   });
}

/**********Vehicles Section***********/

async function getVehicles() {
  let url = "https://www.swapi.tech/api/vehicles";

  try {
    let response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

async function renderVehicles() {
  let vehicles = await getVehicles();
  let html = "";

  vehicles.results.forEach((vehicle) => {
    let sectionsegment = `
        <article class="vehicle">
            <h3>${vehicle.name}</h3>
            <p><strong>User ID: </strong>${vehicle.uid}</p>
            <p><strong>User URL: </strong><a href="${vehicle.url}" target="_blank">${vehicle.url}</a></p>            
        </article>
        `;

    html += sectionsegment;
  });

  let container = document.querySelector("#vehicle");
  container.innerHTML = `
    <h2>Vehicle</h2>
    ${html}
   `;
}

renderVehicles();
