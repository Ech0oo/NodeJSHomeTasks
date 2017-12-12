import {
	app,
	apiRouter,
	parsedQuery,
	bodyParser,
	addCities,
	rootController,
	crossOrigin
} from "./app";

const port = process.env.PORT || 8081;

app.listen(port, () => {
	console.log(`App listening on port ${port}!`)
});

addCities();

app.use(crossOrigin);
app.use(parsedQuery);
app.use(bodyParser.json());
app.use(rootController.addUsers);
app.use(rootController.addProducts);


app.get("/", rootController.printRandomDocument);

app.use("/api", apiRouter);