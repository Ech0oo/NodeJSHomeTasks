import {app, apiRouter, parsedQuery, cookieParser} from "./app";

const port = process.env.PORT || 8081;

app.listen(port, () => {
    console.log(`App listening on port ${port}!`)
});

app.use(cookieParser); 
app.use(parsedQuery); 

app.get("/", (req, res) => {
    console.log(req.parsedCookies);
    console.log(req.parsedQuery);
});

app.use("/api", apiRouter);