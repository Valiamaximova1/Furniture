import {html} from 'https://unpkg.com/lit-html?module';
import {register} from '../api/data.js'
// import page from "//unpkg.com/page/page.mjs";


const registerTemplate = (onSubmit, errorMsg, invalidRe, invalidPass, invalidEmail) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Register New User</h1>
            <p>Please fill all fields.</p>
        </div>
    </div>
    <form @submit=${onSubmit}>
        <div class="row space-top">
            <div class="col-md-4">
                ${errorMsg ? html`
                    <div class="form-group">
                        <p>${errorMsg}</p>
                    </div>` : ''}
                <div class="form-group">
                    <label class="form-control-label" for="email">Email</label>
                    <input class=${'form-control' + (invalidEmail ? ' is-invalid' : '')} id="email" type="text" name="email">
                </div>

                <div class="form-group">
                    <label class="form-control-label" for="password">Password</label>
                    <input class=${'form-control' + (invalidPass ? ' is-invalid' : '')} id="password" type="password" name="password">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="rePass">Repeat</label>
                    <input class=${'form-control' + (invalidRe ? ' is-invalid' : '')} id="rePass" type="password" name="rePass">
                </div>
                <input type="submit" class="btn btn-primary" value="Register"/>
            </div>
        </div>
    </form>`;


export async function registerPage(ctx) {
    ctx.render(registerTemplate(onSubmit));
    console.log('register')

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target)
        const email = formData.get('email');
        const password = formData.get('password');
        const repass = formData.get('rePass');
        if (email === '' || password === '' || repass === '') {
            return ctx.render(registerTemplate(onSubmit, 'All fields are required!', repass === '',password === '', email === ''))
        }
        if (password !== repass) {
            return ctx.render(registerTemplate(onSubmit, 'Passwords don\'t match', true, true, false))
        }
        ctx.setUserNav();
        await register(email, password)
        ctx.page.redirect('/');
    }
}