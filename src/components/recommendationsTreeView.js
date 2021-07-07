import React from 'react';
import TreeView from '@material-ui/lab/TreeView';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import TreeItem from '@material-ui/lab/TreeItem';


const RecommendationsTreeView = ({ recommendations }) => {


  const getChildrenRecursively = (items) => {

    return items.map((item) => {
      let children = undefined;
      if (item.children && item.children.length > 0) {
        const filteredChildren = item.children.filter(tree => tree.selected === 1);
        children = getChildrenRecursively(filteredChildren);
      }
      return (
        <div draggable="true">
          <TreeItem
            key={item.id}
            nodeId={item.id}
            label={item.name}
            children={children}
          />
        </div>
      );
    });    

  }

  const getItems = (recommendation) => {

    return recommendation.menu.map(menu => {
      if(menu.type === "sectionheader") {
        return menu.children.map((item) => {
          if((item.type === "item") && (item.selected === 1)) {
            const filteredItems = item.children.filter(i => i.selected === 1);
            return (
              <div draggable="true">
                <TreeItem
                  key={item.id}
                  nodeId={item.id}
                  label={item.name}
                  children={getChildrenRecursively(filteredItems)}
                />
              </div>
            );
          } else {
            return null;
          }
        });
      } else {
        return null;
      }
    })
  }

  
  return (
    <TreeView
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
    >
      {recommendations.map((recommendation, idx) => {
        return (
          <div draggable="true">
            <TreeItem
              key={idx}
              nodeId={idx.toString()}
              label={recommendation.RestaurantName}
              children={getItems(recommendation)}
            />
          </div>
        );
      })}
    </TreeView>
  );
}


export default RecommendationsTreeView;