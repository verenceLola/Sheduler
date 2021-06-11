import { Filtering } from "../utils/index.js";

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

        const avatar = this.getPeerAvatar(image, name);

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

    getPeerAvatar = (image, peerName) => {
        const avatar = document.createElement('div');
        avatar.className = 'avatar';
        const avatarImage = document.createElement('img');
        avatarImage.src = image;

        const avatarImagePlaceHolder = document.createElement('span');
        avatarImagePlaceHolder.innerText = this.extractPeerInitials(peerName);
        avatarImagePlaceHolder.className = 'peer-avartar-placeholder';

        avatarImage.onerror = () => {
            avatar.appendChild(avatarImagePlaceHolder);
        }
        avatarImage.onload = () => {
            avatar.appendChild(avatarImage);
        }

        return avatar;
    }

    extractPeerInitials = peerName => {
        const names = peerName.split(' ');

        return `${names[0][0]}${names[1][0]}`
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

        const availableDays = Filtering.getAvailableDays(availability);

        const content = document.createElement('div');
        content.className = 'peer-session-info';

        const availabilityInfo = this.createInfoElement('./static/assets/icons/Availability.svg', `Availble on ${availableDays.join(', ')}`);
        const targetCompanies = this.createInfoElement("./static/assets/icons/Targeting.svg", `Targeting ${companies.join(', ')}`);
        const sessionsInfo = this.createInfoElement("./static/assets/icons/Sessions.svg", `${sessions} session${sessions === 1 ? '' : 's'} booked`);
        const yearsOfExperienceInfo = this.createInfoElement("./static/assets/icons/Experience.svg", `${yearsOfExperience} years of experience`);
        const locationInfo = this.createInfoElement("./static/assets/icons/Location.svg", location);

        content.append(availabilityInfo, targetCompanies, sessionsInfo, yearsOfExperienceInfo, locationInfo);

        return content;
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

    onButtonClick = () => {
        alert("Peer Booked Succesfully");
    }
}

class Peers {
    constructor(anchorElement, options){
        this.options = options;
        this.anchorElement = anchorElement;
    }

    getHtml = () => {
        const content = document.createElement('div');
        content.className = 'peers-content';
        const { peers } = this.options;

        peers.forEach(option => {
            const peer = new Peer(option);
            content.appendChild(peer.getHtml());
        });

        return content;
    }
}


export default Peers;
