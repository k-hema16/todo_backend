const express= require('express');
const {open}=require('sqlite');
const sqlite3=require('sqlite3');
const path=require('path');

let dbpath=path.join(__dirname,'database.db');
const app=express();
let db=null;
const initializeDbAndServer=async ()=>{
    try{
        db=await open({
            filename:dbpath,
            driver:sqlite3.Database
        });
    }
    catch(e){
        console.log(`DB erroe : ${e.message}`);
        process.exit(1);
    }
};
initializeDbAndServer();

app.get("/todos/",async(request,response)=>{
    const getTodos="select * from todos;";
    const todosArray=await db.all(getTodos);  //all method is used to get multiple rows of data
    response.send(todosArray);
});
app.listen(3000);

module.exports=app;