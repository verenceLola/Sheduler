class Peer {
    constructor(options){
        this.options = options;
    }

    getHtml = () => {
        const content = document.createElement('div');
        content.className = "peers";

        const overview = new PeerOverview(this.options).getHtml();
        const aboutPeer = new PeerAbout(this.options).getHtml();
        const session = new SessionInfo(this.options).getHtml();
        const bookMeButton = new BookButton(this.options).getHtml();

        const horizontalLine = document.createElement('hr');
        horizontalLine.className = 'peer-hr';

        content.append(overview, aboutPeer, session,horizontalLine, bookMeButton);

        return content;
    }

}
class PeerOverview{
    constructor(options){
        this.options = options;
    }

    getHtml = () => {
        const {image, name, last_login: lastLogin} = this.options;

        const content = document.createElement('div');
        content.className = 'peer-overview-content';

        const avatar = document.createElement('div');
        avatar.className = 'avatar';
        const avatarImage = document.createElement('img');
        avatarImage.src = image;
        avatar.appendChild(avatarImage);

        const peerInfo = document.createElement('div');
        peerInfo.className = "peer-info";

        const peerName = document.createElement('span');
        peerName.className = 'peer-name';
        peerName.innerText = name;

        const peerLastLogin = document.createElement('span');
        peerLastLogin.className = 'peer-last-login';
        peerLastLogin.innerText = lastLogin;

        peerInfo.append(peerName, peerLastLogin);

        content.appendChild(avatar);
        content.appendChild(peerInfo)

        return content;
    }
}

class PeerAbout {
    constructor(options){
        this.options = options;
    }

    getHtml = () => {
        const {about_me: aboutMe} = this.options;

        const content = document.createElement('div');
        content.className = 'peer-about';

        const aboutLabel = document.createElement('label');
        aboutLabel.className = 'peer-about-label';
        aboutLabel.innerText = "About me"

        const aboutContent = document.createElement('p');
        aboutContent.className = "peer-about-content";
        aboutContent.innerText = aboutMe;

        content.append(aboutLabel, aboutContent);

        return content;
    }
}

class SessionInfo {
    constructor(options){
        this.options = options;
    }

    getHtml = () => {
        const {sessions, years_of_experience: yearsOfExperience, location, companies, availability} = this.options;

        const availableDays = this.getAvailableDays(availability);

        const content = document.createElement('div');
        content.className = 'peer-session-info';

        const availabilityInfo = this.createInfoElement('/src/static/assets/icons/Availability.svg', `Availble on ${availableDays.join(', ')}`);
        const targetCompanies = this.createInfoElement("/src/static/assets/icons/Targeting.svg", `Targeting ${companies.join(', ')}`);
        const sessionsInfo = this.createInfoElement("/src/static/assets/icons/Sessions.svg", `${sessions} sessions booked`);
        const yearsOfExperienceInfo = this.createInfoElement("/src/static/assets/icons/Experience.svg", `${yearsOfExperience} years of experience`);
        const locationInfo = this.createInfoElement("/src/static/assets/icons/Location.svg", location);

        content.append(availabilityInfo, targetCompanies, sessionsInfo, yearsOfExperienceInfo, locationInfo);

        return content;
    }

    getAvailableDays = peerAvailability => {
        const DATE_OPTIONS = {weekday: 'short'};

        const availbleDays = peerAvailability.map(timeSlot => {
            const {start, end} = timeSlot;

            const startDate = new Date(start)
            const endDate = new Date(end);
            const availbleHours = Math.round(endDate.getHours() - startDate.getHours());

            if (availbleHours >= 1){
                return new Intl.DateTimeFormat('en-EU', DATE_OPTIONS).format(startDate);
            }
        })

        return Array.from(new Set(availbleDays));
    }

    createInfoElement = (iconPath, info) => {
        const container = document.createElement('div');
        container.className = 'peer-info-item';

        const icon = document.createElement('img');
        icon.src = iconPath;

        const description = document.createElement('span');
        description.className = "peer-info-description";
        description.innerText = info;

        container.append(icon, description);

        return container;
    }
}

class BookButton {
    constructor(options){
        this.options = options;
    }

    getHtml = () => {
        const button = document.createElement('button');
        button.onclick = this.onButtonClick;
        button.innerText = "Book me";
        button.className = "book-me";

        return button;
    }

    onButtonClick = event => {
        console.log(event.target);
    }
}

class Peers {
    constructor(anchorElement, options){
        this.options = options;
        this.anchorElement = anchorElement;
    }

    getHtml = () => {
        const content = document.createElement('div');
        this.options.forEach(option => {
            const peer = new Peer(option);
            content.appendChild(peer.getHtml());
        });

        return content;
    }
}


export default Peers;
