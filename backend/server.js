"use strict"
var express = require('express');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var model = require('./model');
var app = express();
var cors = require('cors');


app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieSession({
  secret: 'mot-de-passe-du-cookie',
  sameSite: 'lax',
  secure: false
}));


app.get('/api/calories', (req, res) => {
  if (req.session.user !== undefined) {
    let entry1 = model.create_calories(req.session.user);
    res.json({
      calories: entry1.calories,
      fat: entry1.fat,
      carbohydrates: entry1.carbohydrates,
      protein: entry1.protein
    });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

app.get('/api/isLoggedIn', (req, res) => {
  if (req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.json({ user: null });
  }
});

app.get('/api/user', (req, res) => {
  if (req.session.user !== undefined) {
    res.json({ name: req.session.user });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});


app.get('/api/recipes', (req, res) => {
  var found = model.search(req.query.query, req.query.page);
  res.json(found);
});


app.get('/api/recipe/:id', (req, res) => {
  var entry = model.read(req.params.id);
  res.json(entry);
});


app.post('/api/recipes', (req, res) => {
  var recipe = post_data_to_recipe(req);
  var id = model.create(recipe);
  res.status(201).json({ id: id, message: 'Recipe created' });
});


app.put('/api/recipe/:id', (req, res) => {
  var id = req.params.id;
  model.update(id, post_data_to_recipe(req));
  res.json({ message: 'Recipe updated' });
});


app.delete('/api/recipe/:id', (req, res) => {
  model.delete(req.params.id);
  res.json({ message: 'Recipe deleted' });
});


function post_data_to_recipe(req) {
  return {
    title: req.body.title,
    description: req.body.description,
    img: req.body.img,
    ingredients: req.body.ingredients.trim().split(/\s*-/).filter(e => e.length > 0).map(e => ({name: e.trim()})),
    stages: req.body.stages.trim().split(/\s*-/).filter(e => e.length > 0).map(e => ({description: e.trim()})),
  };
}


app.post('/api/login', (req, res) => {
  let user = model.login(req.body.name, req.body.password);
  if (user !== -1) {
    req.session.user = user;
    req.session.name = req.body.name;
    res.json({ message: 'Login successful',
      user: user,
      name: req.body.name});
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.post('/api/logout', (req, res) => {
  req.session = null;
  res.json({ message: 'Logout successful' });
});

app.post('/api/new_user', (req, res) => {
  let user = model.new_user(req.body.name, req.body.password);
  req.session.user = user;
  req.session.name = req.body.name;
  res.json({
    message: 'User created and logged in',
    user: user // Ajoute cette ligne pour inclure l'utilisateur dans la réponse
  });
});


app.post('/api/informations', (req, res) => {
  model.create_informations(post_data_to_informations(req));
  res.json({ message: 'User information saved' });
});


function post_data_to_informations(req) {
  return {
    user: req.session.user,
    gender: req.body.gender,
    weight: req.body.weight,
    height: req.body.height,
    age: req.body.age,
    activity: req.body.activity,
    objectif: req.body.objectif,
  };
}


app.get('/api/exercises', (req, res) => {
  var found = model.search_exercise(req.query.query, req.query.page);
  res.json(found);
});

app.get('/api/exercise/:id', (req, res) => {
  var entry = model.read_exercise(req.params.id);
  res.json(entry);
});

app.post('/api/exercises', (req, res) => {
  var exercise = post_data_to_exercise(req);
  var id = model.create_exercise(exercise);
  res.status(201).json({ id: id, message: 'Exercise created' });
});

app.put('/api/exercise/:id', (req, res) => {
  var id = req.params.id;
  model.update_exercise(id, post_data_to_exercise(req));
  res.json({ message: 'Exercise updated' });
});

app.delete('/api/exercise/:id', (req, res) => {
  model.delete_exercise(req.params.id);
  res.json({ message: 'Exercise deleted' });
});
app.get('/ProgramRecipe/:id', (req, res) => {

  model.create_NutritionProgramme(req.params.id);
  var info = model.ProgramRecipe(req.params.id, req.query.query, req.query.page);

  if (!info) {
    return res.status(404).json({ error: "Programme non trouvé" });
  }

  res.json(info);
});

app.get('/ProgramExercise/:id/:type/:type2',function(req, res) {
  model.create_ExerciseProgramme(req.params.id);
  var info=model.ProgramExercise(req.params.id,req.params.type,req.params.type2,req.query.query, req.query.page);
  if (!info) {
    return res.status(404).json({ error: "Programme non trouvé" });
  }

  res.json(info);
});

function post_data_to_exercise(req) {
  return {
    type: req.body.type,
    title: req.body.title,
    description: req.body.description,
    img: req.body.img,
    benefits: req.body.benefits.trim().split(/\s*-/).filter(e => e.length > 0).map(e => ({description: e.trim()})),
    steps: req.body.steps.trim().split(/\s*-/).filter(e => e.length > 0).map(e => ({description: e.trim()})),
    mistakes: req.body.mistakes.trim().split(/\s*-/).filter(e => e.length > 0).map(e => ({description: e.trim()})),
  };

}


app.listen(3000, () => console.log('Server is running on http://localhost:3000'));
