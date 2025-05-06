import {redirect} from 'react-router';
import type { Route } from "../+types/root";
import { AuthTokenHelper } from '~/shared/api/helpers/authTokenHelper';

export const action = async ({ request }: Route.ActionArgs) => {
    const token = AuthTokenHelper.getFromRequestServer(request.headers);
    if (!token) {
        return redirect('/users/login');
    }    
    try {
        const headers = AuthTokenHelper.clearFromHeaderAsCookie(new Headers(), 'Set-Cookie');
        return redirect('/', {headers})
    } catch(e) {
        console.log(e);
        return {
        error: 'Something went wrong',
        };
    }
}