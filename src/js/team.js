$(document).ready(function() {
    const boxOwners = document.getElementById("owners_list");
    const API = "https://discordlookup.mesavirep.xyz/v1/user/"; // Temp API Domain
    const owners = [
      { id: "398959101322854400", post: "Founder & Developer" }, //Ayden
      { id: "384049625511755777", post: "Developer" }, //yapudjus
      { id: "487192684751093761", post: "Developer" }, //Fonta22
      { id: "939490395887386646", post: "Developer" }, //Sopy
      { id: "648159551966937088", post: "Designer" }, //polbbo_
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
                    <div class='card-body'>${elementOwners.post}</div>
                </div>
            </div>`;
            boxOwners.innerHTML += ownerList;
          };
        }
      });
    }
});