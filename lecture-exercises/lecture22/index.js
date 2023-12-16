const express = require("express");
const body_parser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 4704;
const labs = [
    {id: '0', topic: 'JS'},
    {id: '1', topic: 'React'},
    {id: '2', topic: 'DB'}
];

app.use(cors());
app.use(body_parser.urlencoded( { extended: false }));
app.use(body_parser.json());

app.get("/some-endpoint", async(request, response) => {
    console.log("Request");
    console.log(request);
    const some_return_information = { foo: "bar" };
    response.send(some_return_information);
    });

    app.get("/labs", async(request, response) => {            
        response.send(labs);
        });

    app.get("/labs/:id", async(request, response) => {    
        const lab_id = request.params.id;
        response.send(labs[lab_id]);
        });

        app.patch("/labs/:id", async(request, response) => {    
            const lab_id = request.params.id;            
            console.log(request.body);
            // const my_update = JSON.parse(request.body);
            // console.log(my_update);
            labs[lab_id] - request.body;
            response.send(labs);
            });
    
    app.listen(port, () => {
        console.log(`This is our example JSON server running on port ${port}`);
        });

