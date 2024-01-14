/**
 * Adds a tilt function to cards
 */

document.addEventListener('DOMContentLoaded', (event) => {
    VanillaTilt.init(document.querySelectorAll(".card"), {
      max: 25,
      speed: 400
    });
  });