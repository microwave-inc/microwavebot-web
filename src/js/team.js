$(document).ready(function () {
  const boxOwners = document.getElementById("owners_list");
  const API = "https://discordlookup.mesalytic.moe/v1/user/";
  const owners = [
    {
      id: "398959101322854400",
      post: "Founder & Developer",
      email: "againes@microwavebot.com",
    }, //Ayden
    {
      id: "384049625511755777",
      post: "Developer",
      email: "yapudjus@microwavebot.com",
    }, //yapudjus
    {
      id: "487192684751093761",
      post: "Developer",
      email: "fonta22@microwavebot.com",
    }, //Fonta22
    {
      id: "939490395887386646",
      post: "Developer",
      email: "sopy@microwavebot.com",
    }, //Sopy
    {
      id: "648159551966937088",
      post: "Designer",
      email: "polbbo@microwavebot.com",
    }, //polbbo_
  ];
  for (let indexOne = 0; indexOne < owners.length; indexOne++) {
    const elementOwners = owners[indexOne];
    $.getJSON(API + elementOwners.id).then((output) => {
      if (!output.global_name || !output.avatar.link) {
        document
          .querySelectorAll(".banner img")
          .forEach((imgs) => (imgs.src = "../static/img/bot.png"));
      } else {
        const ownerList = document.createElement("div");
        ownerList.className = "col-md-4";
        ownerList.innerHTML = `
            <div class='card mb-3 shadow' style='display: flex; flex-direction: column; align-items: center;' data-tilt>
              <img class='card-img-top shadow' src='${output.avatar.link}' alt='Card image cap' style='border-radius: 50%; width: 50%; height: auto; margin: 10px;'>
              <div class='card-title' style='margin-top: 3px;'>${output.global_name}</div>
              <div class='card-body'>
                <h6>${elementOwners.post}</h6>
                <a href="mailto:${elementOwners.email}" style=''>Official Email</a>
              </div>
            </div>
          `;
        boxOwners.appendChild(ownerList);
        VanillaTilt.init(document.querySelectorAll(".card"), {
          max: 25,
          speed: 400,
          glare: true,
          "max-glare": 0.3,
        });

              }
            });
          }
          
          document
            .getElementById("owners_list")
            .addEventListener("click", function (event) {
              if (event.target.classList.contains("card")) {
                var Modal = new bootstrap.Modal(document.getElementById("ownerModal"), {
                  keyboard: false,
                });

                const owner = event.target.querySelector(".card-title").innerText;
                const ownerEmail = event.target.querySelector("a").innerText;
                const ownerPost = event.target.querySelector("h6").innerText;
                const ownerImage = event.target.querySelector("img").src;
                const ownerID = event.target.querySelector("img").src.split("/")[5];
                $.getJSON(API + ownerID).then((output) => {
                  if (!output.global_name || !output.avatar.link) {
                    document
                      .querySelectorAll(".modal-body img")
                      .forEach((imgs) => (imgs.src = "../static/img/bot.png"));
                  } else {
                    document.getElementById("modalTitle").innerText = owner;
                    document.getElementById("modalPost").innerText = ownerPost;
                    document.getElementById("modalEmail").innerText = ownerEmail;
                    document.getElementById("modalImage").src = ownerImage;
                    Modal.show();
                  }
                });
              }
            });
        });
