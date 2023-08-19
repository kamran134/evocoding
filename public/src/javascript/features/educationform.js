import { $ } from "../custom.js";
async function Course() {
    const
        firstname = $("#fname"),
        secondname = $("#fsurname"),
        number = $("#fnumber"),
        email = $("#femail"),
        field = $("#ffield"),
        confirmBtn = $("#fconfirmbtn");

    // Courses
    {
        const response = await fetch("http://localhost:3000/api/courses")
        const data = await response.json();
        for (let i of data) {
            field.innerHTML +=
                `
                    <option value="${i.name}">${i.name}</option>
                `
        }
    }

    confirmBtn.addEventListener("click", () => {
        if
            (
            firstname.value &&
            secondname.value &&
            number.value &&
            number.value.length == 9 &&
            email.value &&
            field.value !== "none"
        ) {
            const newAppeal = {
                firstname: firstname.value,
                secondname: secondname.value,
                mobile: number.value,
                email: email.value,
                field: field.value,
            }
            fetch("http://localhost:3000/api/appeals/educations/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newAppeal)
            })
                .then(r => {
                    if (r.ok == true) {
                        $("#education__form").reset();
                    }
                })
        }
    })
}

export default Course;