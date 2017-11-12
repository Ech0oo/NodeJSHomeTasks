import {app} from "./app";
import {cookieParser} from "./meddlewares/cookie-parser";
import {parsedQuery} from "./meddlewares/query-parser";
import {apiRouter} from "./routes/api-router";

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