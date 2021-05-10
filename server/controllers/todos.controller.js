const { createTodo, getAllTodos, completeTodo, editTodo, deleteTodo } = require('../db/todos');
const todosController = {};

todosController.readTodos = async (req, res, next) => {
   const todos = await getAllTodos();
   // sending back array of objects
   // note: if you wanted an object with a todos key containing an array, you would:
   //       res.status(200).send({todos}) 
   res.status(200).send(todos) 
   next()
}

todosController.addTodo = async (req, res, next) => {

   const {text, iscompleted} = req.body;

   try {
      await createTodo({
         todo: text, 
         iscompleted: iscompleted,
      });

      // note: you could have the query return the added todo to validate a successful add
      console.log('>>> INSERT successful')
      // next is needed because you have two callbacks to execute; addTodo(), then readTodos()
      next() 

  } catch (error) {
      console.error(e)
  }
}

todosController.completeTodo = async (req, res, next) => {

   const {id} = req.body;

   try {

      await completeTodo({id});
 
      console.log('>>> UPDATE iscompleted successful')
      // next is needed because you have two callbacks to execute; completeTodo(), then readTodos()
      next() 

   } catch (error) {
      console.error(error)
   }
}

todosController.editTodo = async (req, res, next) => {

   const {id, text} = req.body;
   
   try {
      await editTodo({id, text})

      console.log('>>> UPDATE todo successful')
       // next is needed because you have two callbacks to execute; editTodo(), then readTodos()
      next() 
   } catch (error) {
      console.error(error)
   }
}

todosController.deleteTodo = async (req, res, next) => {

  const {id} = req.body;
  try {
      await deleteTodo({id})

      console.log('>>> DELETE todo successful')

      next()
  } catch (error) {
     console.error(error)
  }
}

module.exports = todosController;