const { Router } = require("express");
const api = require('./api/api.js');
const router = Router();
router.get('/', (req, res) => {
    res.render('pages/home', {
        title: "Ana Səhifə",
        filename: "index"
    })
});
router.get('/education', (req, res) => {
    res.render('pages/education', {
        title: "Təhsil",
        filename: "education"
    });
})
router.get('/vacancy', (req, res) => {
    res.render('pages/vacancy', {
        title: "Vakansiyalar",
        filename: "vacancy"
    });
})
router.get('/contact', (req, res) => {
    res.render('pages/contact', {
        title: "Əlaqə",
        filename: "contact"
    });
})
router.get('/about', (req, res) => {
    res.render('pages/about', {
        title: "Əlaqə",
        filename: "about"
    });
})
router.use('/admin', (req, res) => {
    res.render('admin/admin', {
        layout: false,
    })
})
router.get("/adminlogin", (req, res) => {
    res.render("admin/login", {
        title: "Admin Login",
        filename: "adminlogin",
        layout: false
    })
})
router.use('/api', api);

module.exports = router;