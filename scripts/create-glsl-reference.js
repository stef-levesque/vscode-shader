#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { XMLParser } = require("fast-xml-parser");

const args = process.argv.slice(2);

if (args.length !== 1) {
  console.log("Usage: create-glsl-reference.js <path-to-OpenGL-Refpages/es3>");
  process.exit(1);
}

const refpagesPath = args[0];
const excluded = new RegExp("^([A-Z]|api|gl[A-Z]|buffer|compressed|funchead|internal|render|texbo|unsized|varhead|version)");
const xmlParserOptions = {
  stopNodes: ['refentry.refsect1.variablelist.varlistentry.listitem.para']
};


const getParameter = (parameter) => {
  return {
    label: parameter.term.parameter,
    documentation: parameter.listitem.para.replace('\n', '').trim(),
  }
}
const getParameters = (parameters) => {
  if (Array.isArray(parameters)) {
        return parameters.map(getParameter);
  } else if (!parameters) {
    return [];
  } else {
    return [getParameter(parameters)];
  }
}

const functions = {};
fs
  .readdirSync(refpagesPath)
  .filter((fileName) => fileName.endsWith(".xml"))
  .filter((fileName) => !excluded.test(fileName))
  .map((fileName) => {
    const xml = fs.readFileSync(path.join(refpagesPath, fileName), "utf8");
    try {
      const json = new XMLParser(xmlParserOptions).parse(xml);
      const name = json.refentry.refnamediv.refname;
      const purpose = json.refentry.refnamediv.refpurpose;
      const link = `https://registry.khronos.org/OpenGL-Refpages/es3/html/${name}.xhtml`;
      const parameters = getParameters(json.refentry.refsect1.find(p => p.title === 'Parameters')?.variablelist.varlistentry);
      console.log(`Found ${name} - ${purpose}`);
      return { name, purpose, parameters, link };
    } catch (error) {
      console.log(`Error with ${fileName}: ${error.message}`);
      throw error;
    }
  })
  .forEach((entry) => {
    functions[entry.name] = { description: entry.purpose, parameters: entry.parameters, link: entry.link };
  });

const outputFile = path.join(__dirname, "../src/generated/glsl-reference.json");
fs.writeFileSync(outputFile, JSON.stringify({ functions }, null, 2));
console.log(`Wrote ${Object.keys(functions).length} entries to ${outputFile}`);