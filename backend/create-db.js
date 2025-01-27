"use strict"

const fs = require('fs');
const Sqlite = require('better-sqlite3');

let db = new Sqlite('db.sqlite');


let load = function(filename,filename1) {
  const recipes = JSON.parse(fs.readFileSync(filename));
  const exercises = JSON.parse(fs.readFileSync(filename1));


  db.prepare('DROP TABLE IF EXISTS recipe').run();
  db.prepare('DROP TABLE IF EXISTS ingredient').run();
  db.prepare('DROP TABLE IF EXISTS exercise').run();
  db.prepare('DROP TABLE IF EXISTS ProgramExercise').run();
  db.prepare('DROP TABLE IF EXISTS ProgramRecipe').run();
  db.prepare('DROP TABLE IF EXISTS stage').run();
  db.prepare('DROP TABLE IF EXISTS user').run();
  db.prepare('DROP TABLE IF EXISTS nutritionValue').run();
  db.prepare('DROP TABLE IF EXISTS steps').run();
  db.prepare('DROP TABLE IF EXISTS mistakes').run();
  db.prepare('DROP TABLE IF EXISTS benefits').run();
  db.prepare('DROP TABLE IF EXISTS informations').run();
  db.prepare('DROP TABLE IF EXISTS calories').run();





  db.prepare('CREATE TABLE recipe (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT,type TEXT, img TEXT, description TEXT)').run();
  db.prepare('CREATE TABLE ingredient (recipe INT, rank INT, name TEXT)').run();
  db.prepare('CREATE TABLE exercise (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT,title TEXT, description TEXT,img TEXT)').run();
  db.prepare('CREATE TABLE ProgramExercise(iduser INT NOT NULL,idexercise INT NOT NULL,  PRIMARY KEY (iduser, idexercise)) ').run();
  db.prepare('CREATE TABLE ProgramRecipe(iduser INT NOT NULL,idrecipe INT NOT NULL,  PRIMARY KEY (iduser, idrecipe)) ').run();
  db.prepare('CREATE TABLE stage (recipe INT, rank INT, description TEXT)').run();
  db.prepare('CREATE TABLE user (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, password TEXT)').run();
  db.prepare('CREATE TABLE nutritionValue (recipe INT,calories INT, protein INT,carbs INT,fat INT)').run();
  db.prepare('CREATE TABLE benefits (exercise INT, rank INT, description TEXT)').run();
  db.prepare('CREATE TABLE steps (exercise INT, rank INT, description TEXT)').run();
  db.prepare('CREATE TABLE mistakes (exercise INT, rank INT, description TEXT)').run();
  db.prepare('CREATE TABLE informations (user INT,gender TEXT, weight FLOAT, height FLOAT,age INT,activity TEXT,objectif TEXT)').run();
  db.prepare('CREATE TABLE calories (user INT,calories INT,protein INT,carbohydrates INT,fat INT)').run();



  let insert1 = db.prepare('INSERT OR IGNORE INTO recipe VALUES (@id, @title,@type, @img, @description)');
  let insert2 = db.prepare('INSERT INTO ingredient VALUES (@recipe, @rank, @name)');
  let insert3 = db.prepare('INSERT INTO stage VALUES (@recipe, @rank, @description)');
  let insert4 = db.prepare('INSERT INTO nutritionValue VALUES (@recipe,@calories, @protein,@carbs,@fat)');

  let insert5 = db.prepare('INSERT INTO exercise VALUES(@id,@type,@title,@description,@img) ');
  let insert6 = db.prepare('INSERT INTO benefits VALUES(@exercise,@rank,@description) ');
  let insert7 = db.prepare('INSERT INTO steps VALUES(@exercise,@rank,@description) ');
  let insert8 = db.prepare('INSERT INTO mistakes VALUES(@exercise,@rank,@description) ');





  let transaction = db.transaction((recipes,exercises) => {

    for(let id = 0;id < recipes.length; id++) {
      let recipe = recipes[id];
      recipe.id = id;
      insert1.run(recipe);
      for(let j = 0; j < recipe.ingredients.length;j++){
        insert2.run({recipe: id, rank: j, name: recipe.ingredients[j].name});
      }
      for(let j = 0; j < recipe.stages.length; j++) {
        insert3.run({recipe: id, rank: j, description: recipe.stages[j].description});
      }
      insert4.run({recipe:id,calories:recipe.nutrition_values[0].calories,protein:recipe.nutrition_values[1].protein,carbs:recipe.nutrition_values[2].carbohydrates,fat:recipe.nutrition_values[3].fat});
    }

    for(let id = 0;id < exercises.length; id++) {
      let exercise = exercises[id];
      exercise.id = id;
      insert5.run({id:id,type:exercise.type,title:exercise.title,description:exercise.description,img:exercise.img});
      for(let j = 0; j < exercise.benefits.length;j++){
        insert6.run({exercise: id, rank: j, description: exercise.benefits[j]});
      }
      for(let j = 0; j < exercise.steps.length; j++) {
        insert7.run({exercise: id, rank: j, description: exercise.steps[j].step});
      }
      for(let j = 0; j < exercise.mistakes.length; j++) {
        insert8.run({exercise: id, rank: j, description: exercise.mistakes[j].mistake});
      }
    }
  });

  transaction(recipes,exercises);
}

load('nutrition.json','workout.json');




