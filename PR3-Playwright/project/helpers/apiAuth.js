export async function apiLogin(request, user) {
    const response = await request.post(
        'https://api.practicesoftwaretesting.com/users/login',
        {
            data: {
                email: user.email,
                password: user.password
            }
        }
    );

    const body = await response.json();
    return body.access_token;

}