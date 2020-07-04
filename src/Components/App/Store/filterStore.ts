import { observable, action, computed } from "mobx";
import { ITicket } from "../../../Models/ticket";
import { Store } from "./rootStore";

interface filterObject {
  status: string[];
  products: string[];
  dates: {
    From: string;
    To: string;
  };
}

interface IStatus {
  id: number;
  name: string;
  color: string;
}

interface IOption {
  key: number;
  text: string;
  value: string;
}

export default class FilterStore {

  constructor(public rootStore: Store) {}

  tickets = this.rootStore.ticketStore.tickets;

  @observable filteredTickets: ITicket[] = [...this.tickets];

  @observable filters: filterObject = {
    status: [],
    products: [],
    dates: {
      From: "0001-01-01",
      To: "9999-12-30",
    },
  };

  @observable stati: IStatus[] = [
    {
      id: 1,
      name: "Urgent",
      color: "#d80000",
    },
    {
      id: 2,
      name: "Low",
      color: "#e68a00",
    },
    {
      id: 3,
      name: "Pending",
      color: "#f3cb16",
    },
    {
      id: 4,
      name: "Done",
      color: "#45B510",
    },
  ];

  //COMPUTED
  @computed get statusOptions() {
    let returnArr: IOption[] = [];

    this.stati.forEach((status) => {
      returnArr.push({
        key: status.id,
        text: status.name,
        value: status.name,
      });
    });

    return returnArr;
  }

  //ACTIONS
  @action filterTickets = () => {

    //Print before filter 
    console.log("-------------")
    console.log("From: filterStore (pre filter)")
    console.log(this.tickets)
    console.log(this.filteredTickets)
    console.log("-------------")

    //Reset
    this.filteredTickets = this.tickets;

    //Filter status
    if (this.filters.status.length !== 0) {
      this.filteredTickets = this.filterStatus(
        this.filters.status,
        this.filteredTickets
      );
    }

    if (this.filters.products.length !== 0) {
      this.filters.products.forEach((product) => {
        this.filteredTickets = this.filterProduct(
          this.filters.products,
          this.filteredTickets
        );
      });
    }
    //Filter dates
    this.filterTicketsByDate();

    //Print after filter
    console.log("-------------")
    console.log("From: filterStore (post filter)")
    console.log(this.tickets) //<------- Problem here!
    console.log(this.filteredTickets)
    console.log("-------------")
  };

  @action filterTicketsByDate = () => {
    this.filteredTickets = this.filterDate(
      this.filters.dates.From,
      this.filters.dates.To,
      this.filteredTickets
    );
  };

  @action selectAll = () => {
    this.filteredTickets = this.tickets;
    this.filters = {
      status: [],
      products: [],
      dates: {
        From: "0001-01-01",
        To: "9999-12-30",
      },
    };
  };

  @action changeStatus = (status: string, toAdd: boolean) => {
    if (toAdd) {
      this.filters.status.push(status);
    } else {
      this.filters.status = this.filters.status.filter((statusToRemove) => {
        return statusToRemove !== status;
      });
    }
  };

  @action changeProduct = (product: string, toAdd: boolean) => {
    if (toAdd) {
      this.filters.products.push(product);
    } else {
      this.filters.products = this.filters.products.filter(
        (productToRemove) => {
          return productToRemove !== product;
        }
      );
    }
  };

  @action changeFromDate = (date: string) => {
    if (date === "") {
      this.filters.dates.From = "0001-01-01";
    } else {
      this.filters.dates.From = date;
    }
  };

  @action changeToDate = (date: string) => {
    if (date === "") {
      this.filters.dates.To = "9999-12-30";
    } else {
      this.filters.dates.To = date;
    }
  };

  //HELPER FUNCTIONS

  //Takes a filter criterion, and filters "tickets"
  filterStatus = (status: string[], arr: ITicket[]): ITicket[] => {
    return arr.filter((ticket) => {
      return status.includes(ticket.status);
    });
  };

  filterProduct = (product: string[], arr: ITicket[]): ITicket[] => {
    return arr.filter((ticket) => {
      return product.includes(ticket.product);
    });
  };

  filterDate = (
    fromDate: string,
    toDate: string,
    arr: ITicket[]
  ): ITicket[] => {
    return arr.filter((ticket) => {
      return ticket.date >= fromDate && ticket.date <= toDate;
    });
  };
}