import { $ } from "../../custom.js";
import { callConfirmModal, changeFrameDisplay, changeImageFrame } from "../admin.js";
{
    const currentText = $('#fcurrenthometext'),
        currentImage = $('#fcurrenthomebutton');

    const newText = $('#fnewtext'),
        newImage = $('#fnewfile'),
        newButton = $('#fnewconfirm');

    newButton.addEventListener('click', () => {
        const image = newImage.files[0];
        if (newText.value && image) {
            const data = new FormData();
            const newFile = new File([image], `home${image.name.slice(image.name.lastIndexOf('.'))}`);
            data.append('img', newFile);
            data.append('text', newText.value);
            callConfirmModal(() => {
                fetch('http://localhost:3000/api/home', {
                    method: "PUT",
                    headers: {
                        "x-access-token": localStorage.getItem("token"),
                    },
                    body: data,
                })
                    .then(r => r.ok === true && getData());
            })
        }
    })
    async function getData() {
        const response = await fetch('http://localhost:3000/api/home');
        const data = await response.json();
        currentText.value = data.text;
        currentImage.dataset.src = data.img;
        changeImageFrame(data.img);
    }
    getData();
}


document.addEventListener('click', e => {
    switch (e.target.dataset.role) {
        case 'view-image':
            changeFrameDisplay('flex');
            changeImageFrame(e.target.dataset.src);
            break;
    }
})