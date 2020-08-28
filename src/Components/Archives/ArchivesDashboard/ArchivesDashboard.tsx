import React, { useContext } from 'react'
import Store from '../../App/Store/rootStore';
import { Grid } from 'semantic-ui-react';
import TicketList from '../../Tickets/TicketsDashboard/TicketList/TicketList';
import { observer } from 'mobx-react-lite';

const ArchivesDashboard = () => {
    const store = useContext(Store);
    const {
        sortedArchives,
    } = store.ticketStore;
    
    return (
        <div id="TicketDashboard">
            <h2>Archives</h2>
            <hr/>
            <Grid columns={6} id="ticketsHeader">
                <Grid.Column width={2} className="remove-padding table-header">Author</Grid.Column>
                <Grid.Column width={3} className="remove-padding table-header">Status</Grid.Column>
                <Grid.Column width={2} className="remove-padding table-header">Product</Grid.Column>
                <Grid.Column width={4} className="remove-padding table-header">Title</Grid.Column>
                <Grid.Column width={3} className="remove-padding table-header">Date</Grid.Column>
                <Grid.Column width={2} className="remove-padding table-header"></Grid.Column>
            </Grid>
            <hr/>
            <TicketList ticketsArr={sortedArchives} />
        </div>
    )
}

export default observer(ArchivesDashboard)
