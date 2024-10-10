// load categories
const loadCategories = async () =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/categories`);
    const data = await res.json();
    displayCategories(data.categories);
    
}

// load like

const loadLikes = async (petId) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`);
    const data = await res.json();
    displayLike(data.petData);
}

// display like

const displayLike = (like) => {
    const likeContainner = document.getElementById('like-pets');
    const divLike = document.createElement('div');
    divLike.innerHTML = `
    <div><img src="${like.image}" /></div>
    `
    likeContainner.append(divLike);
    
}

// load pets

const loadPets = async (status) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`);
    const data = await res.json();
    // console.log(data.pets)
    
    
        if(status){
            document.getElementById('btnh').classList.add('hidden');
            displayPets(data.pets);
        }
        else{
            displayPets(data.pets.slice(0,6));
        }
    
    
    
}

// show all pets

const showAll = () => {
    loadPets(true);
}

// display categories

const displayCategories = (categories) =>{
    categories.forEach( (item) => {
        const div = document.getElementById('category');
        // create category button
        const button = document.createElement('div');
        button.innerHTML = `
        <button id="btn-${item.category}" onclick="categoryPet('${item.category}')" class="btn w-full h-full py-5 px-20 rounded text-center border-2 bg-white category-btn"><img class="h-5 w-5" src="${item.category_icon}" /> ${item.category}</button>
        `
        div.append(button);
    });
}



// create category pets

const categoryPet = (id) => {
    
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
        .then((res) => res.json())
        .then((data) => {
            
            const buttons = document.getElementsByClassName('category-btn');
            for(let btn of buttons){
            btn.classList.remove('active')
            }
            const activeBtn = document.getElementById(`btn-${id}`);
            activeBtn.classList.add('active');
            displayPets(data.data)
        })
        document.getElementById('btnh').classList.add('hidden');
}



// load details

const loadDetails = async (petId) => {
    const uri = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
    const res = await fetch(uri);
    const data = await res.json();
    displayDetails(data.petData)
    
};

// adopt section

const displayAdopt = (adopted) => {
    const addClose = document.getElementById('of-modal');
    addClose.classList = 'hidden';
    const adoptContainer = document.getElementById('adopt-content');
    
    adoptContainer.innerHTML = `
    <figure class="px-5 py-5 flex justify-center items-center">
            <img class="w-20 h-20 rounded-xl" src="images/17357914.gif" alt="Shoes" />
        </figure>
        <div class="card-body px-5 py-5">
            <div class="space-y-2">
                <h1 class="font-bold text-3xl text-center">Congrates</h1>
                <p class="text-center">Your pet is Adopting!!!</p>
                <div class="flex justify-center items-center"><h2 id="count-number" class="text-4xl font-bold"></h2></div>
            </div>
            
        </div>
    `
    // modal show
    document.getElementById('show-adopt').click();
    
    // modal close
    const countDown = document.getElementById('count-number');
    let count = 3;
    const interval = setInterval(function() {
        count--;
        countDown.textContent = count;
        if (count <= 0) {
            clearInterval(interval);
            document.getElementById('of-modal').click();
        }
    }, 1000);
    countDown.innerText = count;
    const adoptBtn = document.getElementById(`adopt-${adopted}`);
    console.log(adoptBtn)
    adoptBtn.setAttribute('disabled', true);
    
}

// disabled adopt button

// display details

const displayDetails = (pet) => {
    const detailContainer = document.getElementById('modal-content');
    // check null and undefined
    const birth = pet.date_of_birth === null || pet.date_of_birth === undefined? 'N/A' : pet.date_of_birth;
    const breed = pet.breed === null || pet.breed === undefined? 'N/A' : pet.breed;
    detailContainer.innerHTML = `
    <figure class="px-5 py-5">
            <img class="w-auto h-auto rounded-xl" src="${pet.image}" alt="Shoes" />
        </figure>
        <div class="card-body px-5 py-5">
            <div class="space-y-2 ">
                <h1 class="font-bold text-xl">${pet.pet_name}</h1>
                <div class="grid grid-cols-2 gap-4">
                    <p class="flex gap-2 items-center"><i class="fa-solid fa-list-check"></i> Breed: ${breed}</p>
                    <p class="flex gap-2 items-center"><i class="fa-solid fa-calendar-days"></i> Birth: ${birth}</p>
                    <p class="flex gap-2 items-center"><i class="fa-solid fa-mercury"></i> Gender: ${pet.gender}</p>
                    <p class="flex gap-2 items-center"><i class="fa-solid fa-dollar-sign"></i> Price: ${pet.price}</p>
                    <p class="flex gap-2 items-center"><i class="fa-solid fa-mercury"></i> Vaccinated: ${pet.vaccinated_status}</p>
                </div>
                <hr>
                <div class="space-y-2 my-3">
                    <h1 class="font-semibold">Details Information</h1>
                    <p>${pet.pet_details}</p>
                </div>
            </div>
            
        </div>
    `
    // modal show
    document.getElementById('show-detail').click();
}



// create display pets
const displayPets = (pets) => {
    const petsContainner = document.getElementById('pets');
    petsContainner.innerHTML = ''
    document.getElementById('spinner').style.display= 'block';
    setTimeout (function () {
        const petsContainner = document.getElementById('pets');
    // check content
    if(pets.length == 0){
        petsContainner.classList.remove('grid');
        petsContainner.innerHTML =  `
        <div class="min-h-[400px] flex flex-col justify-center items-center space-y-4 ">
            <img src="images/error.webp" />
            <h2 class="text-center text-3xl font-bold">No Information Available</h2>
            <p>There are no Pets in this category</p>
        </div>
        `;
        document.getElementById('spinner').style.display= 'none';
        return;
    }else{
        petsContainner.classList.add('grid');
    }


    pets.forEach ((pet) => {
        // check null and undefined
        const birth = pet.date_of_birth === null || pet.date_of_birth === undefined? 'N/A' : pet.date_of_birth;
        const breed = pet.breed === null || pet.breed === undefined? 'N/A' : pet.breed;
        // display
        const card = document.createElement('div');
        card.classList = 'card card-compact border-2'
        card.innerHTML = `
        <figure class="px-5 py-5">
            <img class="w-[300px]  rounded-xl" src="${pet.image}" alt="Shoes" />
        </figure>
        <div class="card-body px-5 py-5">
            <div class="space-y-2">
                <h1 class="font-bold text-xl">${pet.pet_name}</h1>
                <p class="flex gap-2 items-center"><i class="fa-solid fa-list-check"></i> Breed: ${breed}</p>
                <p class="flex gap-2 items-center"><i class="fa-solid fa-calendar-days"></i> Birth: ${birth}</p>
                <p class="flex gap-2 items-center"><i class="fa-solid fa-mercury"></i> Gender: ${pet.gender}</p>
                <p class="flex gap-2 items-center"><i class="fa-solid fa-dollar-sign"></i> Price: ${pet.price}</p>
                <hr>
            </div>
            <div class="grid grid-cols-3 gap-4 lg:gap-1">
                <button onclick="loadLikes(${pet.petId})" class="btn hover:bg-btnc hover:text-white"><i class="fa-regular fa-thumbs-up"></i></button>
                <button id="adopt-${pet.petId}" class="btn text-btnc hover:bg-btnc hover:text-white" onclick="displayAdopt(${pet.petId})">Adopt</button>
                <button class="btn text-btnc hover:bg-btnc hover:text-white" onclick="loadDetails(${pet.petId})">Details</button>
            </div>
        </div>
        `
        petsContainner.append(card)
        document.getElementById('spinner').style.display= 'none';
    })
    },2000)
    
}
    

// go main section

const start = () =>{
    const mainSection = document.getElementById('main');
    mainSection.scrollIntoView({ behavior: 'smooth' });
}






// global call funtion

loadCategories()
loadPets()