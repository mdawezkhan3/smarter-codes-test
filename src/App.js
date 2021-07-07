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

const App = () => {

  const classes = useStyles();
  const [recommendations, setRecommendations] = useState(null);

  useEffect(async () => {
    const response = await fetch('https://api.npoint.io/93bed93a99df4c91044e');
    const data = await response.json();
    setRecommendations(data.body.Recommendations);
  }, []);


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

  const DataTreeView = ({ recommendations }) => {
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


  return (
    <div>
      {recommendations && <DataTreeView recommendations={recommendations} />}
    </div>
  );
}

export default App;