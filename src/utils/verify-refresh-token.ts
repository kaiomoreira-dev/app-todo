export async function verifyRefreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    const verifyRefreshToken = await fetch(`https://api-todo-oe5w.onrender.com/api/users/refresh-token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({refreshToken}),
    })

    const status = verifyRefreshToken.status;
    
    if (status > 200) {
        return false;
    }

    return true;
}