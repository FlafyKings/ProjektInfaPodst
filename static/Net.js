const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

const navLink = document.querySelectorAll(".nav-link");

navLink.forEach((n) => n.addEventListener("click", closeMenu));

function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}

var dozmianyutworu = "";
$(document).ready(function () {
  let net;
  let ui;
  $.ajax({
    url: "/",
    action: "FIRST",
    type: "POST",
    success: function (data) {
      let obj = JSON.parse(data);
      dozmianyutworu = obj.files;
      console.log(obj);
      let okladka = obj.okladka;
      for (let i = 0; i < okladka.length; i++) {
        let zdj = document.createElement("IMG");
        zdj.setAttribute("src", okladka[i].okladka);
        zdj.setAttribute("width", "200");
        zdj.setAttribute("height", "200");
        zdj.setAttribute("class", "zdj");
        zdj.setAttribute("id", okladka[i].okladka);
        zdj.setAttribute("onclick", "wyslij(this.id)");
        document.getElementById("lewo").appendChild(zdj);
      }
      let table = document.createElement("table");
      table.setAttribute("id", "tabela");
      for (let i = 0; i < obj.files.length; i++) {
        let tr = document.createElement("tr");
        tr.setAttribute("id", "tr" + i);
        tr.setAttribute("class", "tr");
        let td1 = document.createElement("td");
        td1.setAttribute("id", i + " td1");
        td1.innerHTML = i + 1;
        tr.appendChild(td1);
        let td2 = document.createElement("td");
        td2.setAttribute("id", i + " td2");
        td2.innerHTML = obj.files[i].pliki.slice(0, -4);
        tr.appendChild(td2);
        let td3 = document.createElement("td");
        td3.setAttribute("id", i + " td3");
        //let roz = obj.size[i].size;
        //let roz1 = parseInt(roz);
        //let rozmb = roz1 / 1000000;
        //td3.innerHTML = rozmb.toFixed(2) + " MB";
        //tr.appendChild(td3);
        let td4 = document.createElement("img");
        td4.setAttribute("id", i + " td4");
        td4.setAttribute("class", "add");

        td4.setAttribute("onclick", "dodajdobazy(this.id)");
        td4.src =
          "https://img.icons8.com/material-outlined/24/ffffff/plus-math.png";
        tr.appendChild(td4);
        let td5 = document.createElement("td");
        td5.setAttribute("class", i + " td5");
        tr.appendChild(td5);
        tr.setAttribute("onclick", "play(this.id)");

        for (var w = 0; w < obj.lista[0].length; w++) {
          if (obj.files[i].pliki == obj.lista[0][w].piosenka) {
            console.log(
              obj.files[i].pliki + "           " + obj.lista[0][w].piosenka
            );
            td4.setAttribute("onclick", "usunzbazy(this.id)");
            //td4.innerHTML = "Usuń z playlisty";
            td4.innerHTML = "Dodaj do playlisty";
            tr.appendChild(td4);
            td5.setAttribute("id", obj.lista[0][w]._id);
          }
        }
        tr.appendChild(td5);
        tr.setAttribute("onclick", "play(this.id)");
        table.appendChild(tr);
      }
      document.getElementById("prawo").appendChild(table);
      let hei = window.screen.height;
      document.getElementById("dol").style.height = hei + "px";
      let pod = document.createElement("div");
      pod.setAttribute("id", "pusty");
      document.body.appendChild(pod);
    },
  });
});
let test = "";
function wyslij(event) {
  document.body.setAttribute("id", event);
  test = event;
  console.log("event:  " + event);
  $.ajax({
    url: "/odbierz",
    type: "POST",
    data: { action: "NEXT", nazwakat: event },
    success: function (data) {
      let obj = JSON.parse(data);
      dozmianyutworu = obj.files;
      console.log(obj);
      let files = obj.files;
      let size = obj.size;
      let table = document.createElement("table");
      table.setAttribute("id", "tabela");
      for (let i = 0; i < files.length; i++) {
        let tr = document.createElement("tr");
        tr.setAttribute("id", "tr" + i);
        tr.setAttribute("class", "tr");
        let td1 = document.createElement("td");
        td1.setAttribute("id", i + " td1");
        td1.innerHTML = i + 1;
        tr.appendChild(td1);
        let td2 = document.createElement("td");
        td2.setAttribute("id", i + " td2");
        td2.innerHTML = files[i].slice(0, -4);
        tr.appendChild(td2);

        // let td3 = document.createElement("td");
        // td3.setAttribute("id", i + " td3");
        // let roz = size[i];
        // let roz1 = parseInt(roz);
        // let rozmb = roz1 / 1000000;
        // td3.innerHTML = rozmb.toFixed(2) + " MB";
        // tr.appendChild(td3);
        let td4 = document.createElement("img");
        td4.setAttribute("id", i + " td4");
        td4.setAttribute("class", "add");

        td4.setAttribute("onclick", "dodajdobazy(this.id)");
        td4.src =
          "https://img.icons8.com/material-outlined/24/ffffff/plus-math.png";
        tr.appendChild(td4);
        let td5 = document.createElement("td");
        td5.setAttribute("class", i + " td5");
        tr.appendChild(td5);
        //tr.setAttribute("onclick", "play(this.id)");
        for (var w = 0; w < obj.lista[0].length; w++) {
          if (obj.files[i] == obj.lista[0][w].piosenka) {
            console.log(
              obj.files[i].pliki + "           " + obj.lista[0][w].piosenka
            );
            td4.setAttribute("onclick", "usunzbazy(this.id)");
            td4.innerHTML = "Usuń z playlisty";
            //td4.innerHTML = 'Dodaj do playlisty'
            tr.appendChild(td4);
            td5.setAttribute("id", obj.lista[0][w]._id);
          }
        }
        tr.appendChild(td5);
        tr.setAttribute("onclick", "play(this.id)");
        table.appendChild(tr);
      }
      document.getElementById("prawo").innerHTML = "";
      document.getElementById("prawo").appendChild(table);
    },
  });
}

function play(id) {
  $("#audio").trigger("stop");
  document.getElementById("ad").innerHTML = "";
  let zmien = document.getElementById("srodek");
  zmien.src = "https://img.icons8.com/ios-glyphs/30/ffffff/pause--v1.png";
  zmien.setAttribute("id", "srodek");
  zmien.setAttribute("onclick", "srodekzatrzymaj()");
  let audio = document.createElement("audio");
  audio.setAttribute("id", "audio");
  let source = document.createElement("source");
  let nralbumu = document.body.id.substring(
    document.body.id.length - 5,
    document.body.id.length - 4
  );
  let utwors = "";
  try {
    utwors = id.substring(2, 3) + " td2";
  } catch {
    utwors = id.substring(0, 1) + " ptd2";
  }

  let utwors2 = id.substring(2, 3) + " ptd2";
  let zmianakol = document.getElementsByClassName("tr");
  for (let i = 0; i < zmianakol.length; i++) {
    //zmianakol[i].style.background = "#747474";
    zmianakol[i].style.color = "white";
  }
  try {
    //document.getElementById("tr" + id.substring(2, 3)).style.background =
    //  "#FFE400";
    document.getElementById("tr" + id.substring(2, 3)).style.color = "#14CCF4";
  } catch {
    console.log("np");
  }
  console.log(utwors);
  let utwor = document.getElementById(utwors).innerText + ".mp3";
  document.getElementById("grane").innerText = utwor.slice(0, -4);
  let sciezka = "mp3/album" + nralbumu + "/" + utwor;
  console.log(sciezka);
  source.setAttribute("src", sciezka);
  source.setAttribute("type", "audio/mp3");
  audio.appendChild(source);
  document.getElementById("ad").appendChild(audio);
  $("#audio").trigger("load");
  $("#audio").trigger("play");

  $("#audio").on("timeupdate", function () {
    document.getElementById("rg").innerHTML = "";
    // document.getElementById('box1').innerHTML = "Czas grania: "
    document.getElementById("aktualnie").innerHTML =
      Math.round($("#audio").prop("currentTime") / 60) +
      "." +
      Math.round($("#audio").prop("currentTime") % 60) +
      " / ";
    document.getElementById("ogolnie").innerHTML =
      Math.round($("#audio").prop("duration") / 60) +
      "." +
      Math.round($("#audio").prop("duration") % 60);
    let input = document.createElement("input");
    input.setAttribute("type", "range");
    input.setAttribute("min", "0");
    let tww = Math.round($("#audio").prop("duration"));

    input.setAttribute("max", tww);
    let cur = Math.round($("#audio").prop("currentTime"));
    input.setAttribute("value", cur);
    input.setAttribute("onclick", "zmienczas(this.value)");
    document.getElementById("rg").appendChild(input);
  });
}
function zmienczas(a) {
  $("#audio").prop("currentTime", Math.round(a));
}

function srodekzatrzymaj() {
  $("#audio").trigger("pause");
  let zmien = document.getElementById("srodek");
  zmien.src = "https://img.icons8.com/ios-glyphs/30/ffffff/play--v1.png";
  zmien.setAttribute("id", "srodek");
  zmien.setAttribute("onclick", "srodekstart()");
}

function srodekstart() {
  $("#audio").trigger("play");
  let zmien = document.getElementById("srodek");
  zmien.src = "https://img.icons8.com/ios-glyphs/30/ffffff/pause--v1.png";
  zmien.setAttribute("id", "srodek");
  zmien.setAttribute("onclick", "srodekzatrzymaj()");
}

function nastepny() {
  let zmien = document.getElementById("srodek");
  zmien.innerText = "zatrzymaj";
  zmien.setAttribute("id", "srodek");
  zmien.setAttribute("onclick", "srodekzatrzymaj()");
  console.log(dozmianyutworu);
  var aktualniegrane = document.getElementById("grane").innerText + ".mp3";
  console.log(aktualniegrane);
  for (var i = 0; i < dozmianyutworu.length; i++) {
    if (
      aktualniegrane == dozmianyutworu[i].pliki ||
      aktualniegrane == dozmianyutworu[i]
    ) {
      if (i + 1 < dozmianyutworu.length) {
        $("#audio").trigger("stop");
        document.getElementById("ad").innerHTML = "";
        let nowy = dozmianyutworu[i + 1];
        if (String(nowy) == "[object Object]") {
          console.log("test");
          nowy = dozmianyutworu[i + 1].pliki;
        }
        let nralbumu = document.body.id.substring(
          document.body.id.length - 5,
          document.body.id.length - 4
        );
        let src = "mp3/album" + nralbumu + "/" + nowy;
        let audio = document.createElement("audio");
        audio.setAttribute("id", "audio");
        let source = document.createElement("source");
        source.setAttribute("type", "audio/mp3");
        source.setAttribute("src", src);
        audio.appendChild(source);
        document.getElementById("ad").appendChild(audio);
        let zmianakol = document.getElementsByClassName("tr");
        for (let i = 0; i < zmianakol.length; i++) {
          //zmianakol[i].style.background = "#747474";
          zmianakol[i].style.color = "rgb(192, 192, 192)";
        }
        //document.getElementById("tr" + (i + 1)).style.background = "#FFE400";
        document.getElementById("tr" + (i + 1)).style.color = "#14CCF4";
        document.getElementById("grane").innerText = nowy.slice(0, -4);
        $("#audio").trigger("load");
        $("#audio").trigger("play");
        $("#audio").on("timeupdate", function () {
          document.getElementById("rg").innerHTML = "";
          // document.getElementById('box1').innerHTML = "Czas grania: "
          document.getElementById("aktualnie").innerHTML =
            Math.round($("#audio").prop("currentTime") / 60) +
            "." +
            Math.round($("#audio").prop("currentTime") % 60) +
            " / ";
          document.getElementById("ogolnie").innerHTML =
            Math.round($("#audio").prop("duration") / 60) +
            "." +
            Math.round($("#audio").prop("duration") % 60);
          let input = document.createElement("input");
          input.setAttribute("type", "range");
          input.setAttribute("min", "0");
          let tww = Math.round($("#audio").prop("duration"));

          input.setAttribute("max", tww);
          let cur = Math.round($("#audio").prop("currentTime"));
          input.setAttribute("value", cur);
          input.setAttribute("onclick", "zmienczas(this.value)");
          document.getElementById("rg").appendChild(input);
        });
      } else {
        alert("Nie możesz wykonać tej czynności. To ostatni utwór na liście");
      }
    }
  }
}
function poprzedni() {
  let zmien = document.getElementById("srodek");
  zmien.innerText = "zatrzymaj";
  zmien.setAttribute("id", "srodek");
  zmien.setAttribute("onclick", "srodekzatrzymaj()");
  console.log(dozmianyutworu);
  var aktualniegrane = document.getElementById("grane").innerText + ".mp3";
  console.log(aktualniegrane);
  for (var i = 0; i < dozmianyutworu.length; i++) {
    if (
      aktualniegrane == dozmianyutworu[i].pliki ||
      aktualniegrane == dozmianyutworu[i]
    ) {
      if (i > 0) {
        $("#audio").trigger("stop");
        document.getElementById("ad").innerHTML = "";
        let nowy = dozmianyutworu[i - 1];
        if (String(nowy) == "[object Object]") {
          console.log("test");
          nowy = dozmianyutworu[i - 1].pliki;
        }
        let nralbumu = document.body.id.substring(
          document.body.id.length - 5,
          document.body.id.length - 4
        );
        let src = "mp3/album" + nralbumu + "/" + nowy;
        let audio = document.createElement("audio");
        audio.setAttribute("id", "audio");
        let source = document.createElement("source");
        source.setAttribute("type", "audio/mp3");
        source.setAttribute("src", src);
        audio.appendChild(source);
        document.getElementById("ad").appendChild(audio);
        let zmianakol = document.getElementsByClassName("tr");
        for (let i = 0; i < zmianakol.length; i++) {
          //zmianakol[i].style.background = "#747474";
          zmianakol[i].style.color = "rgb(192, 192, 192)";
        }
        //document.getElementById("tr" + (i - 1)).style.background = "#FFE400";
        document.getElementById("tr" + (i - 1)).style.color = "#14CCF4";
        document.getElementById("grane").innerText = nowy.slice(0, -4);
        $("#audio").trigger("load");
        $("#audio").trigger("play");
        $("#audio").on("timeupdate", function () {
          document.getElementById("rg").innerHTML = "";
          // document.getElementById('box1').innerHTML = "Czas grania: "
          document.getElementById("aktualnie").innerHTML =
            Math.round($("#audio").prop("currentTime") / 60) +
            "." +
            Math.round($("#audio").prop("currentTime") % 60) +
            " / ";
          document.getElementById("ogolnie").innerHTML =
            Math.round($("#audio").prop("duration") / 60) +
            "." +
            Math.round($("#audio").prop("duration") % 60);
          let input = document.createElement("input");
          input.setAttribute("type", "range");
          input.setAttribute("min", "0");
          let tww = Math.round($("#audio").prop("duration"));

          input.setAttribute("max", tww);
          let cur = Math.round($("#audio").prop("currentTime"));
          input.setAttribute("value", cur);
          input.setAttribute("onclick", "zmienczas(this.value)");
          document.getElementById("rg").appendChild(input);
        });
      } else {
        alert(
          "Nie możesz wykonać tej czynności. To jest pierwszy utwór na liście"
        );
      }
    }
  }
}
function dodajdobazy(id) {
  $("#audio").trigger("stop");
  document.getElementById(id).src =
    "https://img.icons8.com/material-outlined/24/ffffff/minus.png";
  let nr = id.substring(0, 1);
  let element = document.getElementById(nr + " td2").innerText;
  let bodynr = document.body.id.substring(
    document.body.id.length - 5,
    document.body.id.length - 4
  );
  let al = "album" + bodynr;
  $.ajax({
    url: "add",
    type: "POST",
    data: { action: "DODAJDOBAZY", piosenka: element, album: al },
    success: function (data) {
      let obj = JSON.parse(data);
      console.log(obj._id);
      document.getElementById(id).setAttribute("onclick", "usunzbazy(this.id)");
      let nu = document.getElementsByClassName(nr + " td5");
      nu[0].setAttribute("id", obj._id);
    },
  });
}
function usunzbazy(id) {
  $("#audio").trigger("stop");
  document.getElementById(id).src =
    "https://img.icons8.com/material-outlined/24/ffffff/plus-math.png";
  let nr = id.substring(0, 1);
  let idbaza = document.getElementsByClassName(nr + " td5");
  console.log(idbaza[0]);
  let element = document.getElementById(nr + " td2").innerText;
  let bodynr = document.body.id.substring(
    document.body.id.length - 5,
    document.body.id.length - 4
  );
  let al = "album" + bodynr;
  $.ajax({
    url: "remove",
    type: "POST",
    data: { action: "USUNZBAZY", id: idbaza[0].id },
    success: function (data) {
      let obj = JSON.parse(data);
      document
        .getElementById(id)
        .setAttribute("onclick", "dodajdobazy(this.id)");
      console.log("Usunięto z bazy");
    },
  });
}

//Rozwijana playlista
var coll = document.getElementById("collapsible");
var i;
coll.addEventListener("click", function () {
  $.ajax({
    url: "/wyslijplayliste",
    type: "POST",
    data: { action: "LISTA" },
    success: function (data) {
      var obj = JSON.parse(data);
      console.log(obj);
      let table = document.createElement("table");
      for (let i = 0; i < obj.lista[0].length; i++) {
        let tr = document.createElement("tr");
        tr.setAttribute("id", "ptr" + i);
        tr.setAttribute("class", "ptr");
        let td1 = document.createElement("td");
        td1.setAttribute("id", obj.lista[0][i].album);
        td1.setAttribute("class", i + "class");
        td1.innerHTML = i;
        tr.appendChild(td1);
        let td2 = document.createElement("td");
        td2.setAttribute("id", i + " ptd2");
        td2.innerHTML = obj.lista[0][i].piosenka;
        tr.appendChild(td2);
        let td4 = document.createElement("img");
        td4.setAttribute("id", i + " ptd4");
        td4.setAttribute("class", "add");
        td4.setAttribute("onclick", "usunzbazy(this.id)");
        td4.src =
          "https://img.icons8.com/material-outlined/24/ffffff/minus.png";
        tr.appendChild(td4);
        let td5 = document.createElement("td");
        td5.setAttribute("class", i + " td5");
        td5.setAttribute("id", obj.lista[0][i]._id);
        tr.appendChild(td5);
        tr.setAttribute("onclick", "playlist(this.id)");
        tr.appendChild(td5);
        table.appendChild(tr);
      }
      document.getElementById("lista").innerHTML = "";
      document.getElementById("lista").appendChild(table);
    },
  });

  this.classList.toggle("active");
  var content = this.nextElementSibling;
  if (content.style.display === "block") {
    content.style.display = "none";
  } else {
    content.style.display = "block";
  }
});

function playlist(id) {
  $("#audio").trigger("stop");
  document.getElementById("ad").innerHTML = "";
  let audio = document.createElement("audio");
  audio.setAttribute("id", "audio");
  let source = document.createElement("source");
  let nrr = id.substring(id.length - 1, id.length);
  let albucalss = document.getElementsByClassName(nrr + "class");
  let album = albucalss[0].id;
  console.log(album);
  let utwors = document.getElementById(nrr + " ptd2").innerText + ".mp3";
  console.log(utwors);
  document.getElementById("grane").innerHTML = utwors.slice(0, -4);
  let sciezka = "mp3/" + album + "/" + utwors;
  console.log(sciezka);
  source.setAttribute("src", sciezka);
  source.setAttribute("type", "audio/mp3");
  audio.appendChild(source);
  document.getElementById("ad").appendChild(audio);
  $("#audio").trigger("load");
  $("#audio").trigger("play");

  $("#audio").on("timeupdate", function () {
    document.getElementById("rg").innerHTML = "";
    // document.getElementById('box1').innerHTML = "Czas grania: "
    document.getElementById("aktualnie").innerHTML =
      Math.round($("#audio").prop("currentTime") / 60) +
      "." +
      Math.round($("#audio").prop("currentTime") % 60) +
      " / ";
    document.getElementById("ogolnie").innerHTML =
      Math.round($("#audio").prop("duration") / 60) +
      "." +
      Math.round($("#audio").prop("duration") % 60);
    let input = document.createElement("input");
    input.setAttribute("type", "range");
    input.setAttribute("min", "0");
    let tww = Math.round($("#audio").prop("duration"));

    input.setAttribute("max", tww);
    let cur = Math.round($("#audio").prop("currentTime"));
    input.setAttribute("value", cur);
    input.setAttribute("onclick", "zmienczas(this.value)");
    document.getElementById("rg").appendChild(input);
  });
}
