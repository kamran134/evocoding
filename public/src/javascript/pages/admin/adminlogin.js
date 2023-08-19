const FORM = {
    username: document.getElementById("fusername"),
    password: document.getElementById("fpassword"),
    confirm: document.getElementById("fconfirmbtn"),
}

const validateData = async () => {
    const username = FORM.username.value;
    const password = FORM.password.value;
    if (username !== "" && password !== "") {
        const response = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        });
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem("token", data.token);
            window.location.href = "http://localhost:3000/admin";
        }
        FORM.username.value = "";
        FORM.password.value = "";
    }
}

FORM.confirm.addEventListener("click", validateData);