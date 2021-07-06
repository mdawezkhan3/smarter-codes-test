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



const getTreeItemsFromData = treeItems => {
  return treeItems.map(treeItemData => {
    let children = undefined;
    if (treeItemData.children && treeItemData.children.length > 0) {
      children = getTreeItemsFromData(treeItemData.children);
    }
    return (
      <TreeItem
        key={treeItemData.id}
        nodeId={treeItemData.id}
        label={treeItemData.name}
        children={children}
      />
    );
  });
};



const PrintChildrenRecursive = ({ k, depth }) => {
  if(k.children.length === 0)  {
    return (
      <TreeItem
        key={depth}
        nodeId={depth.toString()}
        label={k.name}
        children={undefined}
      />
    );
  }
  
 return (
  <>
  {k.children.filter(child => {
     if(child.selected === 1) {
       <TreeItem
         key={depth}
         nodeId={depth.toString()}
         label={child.name}
         children={<PrintChildrenRecursive k={child} depth={++depth} />}
       />
     }
   })}
 </>
 )
}


const getChildrenRecursive = (k) => {
  return k.map(treeItemData => {
    let children = undefined;
    if (treeItemData.children && treeItemData.children.length > 0) {
      children = getTreeItemsFromData(treeItemData.children);
    }
    return (
      <TreeItem
        key={treeItemData.id}
        nodeId={treeItemData.id}
        label={treeItemData.name}
        children={children}
      />
    );
  });
}


const getTreeItemsFromData = treeItems => {
  return treeItems.map(treeItemData => {
    let children = undefined;
    if (treeItemData.children && treeItemData.children.length > 0) {
      children = getTreeItemsFromData(treeItemData.children);
    }
    return (
      <TreeItem
        key={treeItemData.id}
        nodeId={treeItemData.id}
        label={treeItemData.name}
        children={children}
      />
    );
  });
};

const getItems = (child) => {
  
 return (child.children.filter((k, idx) => {
    if((k.type === "item") && (k.selected === 1)) {
      return (
        <TreeItem
          key={100 + idx}
          nodeId={'100' + idx.toString()}
          label={k.name}
          // children={printChildrenRecursive(k, 100)}
          children={undefined}
        />
      );
    }
  }));
}

const GetMenuChildren = ({ rec }) => {
  
 return (
   <>
    {(rec.menu.filter(child => {
    if(child.type === "sectionheader") {
      return (child.children.filter((k, idx) => {
        if((k.type === "item") && (k.selected === 1)) {
          return (
            <TreeItem
              key={100 + idx}
              nodeId={'100' + idx.toString()}
              label={k.name}
              // children={printChildrenRecursive(k, 100)}
              children={undefined}
            />
          );
        }
      }));
    }
    }))}
   </>
 )
}

const DataTreeView = ({ treeItems }) => {
  return (
    <TreeView
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
    >
      {treeItems.map((rec, idx) => {

        

        return (
          <TreeItem
              key={idx}
              nodeId={idx.toString()}
              label={rec.RestaurantName}
              // children={<GetMenuChildren rec={rec}/>}
              children={
                <>
                {(rec.menu.filter(child => {
                if(child.type === "sectionheader") {
                  return (child.children.filter((k, index) => {
                    if((k.type === "item") && (k.selected === 1)) {
                      return (
                        <TreeItem
                          key={100 + index}
                          nodeId={'100' + index.toString()}
                          label={k.name}
                          children={getChildrenRecursive(k)}
                          children={undefined}
                        />
                      );
                    }
                  }));
                }
                }))}
              </>
              }
          />
          );
        })}
    </TreeView>
 );
}

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


const getRecommendations = (recommendations) => {

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

return (
  <div>
    {recommendations && console.log(getRecommendations(recommendations))}
    {recommendations && <DataTreeView treeItems={recommendations} />}
  </div>
);