export function getLoginCredentials(): { email: string; password: string } {
    const email = process.env.LOGIN_EMAIL;
    const password = process.env.LOGIN_PASSWORD;

    if (!email || !password) {
        throw new Error(
            'Set LOGIN_EMAIL and LOGIN_PASSWORD in your local .env file before running authenticated tests.'
        );
    }

    return { email, password };
}
