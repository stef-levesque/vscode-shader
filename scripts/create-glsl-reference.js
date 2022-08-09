#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { XMLParser } = require("fast-xml-parser");
const he = require("he");

const args = process.argv.slice(2);

if (args.length !== 1) {
  console.log("Usage: create-glsl-reference.js <path-to-OpenGL-Refpages/es3>");
  process.exit(1);
}

const refpagesPath = args[0];
const excluded = new RegExp("^([A-Z]|api|gl[A-Z]|buffer|compressed|funchead|internal|render|texbo|unsized|varhead|version)");
const xmlParserOptions = {
  attributeNamePrefix: "@_",
  attrNodeName: "attr", //default is 'false'
  textNodeName: "#text",
  ignoreAttributes: true,
  ignoreNameSpace: false,
  allowBooleanAttributes: false,
  parseNodeValue: true,
  parseAttributeValue: false,
  trimValues: true,
  cdataTagName: "__cdata", //default is 'false'
  cdataPositionChar: "\\c",
  parseTrueNumberOnly: false,
  numParseOptions: {
    hex: true,
    leadingZeros: true,
    //skipLike: /\+[0-9]{10}/
  },
  arrayMode: false, //"strict"
  attrValueProcessor: (val, attrName) =>
    he.decode(val, { isAttributeValue: true }), //default is a=>a
  tagValueProcessor: (val, tagName) => he.decode(val), //default is a=>a
  stopNodes: ["parse-me-as-string"],
  alwaysCreateTextNode: false,
};

const functions = {};
fs
  .readdirSync(refpagesPath)
  .filter((fileName) => fileName.endsWith(".xml"))
  .filter((fileName) => !excluded.test(fileName))
  .map((fileName) => {
    const xml = fs.readFileSync(path.join(refpagesPath, fileName), "utf8");
    try {
      const json = new XMLParser().parse(xml, xmlParserOptions, true);
      const name = json.refentry.refnamediv.refname;
      const purpose = json.refentry.refnamediv.refpurpose;
      console.log(`Found ${name} - ${purpose}`);
      return { name, purpose };
    } catch (error) {
      console.log(`Error with ${fileName}: ${error.message}`);
      throw error;
    }
  })
  .forEach((entry) => {
    functions[entry.name] = { description: entry.purpose };
  });

const outputFile = path.join(__dirname, "../src/generated/glsl-reference.json");
fs.writeFileSync(outputFile, JSON.stringify({ functions }, null, 2));
console.log(`Wrote ${Object.keys(functions).length} entries to ${outputFile}`);