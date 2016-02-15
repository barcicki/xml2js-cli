'use strict';

const fs = require('fs');
const parse = require('xml2js').parseString;

function xml2json(input, output, options) {
    return new Promise((resolve, reject) => {
        fs.readFile(input, (readErr, rawXml) => {
            if (readErr) {
                reject(readErr);
                return;
            }

            parse(rawXml, options, (parseErr, parsedXml) => {
                if (parseErr) {
                    reject(parseErr);
                    return;
                }

                fs.writeFile(output, JSON.stringify(parsedXml), (writeErr) => {
                    if (writeErr) {
                        reject(writeErr);
                        return;
                    }

                    resolve();
                })
            });
        });
    });
}

module.exports = {
    xml2json
};