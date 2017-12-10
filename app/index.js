import {
	app,
	apiRouter,
	parsedQuery,
	bodyParser,
	addCities,
	consolePrintRandomDocument
} from "./app";

const port = process.env.PORT || 8081;

app.listen(port, () => {
	console.log(`App listening on port ${port}!`)
});

addCities();

apiRouter.use(bodyParser.json());
app.use(parsedQuery);

app.get("/", consolePrintRandomDocument);

app.use("/api", apiRouter);