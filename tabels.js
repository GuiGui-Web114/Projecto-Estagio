const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('./database');


// Definição das tabelas
const Carga = sequelize.define('Carga', {
  nome_produto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  destinatario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});



const User = sequelize.define('User', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contacto: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.ENUM('Regular', 'Administrador'),
    allowNull: false,
  },
});

const Motorista = sequelize.define('Motorista', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contacto: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  numero_passe: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Viatura = sequelize.define('Viatura', {
  matricula: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  codigo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  modelo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

const Marca = sequelize.define('Marca', {
  marca: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Modelo = sequelize.define('Modelo', {
  modelo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Agencia = sequelize.define('Agencia', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Municipio_Agencia = sequelize.define('Municipio_Agencia', {
  municipio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Provincia_Agencia = sequelize.define('Provincia_Agencia', {
  provincia: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});



// Relacionamento um para um entre Carga e Agencia
Carga.belongsTo(Agencia, {
  foreignKey: 'agenciaId',
  as: 'agencia', // Alias
});

// Relacionamento um para um entre Carga e Municipio_Agencia (origem)
Carga.belongsTo(Municipio_Agencia, {
  foreignKey: 'municipioOrigemId',
  as: 'municipioOrigem', // Alias
});

// Relacionamento um para um entre Carga e Municipio_Agencia (destino)
Carga.belongsTo(Municipio_Agencia, {
  foreignKey: 'municipioDestinoId', // Destino
  as: 'municipioDestino'
});

// Relacionamento um para um entre Motorista e Viatura
Motorista.hasOne(Viatura, {
  foreignKey: 'motoristaId',
});
Viatura.belongsTo(Motorista, {
  foreignKey: 'motoristaId',
});

// Relacionamento um para muitos entre Municipio_Agencia e Agencia
Municipio_Agencia.hasMany(Agencia, {
  foreignKey: 'municipioId', // Chave estrangeira que será usada no 'Agencia'
});
Agencia.belongsTo(Municipio_Agencia, {
  foreignKey: 'municipioId', // Chave estrangeira na tabela 'Agencia'
});

// Relacionamento um para muitos entre Provincia_Agencia e Municipio_Agencia
Provincia_Agencia.hasMany(Municipio_Agencia, {
  foreignKey: 'provinciaId',
});
Municipio_Agencia.belongsTo(Provincia_Agencia, {
  foreignKey: 'provinciaId',
});

// Relacionamento de 1 para N: Marca tem vários Modelos
Marca.hasMany(Modelo, {
  foreignKey: 'marcaId',  // Chave estrangeira em Modelo
  as: 'modelos' // Alias para a relação
});

Modelo.belongsTo(Marca, {
  foreignKey: 'marcaId', // Chave estrangeira em Modelo
  as: 'marca' // Alias para a relação
});

// Relacionamento de 1 para N: Modelo tem várias Viaturas
Modelo.hasMany(Viatura, {
  foreignKey: 'modeloId', // Chave estrangeira em Viatura
  as: 'viaturas' // Alias para a relação
});

Viatura.belongsTo(Modelo, {
  foreignKey: 'modeloId', // Chave estrangeira em Viatura
  as: 'modeloViatura' // Alias alterado para evitar colisão
});

Viatura.hasMany(Carga, {
  foreignKey: 'viaturaId', // A chave estrangeira em Carga
  as: 'cargas', // Alias para a relação
});

// Relacionamento: Cada Carga pertence a uma Viatura (N para 1)
Carga.belongsTo(Viatura, {
  foreignKey: 'viaturaId', // A chave estrangeira em Carga
  as: 'viatura', // Alias para a relação
});

Agencia.hasMany(Viatura, {
  foreignKey: 'agenciaId',
  as: 'viaturas', // Alias para a relação
});

// Relacionamento N para 1: Cada Viatura pertence a uma Agência
Viatura.belongsTo(Agencia, {
  foreignKey: 'agenciaId',
  as: 'agencia', // Alias para a relação
});



// Hook para fazer hash da senha antes de salvar no banco de dados
/* User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
}); */

// Exportando os modelos
module.exports = {
  User,
  Carga,
  Motorista,
  Viatura,
  Marca,
  Modelo,
  Agencia,
  Municipio_Agencia,
  Provincia_Agencia,
};
