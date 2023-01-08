const form = document.querySelector('form')
var token = document.cookie
if(token.length > 0) {
    window.location.href="/";
}

const handleSubmit = async (e) => {
    e.preventDefault()

    const data = new FormData(form)

    // to clear the textarea input 
  

    const response = await fetch('https://virtualassistance.onrender.com/api/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: data.get('email'),
            password: data.get('psw')
        })
    })

    if (response.ok) {
        const data = await response.json();
        console.log("User data is : "+data.token);
        // document.cookie = "token = "+data.token
        window.location.href="/";
    } else {
        const data = await response.json();
        window.alert("Error occurs "+data.message)
        form.reset()
    }
}

form.addEventListener('submit', handleSubmit)
form.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        handleSubmit(e)
    }
})