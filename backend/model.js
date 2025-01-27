"use strict"
const Sqlite = require('better-sqlite3');

let db = new Sqlite('db.sqlite');

exports.read = (id) => {
  var found = db.prepare('SELECT * FROM recipe WHERE id = ?').get(id);
  if(found !== undefined) {
    found.ingredients = db.prepare('SELECT name FROM ingredient WHERE recipe = ? ORDER BY rank').all(id);
    found.stages = db.prepare('SELECT description FROM stage WHERE recipe = ? ORDER BY rank').all(id);
    return found;
  } else {
    return null;
  }
};

exports.create = function(recipe) {
  var id = db.prepare('INSERT INTO recipe (title,type, img, description) VALUES (@title,@type, @img, @description)').run(recipe).lastInsertRowid;

  var insert1 = db.prepare('INSERT INTO ingredient VALUES (@recipe, @rank, @name)');
  var insert2 = db.prepare('INSERT INTO stage VALUES (@recipe, @rank, @description)');

  var transaction = db.transaction((recipe) => {
    for(var j = 0; j < recipe.ingredients.length; j++) {
      insert1.run({recipe: id, rank: j, name: recipe.ingredients[j].name});
    }
    for(var j = 0; j < recipe.stages.length; j++) {
      insert2.run({recipe: id, rank: j, description: recipe.stages[j].description});
    }
  });

  transaction(recipe);
  return id;
}

exports.update = function(id, recipe) {
  var informations = db.prepare('UPDATE recipe SET title = @title,type=@type, img = @img, description = @description WHERE id = ?').run(recipe, id);
  if(informations.changes == 1) {
    var insert1 = db.prepare('INSERT INTO ingredient VALUES (@recipe, @rank, @name)');
    var insert2 = db.prepare('INSERT INTO stages VALUES (@recipe, @rank, @description)');

    var transaction = db.transaction((recipe) => {
      db.prepare('DELETE FROM ingredient WHERE recipe = ?').run(id);
      for(var j = 0; j < recipe.ingredients.length; j++) {
        insert1.run({recipe: id, rank: j, name: recipe.ingredients[j].name});
      }
      db.prepare('DELETE FROM stage WHERE recipe = ?').run(id);
      for(var j = 0; j < recipe.stages.length; j++) {
        insert2.run({recipe: id, rank: j, description: recipe.stages[j].description});
      }
    });

    transaction(recipe);
    return true;
  }
  return false;
}

/* Fonction pour effacer une recette dans la base à partir de son identifiant */
exports.delete = function(id) {
  db.prepare('DELETE FROM recipe WHERE id = ?').run(id);
  db.prepare('DELETE FROM ingredient WHERE recipe = ?').run(id);
  db.prepare('DELETE FROM stage WHERE recipe = ?').run(id);
}


exports.search = (query, page) => {
  const num_per_page = 10;
  query = query || "";
  page = parseInt(page || 1);

  // on utiliser l'opérateur LIKE pour rechercher dans le titre
  var num_found = db.prepare('SELECT count(*) FROM recipe WHERE title LIKE ?').get('%' + query + '%')['count(*)'];
  var informationss = db.prepare('SELECT id as entry, title, img FROM recipe WHERE title LIKE ? ORDER BY id LIMIT ? OFFSET ?').all('%' + query + '%', num_per_page, (page - 1) * num_per_page);

  return {
    informationss: informationss,
    num_found: num_found,
    query: query,
    next_page: page + 1,
    page: page,
    num_pages: parseInt(num_found / num_per_page) + 1,
  };
};

exports.login = function(name ,password){
  let found = db.prepare('SELECT id FROM user WHERE name= ? and password= ?').get(name,password);
  if(found!==undefined){
    return found.id;
  }
  else{
    return -1;
  }
};

exports.new_user= function(name, password){
  let id = db.prepare('INSERT INTO user (name,password) VALUES (?,?)').run(name,password).lastInsertRowid;
  return id ;
}
/*some methods for workouts*/
exports.read_exercise = (id) => {
  var found = db.prepare('SELECT * FROM exercise WHERE id = ?').get(id);
  if(found !== undefined) {
    found.benefits = db.prepare('SELECT description FROM benefits WHERE exercise = ? ORDER BY rank').all(id);
    found.steps = db.prepare('SELECT description FROM steps WHERE exercise = ? ORDER BY rank').all(id);
    found.mistakes = db.prepare('SELECT description FROM mistakes WHERE exercise = ? ORDER BY rank').all(id);
    return found;
  } else {
    return null;
  }
};
exports.create_exercise = function(exercise) {
  var id = db.prepare('INSERT INTO exercise (type,title,img, description) VALUES (@type,@title, @img, @description)').run(exercise).lastInsertRowid;

  var insert1 = db.prepare('INSERT INTO benefits VALUES (@exercise, @rank, @description)');
  var insert2 = db.prepare('INSERT INTO steps VALUES (@exercise, @rank, @description)');
  var insert3 = db.prepare('INSERT INTO mistakes VALUES (@exercise, @rank, @description)');

  var transaction = db.transaction((exercise) => {
    for(var j = 0; j < exercise.benefits.length; j++) {
      insert1.run({exercise: id, rank: j, description: exercise.benefits[j]});
    }
    for(var j = 0; j < recipe.steps.length; j++) {
      insert2.run({exercise: id, rank: j, description: exercise.steps[j].description});
    }
    for(var j = 0; j < recipe.mistakes.length; j++) {
      insert3.run({exercise: id, rank: j, description: exercise.mistakes[j].description});
    }
  });

  transaction(exercise);
  return id;
}
exports.update_exercise = function(id, exercise) {
  var informations = db.prepare('UPDATE exercise SET type=@type ,title = @title, img = @img, description = @description WHERE id = ?').run(exercise, id);
  if(informations.changes == 1) {
    var insert1 = db.prepare('INSERT INTO benefits VALUES (@exercise, @rank, @description)');
    var insert2 = db.prepare('INSERT INTO steps VALUES (@exercise, @rank, @description)');
    var insert3 = db.prepare('INSERT INTO mistakes VALUES (@exercise, @rank, @description)');

    var transaction = db.transaction((exercise) => {
      db.prepare('DELETE FROM benefits WHERE exercise = ?').run(id);
      for(var j = 0; j < exercice.benefits.length; j++) {
        insert1.run({exercise: id, rank: j, name: exercise.benefits[j]});
      }
      db.prepare('DELETE FROM steps WHERE exercise = ?').run(id);
      for(var j = 0; j < exercise.steps.length; j++) {
        insert2.run({exercise: id, rank: j, description: exercise.steps[j].description});
      }
      db.prepare('DELETE FROM mistakes WHERE exercise = ?').run(id);
      for(var j = 0; j < exercise.mistakes.length; j++) {
        insert2.run({exercise: id, rank: j, description: exercise.mistakes[j].description});
      }
    });

    transaction(exercise);
    return true;
  }
  return false;
}
exports.delete_exercise = function(id) {
  db.prepare('DELETE FROM exercise WHERE id = ?').run(id);
  db.prepare('DELETE FROM benefits WHERE exercise = ?').run(id);
  db.prepare('DELETE FROM steps WHERE exercise = ?').run(id);
  db.prepare('DELETE FROM mistakes WHERE exercise = ?').run(id);
}
exports.search_exercise = (query1, page) => {
  const num_per_page = 10;
  query1 = query1 || "";
  page = parseInt(page || 1);


  var num_found = db.prepare('SELECT count(*) FROM exercise WHERE type LIKE ?').get('%' + query1 + '%')['count(*)'];
  var informationss = db.prepare('SELECT id as entry,type, title, img FROM exercise WHERE type LIKE ? ORDER BY id LIMIT ? OFFSET ?').all('%' + query1 + '%', num_per_page, (page - 1) * num_per_page);

  return {
    informationss: informationss,
    num_found: num_found,
    query1: query1,
    next_page: page + 1,
    page: page,
    num_pages: parseInt(num_found / num_per_page) + 1,
  };
};
exports.create_informations = function(informations) {
  let create = db.prepare('INSERT INTO informations (user,gender,weight,height,age,activity,objectif ) VALUES (@user,@gender,@weight,@height,@age,@activity,@objectif)').run(informations).changes;
  if(create !=0){
    return true;
  }
  else{
    return false;
  }
}
exports.create_calories = function(id) {
  let informations = db.prepare('Select * from informations where user= ?').get(id);
  let calories ;
  let protein;
  let carbohydrates;
  let fat;
  if(informations.gender=='male' && informations.activity=='sedentary' && informations.objectif=='lose-weight'){
    calories=([66.5+(13.8*informations.weight)+(5*informations.height)-(6.8*informations.age)]*1.50)-300;
    protein= ((calories*30)/100)/4;
    carbohydrates=((calories*40)/100)/4;
    fat=((calories*40)/100)/9;
    db.prepare("INSERT INTO calories(user,calories,protein,carbohydrates,fat) values(?,?,?,?,?)").run(id,parseInt(calories),parseInt(protein),parseInt(carbohydrates),parseInt(fat));    let result = db.prepare('Select * from calories where user= ?').get(id);
    return result;
  }
  if(informations.gender=='male' && informations.activity=='sedentary' && informations.objectif=='maintain-weight'){
    calories=[66.5+(13.8*informations.weight)+(5*informations.height)-(6.8*informations.age)]*1.50;
    protein= ((calories*25)/100)/4;
    carbohydrates=((calories*50)/100)/4;
    fat=((calories*25)/100)/9;
    db.prepare("INSERT INTO calories(user,calories,protein,carbohydrates,fat) values(?,?,?,?,?)").run(id,parseInt(calories),parseInt(protein),parseInt(carbohydrates),parseInt(fat));    let result = db.prepare('Select * from calories where user= ?').get(id);
    return result;
  }
  if(informations.gender=="male" && informations.activity=="sedentary" && informations.objectif=="gain-weight"){
    calories=([66.5+(13.8*informations.weight)+(5*informations.height)-(6.8*informations.age)]*1.50)+300;
    protein= ((calories*20)/100)/4;
    carbohydrates=((calories*60)/100)/4;
    fat=((calories*20)/100)/9;
    db.prepare("INSERT INTO calories(user,calories,protein,carbohydrates,fat) values(?,?,?,?,?)").run(id,parseInt(calories),parseInt(protein),parseInt(carbohydrates),parseInt(fat));    let result = db.prepare('Select * from calories where user= ?').get(id);
    return result;
  }
  if(informations.gender=="male" && informations.activity=="lightly-active" && informations.objectif=="lose-weight"){
    calories=([66.5+(13.8*informations.weight)+(5*informations.height)-(6.8*informations.age)]*1.80)-300;
    protein= ((calories*30)/100)/4;
    carbohydrates=((calories*40)/100)/4;
    fat=((calories*30)/100)/9;
    db.prepare("INSERT INTO calories(user,calories,protein,carbohydrates,fat) values(?,?,?,?,?)").run(id,parseInt(calories),parseInt(protein),parseInt(carbohydrates),parseInt(fat));    let result = db.prepare('Select * from calories where user= ?').get(id);
    return result;
  }
  if(informations.gender=="male" && informations.activity=="lightly-active" && informations.objectif=="maintain-weight"){
    calories=[66.5+(13.8*informations.weight)+(5*informations.height)-(6.8*informations.age)]*1.80;
    protein= ((calories*25)/100)/4;
    carbohydrates=((calories*50)/100)/4;
    fat=((calories*25)/100)/9;
    db.prepare("INSERT INTO calories(user,calories,protein,carbohydrates,fat) values(?,?,?,?,?)").run(id,parseInt(calories),parseInt(protein),parseInt(carbohydrates),parseInt(fat));    let result = db.prepare('Select * from calories where user= ?').get(id);
    return result;
  }
  if(informations.gender=="male" && informations.activity=="lightly-active" && informations.objectif=="gain-weight"){
    calories=([66.5+(13.8*informations.weight)+(5*informations.height)-(6.8*informations.age)]*1.80)+300;
    calories=[66.5+(13.8*informations.weight)+(5*informations.height)-(6.8*informations.age)]*1.80;
    protein= ((calories*20)/100)/4;
    carbohydrates=((calories*60)/100)/4;
    fat=((calories*20)/100)/9;
    db.prepare("INSERT INTO calories(user,calories,protein,carbohydrates,fat) values(?,?,?,?,?)").run(id,parseInt(calories),parseInt(protein),parseInt(carbohydrates),parseInt(fat));    let result = db.prepare('Select * from calories where user= ?').get(id);
    return result;
  }
  if(informations.gender=="male" && informations.activity=="very-active" && informations.objectif=="lose-weight"){
    calories=([66.5+(13.8*informations.weight)+(5*informations.height)-(6.8*informations.age)]*2.20)-300;
    protein= ((calories*30)/100)/4;
    carbohydrates=((calories*40)/100)/4;
    fat=((calories*30)/100)/9;
    db.prepare("INSERT INTO calories(user,calories,protein,carbohydrates,fat) values(?,?,?,?,?)").run(id,parseInt(calories),parseInt(protein),parseInt(carbohydrates),parseInt(fat));    let result = db.prepare('Select * from calories where user= ?').get(id);
    return result;
  }
  if(informations.gender=="male" && informations.activity=="very-active" && informations.objectif=="maintain-weight"){
    calories=[66.5+(13.8*informations.weight)+(5*informations.height)-(6.8*informations.age)]*2.20;
    protein= ((calories*25)/100)/4;
    carbohydrates=((calories*50)/100)/4;
    fat=((calories*25)/100)/9;
    db.prepare("INSERT INTO calories(user,calories,protein,carbohydrates,fat) values(?,?,?,?,?)").run(id,parseInt(calories),parseInt(protein),parseInt(carbohydrates),parseInt(fat));
    let result = db.prepare('Select * from calories where user= ?').get(id);
    return result;
  }
  if(informations.gender=="male" && informations.activity=="very-active" && informations.objectif=="gain-weight"){
    calories=([66.5+(13.8*informations.weight)+(5*informations.height)-(6.8*informations.age)]*2.20)+300;
    protein= ((calories*20)/100)/4;
    carbohydrates=((calories*60)/100)/4;
    fat=((calories*20)/100)/9;
    db.prepare("INSERT INTO calories(user,calories,protein,carbohydrates,fat) values(?,?,?,?,?)").run(id,parseInt(calories),parseInt(protein),parseInt(carbohydrates),parseInt(fat));
    let result = db.prepare('Select * from calories where user= ?').get(id);
    return result;
  }
  if(informations.gender=="female" && informations.activity=="sedentary" && informations.objectif=="lose-weight"){
    calories=([665.1+(9.6*informations.weight)+(1.9*informations.height)-(4.7*informations.age)]*1.50)-300;
    protein= ((calories*30)/100)/4;
    carbohydrates=((calories*40)/100)/4;
    fat=((calories*30)/100)/9;
    db.prepare("INSERT INTO calories(user,calories,protein,carbohydrates,fat) values(?,?,?,?,?)").run(id,parseInt(calories),parseInt(protein),parseInt(carbohydrates),parseInt(fat));
    let result = db.prepare('Select * from calories where user= ?').get(id);
    return result;
  }
  if(informations.gender=="female" && informations.activity=="sedentary" && informations.objectif=="maintain-weight"){
    calories=[665.1+(9.6*informations.weight)+(1.9*informations.height)-(4.7*informations.age)]*1.50;
    protein= ((calories*25)/100)/4;
    carbohydrates=((calories*50)/100)/4;
    fat=((calories*25)/100)/9;
    db.prepare("INSERT INTO calories(user,calories,protein,carbohydrates,fat) values(?,?,?,?,?)").run(id,parseInt(calories),parseInt(protein),parseInt(carbohydrates),parseInt(fat));
    let result = db.prepare('Select * from calories where user= ?').get(id);
    return result;
  }
  if(informations.gender=="female" && informations.activity=="sedentary" && informations.objectif=="gain-weight"){
    calories=([665.1+(9.6*informations.weight)+(1.9*informations.height)-(4.7*informations.age)]*1.50)+300;
    protein= ((calories*20)/100)/4;
    carbohydrates=((calories*60)/100)/4;
    fat=((calories*20)/100)/9;
    db.prepare("INSERT INTO calories(user,calories,protein,carbohydrates,fat) values(?,?,?,?,?)").run(id,parseInt(calories),parseInt(protein),parseInt(carbohydrates),parseInt(fat));
    let result = db.prepare('Select * from calories where user= ?').get(id);
    return result;
  }
  if(informations.gender=="female" && informations.activity=="lightly-active" && informations.objectif=="lose-weight"){
    calories=([665.1+(9.6*informations.weight)+(1.9*informations.height)-(4.7*informations.age)]*1.80)-300;
    protein= ((calories*30)/100)/4;
    carbohydrates=((calories*40)/100)/4;
    fat=((calories*30)/100)/9;
    db.prepare("INSERT INTO calories(user,calories,protein,carbohydrates,fat) values(?,?,?,?,?)").run(id,parseInt(calories),parseInt(protein),parseInt(carbohydrates),parseInt(fat));
    let result = db.prepare('Select * from calories where user= ?').get(id);
    return result;
  }
  if(informations.gender=="female" && informations.activity=="lightly-active" && informations.objectif=="maintain-weight"){
    calories=[665.1+(9.6*informations.weight)+(1.9*informations.height)-(4.7*informations.age)]*1.80;
    protein= ((calories*25)/100)/4;
    carbohydrates=((calories*50)/100)/4;
    fat=((calories*25)/100)/9;
    db.prepare("INSERT INTO calories(user,calories,protein,carbohydrates,fat) values(?,?,?,?,?)").run(id,parseInt(calories),parseInt(protein),parseInt(carbohydrates),parseInt(fat));
    let result = db.prepare('Select * from calories where user= ?').get(id);
    return result;
  }
  if(informations.gender=="female" && informations.activity=="lightly-active" && informations.objectif=="gain-weight"){
    calories=([665.1+(9.6*informations.weight)+(1.9*informations.height)-(4.7*informations.age)]*1.80)+300;
    protein= ((calories*20)/100)/4;
    carbohydrates=((calories*60)/100)/4;
    fat=((calories*20)/100)/9;
    db.prepare("INSERT INTO calories(user,calories,protein,carbohydrates,fat) values(?,?,?,?,?)").run(id,parseInt(calories),parseInt(protein),parseInt(carbohydrates),parseInt(fat));
    let result = db.prepare('Select * from calories where user= ?').get(id);
    return result;
  }
  if(informations.gender=="female" && informations.activity=="very-active" && informations.objectif=="lose-weight"){
    calories=([665.1+(9.6*informations.weight)+(1.9*informations.height)-(4.7*informations.age)]*2.20)-300;
    protein= ((calories*30)/100)/4;
    carbohydrates=((calories*40)/100)/4;
    fat=((calories*30)/100)/9;
    db.prepare("INSERT INTO calories(user,calories,protein,carbohydrates,fat) values(?,?,?,?,?)").run(id,parseInt(calories),parseInt(protein),parseInt(carbohydrates),parseInt(fat));
    let result = db.prepare('Select * from calories where user= ?').get(id);
    return result;
  }
  if(informations.gender=="female" && informations.activity=="very-active" && informations.objectif=="maintain-weight"){
    calories=[665.1+(9.6*informations.weight)+(1.9*informations.height)-(4.7*informations.age)]*2.20;
    protein= ((calories*25)/100)/4;
    carbohydrates=((calories*50)/100)/4;
    fat=((calories*25)/100)/9;
    db.prepare("INSERT INTO calories(user,calories,protein,carbohydrates,fat) values(?,?,?,?,?)").run(id,parseInt(calories),parseInt(protein),parseInt(carbohydrates),parseInt(fat));
    let result = db.prepare('Select * from calories where user= ?').get(id);
    return result;
  }
  if(informations.gender=="female" && informations.activity=="very-active" && informations.objectif=="gain-weight"){
    calories=([665.1+(9.6*informations.weight)+(1.9*informations.height)-(4.7*informations.age)]*2.20)+300;
    protein= ((calories*20)/100)/4;
    carbohydrates=((calories*60)/100)/4;
    fat=((calories*20)/100)/9;
    db.prepare("INSERT INTO calories(user,calories,protein,carbohydrates,fat) values(?,?,?,?,?)").run(id,parseInt(calories),parseInt(protein),parseInt(carbohydrates),parseInt(fat));
    let result = db.prepare('Select * from calories where user= ?').get(id);
    return result;
  }
}
exports.create_NutritionProgramme = function(id) {
  let existUser = db.prepare('Select * from ProgramRecipe where iduser = ?').get(id);
  if(existUser==undefined){
    let informations = db.prepare('Select * from calories where user= ?').get(id);
    let calories = informations.calories;
    let result=db.prepare("Select * from recipe where type=?").all('breakfast');
    let result1=db.prepare("Select * from recipe where type=?").all('meal');
    let result2=db.prepare("Select * from recipe where type=?").all('snack');
    let sommeBreakfastCalories=0;
    let sommeMealCalories=0;
    let sommeSnackCalories=0;
    let index = [];
    for(let i = 0 ; i<result.length ; i++  ){
      index.push(result[i].id);
    }
    let index1 = [];
    for(let i = 0 ; i<result1.length ; i++  ){
      index1.push(result1[i].id);
    }
    let index2 = [];
    for(let i = 0 ; i<result2.length ; i++  ){
      index2.push(result2[i].id);
    }
    while(sommeBreakfastCalories<parseInt(((calories)*25)/100)){
      let randomIndex = Math.floor(Math.random() * index.length);
      let randomElement = index[randomIndex];
      let response = db.prepare('Select * from nutritionValue where recipe= ?').get(randomElement);
      sommeBreakfastCalories+=response.calories;
      db.prepare('INSERT OR IGNORE INTO ProgramRecipe VALUES (?,?)').run(id,randomElement);
    }
    while(sommeMealCalories<parseInt(((calories)*50)/100)){
      let randomIndex = Math.floor(Math.random() * index1.length);
      let randomElement = index1[randomIndex];
      let response = db.prepare('Select * from nutritionValue where recipe= ?').get(randomElement);
      sommeMealCalories+=response.calories;
      db.prepare('INSERT OR IGNORE INTO ProgramRecipe VALUES (?,?)').run(id,randomElement);
    }
    while(sommeSnackCalories<parseInt(((calories)*25)/100)){
      let randomIndex = Math.floor(Math.random() * index2.length);
      let randomElement = index2[randomIndex];
      let response = db.prepare('Select * from nutritionValue where recipe= ?').get(randomElement);
      sommeSnackCalories+=response.calories;
      db.prepare('INSERT OR IGNORE INTO ProgramRecipe VALUES (?,?)').run(id,randomElement);
    }
  }
  else{
    return;
  }

}
exports.ProgramRecipe = (id) => {
  var results = db.prepare('SELECT  r.id as entry,r.title as title, r.img FROM recipe r inner join ProgramRecipe p  on r.id=p.idrecipe WHERE p.iduser=? ').all(id);
  return {
    results: results,
  };
}
exports.create_ExerciseProgramme = (id) => {
  let f=db.prepare('SELECT id FROM exercise ').all();
  let existe=db.prepare('SELECT COUNT(*) as number FROM ProgramExercise WHERE iduser==?;').get(id);
  if(existe.number==0){
    f.forEach(element  =>db.prepare('INSERT  INTO ProgramExercise VALUES(?,?)').run(id,element.id) );
  }

};
exports.ProgramExercise = (id,type,type2) => {
  var results = db.prepare('SELECT  e.id as entry,e.title as title , e.img FROM exercise e inner join ProgramExercise p  on e.id=p.idexercise WHERE p.iduser=? and (e.type=? or e.type=?)').all(id,type,type2);
  return {
    results: results,
  };
};
