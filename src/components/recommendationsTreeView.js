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
        <TreeItem
          key={item.id}
          nodeId={item.id}
          label={item.name}
          children={children}
        />
      );
    });    

  }

  const getItems = (recommendation) => {

    return recommendation.menu.map(menu => {
      if(menu.type === "sectionheader") {
        return menu.children.map((item, idx) => {
          if((item.type === "item") && (item.selected === 1)) {
            const filteredItems = item.children.filter(i => i.selected === 1);
            return (
              <TreeItem
                key={item.id}
                nodeId={item.id}
                label={item.name}
                children={getChildrenRecursively(filteredItems)}
              />
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
          <TreeItem
            key={idx}
            nodeId={idx.toString()}
            label={recommendation.RestaurantName}
            children={getItems(recommendation)}
          />
        );
      })}
    </TreeView>
  );
}


export default RecommendationsTreeView;