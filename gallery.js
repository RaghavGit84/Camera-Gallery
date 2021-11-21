setTimeout(() => {

    if(db) {

        //video retrieval
        
        let videodbTransaction = db.transaction("video", "readonly");
        let videoStore = videodbTransaction.objectStore("video");
        let videoRequest = videoStore.getAll();
        videoRequest.onsuccess = (e) => {
            let videoResult = videoRequest.result;
            let galleryCont = document.querySelector(".gallery-cont");

            videoResult.forEach(videoObj => {
                let mediaElem = document.createElement("div");
                mediaElem.setAttribute("class", "media-cont");
                mediaElem.setAttribute("id", videoObj.id);

                let url = URL.createObjectURL(videoObj.bolbData);

                mediaElem.innerHTML = `
                <div class="media">
                    <video autoplay loop src="${url}"></video>
                </div>
                <div class="delete action-btn">DELETE</div>
                <div class="download action-btn">DOWNLOAD</div>
                `;

                galleryCont.appendChild(mediaElem);

                // Listeners
                let deleteBtn = mediaElem.querySelector(".delete");
                deleteBtn.addEventListener("click", deleteListener);
                let downloadBtn = mediaElem.querySelector(".download");
                downloadBtn.addEventListener("click", downloadListener);

            })
    
        }

        //image retrieval

        let imagedbTransaction = db.transaction("image", "readonly");
        let imageStore = imagedbTransaction.objectStore("image");
        let imageRequest = imageStore.getAll();
        imageRequest.onsuccess = (e) => {
            let imageResult = imageRequest.result;
            let galleryCont = document.querySelector(".gallery-cont");

            imageResult.forEach(imageObj => {
                let mediaElem = document.createElement("div");
                mediaElem.setAttribute("class", "media-cont");
                mediaElem.setAttribute("id", imageObj.id);

                let url = imageObj.url;

                mediaElem.innerHTML = `
                <div class="media">
                    <img src="${url}" />
                </div>
                <div class="delete action-btn">DELETE</div>
                <div class="download action-btn">DOWNLOAD</div>
                `;

                galleryCont.appendChild(mediaElem);

                //Listeners
                let deleteBtn = mediaElem.querySelector(".delete");
                deleteBtn.addEventListener("click", deleteListener);
                let downloadBtn = mediaElem.querySelector(".download");
                downloadBtn.addEventListener("click", downloadListener);


            })
    
        }
    }

},100)

//UI remove, DB remove
function deleteListener(e) {
    // DB removal
    let id = e.target.parentElement.getAttribute("id");
    let type = id.slice(0, 3);
    if(type === "vid"){
        let videodbTransaction = db.transaction("video", "readwrite");
        let videoStore = videodbTransaction.objectStore("video");
        videoStore.delete(id);
    }

    else if(type == "img") {
        let imagedbTransaction = db.transaction("image", "readwrite");
        let imageStore = imagedbTransaction.objectStore("image");
        imageStore.delete(id);
    }

     // UI removal
     e.target.parentElement.remove();

}


function downloadListener(e) {

    let id = e.target.parentElement.getAttribute("id");
    let type = id.slice(0, 3);
    if (type === "vid") {
        let videodbTransaction = db.transaction("video", "readwrite");
        let videoStore = videodbTransaction.objectStore("video");
        let videoRequest = videoStore.get(id);
        videoRequest.onsuccess = (e) => {
            let videoResult = videoRequest.result;

            let videoURL = URL.createObjectURL(videoResult.bolbData);

            let a = document.createElement("a");
            a.href = videoURL;
            a.download = "stream.mp4";
            a.click();
        }
    }
    else if (type === "img") {
        let imagedbTransaction = db.transaction("image", "readwrite");
        let imageStore = imagedbTransaction.objectStore("image");
        let imageRequest = imageStore.get(id);
        imageRequest.onsuccess = (e) => {
            let imageResult = imageRequest.result;

            let a = document.createElement("a");
            a.href = imageResult.url;
            a.download = "image.jpg";
            a.click();
        }
    }

}

















