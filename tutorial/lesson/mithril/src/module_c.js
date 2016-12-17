import m from "mithril";

console.log("module C is loaded");

module.exports = {
   view: function () {
       return m("h1", "module C");
   }
};