const YAML = require("yamljs");
const merge = require("lodash.merge");

const todoDoc = YAML.load("./docs/todo.yaml");
const authDoc = YAML.load("./docs/auth.yaml");

const mergedDocs = merge({}, todoDoc, authDoc);

mergedDocs.servers = [
    {
        url: "http://localhost:3000/api",
    },
];

module.exports = mergedDocs;