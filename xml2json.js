#!/usr/bin/env node
'use strict';

const argv = require('yargs')
    .usage('Usage: $0 <input> [<output>] [options]')
    .command('input', 'Input file with XML')
    .command('output', 'Output file where JSON should be stored')
    .demand(1)
    .boolean(['object', 'reversible', 'coerce', 'sanitize', 'trim', 'arrayNotation'])
    .alias('o', 'object')
    .alias('r', 'reversible')
    .alias('c', 'coerce')
    .alias('s', 'sanitize')
    .alias('t', 'trim')
    .alias('a', 'arrayNotation')
    .describe('object', 'Returns a Javascript object instead of a JSON string')
    .describe('reversible', 'Makes the JSON reversible to XML (*)')
    .describe('coerce', 'Makes type coercion. i.e.: numbers and booleans present in attributes and element values are converted from string to its correspondent data types. Coerce can be optionally defined as an object with specific methods of coercion based on attribute name or tag name, with fallback to default coercion.')
    .describe('trim', 'Removes leading and trailing whitespaces as well as line terminators in element values.')
    .describe('arrayNotation', 'XML child nodes are always treated as arrays')
    .describe('sanitize', 'Sanitizes the following characters present in element values:')
    .help('help')
    .alias('h', 'help')
    .argv;

const input = argv._[0];
const output = argv._[1] || (input.lastIndexOf('.xml') > 0 ? input.replace('.xml', '.json') : input + '.json');

console.log(input, output);
