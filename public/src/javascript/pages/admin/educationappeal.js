import { $ } from "../../custom.js";
const table = $("#educationtable");
async function getAppeals() {
    const response = await fetch("http://localhost:3000/api/appeals/educations", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
        }
    });
    const data = await response.json();
    data.forEach((item, index) => {
        table.innerHTML +=
            `
            <tr>
                <td>${index + 1}</td>
                <td>${item.firstname + " " + item.secondname}</td>
                <td>${item.mobile}</td>
                <td>${item.field}</td>
                <td>${""}</td>
            </tr>
        `
    });
};
getAppeals();
