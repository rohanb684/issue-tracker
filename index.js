import express, { urlencoded } from "express";
import path from "path";
import expressLayouts from "express-ejs-layouts";
import cookieParser from "cookie-parser";
import projectRouter from "./src/routes/projects.route.js";
import userRouter from "./src/routes/user.route.js";
import methodOverride from 'method-override';
import { errorHandler } from "./src/utils/errorHandler.js";

const app = express();

app.use(cookieParser());

app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.static(path.resolve("src", "public")));
app.use(urlencoded({ extended: true }));
app.use(expressLayouts);


app.set("view engine", "ejs");
app.set("views", path.resolve("src", "views"));
app.set("layout", path.resolve("src", "views", "layouts", "layout"));

app.use('/',projectRouter);
app.use('/user',userRouter);

app.use(errorHandler);
export default app;

