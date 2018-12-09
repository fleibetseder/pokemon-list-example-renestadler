$(document).ready(function () {
  document.getElementById("pokeTable").innerHTML = `<thead class="table-primary"><tr>
  <th>Pokemon Name</th><th>Further Details</th></tr></thead>`;
  $.getJSON('https://pokeapi.co/api/v2/pokemon/', function (data) {
    let s: string = "";
    data.results.forEach(element => {
      s += `<tr class="table-secondary"><td >` + element.name +
        `</td><td><button class="bg-secondary" onClick="pokemonDetails('`
        + element.url + `')">Details</button></td></tr>`;
    });
    document.getElementById("pokeTable").innerHTML += s;
    console.log(data.results);
    console.log(JSON.stringify(data, null, "  "))
  });
});

function pokemonDetails(url: string) {
  if (url == undefined) {
    document.getElementById("pokeTable").setAttribute("style", "");
    document.getElementById("listTitle").setAttribute("style", "");
    document.getElementById("detailsTitle").setAttribute("style", "display: none;");
    document.getElementById("details").setAttribute("style", "display: none;");
  } else {
    document.getElementById("pokeTable").setAttribute("style", "display: none;");
    document.getElementById("listTitle").setAttribute("style", "display: none;");
    document.getElementById("detailsTitle").setAttribute("style", "");
    document.getElementById("details").setAttribute("style", "");
    $.getJSON(url, function (data) {
      console.log(JSON.stringify(data, null, "  "));
      let html = '';
      html += `<button class="bg-secondary" onClick="pokemonDetails()">return to the list</button><br>`;
      html += `<h2 class="text-primary">${data.name}</h2>`
      html += `<p class="text-primary"><img src="${data.sprites.front_default}"/></p>`
      html += `<p class="text-primary">Types: </p>`
      html += `<ul class="list-group-item-action">`;
      data.types.forEach(function (element) {
        html += `<li>${element.type.name}</li>`;
      });

      html += '</ul>';
      html += `<p class="text-primary">Weight: ${data.weight / 10} kg</p>`
      html += `<p class="text-primary">Height: ${data.height / 10} m</p>`
      html += `<p class="text-primary">Abilities: </p>`
      html += `<ul class="list-group-item-action">`;
      data.abilities.forEach(function (element) {
        html += `<li>${element.ability.name}</li>`;
      });

      html += '</ul>';
      document.getElementById("details").innerHTML = html;
    });
  }
}