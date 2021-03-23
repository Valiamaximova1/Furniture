import { render} from 'https://unpkg.com/lit-html?module';
import page from "//unpkg.com/page/page.mjs";


import {logout} from "./api/data.js";
import {dashboardPage} from './views/dashboard.js'
import {furniturePage} from './views/my-furniture.js'
import {detailsPage} from './views/details.js'
import {createPage} from './views/create.js'
import {editPage} from "./views/edit.js";
import {registerPage} from './views/register.js'
import {loginPage} from './views/login.js'

const main = document.querySelector('.container');


page('/', renderMiddleware, dashboardPage);
page('/my-furniture', renderMiddleware, furniturePage)
page('/details/:id', renderMiddleware, detailsPage)
page('/create', renderMiddleware, createPage)
page('/edit/:id', renderMiddleware, editPage)
page('/register', renderMiddleware, registerPage)
page('/login', renderMiddleware, loginPage)

document.getElementById('logoutBtn').addEventListener('click', async () => {
        await logout();
        setUserNav()
        page.redirect('/')
})

setUserNav()
page();

function renderMiddleware(cxt, next) {
    cxt.render = (content) => render(content, main)
    cxt.setUserNav = setUserNav;
    next();
}

function setUserNav() {
    const userId = sessionStorage.getItem('userId');
    if (userId !== null) {
        document.getElementById('user').style.display = 'inline-block'
        document.getElementById('guest').style.display = 'none'
    } else {
        document.getElementById('user').style.display = 'none'
        document.getElementById('guest').style.display = 'inline-block'
    }
}