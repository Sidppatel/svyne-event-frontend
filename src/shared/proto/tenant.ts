



import { PageRequest } from "./common";
import { Empty } from "./common";
import { UuidValue } from "./common";
import { AckResponse } from "./common";
import { ServiceType } from "@protobuf-ts/runtime-rpc";
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
import { PageMeta } from "./common";

export interface TenantStripeProfile {
    
    hasAccount: boolean;
    
    businessType: string;
    
    businessName: string;
    
    businessUrl: string;
    
    productDescription: string;
    
    mcc: string;
    
    supportEmail: string;
}

export interface UpdateTenantStripeProfileRequest {
    
    tenantsId: string;
    
    businessType: string;
    
    businessName: string;
    
    businessUrl: string;
    
    productDescription: string;
    
    mcc: string;
    
    supportEmail: string;
}

export interface Tenant {
    
    tenantsId: string;
    
    slug: string;
    
    name: string;
    
    legalName: string;
    
    countryCode: string;
    
    memberCount: number;
    
    eventCount: number;
    
    totalRevenueCents: string;
    
    archived: boolean;
    
    defaultFeeFormulasId: string;
    
    phone: string;
    
    addressLine1: string;
    
    addressLine2: string;
    
    city: string;
    
    state: string;
    
    zip: string;
    
    logoUrl: string;
    
    brandPrimary: string;
    
    brandSecondary: string;
    
    brandAccent: string;
    
    brandBackground: string;
    
    brandText: string;
    
    brandButton: string;
    
    brandHighlight: string;
    
    achEnabled: boolean;
}

export interface UpdateMyTenantBrandingRequest {
    
    logoImagesId: string;
    
    brandPrimary: string;
    
    brandSecondary: string;
    
    brandAccent: string;
    
    brandBackground: string;
    
    brandText: string;
    
    brandButton: string;
    
    brandHighlight: string;
}

export interface PublicTenantBrandingRequest {
    
    slug: string;
}

export interface PublicTenantBranding {
    
    slug: string;
    
    name: string;
    
    logoUrl: string;
    
    brandPrimary: string;
    
    brandSecondary: string;
    
    brandAccent: string;
    
    brandBackground: string;
    
    brandText: string;
    
    brandButton: string;
    
    brandHighlight: string;
}

export interface UpdateMyTenantContactRequest {
    
    phone: string;
    
    addressLine1: string;
    
    addressLine2: string;
    
    city: string;
    
    state: string;
    
    zip: string;
}

export interface CreateTenantRequest {
    
    slug: string;
    
    name: string;
    
    adminEmail: string;
    
    adminFirstName: string;
    
    adminLastName: string;
    
    legalName: string;
    
    countryCode: string;
    
    businessType: string; 
    
    businessUrl: string;
    
    productDescription: string;
    
    mcc: string; 
    
    supportEmail: string;
}

export interface CreateTenantResponse {
    
    tenantsId: string;
    
    adminUsersId: string;
    
    setupUrl: string;
}

export interface UpdateTenantRequest {
    
    tenantsId: string;
    
    name: string;
    
    legalName: string;
    
    countryCode: string;
}

export interface SetTenantAchEnabledRequest {
    
    tenantsId: string;
    
    achEnabled: boolean;
}

export interface ListTenantsResponse {
    
    tenants: Tenant[];
    
    meta?: PageMeta;
}

export interface PublicTenant {
    
    slug: string;
    
    name: string;
}

export interface ListPublicTenantsResponse {
    
    tenants: PublicTenant[];
}

export interface TenantMember {
    
    usersId: string;
    
    email: string;
    
    role: number;
    
    displayName: string;
}

export interface ListTenantMembersResponse {
    
    members: TenantMember[];
}

export interface TenantStripeStatus {
    
    tenantsId: string;
    
    stripeConnectedAccountId: string;
    
    chargesEnabled: boolean;
    
    payoutsEnabled: boolean;
    
    detailsSubmitted: boolean;
}

class TenantStripeProfile$Type extends MessageType<TenantStripeProfile> {
    constructor() {
        super("svyne.tenant.TenantStripeProfile", [
            { no: 1, name: "has_account", kind: "scalar", T: 8  },
            { no: 2, name: "business_type", kind: "scalar", T: 9  },
            { no: 3, name: "business_name", kind: "scalar", T: 9  },
            { no: 4, name: "business_url", kind: "scalar", T: 9  },
            { no: 5, name: "product_description", kind: "scalar", T: 9  },
            { no: 6, name: "mcc", kind: "scalar", T: 9  },
            { no: 7, name: "support_email", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<TenantStripeProfile>): TenantStripeProfile {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.hasAccount = false;
        message.businessType = "";
        message.businessName = "";
        message.businessUrl = "";
        message.productDescription = "";
        message.mcc = "";
        message.supportEmail = "";
        if (value !== undefined)
            reflectionMergePartial<TenantStripeProfile>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: TenantStripeProfile): TenantStripeProfile {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.hasAccount = reader.bool();
                    break;
                case  2:
                    message.businessType = reader.string();
                    break;
                case  3:
                    message.businessName = reader.string();
                    break;
                case  4:
                    message.businessUrl = reader.string();
                    break;
                case  5:
                    message.productDescription = reader.string();
                    break;
                case  6:
                    message.mcc = reader.string();
                    break;
                case  7:
                    message.supportEmail = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: TenantStripeProfile, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.hasAccount !== false)
            writer.tag(1, WireType.Varint).bool(message.hasAccount);
        
        if (message.businessType !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.businessType);
        
        if (message.businessName !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.businessName);
        
        if (message.businessUrl !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.businessUrl);
        
        if (message.productDescription !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.productDescription);
        
        if (message.mcc !== "")
            writer.tag(6, WireType.LengthDelimited).string(message.mcc);
        
        if (message.supportEmail !== "")
            writer.tag(7, WireType.LengthDelimited).string(message.supportEmail);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const TenantStripeProfile = new TenantStripeProfile$Type();

class UpdateTenantStripeProfileRequest$Type extends MessageType<UpdateTenantStripeProfileRequest> {
    constructor() {
        super("svyne.tenant.UpdateTenantStripeProfileRequest", [
            { no: 1, name: "tenants_id", kind: "scalar", T: 9  },
            { no: 2, name: "business_type", kind: "scalar", T: 9  },
            { no: 3, name: "business_name", kind: "scalar", T: 9  },
            { no: 4, name: "business_url", kind: "scalar", T: 9  },
            { no: 5, name: "product_description", kind: "scalar", T: 9  },
            { no: 6, name: "mcc", kind: "scalar", T: 9  },
            { no: 7, name: "support_email", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<UpdateTenantStripeProfileRequest>): UpdateTenantStripeProfileRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.tenantsId = "";
        message.businessType = "";
        message.businessName = "";
        message.businessUrl = "";
        message.productDescription = "";
        message.mcc = "";
        message.supportEmail = "";
        if (value !== undefined)
            reflectionMergePartial<UpdateTenantStripeProfileRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: UpdateTenantStripeProfileRequest): UpdateTenantStripeProfileRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.tenantsId = reader.string();
                    break;
                case  2:
                    message.businessType = reader.string();
                    break;
                case  3:
                    message.businessName = reader.string();
                    break;
                case  4:
                    message.businessUrl = reader.string();
                    break;
                case  5:
                    message.productDescription = reader.string();
                    break;
                case  6:
                    message.mcc = reader.string();
                    break;
                case  7:
                    message.supportEmail = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: UpdateTenantStripeProfileRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.tenantsId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.tenantsId);
        
        if (message.businessType !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.businessType);
        
        if (message.businessName !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.businessName);
        
        if (message.businessUrl !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.businessUrl);
        
        if (message.productDescription !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.productDescription);
        
        if (message.mcc !== "")
            writer.tag(6, WireType.LengthDelimited).string(message.mcc);
        
        if (message.supportEmail !== "")
            writer.tag(7, WireType.LengthDelimited).string(message.supportEmail);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const UpdateTenantStripeProfileRequest = new UpdateTenantStripeProfileRequest$Type();

class Tenant$Type extends MessageType<Tenant> {
    constructor() {
        super("svyne.tenant.Tenant", [
            { no: 1, name: "tenants_id", kind: "scalar", T: 9  },
            { no: 2, name: "slug", kind: "scalar", T: 9  },
            { no: 3, name: "name", kind: "scalar", T: 9  },
            { no: 4, name: "legal_name", kind: "scalar", T: 9  },
            { no: 5, name: "country_code", kind: "scalar", T: 9  },
            { no: 6, name: "member_count", kind: "scalar", T: 5  },
            { no: 7, name: "event_count", kind: "scalar", T: 5  },
            { no: 8, name: "total_revenue_cents", kind: "scalar", T: 3  },
            { no: 9, name: "archived", kind: "scalar", T: 8  },
            { no: 10, name: "default_fee_formulas_id", kind: "scalar", T: 9  },
            { no: 11, name: "phone", kind: "scalar", T: 9  },
            { no: 12, name: "address_line1", kind: "scalar", T: 9  },
            { no: 13, name: "address_line2", kind: "scalar", T: 9  },
            { no: 14, name: "city", kind: "scalar", T: 9  },
            { no: 15, name: "state", kind: "scalar", T: 9  },
            { no: 16, name: "zip", kind: "scalar", T: 9  },
            { no: 17, name: "logo_url", kind: "scalar", T: 9  },
            { no: 18, name: "brand_primary", kind: "scalar", T: 9  },
            { no: 19, name: "brand_secondary", kind: "scalar", T: 9  },
            { no: 20, name: "brand_accent", kind: "scalar", T: 9  },
            { no: 21, name: "brand_background", kind: "scalar", T: 9  },
            { no: 22, name: "brand_text", kind: "scalar", T: 9  },
            { no: 23, name: "brand_button", kind: "scalar", T: 9  },
            { no: 24, name: "brand_highlight", kind: "scalar", T: 9  },
            { no: 25, name: "ach_enabled", kind: "scalar", T: 8  }
        ]);
    }
    create(value?: PartialMessage<Tenant>): Tenant {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.tenantsId = "";
        message.slug = "";
        message.name = "";
        message.legalName = "";
        message.countryCode = "";
        message.memberCount = 0;
        message.eventCount = 0;
        message.totalRevenueCents = "0";
        message.archived = false;
        message.defaultFeeFormulasId = "";
        message.phone = "";
        message.addressLine1 = "";
        message.addressLine2 = "";
        message.city = "";
        message.state = "";
        message.zip = "";
        message.logoUrl = "";
        message.brandPrimary = "";
        message.brandSecondary = "";
        message.brandAccent = "";
        message.brandBackground = "";
        message.brandText = "";
        message.brandButton = "";
        message.brandHighlight = "";
        message.achEnabled = false;
        if (value !== undefined)
            reflectionMergePartial<Tenant>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Tenant): Tenant {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.tenantsId = reader.string();
                    break;
                case  2:
                    message.slug = reader.string();
                    break;
                case  3:
                    message.name = reader.string();
                    break;
                case  4:
                    message.legalName = reader.string();
                    break;
                case  5:
                    message.countryCode = reader.string();
                    break;
                case  6:
                    message.memberCount = reader.int32();
                    break;
                case  7:
                    message.eventCount = reader.int32();
                    break;
                case  8:
                    message.totalRevenueCents = reader.int64().toString();
                    break;
                case  9:
                    message.archived = reader.bool();
                    break;
                case  10:
                    message.defaultFeeFormulasId = reader.string();
                    break;
                case  11:
                    message.phone = reader.string();
                    break;
                case  12:
                    message.addressLine1 = reader.string();
                    break;
                case  13:
                    message.addressLine2 = reader.string();
                    break;
                case  14:
                    message.city = reader.string();
                    break;
                case  15:
                    message.state = reader.string();
                    break;
                case  16:
                    message.zip = reader.string();
                    break;
                case  17:
                    message.logoUrl = reader.string();
                    break;
                case  18:
                    message.brandPrimary = reader.string();
                    break;
                case  19:
                    message.brandSecondary = reader.string();
                    break;
                case  20:
                    message.brandAccent = reader.string();
                    break;
                case  21:
                    message.brandBackground = reader.string();
                    break;
                case  22:
                    message.brandText = reader.string();
                    break;
                case  23:
                    message.brandButton = reader.string();
                    break;
                case  24:
                    message.brandHighlight = reader.string();
                    break;
                case  25:
                    message.achEnabled = reader.bool();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: Tenant, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.tenantsId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.tenantsId);
        
        if (message.slug !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.slug);
        
        if (message.name !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.name);
        
        if (message.legalName !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.legalName);
        
        if (message.countryCode !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.countryCode);
        
        if (message.memberCount !== 0)
            writer.tag(6, WireType.Varint).int32(message.memberCount);
        
        if (message.eventCount !== 0)
            writer.tag(7, WireType.Varint).int32(message.eventCount);
        
        if (message.totalRevenueCents !== "0")
            writer.tag(8, WireType.Varint).int64(message.totalRevenueCents);
        
        if (message.archived !== false)
            writer.tag(9, WireType.Varint).bool(message.archived);
        
        if (message.defaultFeeFormulasId !== "")
            writer.tag(10, WireType.LengthDelimited).string(message.defaultFeeFormulasId);
        
        if (message.phone !== "")
            writer.tag(11, WireType.LengthDelimited).string(message.phone);
        
        if (message.addressLine1 !== "")
            writer.tag(12, WireType.LengthDelimited).string(message.addressLine1);
        
        if (message.addressLine2 !== "")
            writer.tag(13, WireType.LengthDelimited).string(message.addressLine2);
        
        if (message.city !== "")
            writer.tag(14, WireType.LengthDelimited).string(message.city);
        
        if (message.state !== "")
            writer.tag(15, WireType.LengthDelimited).string(message.state);
        
        if (message.zip !== "")
            writer.tag(16, WireType.LengthDelimited).string(message.zip);
        
        if (message.logoUrl !== "")
            writer.tag(17, WireType.LengthDelimited).string(message.logoUrl);
        
        if (message.brandPrimary !== "")
            writer.tag(18, WireType.LengthDelimited).string(message.brandPrimary);
        
        if (message.brandSecondary !== "")
            writer.tag(19, WireType.LengthDelimited).string(message.brandSecondary);
        
        if (message.brandAccent !== "")
            writer.tag(20, WireType.LengthDelimited).string(message.brandAccent);
        
        if (message.brandBackground !== "")
            writer.tag(21, WireType.LengthDelimited).string(message.brandBackground);
        
        if (message.brandText !== "")
            writer.tag(22, WireType.LengthDelimited).string(message.brandText);
        
        if (message.brandButton !== "")
            writer.tag(23, WireType.LengthDelimited).string(message.brandButton);
        
        if (message.brandHighlight !== "")
            writer.tag(24, WireType.LengthDelimited).string(message.brandHighlight);
        
        if (message.achEnabled !== false)
            writer.tag(25, WireType.Varint).bool(message.achEnabled);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const Tenant = new Tenant$Type();

class UpdateMyTenantBrandingRequest$Type extends MessageType<UpdateMyTenantBrandingRequest> {
    constructor() {
        super("svyne.tenant.UpdateMyTenantBrandingRequest", [
            { no: 1, name: "logo_images_id", kind: "scalar", T: 9  },
            { no: 2, name: "brand_primary", kind: "scalar", T: 9  },
            { no: 3, name: "brand_secondary", kind: "scalar", T: 9  },
            { no: 4, name: "brand_accent", kind: "scalar", T: 9  },
            { no: 5, name: "brand_background", kind: "scalar", T: 9  },
            { no: 6, name: "brand_text", kind: "scalar", T: 9  },
            { no: 7, name: "brand_button", kind: "scalar", T: 9  },
            { no: 8, name: "brand_highlight", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<UpdateMyTenantBrandingRequest>): UpdateMyTenantBrandingRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.logoImagesId = "";
        message.brandPrimary = "";
        message.brandSecondary = "";
        message.brandAccent = "";
        message.brandBackground = "";
        message.brandText = "";
        message.brandButton = "";
        message.brandHighlight = "";
        if (value !== undefined)
            reflectionMergePartial<UpdateMyTenantBrandingRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: UpdateMyTenantBrandingRequest): UpdateMyTenantBrandingRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.logoImagesId = reader.string();
                    break;
                case  2:
                    message.brandPrimary = reader.string();
                    break;
                case  3:
                    message.brandSecondary = reader.string();
                    break;
                case  4:
                    message.brandAccent = reader.string();
                    break;
                case  5:
                    message.brandBackground = reader.string();
                    break;
                case  6:
                    message.brandText = reader.string();
                    break;
                case  7:
                    message.brandButton = reader.string();
                    break;
                case  8:
                    message.brandHighlight = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: UpdateMyTenantBrandingRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.logoImagesId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.logoImagesId);
        
        if (message.brandPrimary !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.brandPrimary);
        
        if (message.brandSecondary !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.brandSecondary);
        
        if (message.brandAccent !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.brandAccent);
        
        if (message.brandBackground !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.brandBackground);
        
        if (message.brandText !== "")
            writer.tag(6, WireType.LengthDelimited).string(message.brandText);
        
        if (message.brandButton !== "")
            writer.tag(7, WireType.LengthDelimited).string(message.brandButton);
        
        if (message.brandHighlight !== "")
            writer.tag(8, WireType.LengthDelimited).string(message.brandHighlight);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const UpdateMyTenantBrandingRequest = new UpdateMyTenantBrandingRequest$Type();

class PublicTenantBrandingRequest$Type extends MessageType<PublicTenantBrandingRequest> {
    constructor() {
        super("svyne.tenant.PublicTenantBrandingRequest", [
            { no: 1, name: "slug", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<PublicTenantBrandingRequest>): PublicTenantBrandingRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.slug = "";
        if (value !== undefined)
            reflectionMergePartial<PublicTenantBrandingRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: PublicTenantBrandingRequest): PublicTenantBrandingRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.slug = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: PublicTenantBrandingRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.slug !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.slug);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const PublicTenantBrandingRequest = new PublicTenantBrandingRequest$Type();

class PublicTenantBranding$Type extends MessageType<PublicTenantBranding> {
    constructor() {
        super("svyne.tenant.PublicTenantBranding", [
            { no: 1, name: "slug", kind: "scalar", T: 9  },
            { no: 2, name: "name", kind: "scalar", T: 9  },
            { no: 3, name: "logo_url", kind: "scalar", T: 9  },
            { no: 4, name: "brand_primary", kind: "scalar", T: 9  },
            { no: 5, name: "brand_secondary", kind: "scalar", T: 9  },
            { no: 6, name: "brand_accent", kind: "scalar", T: 9  },
            { no: 7, name: "brand_background", kind: "scalar", T: 9  },
            { no: 8, name: "brand_text", kind: "scalar", T: 9  },
            { no: 9, name: "brand_button", kind: "scalar", T: 9  },
            { no: 10, name: "brand_highlight", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<PublicTenantBranding>): PublicTenantBranding {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.slug = "";
        message.name = "";
        message.logoUrl = "";
        message.brandPrimary = "";
        message.brandSecondary = "";
        message.brandAccent = "";
        message.brandBackground = "";
        message.brandText = "";
        message.brandButton = "";
        message.brandHighlight = "";
        if (value !== undefined)
            reflectionMergePartial<PublicTenantBranding>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: PublicTenantBranding): PublicTenantBranding {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.slug = reader.string();
                    break;
                case  2:
                    message.name = reader.string();
                    break;
                case  3:
                    message.logoUrl = reader.string();
                    break;
                case  4:
                    message.brandPrimary = reader.string();
                    break;
                case  5:
                    message.brandSecondary = reader.string();
                    break;
                case  6:
                    message.brandAccent = reader.string();
                    break;
                case  7:
                    message.brandBackground = reader.string();
                    break;
                case  8:
                    message.brandText = reader.string();
                    break;
                case  9:
                    message.brandButton = reader.string();
                    break;
                case  10:
                    message.brandHighlight = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: PublicTenantBranding, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.slug !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.slug);
        
        if (message.name !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.name);
        
        if (message.logoUrl !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.logoUrl);
        
        if (message.brandPrimary !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.brandPrimary);
        
        if (message.brandSecondary !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.brandSecondary);
        
        if (message.brandAccent !== "")
            writer.tag(6, WireType.LengthDelimited).string(message.brandAccent);
        
        if (message.brandBackground !== "")
            writer.tag(7, WireType.LengthDelimited).string(message.brandBackground);
        
        if (message.brandText !== "")
            writer.tag(8, WireType.LengthDelimited).string(message.brandText);
        
        if (message.brandButton !== "")
            writer.tag(9, WireType.LengthDelimited).string(message.brandButton);
        
        if (message.brandHighlight !== "")
            writer.tag(10, WireType.LengthDelimited).string(message.brandHighlight);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const PublicTenantBranding = new PublicTenantBranding$Type();

class UpdateMyTenantContactRequest$Type extends MessageType<UpdateMyTenantContactRequest> {
    constructor() {
        super("svyne.tenant.UpdateMyTenantContactRequest", [
            { no: 1, name: "phone", kind: "scalar", T: 9  },
            { no: 2, name: "address_line1", kind: "scalar", T: 9  },
            { no: 3, name: "address_line2", kind: "scalar", T: 9  },
            { no: 4, name: "city", kind: "scalar", T: 9  },
            { no: 5, name: "state", kind: "scalar", T: 9  },
            { no: 6, name: "zip", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<UpdateMyTenantContactRequest>): UpdateMyTenantContactRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.phone = "";
        message.addressLine1 = "";
        message.addressLine2 = "";
        message.city = "";
        message.state = "";
        message.zip = "";
        if (value !== undefined)
            reflectionMergePartial<UpdateMyTenantContactRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: UpdateMyTenantContactRequest): UpdateMyTenantContactRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.phone = reader.string();
                    break;
                case  2:
                    message.addressLine1 = reader.string();
                    break;
                case  3:
                    message.addressLine2 = reader.string();
                    break;
                case  4:
                    message.city = reader.string();
                    break;
                case  5:
                    message.state = reader.string();
                    break;
                case  6:
                    message.zip = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: UpdateMyTenantContactRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.phone !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.phone);
        
        if (message.addressLine1 !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.addressLine1);
        
        if (message.addressLine2 !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.addressLine2);
        
        if (message.city !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.city);
        
        if (message.state !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.state);
        
        if (message.zip !== "")
            writer.tag(6, WireType.LengthDelimited).string(message.zip);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const UpdateMyTenantContactRequest = new UpdateMyTenantContactRequest$Type();

class CreateTenantRequest$Type extends MessageType<CreateTenantRequest> {
    constructor() {
        super("svyne.tenant.CreateTenantRequest", [
            { no: 1, name: "slug", kind: "scalar", T: 9  },
            { no: 2, name: "name", kind: "scalar", T: 9  },
            { no: 3, name: "admin_email", kind: "scalar", T: 9  },
            { no: 4, name: "admin_first_name", kind: "scalar", T: 9  },
            { no: 5, name: "admin_last_name", kind: "scalar", T: 9  },
            { no: 6, name: "legal_name", kind: "scalar", T: 9  },
            { no: 7, name: "country_code", kind: "scalar", T: 9  },
            { no: 8, name: "business_type", kind: "scalar", T: 9  },
            { no: 9, name: "business_url", kind: "scalar", T: 9  },
            { no: 10, name: "product_description", kind: "scalar", T: 9  },
            { no: 11, name: "mcc", kind: "scalar", T: 9  },
            { no: 12, name: "support_email", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<CreateTenantRequest>): CreateTenantRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.slug = "";
        message.name = "";
        message.adminEmail = "";
        message.adminFirstName = "";
        message.adminLastName = "";
        message.legalName = "";
        message.countryCode = "";
        message.businessType = "";
        message.businessUrl = "";
        message.productDescription = "";
        message.mcc = "";
        message.supportEmail = "";
        if (value !== undefined)
            reflectionMergePartial<CreateTenantRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: CreateTenantRequest): CreateTenantRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.slug = reader.string();
                    break;
                case  2:
                    message.name = reader.string();
                    break;
                case  3:
                    message.adminEmail = reader.string();
                    break;
                case  4:
                    message.adminFirstName = reader.string();
                    break;
                case  5:
                    message.adminLastName = reader.string();
                    break;
                case  6:
                    message.legalName = reader.string();
                    break;
                case  7:
                    message.countryCode = reader.string();
                    break;
                case  8:
                    message.businessType = reader.string();
                    break;
                case  9:
                    message.businessUrl = reader.string();
                    break;
                case  10:
                    message.productDescription = reader.string();
                    break;
                case  11:
                    message.mcc = reader.string();
                    break;
                case  12:
                    message.supportEmail = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: CreateTenantRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.slug !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.slug);
        
        if (message.name !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.name);
        
        if (message.adminEmail !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.adminEmail);
        
        if (message.adminFirstName !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.adminFirstName);
        
        if (message.adminLastName !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.adminLastName);
        
        if (message.legalName !== "")
            writer.tag(6, WireType.LengthDelimited).string(message.legalName);
        
        if (message.countryCode !== "")
            writer.tag(7, WireType.LengthDelimited).string(message.countryCode);
        
        if (message.businessType !== "")
            writer.tag(8, WireType.LengthDelimited).string(message.businessType);
        
        if (message.businessUrl !== "")
            writer.tag(9, WireType.LengthDelimited).string(message.businessUrl);
        
        if (message.productDescription !== "")
            writer.tag(10, WireType.LengthDelimited).string(message.productDescription);
        
        if (message.mcc !== "")
            writer.tag(11, WireType.LengthDelimited).string(message.mcc);
        
        if (message.supportEmail !== "")
            writer.tag(12, WireType.LengthDelimited).string(message.supportEmail);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const CreateTenantRequest = new CreateTenantRequest$Type();

class CreateTenantResponse$Type extends MessageType<CreateTenantResponse> {
    constructor() {
        super("svyne.tenant.CreateTenantResponse", [
            { no: 1, name: "tenants_id", kind: "scalar", T: 9  },
            { no: 2, name: "admin_users_id", kind: "scalar", T: 9  },
            { no: 3, name: "setup_url", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<CreateTenantResponse>): CreateTenantResponse {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.tenantsId = "";
        message.adminUsersId = "";
        message.setupUrl = "";
        if (value !== undefined)
            reflectionMergePartial<CreateTenantResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: CreateTenantResponse): CreateTenantResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.tenantsId = reader.string();
                    break;
                case  2:
                    message.adminUsersId = reader.string();
                    break;
                case  3:
                    message.setupUrl = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: CreateTenantResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.tenantsId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.tenantsId);
        
        if (message.adminUsersId !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.adminUsersId);
        
        if (message.setupUrl !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.setupUrl);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const CreateTenantResponse = new CreateTenantResponse$Type();

class UpdateTenantRequest$Type extends MessageType<UpdateTenantRequest> {
    constructor() {
        super("svyne.tenant.UpdateTenantRequest", [
            { no: 1, name: "tenants_id", kind: "scalar", T: 9  },
            { no: 2, name: "name", kind: "scalar", T: 9  },
            { no: 3, name: "legal_name", kind: "scalar", T: 9  },
            { no: 4, name: "country_code", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<UpdateTenantRequest>): UpdateTenantRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.tenantsId = "";
        message.name = "";
        message.legalName = "";
        message.countryCode = "";
        if (value !== undefined)
            reflectionMergePartial<UpdateTenantRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: UpdateTenantRequest): UpdateTenantRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.tenantsId = reader.string();
                    break;
                case  2:
                    message.name = reader.string();
                    break;
                case  3:
                    message.legalName = reader.string();
                    break;
                case  4:
                    message.countryCode = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: UpdateTenantRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.tenantsId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.tenantsId);
        
        if (message.name !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.name);
        
        if (message.legalName !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.legalName);
        
        if (message.countryCode !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.countryCode);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const UpdateTenantRequest = new UpdateTenantRequest$Type();

class SetTenantAchEnabledRequest$Type extends MessageType<SetTenantAchEnabledRequest> {
    constructor() {
        super("svyne.tenant.SetTenantAchEnabledRequest", [
            { no: 1, name: "tenants_id", kind: "scalar", T: 9  },
            { no: 2, name: "ach_enabled", kind: "scalar", T: 8  }
        ]);
    }
    create(value?: PartialMessage<SetTenantAchEnabledRequest>): SetTenantAchEnabledRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.tenantsId = "";
        message.achEnabled = false;
        if (value !== undefined)
            reflectionMergePartial<SetTenantAchEnabledRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: SetTenantAchEnabledRequest): SetTenantAchEnabledRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.tenantsId = reader.string();
                    break;
                case  2:
                    message.achEnabled = reader.bool();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: SetTenantAchEnabledRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.tenantsId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.tenantsId);
        
        if (message.achEnabled !== false)
            writer.tag(2, WireType.Varint).bool(message.achEnabled);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const SetTenantAchEnabledRequest = new SetTenantAchEnabledRequest$Type();

class ListTenantsResponse$Type extends MessageType<ListTenantsResponse> {
    constructor() {
        super("svyne.tenant.ListTenantsResponse", [
            { no: 1, name: "tenants", kind: "message", repeat: 2 , T: () => Tenant },
            { no: 2, name: "meta", kind: "message", T: () => PageMeta }
        ]);
    }
    create(value?: PartialMessage<ListTenantsResponse>): ListTenantsResponse {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.tenants = [];
        if (value !== undefined)
            reflectionMergePartial<ListTenantsResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ListTenantsResponse): ListTenantsResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.tenants.push(Tenant.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case  2:
                    message.meta = PageMeta.internalBinaryRead(reader, reader.uint32(), options, message.meta);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: ListTenantsResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        for (let i = 0; i < message.tenants.length; i++)
            Tenant.internalBinaryWrite(message.tenants[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        
        if (message.meta)
            PageMeta.internalBinaryWrite(message.meta, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const ListTenantsResponse = new ListTenantsResponse$Type();

class PublicTenant$Type extends MessageType<PublicTenant> {
    constructor() {
        super("svyne.tenant.PublicTenant", [
            { no: 1, name: "slug", kind: "scalar", T: 9  },
            { no: 2, name: "name", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<PublicTenant>): PublicTenant {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.slug = "";
        message.name = "";
        if (value !== undefined)
            reflectionMergePartial<PublicTenant>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: PublicTenant): PublicTenant {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.slug = reader.string();
                    break;
                case  2:
                    message.name = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: PublicTenant, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.slug !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.slug);
        
        if (message.name !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.name);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const PublicTenant = new PublicTenant$Type();

class ListPublicTenantsResponse$Type extends MessageType<ListPublicTenantsResponse> {
    constructor() {
        super("svyne.tenant.ListPublicTenantsResponse", [
            { no: 1, name: "tenants", kind: "message", repeat: 2 , T: () => PublicTenant }
        ]);
    }
    create(value?: PartialMessage<ListPublicTenantsResponse>): ListPublicTenantsResponse {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.tenants = [];
        if (value !== undefined)
            reflectionMergePartial<ListPublicTenantsResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ListPublicTenantsResponse): ListPublicTenantsResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.tenants.push(PublicTenant.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: ListPublicTenantsResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        for (let i = 0; i < message.tenants.length; i++)
            PublicTenant.internalBinaryWrite(message.tenants[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const ListPublicTenantsResponse = new ListPublicTenantsResponse$Type();

class TenantMember$Type extends MessageType<TenantMember> {
    constructor() {
        super("svyne.tenant.TenantMember", [
            { no: 1, name: "users_id", kind: "scalar", T: 9  },
            { no: 2, name: "email", kind: "scalar", T: 9  },
            { no: 3, name: "role", kind: "scalar", T: 5  },
            { no: 4, name: "display_name", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<TenantMember>): TenantMember {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.usersId = "";
        message.email = "";
        message.role = 0;
        message.displayName = "";
        if (value !== undefined)
            reflectionMergePartial<TenantMember>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: TenantMember): TenantMember {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.usersId = reader.string();
                    break;
                case  2:
                    message.email = reader.string();
                    break;
                case  3:
                    message.role = reader.int32();
                    break;
                case  4:
                    message.displayName = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: TenantMember, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.usersId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.usersId);
        
        if (message.email !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.email);
        
        if (message.role !== 0)
            writer.tag(3, WireType.Varint).int32(message.role);
        
        if (message.displayName !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.displayName);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const TenantMember = new TenantMember$Type();

class ListTenantMembersResponse$Type extends MessageType<ListTenantMembersResponse> {
    constructor() {
        super("svyne.tenant.ListTenantMembersResponse", [
            { no: 1, name: "members", kind: "message", repeat: 2 , T: () => TenantMember }
        ]);
    }
    create(value?: PartialMessage<ListTenantMembersResponse>): ListTenantMembersResponse {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.members = [];
        if (value !== undefined)
            reflectionMergePartial<ListTenantMembersResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ListTenantMembersResponse): ListTenantMembersResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.members.push(TenantMember.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: ListTenantMembersResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        for (let i = 0; i < message.members.length; i++)
            TenantMember.internalBinaryWrite(message.members[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const ListTenantMembersResponse = new ListTenantMembersResponse$Type();

class TenantStripeStatus$Type extends MessageType<TenantStripeStatus> {
    constructor() {
        super("svyne.tenant.TenantStripeStatus", [
            { no: 1, name: "tenants_id", kind: "scalar", T: 9  },
            { no: 2, name: "stripe_connected_account_id", kind: "scalar", T: 9  },
            { no: 3, name: "charges_enabled", kind: "scalar", T: 8  },
            { no: 4, name: "payouts_enabled", kind: "scalar", T: 8  },
            { no: 5, name: "details_submitted", kind: "scalar", T: 8  }
        ]);
    }
    create(value?: PartialMessage<TenantStripeStatus>): TenantStripeStatus {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.tenantsId = "";
        message.stripeConnectedAccountId = "";
        message.chargesEnabled = false;
        message.payoutsEnabled = false;
        message.detailsSubmitted = false;
        if (value !== undefined)
            reflectionMergePartial<TenantStripeStatus>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: TenantStripeStatus): TenantStripeStatus {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.tenantsId = reader.string();
                    break;
                case  2:
                    message.stripeConnectedAccountId = reader.string();
                    break;
                case  3:
                    message.chargesEnabled = reader.bool();
                    break;
                case  4:
                    message.payoutsEnabled = reader.bool();
                    break;
                case  5:
                    message.detailsSubmitted = reader.bool();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: TenantStripeStatus, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.tenantsId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.tenantsId);
        
        if (message.stripeConnectedAccountId !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.stripeConnectedAccountId);
        
        if (message.chargesEnabled !== false)
            writer.tag(3, WireType.Varint).bool(message.chargesEnabled);
        
        if (message.payoutsEnabled !== false)
            writer.tag(4, WireType.Varint).bool(message.payoutsEnabled);
        
        if (message.detailsSubmitted !== false)
            writer.tag(5, WireType.Varint).bool(message.detailsSubmitted);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const TenantStripeStatus = new TenantStripeStatus$Type();

export const TenantService = new ServiceType("svyne.tenant.TenantService", [
    { name: "CreateTenant", options: {}, I: CreateTenantRequest, O: CreateTenantResponse },
    { name: "UpdateTenant", options: {}, I: UpdateTenantRequest, O: AckResponse },
    { name: "ArchiveTenant", options: {}, I: UuidValue, O: AckResponse },
    { name: "GetTenant", options: {}, I: UuidValue, O: Tenant },
    { name: "GetMyTenant", options: {}, I: Empty, O: Tenant },
    { name: "UpdateMyTenantContact", options: {}, I: UpdateMyTenantContactRequest, O: AckResponse },
    { name: "UpdateMyTenantBranding", options: {}, I: UpdateMyTenantBrandingRequest, O: AckResponse },
    { name: "GetPublicTenantBranding", options: {}, I: PublicTenantBrandingRequest, O: PublicTenantBranding },
    { name: "ListTenants", options: {}, I: PageRequest, O: ListTenantsResponse },
    { name: "ListPublicTenants", options: {}, I: Empty, O: ListPublicTenantsResponse },
    { name: "ListTenantMembers", options: {}, I: UuidValue, O: ListTenantMembersResponse },
    { name: "GetTenantStripeStatus", options: {}, I: UuidValue, O: TenantStripeStatus },
    { name: "GetTenantStripeProfile", options: {}, I: UuidValue, O: TenantStripeProfile },
    { name: "UpdateTenantStripeProfile", options: {}, I: UpdateTenantStripeProfileRequest, O: AckResponse },
    { name: "SetTenantAchEnabled", options: {}, I: SetTenantAchEnabledRequest, O: AckResponse }
]);
