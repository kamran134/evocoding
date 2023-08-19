const token = localStorage.getItem("token");
if (!token)
    window.location.href = "http://localhost:3000/adminlogin";

fetch("http://localhost:3000/api/check-token-validity", {
    method: "POST",
    headers: {
        "x-access-token": token
    }
})
    .then(r => {
        if (!r.ok) {
            localStorage.removeItem("token");
            window.location.href = "http://localhost:3000/adminlogin";
        }
        return r.json();
    })
    .then(d => {
        if (d.expired) {
            localStorage.removeItem("token");
            window.location.href = "http://localhost:3000/adminlogin";
        }
    })