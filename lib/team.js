import Catalog from './catalog'
import Participant from './participant';

class Team {
    constructor(channelKey, colorName, colorCode, teamSize) {

        this.channelKey = channelKey;
        this.colorName = colorName;
        this.colorCode = colorCode;
        this.captPartRef = null;
        this.teamSize = teamSize;
        this.catRef = colorName ? new Catalog(channelKey, colorName, teamSize, 1) : null;

    }

    toJSON() {
        return {
            "channelKey" : this.channelKey,
            "colorName" : this.colorName,
            "colorCode" : this.colorCode,
            "captPartRef" : this.captPartRef == null ? null : this.captPartRef.toJSON(),
            "teamSize" : this.teamSize,
            "catRef" : this.catRef.toJSON()
        };
    }

    static fromJSON(input) {
        var ref = new Team();

        ["channelKey", "colorName", "colorCode", "teamSize"].forEach((c) => {
            if (typeof input[c] != 'undefined') {
                ref[c] = input[c];
            }
        });

        ref.captPartRef = input["captPartRef"] ? Participant.fromJSON(input["captPartRef"]) : null;
        ref.catRef = input["catRef"] ? Catalog.fromJSON(input["catRef"]) : null;

        return ref;
    }

    setCaptParticipant(partRef, setMethod = false) {
        if (this.captPartRef == null) {
            this.captPartRef = partRef;
            this.captPartRef.captainSetMethod = setMethod;

            this.catRef.joinParticipant(partRef, false, false, true);
        }
    }

    unsetCaptParticipant() {
        if (this.captPartRef != null) {
            this.catRef.leaveParticipant(this.captPartRef);
            this.captPartRef = null;
        }
    }

    getDiscordIcon() {
        switch (this.colorName.toLowerCase()) {
            case "red" :
                return ":closed_book:" + " ";
            case "blue" :
                return ":blue_book:" + " ";
            case "green" :
                return ":green_book:" + " ";
            case "yellow" :
                return ":orange_book:" + " ";
        }

        return false;
    }

    addTextFormatted(wRef, input, useBold, is_nick) {
        wRef.color(input, this.colorCode, useBold, is_nick);

        return wRef;
    }

    addStatusReadable(wRef) {

        wRef.textDiscord(this.getDiscordIcon());

        this.addTextFormatted(wRef, this.colorName + ' Team:');

        for (var sf = 0; sf < this.catRef.list.length; sf++) {
            if (sf != 0) {
                wRef.textDiscord(', ');
            }

            this.addTextFormatted(wRef, ' ' + this.catRef.list[sf].nick + (sf + 1 == this.catRef.list.length ? ' ' : ''), false, true);
        }

        return wRef;
    }
}

export default Team;
