// load categories
const loadCategories = async () =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/categories`);
    const data = await res.json();
    displayCategories(data.categories);
    
}

// display categories

const displayCategories = (categories) =>{
    categories.forEach( (item) => {
        const div = document.getElementById('category');
        // create category button
        const button = document.createElement('button');
        button.classList = 'btn p-3 rounded text-center border-2 bg-white';
        button.innerText = item.category;
        div.append(button);
    });
}











// global call funtion

loadCategories()