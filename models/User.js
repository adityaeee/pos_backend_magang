module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(`User`, {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        address: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        dateOfBirth: DataTypes.DATEONLY,

    }, {
        timesTamps: true,
        tableName: 'users'
    });

    return User;
}