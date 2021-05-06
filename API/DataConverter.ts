
//@todo change string to ID 

//@todo User -> 

const DOCUMENT = "Document"
const DataConverter = (parent:string,title:string,proseJSON,user:User) => ({
    title,
    type:DOCUMENT,
    content:proseJSON,
    owner:user,
    parent,
})






// v1 only direct saving no nesting?
/*
_id    <-- 
title: <-- title 
type  <-- 
content: { } <--- proseJSON 
owner <-- User
parent <-- None 
*/



