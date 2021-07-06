import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import TreeItem from '@material-ui/lab/TreeItem';
import './App.css';

const useStyles = makeStyles({
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400,
  },
});

function App() {

  // const classes = useStyles();
  const [recommendations, setRecommendations] = useState(null);

  useEffect(async () => {
    const response = await fetch('https://api.npoint.io/93bed93a99df4c91044e');
    const data = await response.json();
    const rec = data.body.Recommendations;
    setRecommendations(rec);
  }, []);



  // const PrintChildrenRecursive = ({ k, depth }) => {
  //   if(k.children.length === 0)  {
  //     return (
  //       <TreeItem
  //         key={depth}
  //         nodeId={depth.toString()}
  //         label={k.name}
  //         children={undefined}
  //       />
  //     );
  //   }
    
  //  return (
  //   <>
  //   {k.children.filter(child => {
  //      if(child.selected === 1) {
  //        <TreeItem
  //          key={depth}
  //          nodeId={depth.toString()}
  //          label={child.name}
  //          children={<PrintChildrenRecursive k={child} depth={++depth} />}
  //        />
  //      }
  //    })}
  //  </>
  //  )
  // }


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
                            // children={undefined}
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

  return (
    <div>
      {recommendations && <DataTreeView treeItems={recommendations} />}
    </div>
  );
}

export default App;