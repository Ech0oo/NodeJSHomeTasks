import {
	app,
	apiRouter,
	parsedQuery,
	bodyParser,
	addCities,
	consolePrintRandomDocument,
	rootController
} from "./app";

const port = process.env.PORT || 8081;

app.listen(port, () => {
	console.log(`App listening on port ${port}!`)
});

addCities();

apiRouter.use(bodyParser.json());
app.use(parsedQuery);

// app.get("/", consolePrintRandomDocument); // print without mongoose
app.get("/", rootController.printRandomDocument);

app.use("/api", apiRouter);