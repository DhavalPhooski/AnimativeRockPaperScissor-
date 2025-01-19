const container = document.querySelector(".container");

function loadAssets(route) {
  // Remove any previously added dynamic assets
  document.querySelectorAll("[data-dynamic]").forEach((el) => el.remove());

  // Dynamically load the CSS for page1.html (no other CSS from index.html will be loaded)
  const cssLink = document.createElement("link");
  cssLink.rel = "stylesheet";
  cssLink.href = "css/page1.css"; // Ensure this points to your specific CSS for page1.html
  cssLink.setAttribute("data-dynamic", "true");
  document.head.appendChild(cssLink);

  // Dynamically load the JavaScript for page1.html
  const script = document.createElement("script");
  script.src = "js/page1.js"; // Ensure this points to your specific JS for page1.html
  script.setAttribute("data-dynamic", "true");
  document.body.appendChild(script);
}

function handleRouteTransition(route) {
  container.addEventListener(
    "transitionend",
    async () => {
      try {
        const response = await fetch(route);
        const html = await response.text();
        document.body.innerHTML = html;
        loadAssets(route); // Load the page1 CSS and JS after dynamically loading the HTML
      } catch (error) {
        console.error("Error loading route:", error);
      }
    },
    { once: true }
  );
}

function activatePseudoElement() {
  container.style.setProperty("--after-transform", "rotateY(0deg)");
}

const boxes = document.querySelectorAll(".boxStyle");

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    const shapeClass = box.children[0].className;
    activatePseudoElement();

    const route = "page1.html"; // Pointing to the route for page1.html
    handleRouteTransition(route); // Load page1 dynamically when clicked
  });
});

const box1 = document.querySelector(".box1");
box1.addEventListener("click", () => {
  const shapeClass = document.querySelector(".Siddharth").className;
  localStorage.setItem("selectedShape", shapeClass); // Store shape in localStorage
  console.log("Shape saved to localStorage:", shapeClass); // Log it to the console
});
const box2 = document.querySelector(".box2");
box2.addEventListener("click", () => {
  const shapeClass = document.querySelector(".Dhaval").className;
  localStorage.setItem("selectedShape", shapeClass); // Store shape in localStorage
  console.log("Shape saved to localStorage:", shapeClass); // Log it to the console
});
const box3 = document.querySelector(".box3");
box3.addEventListener("click", () => {
  const shapeClass = document.querySelector(".Panth").className;
  localStorage.setItem("selectedShape", shapeClass); // Store shape in localStorage
  console.log("Shape saved to localStorage:", shapeClass); // Log it to the console
});
// const box4 = document.querySelector(".box4");
// box4.addEventListener("click", () => {
//   const shapeClass = document.querySelector(".square").className;
//   localStorage.setItem("selectedShape", shapeClass); // Store shape in localStorage
//   console.log("Shape saved to localStorage:", shapeClass); // Log it to the console
// });

