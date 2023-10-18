export async function redirect(){
        return new Promise((resolve) => {
            setTimeout(()=>{
            resolve(true)
        }, 5000)
    })
}