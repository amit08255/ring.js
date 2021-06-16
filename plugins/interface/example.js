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

var Spider = ring.create([Man], {
    climb: function() {
      return "climbing";
    },
});

// This can be exported from module to provide interface of required functions/data by this module
const interface = Interface({
    jump: 'function',
    talk: 'function',
    work: 'function',
    crawl: 'function',
    wings: 'boolean',
}, Human);

// This code can be used outside module
const HumanEvolved = new interface([Spider]);
