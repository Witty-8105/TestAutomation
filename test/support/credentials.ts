export interface LoginCredentials {
    email: string;
    password: string;
}

export function getLoginCredentials(): LoginCredentials {
    const email = process.env.LOGIN_EMAIL?.trim();
    const password = process.env.LOGIN_PASSWORD;

    if (!email || !password?.trim()) {
        throw new Error(
            'Missing login credentials. Set LOGIN_EMAIL and LOGIN_PASSWORD in your local .env file before running authenticated tests.'
        );
    }

    return { email, password };
    //error has fixed
}
