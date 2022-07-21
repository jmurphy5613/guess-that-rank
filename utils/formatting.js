//MEDAL https://medal.tv/games/valorant/clips/lCYUk_BWdkKym/DZeTVKEPC5lC?invite=cr-MSxMa1AsNzA1NTY5NTcs
//https://medal.tv/games/valorant/clips/py3JYxhFSz3gR/S1qmdDEpR19d?invite=cr-MSxRTnYsNzA1NTY5NTcs}
export const medalConvert = (link) => {
    return link.substring(37, 64);
}

export const updatedMedalConvert = (link, game) => {
    let divider = link.split('/');
    const firstCode = divider[6];
    const secondCode = divider[7].split('?')[0];
    console.log(`https://medal.tv/games/${game}/clip/${firstCode}/${secondCode}`);
    return `https://medal.tv/games/${game}/clip/${firstCode}/${secondCode}`;
}