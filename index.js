import express from 'express';
import dotenv from 'dotenv';
import cookie from 'cookie-parser';
import session from 'express-session';
import exphbs from 'express-handlebars';
import fileupload from 'express-fileupload';

dotenv.config();
const PORT = process.env.PORT || 3000
const app = express();



import page from './routes/page.js'
import middleware from './middlewares/locals.js'

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(express.static('node_modules/bootstrap/dist/css/'))

app.use(cookie());
app.use(fileupload());


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 60 * 24,
        secure: 'auto'  // 1 jour à la session 
    }
}));
app.use(middleware)
app.use(page)


app.engine('hbs', exphbs.engine({ 
    extname : 'hbs', 
    layoutsDir: 'views/layouts',
    partialsDir: 'views/partials',
    defaultLayout: 'main'}));
app.set('view engine', 'hbs');
app.set('views', 'views');








app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})