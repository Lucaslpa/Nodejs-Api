module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Employees_Vehicles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true,
      },
      id_employer: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      id_vehicle: {
        allowNull: false,
        type: Sequelize.INTEGER,
        unique: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Employees_Vehicles');
  },
};
