
module.exports = (sequelize, DataTypes)=>{
  const clients = sequelize.define('clients',{
    client_name :
    {
      allowNull : false,
      type      : DataTypes.STRING,
      validate  :
        {
          len : { args : [1,30], msg : "Must be between 1 and 30 characters."}
        }
    },
    phone_number :
    {
      type : DataTypes.INTEGER
    },
    monthly_income :
    {
      type : DataTypes.DECIMAL(12,4)
    },
    job_title :
    {
      type : DataTypes.STRING
    },
    principle : // 50/30/20 Principle is default 1
    {
      type : DataType.INTEGER,
      defaultValue : 1
    },
    current_savings :
    {
      type : DataTypes.DECIMAL(12,4)
    }
  });

  clients.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    clients.hasMany(models.fixedcosts, {
      onDelete: "cascade"
    });
    clients.hasMany(models.flexspend, {
      onDelete: "cascade"
    });
    clients.hasMany(models.goals, {
      onDelete: "cascade"
    });
  };

  return clients;
}
