import m from "mithril";

console.log("module A is loaded");

module.exports = {
   view: function () {
       return m("h1", "module A");
   }
};