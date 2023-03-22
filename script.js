const resultsNav = document.getElementById("resultsNav");
const favoritesNav = document.getElementById("favoritesNav");
const imagesContainer = document.querySelector(".images-container");
const saveConfirmed = document.querySelector(".save-confirmed");
const loader = document.querySelector(".loader");
const menuIcon = document.querySelector(".menu-icon");
const navMenu = document.querySelector(".navigation-menu");

// Menu
menuIcon.addEventListener("click", () => {
  menuIcon.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".navigation-link").forEach((n) =>
  n.addEventListener("click", () => {
    menuIcon.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

// NASA API
const count = 10;
const apiKey = "DEMO_KEY";
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];
let favorites = {};

//Scroll to top, remove loader, show content
function showContent(page) {
  window.scrollTo({ top: 0, behavior: "instant" });
  loader.classList.add("hidden");
  if (page === "results") {
    resultsNav.classList.remove("hidden");
    favoritesNav.classList.add("hidden");
  } else {
    resultsNav.classList.add("hidden");
    favoritesNav.classList.remove("hidden");
  }
}

// Image load promise
function imageLoadPromise(imgElement) {
  return new Promise((resolve, reject) => {
    imgElement.onload = () => {
      resolve();
    };
    imgElement.onerror = () => {
      reject(new Error("Image failed to load."));
    };
  });
}

function createDOMNodes(page) {
  const imagePromises = [];
  // Load ResultsArray or Favorites
  const currentArray =
    page === "results" ? resultsArray : Object.values(favorites);

  const blockThreeContainer = document.querySelector(".block-three-container");
  const imagesBlockContainer = document.querySelector(
    ".block-three-images-container"
  );

  // Creating divs
  const newBlockThreeContainer = document.createElement("div");
  newBlockThreeContainer.classList.add("block-three-container");
  const newImagesBlockContainer = document.createElement("div");
  newImagesBlockContainer.classList.add("block-three-images-container");

  const spacer1 = document.createElement("div");
  const spacer2 = document.createElement("div");
  spacer1.classList.add("spacer");
  spacer2.classList.add("spacer");

  currentArray.forEach((result, index) => {
    // Card Container
    const card = document.createElement("div");
    card.classList.add("card");
    card.classList.add(`card-${index}`);

    // Link
    const link = document.createElement("a");
    link.href = result.hdurl;
    link.title = "View Full Image";
    link.target = "_blank";

    // Image
    const image = document.createElement("img");
    image.src = result.url;
    image.alt = "NASA Picture of the Day";
    image.loading = "lazy";
    image.classList.add("card-img-top");

    imagePromises.push(imageLoadPromise(image));

    // Card Title
    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = result.title;

    // Append image and link to the card
    link.appendChild(image);
    card.appendChild(link);

    if (index < 3 && page === "results") {
      // Card Title
      cardTitle.classList.add("card-title");
      // Append card title to the card
      card.appendChild(cardTitle);

      // Append the card to the block-three-container
      blockThreeContainer.appendChild(card);
      imagesBlockContainer.appendChild(card);
      if (index === 1) {
        card.setAttribute("id", "middle-block");
      }
    } else {
      if (index === 3 || (index === 9 && page === "results")) {
        card.setAttribute("id", "row-left");
        // Create right-side div
        const rightSide = document.createElement("h5");
        rightSide.classList.add("right-side");
        // Footer Container
        const footer = document.createElement("small");
        footer.classList.add("text-muted");
        // Date
        const date = document.createElement("span");
        date.textContent = result.date;
        // Truncate the explanation text to the first 2 sentences
        const truncatedExplanation = result.explanation
          .match(/(?:[^\.!\?]+[\.!\?]+){0,2}/g)[0]
          .trim();

        // Card Text
        const cardText = document.createElement("p");
        cardText.textContent = truncatedExplanation;
        // Read more button
        const readMoreButton = document.createElement("button");
        readMoreButton.textContent = "→ Read more";
        readMoreButton.classList.add("read-more-btn");
        readMoreButton.onclick = () => {
          alert(
            `Title: ${result.title}\n\nFull explanation: ${result.explanation}`
          );
        };
        // Append elements to the card
        footer.append(date);
        rightSide.appendChild(cardTitle);
        rightSide.appendChild(footer);
        rightSide.appendChild(cardText);
        rightSide.appendChild(readMoreButton);
        card.appendChild(rightSide);
        imagesContainer.appendChild(card);
      } else if (index === 4 && page === "results") {
        card.setAttribute("id", "row-right");
        // Create left-side div
        const leftSide = document.createElement("h5");
        leftSide.classList.add("left-side");

        // Footer Container
        const footer = document.createElement("small");
        footer.classList.add("text-muted");
        // Date
        const date = document.createElement("span");
        date.textContent = result.date;
        // Truncate the explanation text to the first 2 sentences
        const truncatedExplanation = result.explanation
          .match(/(?:[^\.!\?]+[\.!\?]+){0,3}/g)[0]
          .trim();
        // Card Text
        const cardText = document.createElement("p");
        cardText.textContent = truncatedExplanation;
        // Read more button
        const readMoreButton = document.createElement("button");
        readMoreButton.textContent = "→ Read more";
        readMoreButton.classList.add("read-more-btn");
        readMoreButton.onclick = () => {
          alert(
            `Title: ${result.title}\n\nFull explanation: ${result.explanation}`
          );
        };
        // Append elements to the card
        footer.append(date);
        leftSide.appendChild(cardTitle);
        leftSide.appendChild(footer);
        leftSide.appendChild(cardText);
        leftSide.appendChild(readMoreButton);
        card.appendChild(leftSide);
        imagesContainer.appendChild(card);
      } else if (index >= 6 && index <= 8 && page === "results") {
        // Card Title
        cardTitle.classList.add("card-title-block");
        // Append
        card.appendChild(cardTitle);
        newBlockThreeContainer.appendChild(spacer1);
        newBlockThreeContainer.appendChild(newImagesBlockContainer);
        newBlockThreeContainer.appendChild(spacer2);
        imagesContainer.appendChild(newBlockThreeContainer);
        newImagesBlockContainer.appendChild(card);

        if (index === 7) {
          card.setAttribute("id", "middle-block");
        }
      } else {
        // Card Body
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        // Save Text
        const saveText = document.createElement("p");
        saveText.classList.add("clickable");
        if (page === "results") {
          saveText.textContent = "Add To Favorites";
          saveText.setAttribute("onclick", `saveFavorite('${result.url}')`);
        } else {
          saveText.textContent = "Remove Favorite";
          saveText.setAttribute("onclick", `removeFavorite('${result.url}')`);
        }
        // Card Text
        const cardText = document.createElement("p");
        cardText.textContent = result.explanation;
        // Footer Container
        const footer = document.createElement("small");
        footer.classList.add("text-muted");
        // Date
        const date = document.createElement("span");
        date.textContent = result.date;
        // Copyright
        const copyrightResult =
          result.copyright === undefined ? "" : result.copyright;
        const copyright = document.createElement("span");
        copyright.classList.add("copyright");
        copyright.textContent = ` ${copyrightResult}`;
        // Append
        footer.append(date, copyright);
        cardBody.append(cardTitle, saveText, cardText, footer);
        card.append(cardBody);
        imagesContainer.appendChild(card);
      }
    }
  });
  return imagePromises;
}

async function updateDOM(page) {
  // Get Favorites from localStorage
  if (localStorage.getItem("nasaFavorites")) {
    favorites = JSON.parse(localStorage.getItem("nasaFavorites"));
  }
  // Reset DOM, Create DOM Nodes, Show Content
  imagesContainer.textContent = "";
  const imagePromises = createDOMNodes(page);
  await Promise.all(imagePromises);
  showContent(page);
}

// Get 10 Images from NASA API
async function getNasaPictures() {
  // Show Loader
  loader.classList.remove("hidden");
  // Keep fetching until there's 10 URLs with a valid image source
  while (resultsArray.length < count) {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      // Filter out blogs with youtube or vimeo links as their image source
      const validResults = data.filter((result) => {
        return (
          !result.url.includes("youtube.com") &&
          !result.url.includes("youtu.be") &&
          !result.url.includes("player.vimeo.com")
        );
      });
      // Add the valid results to the resultsArray
      resultsArray.push(...validResults);
    } catch (error) {
      // Catch error here
      console.log("error fetching images:", error);
    }
  }
  resultsArray = resultsArray.slice(0, count);
  await updateDOM("results");
}

// Add result to Favorites
function saveFavorite(itemUrl) {
  // Loop through Results Array to select Favorite
  resultsArray.forEach((item) => {
    if (item.url.includes(itemUrl) && !favorites[itemUrl]) {
      favorites[itemUrl] = item;
      // Show Save Confirmation for 2 seconds
      saveConfirmed.hidden = false;
      setTimeout(() => {
        saveConfirmed.hidden = true;
      }, 2000);
      // Set Favorites in localStorage
      localStorage.setItem("nasaFavorites", JSON.stringify(favorites));
    }
  });
}

//Remove item from Favorites
function removeFavorite(itemUrl) {
  if (favorites[itemUrl]) {
    delete favorites[itemUrl];
    // Set Favorites in localStorage
    localStorage.setItem("nasaFavorites", JSON.stringify(favorites));
    updateDOM("favorites");
  }
}

// On load
getNasaPictures();