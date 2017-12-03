import {app, apiRouter, parsedQuery, cookieParser, authRouter, passport, bodyParser, morgan} from "./app";

const port = process.env.PORT || 8081;

app.listen(port, () => {
    console.log(`App listening on port ${port}!`)
});

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser);
app.use(parsedQuery);
app.use(passport.initialize());

app.get("/", (req, res) => {
    console.log(req.parsedCookies);
    console.log(req.parsedQuery);
});

app.use("/api", apiRouter);
app.use("/auth", authRouter);