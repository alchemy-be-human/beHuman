module.exports = class Tip {
    id;
    tip;

    constructor(row) {
        this.id = row.id;
        this.tip = row.tip;
    }
};
