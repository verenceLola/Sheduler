import EventStore from "../utils/event.js";
import { Filtering } from "../utils/index.js";


const DEFAULT_ACTIVE_FILTER = [1, 3];

class Filter {
    constructor(anchor, options){
        this.anchor = anchor;
        this.options = options;
        this.activeFilterIndex = DEFAULT_ACTIVE_FILTER
        this.buttonLabels = ['All', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    }

    getHtml  = () => {
        const filterButtons = this.generateFilterButtons();
        const content = document.createElement('div');
        content.className = 'filter-content';

        const label = document.createElement('label');
        label.innerText = "Filter peers available on:";
        label.className = 'filter-label';

        const filterDays = document.createElement('div');
        filterDays.className = "filter-days";

        filterButtons.map((button, index) => {
            if (this.activeFilterIndex.includes(index)){
                button.classList.add('active-filter-day')
            }
            filterDays.append(button)
        });

        content.appendChild(label);
        content.appendChild(filterDays);
        
        return content
    }

    onFilterButtonClick = ({target}, index) => {
        target.classList.toggle('active-filter-day');
        const activeFilters = document.getElementsByClassName('active-filter-day');
        
        this.activeFilterIndex = Array.from(activeFilters).map(activeFilter => parseInt(activeFilter.getAttribute('data-day-index')));

        const filteredData =  this.filterData(this.options.peers)
        EventStore.getInstance().dispatchEvent(filteredData);
    }

    filterData = data => {
        const activeDays = this.buttonLabels.filter((_value, index) => this.activeFilterIndex.includes(index))
        const filteredData = data.filter(datum => {
            const availableDays = Filtering.getAvailableDays(datum.availability);

            if (activeDays.includes('All')){
                return true;
            }

            return availableDays.some(day => activeDays.includes(day));
        })

        return filteredData;
    }

    generateFilterButtons = () => this.buttonLabels.map((label, index) => {
        const labelElement = document.createElement("label");
        labelElement.className = 'filter-day-label';
        labelElement.setAttribute('data-day-index', index);
        labelElement.textContent = label;
        labelElement.onclick = event => this.onFilterButtonClick(event, index);

        return labelElement;
    });
} 

export default Filter
