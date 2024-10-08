// load categories
const loadCategories = async () =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/categories`);
    const data = await res.json();
    displayCategories(data.categories);
    
}

// load pets

const loadPets = async () =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`);
    const data = await res.json();
    displayPets(data.pets);
    
}

// display categories

const displayCategories = (categories) =>{
    categories.forEach( (item) => {
        const div = document.getElementById('category');
        // create category button
        const button = document.createElement('div');
        button.classList = '';
        button.innerHTML = `
        <button id="btn-${item.petId}" class="btn w-full h-full py-5 px-20 rounded text-center border-2 bg-white category-btn" onclick="categoryPet(${item.id})"><img class="h-5 w-5" src="${item.category_icon}" /> ${item.category}</button>
        `
        div.append(button);
    });
}

// remove active btn

const removeActiveClass = () => {
    const button = document.getElementsByClassName('category-btn');
    for(let btn of button){
        btn.classList.remove('active')
    }
};

// create category pets

const categoryPet = (id) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
        .then((res) => res.json())
        .then((data) => console.log(data))
}

// create display pets
const displayPets = (pets) => {
    const petsContainner = document.getElementById('pets');
    // check content
    if(pets.length == 0){
        petsContainner.classList.remove('grid');
        petsContainner.innerHTML =  `
        <div class="min-h-[400px] flex flex-col justify-center items-center space-y-4">
            <img src="images/error.webp" />
            <h2 class="text-center text-3xl font-bold">No Information Available</h2>
            <p>There are no Pets in this category</p>
        </div>
        `;
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
            <img class="w-auto h-auto rounded-xl" src="${pet.image}" alt="Shoes" />
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
            <div class="grid grid-cols-3 gap-1">
                <button class="btn hover:bg-btnc hover:text-white"><i class="fa-regular fa-thumbs-up"></i></button>
                <button class="btn text-btnc hover:bg-btnc hover:text-white">Adopt</button>
                <button class="btn text-btnc hover:bg-btnc hover:text-white">Details</button>
            </div>
        </div>
        `
        petsContainner.append(card)
    })
}
    







// global call funtion

loadCategories()
loadPets()