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

  const classes = useStyles();
  const [recommendations, setRecommendations] = useState(null);

  useEffect(async () => {
    const response = await fetch('https://api.npoint.io/93bed93a99df4c91044e');
    const data = await response.json();
    const rec = data.body.Recommendations;
    setRecommendations(rec);
  }, []);





  const getChildrenRecursively = (treeItems, depth) => {

    return treeItems.map((treeItemData, idx) => {
      let children = undefined;
      if (treeItemData.selected === 1 && treeItemData.children && treeItemData.children.length > 0) {
        children = getChildrenRecursively(treeItemData.children, ++depth);
      }
      return (
        <TreeItem
          key={idx + depth}
          nodeId={(depth + idx).toString()}
          label={treeItemData.name}
          children={children}
        />
      );
    });    

  }

  const getItems = (rec) => {
 
    // return arr.map((a, idx) => <TreeItem key={idx + 100} nodeId={(idx + 100).toString()} label={a} children={undefined} />);
    return rec.children.filter((k, idx) => {
      if((k.type === "item") && (k.selected === 1)) {

        return (
          <TreeItem
            key={idx + 100}
            nodeId={'100' + idx.toString()}
            label={k.name}
            children={getChildrenRecursively(k.children, 1000)}
          />
        );
      }
    });
  }

  const DataTreeView = ({ recommendations }) => {
    return (
      <TreeView
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
      >
        {recommendations.map((rec, idx) => {
          console.log(getItems(rec.menu[0]));

          return (
            <TreeItem
            key={idx}
            nodeId={idx.toString()}
            label={rec.RestaurantName}
            children={getItems(rec.menu[0])}
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