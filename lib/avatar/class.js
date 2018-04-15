class Avatar {
    constructor(data) {

        this.available = Boolean(data!=null&&data.scales!=null);
        if (!this.available) return;
        this.scales = new scales(data.scales);        

        this.playerAvatarType = String(data.playerAvatarType).toString('utf8');
        this.bodyColors = new bodyColors(data.bodyColors);

        this.assets = [].concat(data.assets).map(x=>new AvatarAsset(x));
        
        this.defaultShirtApplied = Boolean(data.defaultShirtApplied);
        this.defaultPantsApplied = Boolean(data.defaultPantsApplied);

    }
}


class AvatarAsset {
    constructor(data) {
        this.available = Boolean(data!=null&&data.assetType!=null);
        if (!this.available) return;
        this.id = String(data.id || data.Id).toString('utf8');
        this.name = String(data.name || data.Name).toString('utf8');
        this.assetType = new AssetType(data.assetType);
    }
}


class AssetType {
    constructor(data) {
        this.available = Boolean(data!=null&&data.id!=null);
        if (!this.available) return;
        this.id = Number(data.id);
        this.name = String(data.name || data.Name).toString('utf8');
    }
}



class bodyColors {
    constructor(data) {
        this.available = Boolean(data!=null&&data.headColorId!=null);
        if (!this.available) return;

        this.headColorId = new Number(data.headColorId);
        this.torsoColorId = new Number(data.torsoColorId);
        this.rightArmColorId = new Number(data.rightArmColorId);
        this.leftArmColorId = new Number(data.leftArmColorId);
        this.rightLegColorId = new Number(data.rightLegColorId);
        this.leftLegColorId = new Number(data.leftLegColorId);
    }
}



class scales {
    constructor(data) {
        this.available = Boolean(data!=null&&data.height!=null);
        if (!this.available) return;
        this.height = Number(data.height)
        this.width = Number(data.width);
        this.head = Number(data.head);
        this.depth = Number(data.depth)
        this.proportion = Number(data.proportion)
        this.bodyType = Number(data.bodyType);
    }
}

class assetId {
    constructor(id) {
        this.available = Boolean(id!=null);
        if (!this.available) return;
        this.id = new Number(id)
    }
}





class OutfitItem {
    constructor(item) {
        this.available = Boolean(item!=null);
        if (!this.available) return;
        this.id = Number (item.id || item.Id);
        this.name = String(item.name || item.Name).toString('utf8');
    }
}

module.exports = {
    Avatar : Avatar,
    AvatarAsset : AvatarAsset,
    AssetType : AssetType,
    AssetId : assetId,
    OutfitItem : OutfitItem
}