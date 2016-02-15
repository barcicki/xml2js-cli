#!/usr/bin/env node
'use strict';

const argv = require('yargs')
    .usage('Usage: $0 <input> [<output>] [options]')
    .command('input', 'Input file with XML')
    .command('output', 'Output file where JSON should be stored')
    .demand(1)
    .boolean(['explicitArray', 'explicitRoot', 'trim'])

    .alias('m', 'mergeAttrs')
    .describe('mergeAttrs', 'Merge attributes and child elements as properties of the parent, instead of keying attributes off a child attribute object')
    .default('mergeAttrs', true)

    .alias('a', 'explicitArray')
    .describe('explicitArray', 'Always put child nodes in an array if true; otherwise an array is created only if there is more than one.')

    .alias('c', 'charkey')
    .describe('charkey', 'Prefix that is used to access the character content.')
    .default('charkey', 'content')

    .alias('r', 'explicitRoot')
    .describe('explicitRoot', 'Set this if you want to get the root node in the resulting object.')

    .alias('t', 'trim')
    .describe('trim', 'Trim the whitespace at the beginning and end of text nodes.')
    .default('trim', true)

    .help('help')
    .alias('h', 'help')
    .argv;

const input = argv._[0];
const output = argv._[1] || (input.lastIndexOf('.xml') > 0 ? input.replace('.xml', '.json') : input + '.json');
const convert = require('./convert');

// non-configurable options for xml2js
argv.mergeAttrs = true;

console.log(`Converting ${input} to ${output}`);
convert.xml2json(input, output, argv)
    .then(() => console.log('Completed.'), (err) => `Failed due to error: ${err.message}`);