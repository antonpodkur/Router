import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
        // header, sign up, sign in, log out
        "Map": "Map",
        "Personal Cabinet": "Personal Cabinet",
        "About": "About",
        "Sign Up": "Sign Up",
        "Sign In": "Sign In",
        "Log Out": "Log Out",
        "Select a language": "Select a language",

        "Name": "Name",
        "Enter your name": "Enter your name",
        "Email": "Email",
        "Enter your email": "Enter your email",
        "Password": "Password",
        "Enter password": "Enter password",
        "Repeat password": "Repeat password",
        "Show": "Show",
        "Hide": "Hide",
        "Submit": "Submit",

        "English": "English",
        "Ukrainian": "Ukrainian",


        // welcome page
        "Welcome to": "Welcome to",
        "With Router you can": "With Router you can:",
        "Build routes": "Build routes", 
        "Access your routes in personal cabinet": "Access your routes in personal cabinet",
        "Share routes": "Share routes",
        "Export routes": "Export routes",
        

        // map page
        "Home": "Home",
        "Search for a place": "Search for a place",
        "Type a place": "Type a place",
        "Find": "Find",
        "Build a route": "Build a route",
        "Your route": "Your route:",
        "Close": "Close",
        "Get route": "Get route",
        "Save": "Save",
        "Delete": "Delete",
        "Save your route": "Save a route",
        "Route name": "Route name",
        "Enter route name": "Enter route name",
        "Delete your route": "Delete your route",
        "Route will be deleted": "Route will be deleted, no data will be saved. Do you want to procceed?",


        // personal cabinet page
        "Welcome back": "Welcome back",
        "My routes": "My routes",
        "No routes yet": "No routes yet...",
        "Import route": "Import route",
        "Actions": "Actions",
        "Importing route": "Importing route",
        "Paste your route data here": "Paste your route data here",
        "Import": "Import",
        "Open": "Open",
        "Export": "Export",


        // about
        "What is Router": "What is Router?",
        "Router is a piece of software": "Router is a piece of software that helps you to create, keep track and share your routes.",
        "How to use Router": "How to use Router?",
        "To create a route just navigate": "To create a route just navigate to map page. No registration needed.If you want to save a route, and have access to personal cabinet you have to be registered.",
        "Will Router become paid": "Will Router become paid?",
        "Router is free and open source": "Router is free and open source software. Made by volunteer for volunteers.",
        "Contact Us": "Contact Us",
    },
  },
  ua: {
    translation: {
        // header, sign up, sign in, log out
        "Map": "Карта",
        "Personal Cabinet": "Особистий кабінет",
        "About": "Про нас",
        "Sign Up": "Реєстрація",
        "Sign In": "Увійти",
        "Log Out": "Вийти",
        "Select a language": "Оберіть мову",

        "Name": "Ім'я",
        "Enter your name": "Введіть ваше імʼя",
        "Email": "Електронна пошта",
        "Enter your email": "Введіть вашу пошту",
        "Password": "Пароль",
        "Enter password": "Введіть пароль",
        "Repeat password": "Повторіть пароль",
        "Show": "Показати",
        "Hide": "Cховати",
        "Submit": "Надіслати",

        "English": "Англійська",
        "Ukrainian": "Українська",
    
    
        // welcome page
        "Welcome to": "Ласкаво просимо до",
        "With Router you can": "За допомогою Router ви можете:",
        "Build routes": "Створювати маршрути",
        "Access your routes in personal cabinet": "Отримати доступ до своїх маршрутів у особистому кабінеті",
        "Share routes": "Поділитися маршрутами",
        "Export routes": "Експортувати маршрути",
        
    
        // map page
        "Home": "Де я?",
        "Search for a place": "Пошук місця",
        "Type a place": "Введіть місце",
        "Find": "Знайти",
        "Build a route": "Побудова маршруту",
        "Your route": "Ваш маршрут:",
        "Close": "Закрити",
        "Get route": "Отримати маршрут",
        "Save": "Зберегти",
        "Delete": "Видалити",
        "Save your route": "Зберегти маршрут",
        "Route name": "Назва маршруту",
        "Enter route name": "Введіть назву маршруту",
        "Delete your route": "Видалити маршрут",
        "Route will be deleted": "Маршрут буде видалено, дані не будуть збережені. Бажаєте продовжити?",
    
    
        // personal cabinet page
        "Welcome back": "Ласкаво повернутися",
        "My routes": "Мої маршрути",
        "No routes yet": "Поки немає маршрутів...",
        "Import route": "Імпортувати маршрут",
        "Actions": "Дії",
        "Importing route": "Імпорт маршруту",
        "Paste your route data here": "Вставте дані маршруту тут",
        "Import": "Імпортувати",
        "Open": "Відкрити",
        "Export": "Експортувати",
    
    
        // about
        "What is Router": "Що таке Router?",
        "Router is a piece of software": "Router - це програмне забезпечення, яке допомагає вам створювати, відстежувати та ділитися своїми маршрутами.",
        "How to use Router": "Як користуватися Router?",
        "To create a route just navigate": "Щоб створити маршрут, перейдіть на сторінку карти. Реєстрація не потрібна. Якщо ви хочете зберегти маршрут та мати доступ до особистого кабінету, вам потрібно зареєструватися.",
        "Will Router become paid": "Чи стане Router платним?",
        "Router is free and open source": "Router є безкоштовним та відкритим програмним забезпеченням. Створено волонтерами для волонтерів.",
        "Contact Us": "Зв'яжіться з нами",
    },
  },
};

i18n
.use(initReactI18next)
.init({
    resources,
    lng: "en",
    interpolation: {
        escapeValue: false
    }
})

export default i18n;