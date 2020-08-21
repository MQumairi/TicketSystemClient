import React, { useContext, useState, useEffect } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import Store from "../../App/Store/rootStore";
import { observer } from "mobx-react-lite";
import ACPMenu from "../ACPMenu/ACPMenu";
import StatusList from "./StatusList/StatusList";
import "../adminPanel.css";

const UsersACP = () => {
  const store = useContext(Store);
  const {loadUserList} = store.userStore;
  const [active, setActive] = useState<string>("Statuses");

   useEffect(() => {
      loadUserList();
    }, [loadUserList]);

  return (
    <div id="adminPanelBody">
      <h1>Admin Control Panel</h1>
      <hr />
      <Grid columns={2} className="ACPmainContent">
        <GridColumn width={11}>
          <StatusList/>
        </GridColumn>
        <GridColumn width={5}>
          <ACPMenu active={active} setActive={setActive}/>
        </GridColumn>
      </Grid>
    </div>
  );
};

export default observer(UsersACP);