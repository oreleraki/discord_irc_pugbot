import WordCo from './word_co';

class OpTeams {
    constructor(parent) {

        this.parent = parent;

    }

    exec(channelKey) {
        let operRef = this.parent, cStk = this.parent.cStk, partRef = this.parent.partRef, privPartRef = this.parent.privPartRef;

        if (operRef.logicState == 2) {
            operRef.gameRef.teams.forEach((teamRef) => {
                operRef.sendMsg(channelKey, teamRef.addStatusReadable(WordCo.cre()), privPartRef);
            });
        }
    }
}

export default OpTeams;