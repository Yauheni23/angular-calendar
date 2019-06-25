const GUIDES = 'guides';

module.exports = (sequelize, Sequelize) => {
    return sequelize.define(GUIDES, {
        name: {
            type: Sequelize.STRING,
        },
        startDate: {
            type: Sequelize.DATE,
        },
        endDate: {
            type: Sequelize.DATE,
        },
    });
};
