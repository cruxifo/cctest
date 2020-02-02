var faker = require("faker");
var lodash = require("lodash");

const data = [];
const csv = true;
const MAX_DUPES = 20;

let dupes = 0;
Array.from({ length: 10_000 }).forEach((_, i) => {
     let num;
     num = `00447777${i.toString(10).padStart(6, "0")}`;
     if (Math.random() > 0.99) {
          // invalid
          num = "x" + num;
     }
     let row;
     if (csv) {
          const name = faker.name.findName();
          row = [`"${name}"`, "", "", "", "", `${num}`].join(",");
     } else {
          row = [faker.name.findName(), "", "", "", "", `${num}`];
     }
     data.push(row);
     if (dupes < MAX_DUPES) {
          if (Math.random() > 0.98) {
               // duplicate
               dupes++;
               data.push(row);
          } else if (Math.random() > 0.99) {
               // triplicate
               dupes++;
               data.push(row);
               data.push(row);
          }
     }
});

// Shuffle to random order
out = lodash.shuffle(data);
if (csv) {
     console.log(out.join("\n"));
} else {
     console.log(JSON.stringify(out));
}
