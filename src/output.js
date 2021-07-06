// ->1  palace restaurant
// -->2 hamburger
// --->3 meal additions
// ->1  sherwood to go
// -->2 hamburger
// --->3 choice of burger
// ---->4 beef burger
// ->1  corner grocers
// -->2 hamburger
// --->3 choice of meat preparation
// ---->4 well done
// ->1  panini grill
// -->2 beef burger
// --->3 pick one
// ---->4 single (6 oz)
// ->1  cozy corner
// -->2 beef burger
// --->3 pick one
// ---->4 sandwich
// ->1  america's burgers & wraps
// -->2 beef burger
// --->3 burger extras
// ->1  space 62 market
// -->2  hamburger
// --->3 protein add-ons
// ->1  midtown diner & restaurant
// -->2 hamburger club triple decker
// --->3 choice of meat preparation
// ---->4 medium rare
// ->1  ritz diner
// -->2 american style burger
// --->3 pick one
// ---->4 regular
// ->1  trend diner
// -->2 john wayne burger
// --->3 burger add-ons
// ->1  cafe luka
// -->2 california burger
// --->3 burger toppings
// ->1  avenue diner
// -->2 greek burger
// --->3 choice of condiments
// ->1  palace restaurant
// -->2 hamburger
// --->3 meal additions
// ->1  sherwood to go
// -->2 hamburger
// --->3 choice of burger
// ---->4 beef burger
// ->1  corner grocers
// -->2 hamburger
// --->3 choice of meat preparation
// ---->4 well done
// ->1  panini grill
// -->2 beef burger
// --->3 pick one
// ---->4 single (6 oz)
// ->1  cozy corner
// -->2 beef burger
// --->3 pick one
// ---->4 sandwich
// ->1  america's burgers & wraps
// -->2 beef burger
// --->3 burger extras
// ->1  space 62 market
// -->2  hamburger
// --->3 protein add-ons
// ->1  midtown diner & restaurant
// -->2 hamburger club triple decker
// --->3 choice of meat preparation
// ---->4 medium rare
// ->1  ritz diner
// -->2 american style burger
// --->3 pick one
// ---->4 regular
// ->1  trend diner
// -->2 john wayne burger
// --->3 burger add-ons
// ->1  cafe luka
// -->2 california burger
// --->3 burger toppings
// ->1  avenue diner
// -->2 greek burger
// --->3 choice of condiments








const printChildrenRecursive = (t, depth) => {
  if(t.children.length === 0)  {
    return
  }
  t.children.forEach(child => {
    if(child.selected === 1) {
      let arrowString = '';
      for(let i = 1; i <= depth; i++) {
        arrowString = arrowString + '-';
      }
      console.log(`${arrowString}>${depth} ${child.name}`);
      printChildrenRecursive(child, ++depth); 
    }
  })
}


const getRecommendations = (recommendations, length) => {

  recommendations.forEach((rec, idx) => {
    console.log("->1 ",rec.RestaurantName);
    rec.menu.forEach(child => {
      if(child.type === "sectionheader") {
        child.children.forEach(k => {
          if((k.type === "item") && (k.selected === 1)) {
            console.log("-->2",k.name);
            printChildrenRecursive(k, 3);
          }
        })
      }
    })
  })
}