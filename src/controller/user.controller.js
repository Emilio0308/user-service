const catchAsync = require('../utils/CatchAsync');
const UserModel = require('../model/user.model');
const AppError = require('../utils/AppError');
const generateJWT = require('../utils/generateJWT');
const bcrypt = require('bcryptjs');
const { sendToRabbitMQ } = require('../rabbitmq/producer');

exports.CreateUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const userByEmail = await UserModel.findOne({
    where: { email },
  });

  if (userByEmail) {
    next(new AppError('un usuario con este email ya existe', 400));
  }
  const newUser = await UserModel.create({ name, email, password });

  const JWT = await generateJWT(newUser.id);

  return res.status(200).json({
    message: 'succes create',
    newUser,
    JWT
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const userByEmail = await UserModel.findOne({
    where: { email },
  });

  if (!userByEmail) {
    next(new AppError('usuario no encontrado', 404));
  }

  const passwordIsValid = await bcrypt.compare(password, userByEmail.password);

  if (!passwordIsValid) {
    next(new AppError('contraseña errada', 401));
  }

  const JWT = await generateJWT(userByEmail.id);
  return res.json({
    status: 'ok',
    message: 'succes',
    JWT,
    id: userByEmail.id,
    userByEmail,
  });
});

exports.update = catchAsync(async (req, res, next) => {
  return res.json({
    info: req.body,
  });
});
exports.getAllContacts = catchAsync(async (req, res, next) => {

  const users = await UserModel.findAll()

  return res.json({
    users
  });
});

exports.sendEmail = catchAsync(async (req, res, next) => {
  const { email, message, subject } = req.body;
  const method='send-message'
  const mqMessage =JSON.stringify({ email, message, subject } )

  sendToRabbitMQ('email-service', mqMessage, method);

  return res.json({
    status: 'ok',
  });
});
