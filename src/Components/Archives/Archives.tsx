import React, { useContext, useEffect } from 'react'
import "./archives.css";
import ArchivesDashboard from "./ArchivesDashboard/ArchivesDashboard";
import Store from '../App/Store/rootStore';

const Archives = () => {
    const store = useContext(Store);
    const {
      loadArchives,
    } = store.ticketStore;

    useEffect(() => {
        loadArchives();
    }, [loadArchives])
    
    return (
        <ArchivesDashboard/>
    )
}

export default Archives
