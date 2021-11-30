var http = require("http");
var fs = require("fs");
var qs = require("querystring");
var Datastore = require("nedb");
var formidable = require("formidable");
var coll1 = new Datastore({
  filename: "playlista.db",
  autoload: true,
});
var tablica2 = { files: [], size: [], lista: [] };
var tablica = { dirs: [], files: [], okladka: [], size: [], lista: [] };

fs.readdir(__dirname + "/mp3", function (err, files) {
  if (err) {
    return console.log(err);
  }
  files.forEach(function (fileName) {
    tablica.dirs.push(fileName);
  });
  coll1.find({}, function (err, docs) {
    console.log(docs);
    tablica.lista = [];
    tablica.lista.push(docs);
    tablica2.lista = [];
    tablica2.lista.push(docs);
  });

  for (let i = 0; i < tablica.dirs.length; i++) {
    fs.readdir(__dirname + "/mp3/" + tablica.dirs[i], function (err, files) {
      if (err) {
        return console.log(err);
      }
      files.forEach(function (fileName) {
        var last3 = fileName.substring(fileName.length - 3, fileName.length);
        if (last3 == "jpg") {
          tablica.okladka.push({ okladka: fileName });
        } else {
          if (i == 0) {
            tablica.files.push({ pliki: fileName });
            let tet = tablica.dirs[i];
            let stats = fs.statSync(__dirname + "/mp3/" + tet + "/" + fileName);
            console.log(fileName);
            let rozmiar = stats.size;
            console.log(rozmiar);
            console.log(stats.isFile());
            tablica.size.push({ size: rozmiar });
          }
        }
        console.log(tablica);
      });
    });
  }
});

var server = http.createServer(function (req, response) {
  switch (req.method) {
    case "GET":
      if (req.url === "/") {
        fs.readFile("static/index.html", function (error, data) {
          response.writeHead(200, { "Content-Type": "text/html" });
          response.write(data);
          response.end();
        });
      } else if (req.url === "/admin") {
        fs.readFile("static/admin.html", function (error, data) {
          response.writeHead(200, { "Content-Type": "text/html" });
          response.write(data);
          response.end();
        });
      } else if (req.url == "/style.css") {
        fs.readFile("static/style.css", function (error, data) {
          response.writeHead(200, { "Content-Type": "text/css" });
          response.write(data);
          response.end();
        });
      } else if (req.url == "/iframe.html") {
        fs.readFile("static/iframe.html", function (error, data) {
          response.writeHead(200, { "Content-Type": "text/html" });
          response.write(data);
          response.end();
        });
      } else if (req.url == "/Ui.js") {
        fs.readFile("static/Ui.js", function (error, data) {
          response.writeHead(200, { "Content-Type": "application/javascript" });
          response.write(data);
          response.end();
        });
      } else if (req.url == "/Net.js") {
        fs.readFile("static/Net.js", function (error, data) {
          response.writeHead(200, { "Content-Type": "application/javascript" });
          response.write(data);
          response.end();
        });
      } else if (req.url == "/Main.js") {
        fs.readFile("static/Main.js", function (error, data) {
          response.writeHead(200, { "Content-Type": "application/javascript" });
          response.write(data);
          response.end();
        });
      } else if (req.url.indexOf(".jpg") != -1) {
        let urll = req.url;
        let albumm = urll.substring(urll.length - 5, urll.length - 4);
        console.log(albumm);
        let rrr = "/okladka" + albumm.toString() + ".jpg";
        console.log(rrr);
        if (req.url == rrr) {
          let sciezkaa = "mp3/album" + albumm + decodeURI(req.url);
          let sc = sciezkaa.toString();
          console.log(sc);
          console.log("---------");
          fs.readFile(String(sc), function (error, data) {
            response.writeHead(200, { "Content-type": "image/jpeg" });
            response.write(data);
            response.end();
          });
        }
      } else if (req.url.indexOf(".mp3") != -1) {
        let sc = decodeURI(req.url.substring(1, req.url.length));
        console.log(sc);
        fs.readFile(decodeURI(sc), function (error, data) {
          response.writeHead(200, { "Content-type": "audio/mpeg" });
          response.write(data);
          response.end();
        });
      }
      break;
    case "POST":
      if (req.url == "/uploadd") {
        var numerwlasciwy = 0;
        fs.readdir(__dirname + "/mp3/", function (err, files) {
          var tab = files.sort();
          var a = tab[tab.length - 1];
          var numer = a.substring(a.length - 1, a.length);
          var numint = parseInt(numer);
          numerwlasciwy = numint + 1;

          uploadTable = [];
          var form = new formidable.IncomingForm();
          var d = new Date();
          var dirName = Date.parse(d);
          var dir = "mp3/album" + numerwlasciwy;
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
          }

          form.uploadDir = "mp3/album" + numerwlasciwy + "/"; // katalog na zuploadowane pliki

          form.parse(req, function (err, fields, files) {});
          form.on("fileBegin", function (name, value) {
            console.log(value);
            uploadTable.push(value.name);
            value.path = dir + "/" + value.name;
          });
          form.on("end", function () {
            response.end(JSON.stringify("Zapisano"));
          });
          fs.readdir(__dirname + "/mp3", function (err, files) {
            files.forEach(function (fileName) {
              tablica.dirs.push(fileName);
            });
            coll1.find({}, function (err, docs) {
              tablica.lista = [];
              tablica.lista.push(docs);
              tablica2.lista = [];
              tablica2.lista.push(docs);
            });
          });
        });
      }
      console.log(req.url);
      function servResponse() {
        var przychodzace;
        var parsowaneprzychodzace;
        req.on("data", function (data) {
          przychodzace += data;
          parsowaneprzychodzace = qs.parse(przychodzace);
        });

        req.on("end", function (data) {
          try {
            console.log(parsowaneprzychodzace);
            let akcja = parsowaneprzychodzace.undefinedaction;

            if (akcja == "NEXT") {
              coll1.find({}, function (err, docs) {
                console.log(docs);
                tablica.lista.push(docs);
                tablica2.lista = [];
                tablica2.lista.push(docs);
              });

              let kat = parsowaneprzychodzace.nazwakat;
              let numer = kat.substring(kat.length - 5, kat.length - 4);
              let tablicaposrednia = [];
              let tablicaposredniasize = [];
              fs.readdir(
                __dirname + "/mp3/album" + numer,
                function (err, files) {
                  files.forEach(function (fileName) {
                    let last3 = fileName.substring(
                      fileName.length - 3,
                      fileName.length
                    );
                    if (last3 == "jpg") {
                      console.log("pomijam");
                    } else {
                      tablicaposrednia.push(fileName);

                      let stats = fs.statSync(
                        __dirname + "/mp3/album" + numer + "/" + fileName
                      );
                      let rozmiar = stats.size;

                      tablicaposredniasize.push(rozmiar);
                    }
                  });
                  tablica2.files = tablicaposrednia;
                  tablica2.size = tablicaposredniasize;
                  response.end(JSON.stringify(tablica2));
                }
              );
            }
            if (akcja == "DODAJDOBAZY") {
              console.log("start");
              let zmi = "";
              coll1.insert(parsowaneprzychodzace, function (err, newDoc) {
                response.end(JSON.stringify(newDoc));
              });

              console.log("Dodano do bazy");
            }
            if (akcja == "USUNZBAZY") {
              let a = parsowaneprzychodzace.id;
              console.log(a);
              coll1.remove({ _id: a }, {}, function (err, numRemoved) {
                coll1.persistence.compactDatafile();
                console.log("usunięto dokumentów: ", numRemoved);
              });
              console.log("Usunięto z bazy");
              response.end(JSON.stringify("Usunięto z bazy"));
            }
            if (akcja == "LISTA") {
              coll1.find({}, function (err, docs) {
                console.log(docs);
                tablica2.lista = [];
                tablica2.lista.push(docs);
              });
              response.end(JSON.stringify(tablica2));
              console.log("Wysłano baze do przeglądarki");
            }
          } catch (err) {
            response.end(JSON.stringify(tablica));
          }
        });
      }
      servResponse(req, response);
      break;
  }
});
server.listen(3000, function () {
  console.log("serwer startuje na porcie 3000");
});
