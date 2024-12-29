console.log("video.js loaded");

function getTimeString (time) {
    const hour = parseInt(time / 3600);
    const minute = parseInt((time % 3600) / 60);
    const second = time % 60;
    return `${hour} h ${minute}min ${second} sec ago`;

}

// 1- Fetch , load and show categories on html

// create loadCategories
const loadCategories = () => {
  // fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((err) => console.log(err));
};

// load videos
const loadVideos = () => {
  // fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((err) => console.log(err));
};
 

const loadCategoryVideos = (id) => {
  // alert(id);
  // fetch the data
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => displayVideos(data.category))
    .catch((err) => console.log(err));
}
// video object demo
// const cardDemo = {
    
//     "category_id": "1001",
//     "video_id": "aaaa",
//     "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//     "title": "Shape of You",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//             "profile_name": "Olivia Mitchell",
//             "verified": ""
//         }
//     ],
//     "others": {
//         "views": "100K",
//         "posted_date": "16278"
//     },
//     "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."

// };

const displayVideos = (videos) => {
    const videoContainer = document.getElementById("videos");
    videoContainer.innerHTML = "";
videos.forEach( (video) => {
    console.log(video);
    const card = document.createElement("div")
    card.classList = "card card-compact w-96 shadow-xl";
    card.innerHTML = `
    <figure class="h-[200px] relative">
    <img
      src=${video.thumbnail}
      class="object-cover w-full h-full" />
      ${
        video.others.posted_date?.length == 0
          ? ""
          : ` <span class="absolute bottom-0 right-0 bg-gray-950 rounded text-white px-2 py-1 text-xs">${getTimeString(
              video.others.posted_date
            )}</span>`
      }
     
  </figure>
  <div class="px-0 py-2 flex gap-2">
   <div>
    <img
      src=${video.authors[0].profile_picture}
      class="w-10 h-10 rounded-full object-cover"
    />
   </div>

   <div> 
    <h2 class="font-bold">${video.title}</h2>
    <div class="flex items-center gap-2">
        <p class="text-gray-400">${video.authors[0].profile_name}</p>
        ${
          video.authors[0].verified == true
            ? '<img src="https://i.ibb.co/7RJ2nSv/verified.png" class="w-4 h-4">'
            : ""
        }
    </div>
    <p></p>
</div>

    `;
    videoContainer.append(card)
});
}

// create DisplayCategories
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("categories");
categories.forEach( (item) => {
    console.log(item);
    // create a btn
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
    <button onclick = "loadCategoryVideos(${item.category_id})" class="btn">${item.category}</button>`;


    // add btn to  category container
    categoryContainer.append(buttonContainer);
});
};

loadCategories();
loadVideos();