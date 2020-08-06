import React from 'react'
import "./ticketDashboard.css"
import { Grid, Button } from 'semantic-ui-react'
import TicketList from './TicketList/TicketList'
import { Link } from 'react-router-dom'

const TicketDashboard  = () => {
    return (
        <div id="TicketDashboard">
            <h2>Tickets</h2>
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
            <TicketList />
            <Button as={Link} to="/tickets/new" className="mainButton postTicketButton">POST TICKET</Button>
        </div>
    )
}

export default TicketDashboard
