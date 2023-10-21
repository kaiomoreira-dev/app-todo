export async function verifyRefreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
        return false;
    }

    const verifyRefreshToken = await fetch(`https://api-todo.kaiomoreira-dev.com.br/api/users/refresh-token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({refreshToken}),
    })

    const status = verifyRefreshToken.status;
    if (status > 200) {
        return false;
    }

    return true;
}