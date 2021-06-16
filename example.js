const ring = require('./ring');
const Interface = require('./plugins/interface');

const Human = {
    talk: function() {
        return "hello";
    },
};

var Baby = ring.create({
    crawl: function() {
      return "crawling";
    },
    jump: function() {
        return "jumping";
    },
});

var Man = ring.create([Baby], {
    wings: false,
    work: function() {
      return "working";
    },
});

// This can be exported from module to provide interface of required functions/data by this module
// It can only be used when either of parents in list implements missing function "climb".
module.exports = Interface({
    jump: 'function',
    talk: 'function',
    work: 'function',
    crawl: 'function',
    wings: 'boolean',
    climb: 'function',
}, Human);

// This code can be used outside module
// const HumanEvolved = new importedInterface([Parent1]);
