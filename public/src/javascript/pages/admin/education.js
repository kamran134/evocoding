import { $ } from '../../custom.js'
import { callConfirmModal } from '../admin.js';
{
    const deleteOneSubCategory = (id, subCategoryId) => {
        fetch(`http://localhost:3000/api/subcategories/${subCategoryId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token"),
            },
            body: JSON.stringify({ _id: id })
        })
            .then(r => {
                if (r.ok == true) {
                    getData()
                }
            });
    }
    const loadSubCategories = (_id, data) => {
        let temp = "";
        for (let i of data) {
            temp += `
        <li class="list-group-item align-items-center d-flex justify-content-between">
            <div class = "w-50">
                <span class="badge bg-dark mx-2">
                Ad
                </span>
                ${i.name}
            </div>
            <div class = "w-50">
                <span class="badge bg-dark mx-2">
                    Açar Söz
                </span>
                ${i.keyword}
            </div>
            <button type="button" data-role = "delete-subcategory" data-parent-id = ${_id} data-id = ${i._id} title="Sil" class="btn btn-sm btn-danger mx-3">
                <i class="bi bi-trash"></i>
            </button>
         </li>

        `
        }
        return temp;
    }
    const getData = () => {
        fetch("http://localhost:3000/api/categories")
            .then(r => {
                return r.json();
            })
            .then(d => {
                categoriesList.innerHTML = "";
                for (let i = 0; i < d.length; ++i) {
                    categoriesList.innerHTML +=
                        `
                    <div class="accordion-item">
                        <h2 class="accordion-header d-flex align-items-center">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                data-bs-target="#target-${i}" aria-expanded="true" aria-controls="target-${i}">
                                <div class = "w-50">
                                    <span class="badge bg-dark mx-2">
                                    Ad
                                    </span>
                                    ${d[i].name}
                                </div>
                                <div class = "w-50">
                                    <span class="badge bg-dark mx-2">
                                        Açar Söz
                                    </span>
                                    ${d[i].keyword}
                                </div>
                            </button>
                            <button type="button" data-role = "delete-category" data-id = ${d[i]._id} title="Sil" class="btn  btn-danger mx-3">
                                <i class="bi bi-trash"></i>
                            </button>
                            <button type="button" data-role = "add-new-subcategory" data-id = ${d[i]._id} title="Yeni alt Kateqoriya əlavə et" class="btn me-3  btn-primary">
                                <i class="fa-solid fa-plus"></i>
                            </button>
                        </h2>
                        <div id="target-${i}" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <ul class="list-group">
                                ${loadSubCategories(d[i]._id, d[i].subcategories)}
                                </ul>
                            </div>
                        </div>
                    </div>
                    `
                }
            });
    }
    const deleteOne = id => {
        fetch(`http://localhost:3000/api/categories/${id}`, {
            method: "DELETE",
            headers: {
                "x-access-token": localStorage.getItem("token"),

            }
        }).then(r => r.ok === true && getData());
    }
    const FORM = {
        name: $('#fcategory-name'),
        keyword: $('#fcategory-keyword'),
        confirm: $('#fcategory-confirm'),
    }, ADD_FORM = {
        name: $('#addform-subcategory-name'),
        keyword: $('#addform-subcategory-keyword'),
        confirm: $("#addform-subcategory-confirm"),
        reject: $("#addform-subcategory-reject"),
    },
        categoriesList = $('#categories-list'),
        addFormSubCategory = $(".addform__subcategory");
    getData();
    FORM.confirm.addEventListener('click', () => {
        const name = FORM.name.value.trim(), keyword = FORM.keyword.value.trim();
        if (name !== "" && keyword !== "") {
            callConfirmModal(() => {
                const newCategory = {
                    name, keyword, subcategories: []
                }
                fetch("http://localhost:3000/api/categories", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": localStorage.getItem("token"),
                    },
                    body: JSON.stringify(newCategory)
                })
                    .then(r => r.ok === true && getData());
                FORM.name.value = "";
                FORM.keyword.value = "";
            })
        }
    })
    document.addEventListener('click', e => {
        switch (e.target.dataset.role) {
            case "delete-category":
                callConfirmModal(() => {
                    deleteOne(e.target.dataset.id)
                })
                break;
            case "add-new-subcategory":
                addFormSubCategory.dataset.id = e.target.dataset.id;
                addFormSubCategory.classList.add('d-flex');
                break;
            case "delete-subcategory":
                callConfirmModal(() => {
                    deleteOneSubCategory(e.target.dataset.parentId, e.target.dataset.id)
                })
                break;
        }
    })
    ADD_FORM.reject.addEventListener('click', () => {
        addFormSubCategory.classList.remove('d-flex');
        ADD_FORM.name.value = "";
        ADD_FORM.keyword.value = "";
    });
    ADD_FORM.confirm.addEventListener('click', () => {
        const
            id = addFormSubCategory.dataset.id,
            name = ADD_FORM.name.value,
            keyword = ADD_FORM.keyword.value;
        if (name !== "" && keyword !== "") {
            callConfirmModal(() => {
                fetch(`http://localhost:3000/api/subcategories/${id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": localStorage.getItem("token"),
                    },
                    body: JSON.stringify(
                        {
                            name: name,
                            keyword: keyword
                        }
                    )
                })
                    .then(r => r.ok === true && getData());
                addFormSubCategory.classList.remove('d-flex')
                ADD_FORM.name.value = "";
                ADD_FORM.keyword.value = "";
            })
        }
    })
}
{
    function getCourses() {
        fetch("http://localhost:3000/api/courses")
            .then(r => r.json())
            .then(data => {
                const table = $("#table");
                table.innerHTML ="";
                data.forEach(item => {
                    table.innerHTML +=
                        `
                        <tr class ="align-middle">
                            <td>${item.name}</td>
                            <td>${item.category}</td>
                            <td>${item.keywords[0]}</td>
                            <td>
                                <button type="button" data-role = "delete-course" data-id = ${item._id}  class = "btn btn-danger btn-sm">
                                <i class="fa-solid fa-trash"></i>
                                </button>
                                <button type="button" data-role = "show-course" class = "btn btn-info btn-sm">
                                    <i class="fa-solid fa-eye"></i>
                                </button>
                            </td>
                        </tr>
                    `
                })
            })
    };
    getCourses();
    let categories = [];

    let newCourse = {
        name: "",
        description: "",
        weeklyhour: 0,
        totalhour: 0,
        category: "",
        subcategory: "",
        subjects: [],
        keywords: [],
    }
    const addFormEducation = $(".addform__education");
    const FORM = {
        self: $("#form"),
        close: $("#addform-close"),
        show: $("#show-add-form"),
        category: $("#fadd-category"),
        name: $("#fadd-name"),
        description: $("#fadd-description"),
        subcategories: $("#fadd-subcategory"),
        subjectConfirm: $("#fadd-subject-confirm"),
        subjects: $("#fadd-subjects"),
        subjectInput: $("#fadd-subject"),
        keywordConfirm: $("#fadd-keyword-confirm"),
        keywordInput: $("#fadd-keyword"),
        keywords: $("#fadd-keywords"),
        confirm: $("#fadd-confirm"),
        weeklyhour: $("#fadd-weekly-hour"),
        totalhour: $("#fadd-total-hour")
    }
    FORM.keywordConfirm.addEventListener("click", () => {
        const keyword = FORM.keywordInput.value;
        if (keyword !== "" && !newCourse.keywords.includes(keyword)) {
            FORM.keywordInput.value = "";
            newCourse.keywords.push(keyword);
            FORM.keywords.innerHTML +=
                `
            <button data-keyword-value = ${keyword}  type="button" class="my-3 mx-3 position-relative btn btn-primary">
                ${keyword}
                <span data-keyword-value = ${keyword} class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    <i class="fa-solid fa-x"></i>
                </span>
            </button>
            `
        }
    })
    FORM.subjectConfirm.addEventListener("click", function () {
        const subject = FORM.subjectInput.value;
        if (subject !== "" && !newCourse.subjects.some(i => subject === i)) {
            FORM.subjectInput.value = "";
            newCourse.subjects.push(subject);
            FORM.subjects.innerHTML +=
                `
            <button data-subject-value = ${subject}  type="button" class="my-3 mx-3 position-relative btn btn-primary">
                ${subject}
                <span data-subject-value = ${subject} class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    <i class="fa-solid fa-x"></i>
                </span>
            </button>
            `
        }
    })
    const showAddForm = async () => {
        const response = await fetch("http://localhost:3000/api/categories")
        const data = await response.json();
        categories = data;
        FORM.category.innerHTML = `<option selected value="">Seç</option>`;
        for (let i = 0; i < categories.length; ++i) {
            FORM.category.innerHTML +=
                `
                <option value = ${categories[i].keyword}>
                    ${categories[i].name}    
                </option>
            `
        }
        addFormEducation.style.display = "flex";
    }
    FORM.close.addEventListener('click', () => addFormEducation.style.display = "none");
    FORM.category.addEventListener("change", function () {
        if (this.value !== "") {
            const index = categories.find(i => i.keyword === this.value);
            const subcategories = index.subcategories;
            if (subcategories.length > 0) {
                FORM.subcategories.parentNode.classList.remove("d-none");
                for (let i = 0; i < subcategories.length; ++i) {
                    FORM.subcategories.innerHTML +=
                        `
                        <option value = ${subcategories[i].keyword}>
                            ${subcategories[i].name}    
                        </option>
                    `
                }
            } else {
                FORM.subcategories.parentNode.classList.add("d-none");
                FORM.subcategories.innerHTML = "";
            }
        } else {
            FORM.subcategories.parentNode.classList.add("d-none");
            FORM.subcategories.innerHTML = "";
        }
    });
    FORM.show.addEventListener('click', showAddForm);
    document.addEventListener("click", e => {
        if (e.target.dataset.subjectValue) {
            const value = e.target.dataset.subjectValue;
            newCourse.subjects = newCourse.subjects.filter(i => i !== value);
            document.querySelector(`[data-subject-value = ${value}]`).remove();
        }
        if (e.target.dataset.keywordValue) {
            const value = e.target.dataset.keywordValue;
            newCourse.keywords = newCourse.keywords.filter(i => i !== value);
            document.querySelector(`[data-keyword-value = ${value}]`).remove();
        }
        switch (e.target.dataset.role) {
            case "delete-course":
                callConfirmModal(() => {
                    fetch(`http://localhost:3000/api/courses/${e.target.dataset.id}`, {
                        method: "DELETE",
                        headers: {
                            "x-access-token": localStorage.getItem("token"),

                        }
                    }).then(r => {
                        if (r.ok) {
                            getCourses()
                        }
                    });
                })
                break;
        }
    })
    FORM.confirm.addEventListener("click", () => {
        newCourse.name = FORM.name.value;
        newCourse.description = FORM.description.value;
        newCourse.weeklyhour = Number(FORM.weeklyhour.value);
        newCourse.totalhour = Number(FORM.totalhour.value);
        newCourse.category = FORM.category.value;
        newCourse.subcategory = FORM.subcategories.value;
        if (
            newCourse.name !== "" &&
            newCourse.description !== "" &&
            newCourse.totalhour !== 0 &&
            newCourse.weeklyhour !== 0 &&
            newCourse.subjects.length !== 0 &&
            newCourse.keywords.length !== 0 &&
            newCourse.category !== "") {

            callConfirmModal(() => {
                fetch("http://localhost:3000/api/courses",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "x-access-token": localStorage.getItem("token"),

                        },
                        body: JSON.stringify(newCourse)
                    }
                )
                    .then(r => {
                        FORM.self.reset();
                        FORM.subjects.innerHTML = "";
                        FORM.keywords.innerHTML = "";
                        FORM.subcategories.parentNode.classList.add("d-none");
                        FORM.subcategories.innerHTML = "";
                        addFormEducation.style.display = "none";
                        newCourse = {
                            name: "",
                            description: "",
                            weeklyhour: 0,
                            totalhour: 0,
                            category: "",
                            subcategory: "",
                            subjects: [],
                            keywords: [],
                        };
                        r.ok && getCourses();
                    })
            })
        }
    })
}