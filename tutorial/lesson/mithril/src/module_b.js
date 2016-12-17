import m from "mithril";

console.log("module B is loaded");

module.exports = {
   view: function () {
       return m("h1", "module B");
   }
};