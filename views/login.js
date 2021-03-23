import {html} from 'https://unpkg.com/lit-html?module';
import {login} from '../api/data.js'
// import page from "//unpkg.com/page/page.mjs";


const loginTemplate = (onSubmit) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Login User</h1>
            <p>Please fill all fields.</p>
        </div>
    </div>
    <form @click=${onSubmit}>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="email">Email</label>
                    <input class="form-control" id="email" type="text" name="email">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="password">Password</label>
                    <input class="form-control" id="password" type="password" name="password">
                </div>
                <input type="submit" class="btn btn-primary" value="Login"/>
            </div>
        </div>
    </form>`;

export async function loginPage(ctx) {
    ctx.render(loginTemplate());

    async function onSubmit(event) {
        event.preventDefault();
        const formDta = new FormData(event.target);
        const email = formDta.get('email').trim()
        const password = formDta.get('password').trim()

        ctx.setUserNav();
        await login(email, password)
        ctx.page.redirect('/')
    }
}