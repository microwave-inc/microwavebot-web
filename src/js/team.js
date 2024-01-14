$(document).ready(function() {
    const boxOwners = document.getElementById("owners_list");
    const API = "https://discordlookup.mesavirep.xyz/v1/user/"; // Gracias my guy, big help for making this website work!
    const owners = [
      { id: "398959101322854400", post: "Founder & Developer", email: "againes@microwavebot.com" }, //Ayden
      { id: "384049625511755777", post: "Developer", email: "yapudjus@microwavebot.com" }, //yapudjus
      { id: "487192684751093761", post: "Developer", email: "fonta22@microwavebot.com" }, //Fonta22
      { id: "939490395887386646", post: "Developer", email: "sopy@microwavebot.com" }, //Sopy
      { id: "648159551966937088", post: "Designer", email: "polbbo@microwavebot.com" }, //polbbo_
    ];
    for (let indexOne = 0; indexOne < owners.length; indexOne++) {
      const elementOwners = owners[indexOne];
      $.getJSON(API + elementOwners.id).then((output) => {
        if (!output.global_name || !output.avatar.link) {
          document
            .querySelectorAll(".banner img")
            .forEach((imgs) => (imgs.src = "../static/img/bot.png"));
        } else {
          const img = new Image();
          img.src = output.avatar.link;
          img.onload = function() {
            const ownerList =
            `<div class='col-md-4'>
                <div class='card mb-3' style='display: flex; flex-direction: column; align-items: center;'>
                    <img class='card-img-top' src='${output.avatar.link}' alt='Card image cap' style='border-radius: 50%; width: 50%; height: auto;'>
                    <div class='card-title'>${output.global_name}</div>
                    <div class='card-body'>${elementOwners.post} <br>
                    <a href="mailto:${elementOwners.email}">Official Email</a></div>
                </div>
            </div>`;
            boxOwners.innerHTML += ownerList;
          };
        }
      });
    }
});