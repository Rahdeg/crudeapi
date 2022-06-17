const db = require('../utils/database');

class Task{
    constructor(id,user,todo,created_on){
        this.id=id;
        this.user=user;
        this.todo=todo;
        this.created_on=created_on;
    }

    static getALL(results){
        db.query("SELECT * FROM todos",(err,res)=>{
            if (err) {
                console.log(err);
                results(null,err);
            } else {
                console.log("users: ", res);
                results(res)
            }
        })
    }

    static create(newTask, result) {
        db.query(`INSERT INTO todos VALUES(?, ?, ?, ?)`, [newTask.id, newTask.user, newTask.todo, newTask.created_on], (err, res) =>{
            if(err){
                console.log("error ", err);
                result(err, null);
                return;
            }
            console.log("created task", { ...newTask});
            result(null, {...newTask});
        });
    };


}

module.exports = Task;