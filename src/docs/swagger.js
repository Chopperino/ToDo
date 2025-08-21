const YAML = require("yamljs");
const path = require("path");
const merge = require("lodash.merge");

const todoDoc = YAML.load(path.join(__dirname, "todo.yaml"));
const authDoc = YAML.load(path.join(__dirname, "auth.yaml"));

const mergedDocs = merge({}, todoDoc, authDoc);

mergedDocs.servers = [
  {
    url: "http://localhost:3000/api/v1/",
  },
];

module.exports = mergedDocs;