import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit'
import mainRouter from './routes/index.route.js';
import { addCurrentDate } from './middlewares/date.middleware.js';
import { logGetDate } from './middlewares/logGetDate.middleware.js';


const app = express();

/* 
  1. מידלוואר אבטחה: HELMET
  מוסיף כותרות אבטחה (Headers) לתשובות של השרת כדי להגן עליו מפני התקפות נפוצות.
  הגדרנו לו לאפשר חיבורים מ-localhost כדי שקובץ ה-index.html שלך יוכל לתקשר עם השרת בלי להיחסם.
*/
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                connectSrc: ["'self'", 'http://localhost:5000'],
            },
        },
    })
);


/* 
  2. מידלוואר הגבלת קצב: EXPRESS-RATE-LIMIT
  מגן על השרת מפני הצפה ועומס בקשות (התקפות DDoS או ניסיונות פריצה מהירים).
  מגביל כל כתובת IP ל-100 בקשות לכל 15 דקות. אם חורגים, מוחזרת שגיאה 429 מותאמת בעברית.
*/
const customLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // חלון זמן של 15 דקות
    max: 100, // מקסימום 100 בקשות לחלון זמן מכל IP
    standardHeaders: true, // מחזיר מידע על מגבלת הבקשות בכותרות ה-RateLimit-*
    legacyHeaders: false, // מכבה כותרות ישנות (X-RateLimit-*)
    handler: (req, res) => {
        // תגובה מעוצבת ומקורית במקרה של חריגה מהמגבלה
        res.status(429).json({
            status: 429,
            error: 'עומס בקשות',
            message: 'זיהינו יותר מדי פניות מהמחשב שלך בזמן קצר. אנא נסה שוב בעוד כמה דקות.',
        });
    },
});

// שימוש במגביל הבקשות על כל השרת (או רק על נתיבי ה-API)
app.use('/api', customLimiter);

app.use(morgan('dev'));

app.use(cors());

app.use(express.json());

app.use(addCurrentDate);

app.use(logGetDate);

app.use('/api', mainRouter);

app.get('/', (req, res) => {
    res.json('Welcome to the Library Server API!');
});

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});