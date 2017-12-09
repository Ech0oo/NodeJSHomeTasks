import {app, apiRouter, parsedQuery, bodyParser} from "./app";

const port = process.env.PORT || 8081;

app.listen(port, () => {
    console.log(`App listening on port ${port}!`)
});

apiRouter.use(bodyParser.json());
app.use(parsedQuery); 

app.get("/", (req, res) => {
    console.log(req.parsedQuery);
});

app.use("/api", apiRouter);