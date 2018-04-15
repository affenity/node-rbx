const userClass = require('../user/class.js')

class Asset {
    constructor(data) {
        this.available = Boolean(data!=null&&data.TargetId!=null);
        if (!this.available) return;
        this.TargetId = Number(data.TargetId);
        this.ProductType = String(data.ProductType).toString('utf8');
        this.AssetId = Number(data.AssetId);
        this.ProductId = Number(data.ProductId);
        this.Name = String(data.Name).toString('utf8');
        this.Description = String(data.Description).toString('utf8');
        this.AssetTypeId = Number(data.AssetTypeId);
        this.Creator = new userClass.PartialUser(data.Creator);
        this.IconImageAssetId = Number(data.IconImageAssetId);
        this.Created = new Date(data.Created);
        this.Updated = new Date(data.Updated);
        this.PriceInRobux = Number(data.PriceInRobux);
        this.Sales = Number(data.Sales);
        this.IsNew = Boolean(data.IsNew);
        this.IsForSale = Boolean(data.IsForSale);
        this.IsPublicDomain = Boolean(data.IsPublicDomain);
        this.IsLimited = Boolean(data.IsLimited);
        this.IsLimitedUnique = Boolean(data.IsLimitedUnique);
        this.Remaining = Number(data.Remaining) || Number(0);
        this.MinimumMembershipLevel = Number(data.MinimumMembershipLevel);
        this.ContentRatingTypeId = Number(data.ContentRatingTypeId);
    }
}

/*
class Gamepass {
    constructor(data) {
        this.TargetId = Number(data.TargetId);
        this.ProductType = String(data.ProductType).toString('utf8')
        this.Name = String(data.Name).toString('utf8');
        this.Description = String(data.Description).toString('utf8');
        this.AssetTypeId = Number(data.AssetTypeId);
        this.Creator = new userClass.PartialUser(data.Creator);
        this.IconImageAssetId = Number(data.IconImageAssetId);
        this.Created = new Date(data.Created);
        this.Updated = new Date(data.Updated);
        this.PriceInRobux = Number(data.PriceInRobux);
        this.Sales = Number(data.Sales);
        this.IsNew = Boolean(data.IsNew);
        this.IsForSale = Boolean(data.IsForSale);
        this.IsPublicDomain = Boolean(data.IsPublicDomain);
        this.IsLimited = Boolean(data.IsLimited);
        this.IsLimitedUnique = Boolean(data.IsLimitedUnique);
        this.Remaining = Number(data.Remaining) || Number(0);
        this.MinimumMembershipLevel = Number(data.MinimumMembershipLevel);
        this.ContentRatingTypeId = Number(Data.ContentRatingTypeId);
    }
}
*/

module.exports = {
    Asset : Asset/*,
    Pass : Gamepass*/
}