import React, { useState } from 'react';
import TreeView from '@material-ui/lab/TreeView';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import TreeItem from '@material-ui/lab/TreeItem';
import _ from "lodash";



const RecommendationsTreeView = ({ recommendationsList }) => {

  const [recommendations, setRecommendations] = useState(recommendationsList);  

  const onDragStart = (ev, draggedItemDetails) => {
    ev.dataTransfer.setData("draggedItemDetails", draggedItemDetails);
  }

  const onDragOver = (ev) => {
    ev.preventDefault();
  }

  const onDrop = (ev, droppedOverElementDetails) => {

    ev.stopPropagation();

    const draggedItemDetails = JSON.parse(ev.dataTransfer.getData("draggedItemDetails"));
    droppedOverElementDetails = JSON.parse(droppedOverElementDetails);
    const { droppedRecommendationIndex, droppedMenuIndex, droppedItemIndex } = droppedOverElementDetails;
    const { draggedRecommendationIndex, draggedMenuIndex, draggedItemIndex } = draggedItemDetails;

    let recommendationsDeepCopy = _.cloneDeep(recommendations);
    const draggedItem = recommendationsDeepCopy[draggedRecommendationIndex].menu[draggedMenuIndex].children[draggedItemIndex];


    if(isNaN(droppedItemIndex)) {
      recommendationsDeepCopy[draggedRecommendationIndex].menu[draggedMenuIndex].children.splice(draggedItemIndex, 1);
      recommendationsDeepCopy[droppedRecommendationIndex].menu[0].children.unshift(draggedItem);
    } else {
      recommendationsDeepCopy[draggedRecommendationIndex].menu[draggedMenuIndex].children.splice(draggedItemIndex, 1);
      recommendationsDeepCopy[droppedRecommendationIndex].menu[droppedMenuIndex].children.splice(droppedItemIndex + 1, 0, draggedItem);
    }


    setRecommendations(recommendationsDeepCopy);

 }

  const getChildrenRecursively = (items) => {

    return items.map((item) => {
      let children = undefined;
      if (item?.children.length > 0) {
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

  const getItems = (recommendation, recommendationIndex) => {

    return recommendation?.menu?.map((menu, menuIndex) => {
      if(menu.type === "sectionheader") {
        return menu?.children.map((item, itemIndex) => {
          if((item?.type === "item") && (item?.selected === 1)) {
            const filteredItems = item.children.filter(i => i.selected === 1);
            return (
              <div
                key={item.id}
                draggable
                onDragStart = {(e) => onDragStart(e, JSON.stringify({draggedRecommendationIndex: recommendationIndex, draggedMenuIndex: menuIndex, draggedItemIndex: itemIndex}))}
                onDragOver={(e)=> onDragOver(e)}
                onDrop={(e)=> onDrop(e, JSON.stringify({droppedRecommendationIndex: recommendationIndex, droppedMenuIndex: menuIndex, droppedItemIndex: itemIndex}))}
              >
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
        
        let items = getItems(recommendation, idx)[0];
        const filterEmptyOrNullItems = items.filter(item => item && !Array.isArray(item));

        return (
          <div
            key={idx}
            onDragOver={(e)=> onDragOver(e)}
            onDrop={(e)=> onDrop(e, JSON.stringify({droppedRecommendationIndex: idx}))} 
          >
            <TreeItem
              key={idx}
              nodeId={idx.toString()}
              label={recommendation?.RestaurantName}
              children={filterEmptyOrNullItems.length > 0 ? items : undefined}
            />
          </div>
        );
      })}
    </TreeView>
  );
}


export default RecommendationsTreeView;