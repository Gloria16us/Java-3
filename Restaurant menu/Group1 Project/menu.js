// menu arrays which displays on the browser
const menu = [
    // Each item in the menu has a name, category, price, image, and description.
    {
      
      title: "noodles and egg",
      category: "breakfast",
      price: "1,800",
      img: "./images/1st-item.jpeg",
      desc: `A serving consist of 2 noodles and fried egg. This meal is packed with essential nutrients
            and its a source of protein, dietary fibre, energy, etc. `,
    },
     
     {
        
        title: "friedrice and chicken",
        category: "lunch",
        price: "5,000",
        img: "./images/2nd-item.jpeg",
        desc: `A serving contains 500g of friedrice, grilled chicken and salad. `,
      },
      {
       
        title: "Zobo/Kunu",
        category: "drinks",
        price: "300",
        img: "./images/3rd-item.jpeg",
        desc: `This consist of a choice of either Zobo or Kunu drink which are Nigerian
               made drinks that are rich and good for the health.`,
      },
      {
        
        title: "Fried Plantain and egg",
        category: "breakfast",
        price: "3,500",
        img: "./images/4th-item.jpeg",
        desc: `A serving contains 750g of delicious fried plantain and 3 fried eggs.  `,
      },
      {
        
        title: "fufu and afang",
        category: "lunch",
        price: "4,500",
        img: "./images/5th-item.jpeg",
        desc: `A serving contains 2 big wraps of fufu/semo accompanied by the delicious protein-rich afang soup. `,
      },
      {
        
        title: "minerals",
        category: "drinks",
        price: "500",
        img: "./images/6th-item.jpeg",
        desc: `You have a choice of deciding the variety of chilled drinks(soft drinks).`,
      },
      {
        
        title: "pap and akara",
        category: "breakfast",
        price: "1500",
        img: "./images/7th-item.jpeg",
        desc: `A serving contains a plate of pap/custard (with milk) and some fried beancakes(Akara) `,
      },
      {
        
        title: "porridge-yam",
        category: "lunch",
        price: "4,500",
        img: "./images/8th-item.jpeg",
        desc: `A serving contains a plate of delicious protein-rich pprridge yam spiced with vegetables.  `,
      },
      {
        
        title: "water",
        category: "drinks",
        price: "250",
        img: "./images/9th-item.jpeg",
        desc: `A bottle of water(which could be chilled, warm or have room temperature based on your preference).`,
      },
      {
        
        title: "suya",
        category: "dinner",
        price: "3,500",
        img: "./images/10th-item.jpeg",
        desc: `A serving contains a plate of 4 meat steaks(suya) spiced with vegetables.`,
      },
 ];
 
 
 // Get parent element
 // This line finds the part of the webpage where we'll put our menu items.
 const sectionCenter = document.querySelector(".section-center");
 // This line finds the part of the webpage where we'll put our filter buttons(the 4 buttons).
 const btnContainer = document.querySelector(".btn-container");
 
 // This part of the code waits for the webpage to finish loading before it runs the new js instruction.
 window.addEventListener("DOMContentLoaded", function () {
     // When the page is loaded, it show all the menu items on js.
     displayMenuItems(menu);
     // We also create buttons for filtering the menu items.
     displayMenuButtons(); //without this, the different classifications wont show
 });
 
 // This function takes a list of menu items and shows them on the webpage.
 function displayMenuItems(menuItems) {
     // We loop through each menu item and create HTML to show it on the page.
     let displayMenu = menuItems.map(function (item) {
         // This part creates HTML for each menu item.
         return `<article class="menu-item">
                        <img src=${item.img} alt=${item.title} class="photo" />

                        <div class="item-info">
                            <header>
                            <h4>${item.title}</h4>
                            <h4 class="price">N${item.price}</h4>
                            </header>
                            <p class="item-text"> 
                                ${item.desc}
                            </p>
                        </div> 
                  </article>`;
     });  
 
     // We join all the HTML for menu items into one big string.
     displayMenu = displayMenu.join("");
     // Then, we put this HTML into the section on the webpage where we show menu items.
     sectionCenter.innerHTML = displayMenu;
 }
 
 // This function creates buttons for filtering menu items by category.
 function displayMenuButtons() {
     // First, we find out all unique categories from the menu items.
     const categories = menu.reduce(
         function (values, item) {
             if (!values.includes(item.category)) {
                 values.push(item.category);
             }
             return values;
         },
         ["all"]
     );
 
     // Now, we create buttons for each category and put them on the webpage.
     const categoryBtns = categories
         .map(function (category) {
             return `<button type="button" class="filter-btn" data-id="${category}">
                         ${category}
                     </button>`;
         })
         .join("");
 
     // We put the buttons into the part of the webpage where filter buttons should go.
     btnContainer.innerHTML = categoryBtns;
 
     // Next, we add functionality to these filter buttons.
     const filterBtns = btnContainer.querySelectorAll(".filter-btn");
 
     // For each filter button, when clicked, we'll show only menu items of that category.
     filterBtns.forEach(function (btn) {
         btn.addEventListener("click", function (e) {
             const category = e.currentTarget.dataset.id;

             const menuCategory = menu.filter(function (menuItem) {
                 if (menuItem.category === category) {
                     return menuItem;
                 }
             });
             
             // If "all" category is clicked, we'll show all menu items.
             if (category === "all") {
                 displayMenuItems(menu);
             } else {
                 // Otherwise, we'll show only menu items of the clicked category.
                 displayMenuItems(menuCategory);
             }
         });
     });
 }
 