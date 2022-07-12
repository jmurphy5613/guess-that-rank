export const shortRankToLong = (shortRank) => {
    switch (shortRank) {
        case 'iron1':
            return 'Iron 1';
        case 'iron2':
            return 'Iron 2';
        case 'iron3':
            return 'Iron 3';
        case 'bronze1':
            return 'Bronze 1';
        case 'bronze2':
            return 'Bronze 2';
        case 'bronze3':
            return 'Bronze 3';
        case 'silver1':
            return 'Silver 1';
        case 'silver2':
            return 'Silver 2';
        case 'silver3':
            return 'Silver 3';
        case 'gold1':
            return 'Gold 1';
        case 'gold2':
            return 'Gold 2';
        case 'gold3':
            return 'Gold 3';
        case 'plat1':
            return 'Platinum 1';
        case 'plat2':
            return 'Platinum 2';
        case 'plat3':
            return 'Platinum 3';
        case 'diamond1':
            return 'Diamond 1';
        case 'diamond2':
            return 'Diamond 2';
        case 'diamond3':
            return 'Diamond 3';
        case 'asscendant1':
            return 'Ascendant 1';
        case 'asscendant2':
            return 'Ascendant 2';
        case 'asscendant3':
            return 'Ascendant 3';
        case 'radiant':
            return 'Radiant';
    }
    return 'Unknown';
}