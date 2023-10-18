export async function verifyEmailConfirm(email: string) {
    const responseEmailExist = await fetch(`https://api-todo-oe5w.onrender.com/api/users/email-exists?email=${email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const data = responseEmailExist.json() as unknown  as boolean;
    console.log(data)
    if (data) {
        return true
    }

    return false;
}