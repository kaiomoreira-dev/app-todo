interface IToken {
    accessToken: string;
}

export async function getAccessToken() {
    const responseGetAccessToken = await fetch(`https://api-todo.kaiomoreira-dev.com.br/api/users/refresh-token`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({refreshToken: localStorage.getItem('refreshToken')}),
    });
    const data = await responseGetAccessToken.json() as IToken;
    localStorage.removeItem('accessToken');
    localStorage.setItem('accessToken', data.accessToken);
    
    return data.accessToken;
}