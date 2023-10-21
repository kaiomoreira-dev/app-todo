export async function verifyAccessToken() {
    const idUser = localStorage.getItem('idUser');
    const verifyAccessToken = await fetch(`https://api-todo.kaiomoreira-dev.com.br/api/users/${idUser}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    });

    const status = verifyAccessToken.status;

    if (status > 200) {
        localStorage.removeItem('refreshToken')
        return false;
    }

    return true;
}