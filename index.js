document.querySelectorAll(".drop__input").forEach(inputElement => {
    const dropElement = inputElement.closest(".container");

    dropElement.addEventListener("click", (e) => {
        inputElement.click();
    });

    inputElement.addEventListener("change", (e) => {
        if(inputElement.files.length){
            updateThumbnail(dropElement, inputElement.files[0]);
        }
    });

    dropElement.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropElement.classList.add("drop-zone--over");   
    });

    ["dragleave", "dragend"].forEach((type) => {
        dropElement.addEventListener(type, (e) => {
            dropElement.classList.remove("drop-zone--over");
          });
    });

    dropElement.addEventListener("drop", (e) => {
        e.preventDefault();

        if(e.dataTransfer.files.length){
            inputElement.files = e.dataTransfer.files;
            updateThumbnail(dropElement, e.dataTransfer.files[0]);
        }
        dropElement.classList.remove("drop-zone--over");
    })
});

// thumbnail

updateThumbnail = (dropElement, file) => {
    let thumbnailElement = dropElement.querySelector(".drop__thumb");
    
    if(dropElement.querySelector(".drop__prompt")) {
        dropElement.querySelector(".drop__prompt").remove();
    }

    if(!thumbnailElement) {
        thumbnailElement = document.createElement("div");
        thumbnailElement.classList.add("drop__thumb");
        dropElement.appendChild(thumbnailElement);
    }

    thumbnailElement.dataset.label = file.name;

    if (file.type.startsWith("image/")) {
        const reader = new FileReader();
    
        reader.readAsDataURL(file);
        reader.onload = () => {
          thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
        };
      } else {
        thumbnailElement.style.backgroundImage = null;
      }
}
