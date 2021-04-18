import EventStore from "../utils/event.js";
import { Filtering } from "../utils/index.js";


const DEFAULT_ACTIVE_FILTER = 0;

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
            if (index === this.activeFilterIndex){
                button.id = 'active-filter-day';
            }
            filterDays.append(button)
        });

        content.appendChild(label);
        content.appendChild(filterDays);
        
        return content
    }

    onFilterButtonClick = ({target}, index) => {
        const previouslyActiveFilter = document.getElementById('active-filter-day');
        previouslyActiveFilter.id = null;
        this.activeFilterIndex = index;

        target.id = 'active-filter-day';
        const filteredData =  this.filterData(this.options.peers)
        EventStore.getInstance().dispatchEvent(filteredData);
    }

    filterData = data => {
        const activeDay = this.buttonLabels[this.activeFilterIndex];
        const filteredData = data.filter(datum => {
            const availableDays = Filtering.getAvailableDays(datum.availability);

            if (activeDay === 'All'){
                return true;
            }
            return availableDays.includes(activeDay)
        })

        return filteredData;
    }

    generateFilterButtons = () => this.buttonLabels.map((label, index) => {
        const labelElement = document.createElement("label");
        labelElement.className = 'filter-day-label';
        labelElement.textContent = label;
        labelElement.onclick = event => this.onFilterButtonClick(event, index);

        return labelElement;
    });
} 

export default Filter
