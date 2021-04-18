import endpoints from './endpoints.js';

const getPeers = async () => {
    let peers = [];

    await fetch(endpoints['fetch-peers']).then(
        response => response.json().then(result => peers = result),
        error => console.log(error)
    );

    return peers;
}

export default getPeers;
