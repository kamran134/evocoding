import { $ } from "../../custom.js";
import { callConfirmModal } from "../admin.js";
{
    const container = $("#vacancy-container");
    const getData = () => {
        fetch("http://localhost:3000/api/vacancies")
            .then(r => r.json())
            .then(d => {
                container.innerHTML = "";
                for (let i of d) {
                    container.innerHTML +=
                        `
                <li class="list-group-item d-flex justify-content-between align-items-center">${i.name}
                    <button data-role = "delete-vacancy" data-id = ${i._id} title="Sil" class="btn btn-sm btn-danger">
                        <i class="bi bi-trash"></i>
                    </button>
                 </li> 
                `
                }
            })
    }
    const deleteOneVacancy = id => {
        callConfirmModal(() => {
            fetch(`http://localhost:3000/api/vacancies/${id}`, {
                method: "DELETE",
                headers: {
                    "x-access-token": localStorage.getItem("token"),
                },
            })
                .then(r => r.ok == true && getData());
        })
    }
    getData();

    const FORM = {
        name: $("#f-name"),
        confirm: $("#f-confirm")
    }
    FORM.confirm.addEventListener('click', () => {
        const name = FORM.name.value.trim();
        if (name) {
            const data = { name };
            callConfirmModal(() => {
                fetch("http://localhost:3000/api/vacancies", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": localStorage.getItem("token"),
                    },
                    body: JSON.stringify(data)
                })
                    .then(r => r.ok === true && (getData(), FORM.name.value = ""));
            })
        }
    })
    document.addEventListener('click', e => {
        switch (e.target.dataset.role) {
            case "delete-vacancy":
                deleteOneVacancy(e.target.dataset.id);
                break;
        }
    })
}