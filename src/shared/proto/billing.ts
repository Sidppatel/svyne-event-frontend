



import { Empty } from "./common";
import { AckResponse } from "./common";
import { PageRequest } from "./common";
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

export interface TenantRequest {
    
    tenantsId: string;
}

export interface TenantBillingRow {
    
    tenantsId: string;
    
    slug: string;
    
    name: string;
    
    tier: string;
    
    archived: boolean;
    
    subscriptionStatus: string; 
    
    subscriptionTier: string;
    
    monthlyPriceCents: number;
    
    currentPeriodEndEpochSeconds: string;
    
    cancelAtPeriodEnd: boolean;
    
    pendingTier: string;
    
    trialEndsAtEpochSeconds: string;
    
    feePercentBps: number;
    
    feeFlatCents: number;
    
    hasCustomFeeOverride: boolean;
    
    activeAddons: number;
    
    totalEvents: number;
}

export interface TenantBillingList {
    
    tenants: TenantBillingRow[];
    
    meta?: PageMeta;
}

export interface SubscriptionRequest {
    
    tenantsId: string;
    
    tier: string; 
    
    reason: string; 
}

export interface CancelSubscriptionRequest {
    
    tenantsId: string;
    
    atPeriodEnd: boolean;
    
    reason: string;
}

export interface EventUpgradeRow {
    
    eventUpgradesId: string;
    
    eventsId: string;
    
    eventTitle: string;
    
    eventStatus: string;
    
    tenantsId: string;
    
    tenantName: string;
    
    tenantSlug: string;
    
    tier: string;
    
    status: string;
    
    priceCents: number;
    
    smsCredits: number;
    
    customDomainLimit: number;
    
    refundedCents: number;
    
    createdAtEpochSeconds: string;
}

export interface EventUpgradeList {
    
    upgrades: EventUpgradeRow[];
    
    meta?: PageMeta;
}

export interface EventUpgradeRequest {
    
    eventsId: string;
    
    tier: string; 
    
    reason: string;
}

export interface CancelEventUpgradeRequest {
    
    eventsId: string;
    
    refundCents: number; 
    
    reason: string;
}

export interface TenantAddonRow {
    
    tenantAddonsId: string;
    
    tenantsId: string;
    
    tenantName: string;
    
    type: string;
    
    billingPeriod: string;
    
    quantity: number;
    
    priceCents: number;
    
    setupFeeCents: number;
    
    status: string;
    
    currentPeriodEndEpochSeconds: string;
    
    usageCount: number;
}

export interface TenantAddonList {
    
    addons: TenantAddonRow[];
}

export interface ProvisionAddonRequest {
    
    tenantsId: string;
    
    type: string; 
    
    billingPeriod: string; 
    
    quantity: number;
    
    reason: string;
}

export interface CancelAddonRequest {
    
    tenantAddonsId: string;
    
    refundCents: number;
    
    reason: string;
}

export interface FeeOverrideRow {
    
    scope: string; 
    
    tenantsId: string;
    
    tenantName: string;
    
    tenantSlug: string;
    
    eventsId: string; 
    
    eventTitle: string;
    
    percentBps: number;
    
    flatCents: number;
    
    minFeeCents: number;
    
    maxFeeCents: number;
    
    standardPercentBps: number;
    
    standardFlatCents: number;
    
    expiresAtEpochSeconds: string; 
    
    updatedAtEpochSeconds: string;
}

export interface FeeOverrideList {
    
    overrides: FeeOverrideRow[];
}

export interface SetEventFeeOverrideRequest {
    
    eventsId: string;
    
    percentBps: number;
    
    flatCents: number;
    
    minFeeCents: number; 
    
    maxFeeCents: number; 
    
    expiresAtEpochSeconds: string; 
    
    reason: string; 
}

export interface ClearEventFeeOverrideRequest {
    
    eventsId: string;
    
    reason: string; 
}

export interface RevenueReportRequest {
    
    fromEpochSeconds: string;
    
    toEpochSeconds: string;
}

export interface RevenueSourceRow {
    
    source: string; 
    
    revenueCents: string;
    
    itemCount: number;
}

export interface RevenueTierRow {
    
    tier: string;
    
    serviceFeeCents: string;
    
    billingCents: string;
    
    tenantCount: number;
}

export interface RevenueTrendPoint {
    
    bucketStartEpochSeconds: string;
    
    serviceFeeCents: string;
    
    billingCents: string;
}

export interface RevenueReport {
    
    bySource: RevenueSourceRow[];
    
    byTier: RevenueTierRow[];
    
    trend: RevenueTrendPoint[];
    
    generatedAtEpochSeconds: string;
}

export interface TenantActivityRequest {
    
    fromEpochSeconds: string;
    
    toEpochSeconds: string;
    
    search: string;
    
    tier: string; 
    
    offset: number;
    
    limit: number;
}

export interface TenantActivityRow {
    
    tenantsId: string;
    
    name: string;
    
    slug: string;
    
    tier: string;
    
    eventsCreated: number;
    
    ticketsSold: number;
    
    serviceFeeCents: string;
    
    billingCents: string;
    
    avgTicketCents: string;
    
    subscriptionStatus: string;
}

export interface TenantActivityList {
    
    rows: TenantActivityRow[];
    
    total: number;
}

class TenantRequest$Type extends MessageType<TenantRequest> {
    constructor() {
        super("svyne.billing.TenantRequest", [
            { no: 1, name: "tenants_id", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<TenantRequest>): TenantRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.tenantsId = "";
        if (value !== undefined)
            reflectionMergePartial<TenantRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: TenantRequest): TenantRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.tenantsId = reader.string();
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
    internalBinaryWrite(message: TenantRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.tenantsId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.tenantsId);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const TenantRequest = new TenantRequest$Type();

class TenantBillingRow$Type extends MessageType<TenantBillingRow> {
    constructor() {
        super("svyne.billing.TenantBillingRow", [
            { no: 1, name: "tenants_id", kind: "scalar", T: 9  },
            { no: 2, name: "slug", kind: "scalar", T: 9  },
            { no: 3, name: "name", kind: "scalar", T: 9  },
            { no: 4, name: "tier", kind: "scalar", T: 9  },
            { no: 5, name: "archived", kind: "scalar", T: 8  },
            { no: 6, name: "subscription_status", kind: "scalar", T: 9  },
            { no: 7, name: "subscription_tier", kind: "scalar", T: 9  },
            { no: 8, name: "monthly_price_cents", kind: "scalar", T: 5  },
            { no: 9, name: "current_period_end_epoch_seconds", kind: "scalar", T: 3  },
            { no: 10, name: "cancel_at_period_end", kind: "scalar", T: 8  },
            { no: 11, name: "pending_tier", kind: "scalar", T: 9  },
            { no: 12, name: "trial_ends_at_epoch_seconds", kind: "scalar", T: 3  },
            { no: 13, name: "fee_percent_bps", kind: "scalar", T: 5  },
            { no: 14, name: "fee_flat_cents", kind: "scalar", T: 5  },
            { no: 15, name: "has_custom_fee_override", kind: "scalar", T: 8  },
            { no: 16, name: "active_addons", kind: "scalar", T: 5  },
            { no: 17, name: "total_events", kind: "scalar", T: 5  }
        ]);
    }
    create(value?: PartialMessage<TenantBillingRow>): TenantBillingRow {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.tenantsId = "";
        message.slug = "";
        message.name = "";
        message.tier = "";
        message.archived = false;
        message.subscriptionStatus = "";
        message.subscriptionTier = "";
        message.monthlyPriceCents = 0;
        message.currentPeriodEndEpochSeconds = "0";
        message.cancelAtPeriodEnd = false;
        message.pendingTier = "";
        message.trialEndsAtEpochSeconds = "0";
        message.feePercentBps = 0;
        message.feeFlatCents = 0;
        message.hasCustomFeeOverride = false;
        message.activeAddons = 0;
        message.totalEvents = 0;
        if (value !== undefined)
            reflectionMergePartial<TenantBillingRow>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: TenantBillingRow): TenantBillingRow {
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
                    message.tier = reader.string();
                    break;
                case  5:
                    message.archived = reader.bool();
                    break;
                case  6:
                    message.subscriptionStatus = reader.string();
                    break;
                case  7:
                    message.subscriptionTier = reader.string();
                    break;
                case  8:
                    message.monthlyPriceCents = reader.int32();
                    break;
                case  9:
                    message.currentPeriodEndEpochSeconds = reader.int64().toString();
                    break;
                case  10:
                    message.cancelAtPeriodEnd = reader.bool();
                    break;
                case  11:
                    message.pendingTier = reader.string();
                    break;
                case  12:
                    message.trialEndsAtEpochSeconds = reader.int64().toString();
                    break;
                case  13:
                    message.feePercentBps = reader.int32();
                    break;
                case  14:
                    message.feeFlatCents = reader.int32();
                    break;
                case  15:
                    message.hasCustomFeeOverride = reader.bool();
                    break;
                case  16:
                    message.activeAddons = reader.int32();
                    break;
                case  17:
                    message.totalEvents = reader.int32();
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
    internalBinaryWrite(message: TenantBillingRow, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.tenantsId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.tenantsId);
        
        if (message.slug !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.slug);
        
        if (message.name !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.name);
        
        if (message.tier !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.tier);
        
        if (message.archived !== false)
            writer.tag(5, WireType.Varint).bool(message.archived);
        
        if (message.subscriptionStatus !== "")
            writer.tag(6, WireType.LengthDelimited).string(message.subscriptionStatus);
        
        if (message.subscriptionTier !== "")
            writer.tag(7, WireType.LengthDelimited).string(message.subscriptionTier);
        
        if (message.monthlyPriceCents !== 0)
            writer.tag(8, WireType.Varint).int32(message.monthlyPriceCents);
        
        if (message.currentPeriodEndEpochSeconds !== "0")
            writer.tag(9, WireType.Varint).int64(message.currentPeriodEndEpochSeconds);
        
        if (message.cancelAtPeriodEnd !== false)
            writer.tag(10, WireType.Varint).bool(message.cancelAtPeriodEnd);
        
        if (message.pendingTier !== "")
            writer.tag(11, WireType.LengthDelimited).string(message.pendingTier);
        
        if (message.trialEndsAtEpochSeconds !== "0")
            writer.tag(12, WireType.Varint).int64(message.trialEndsAtEpochSeconds);
        
        if (message.feePercentBps !== 0)
            writer.tag(13, WireType.Varint).int32(message.feePercentBps);
        
        if (message.feeFlatCents !== 0)
            writer.tag(14, WireType.Varint).int32(message.feeFlatCents);
        
        if (message.hasCustomFeeOverride !== false)
            writer.tag(15, WireType.Varint).bool(message.hasCustomFeeOverride);
        
        if (message.activeAddons !== 0)
            writer.tag(16, WireType.Varint).int32(message.activeAddons);
        
        if (message.totalEvents !== 0)
            writer.tag(17, WireType.Varint).int32(message.totalEvents);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const TenantBillingRow = new TenantBillingRow$Type();

class TenantBillingList$Type extends MessageType<TenantBillingList> {
    constructor() {
        super("svyne.billing.TenantBillingList", [
            { no: 1, name: "tenants", kind: "message", repeat: 2 , T: () => TenantBillingRow },
            { no: 2, name: "meta", kind: "message", T: () => PageMeta }
        ]);
    }
    create(value?: PartialMessage<TenantBillingList>): TenantBillingList {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.tenants = [];
        if (value !== undefined)
            reflectionMergePartial<TenantBillingList>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: TenantBillingList): TenantBillingList {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.tenants.push(TenantBillingRow.internalBinaryRead(reader, reader.uint32(), options));
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
    internalBinaryWrite(message: TenantBillingList, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        for (let i = 0; i < message.tenants.length; i++)
            TenantBillingRow.internalBinaryWrite(message.tenants[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        
        if (message.meta)
            PageMeta.internalBinaryWrite(message.meta, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const TenantBillingList = new TenantBillingList$Type();

class SubscriptionRequest$Type extends MessageType<SubscriptionRequest> {
    constructor() {
        super("svyne.billing.SubscriptionRequest", [
            { no: 1, name: "tenants_id", kind: "scalar", T: 9  },
            { no: 2, name: "tier", kind: "scalar", T: 9  },
            { no: 3, name: "reason", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<SubscriptionRequest>): SubscriptionRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.tenantsId = "";
        message.tier = "";
        message.reason = "";
        if (value !== undefined)
            reflectionMergePartial<SubscriptionRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: SubscriptionRequest): SubscriptionRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.tenantsId = reader.string();
                    break;
                case  2:
                    message.tier = reader.string();
                    break;
                case  3:
                    message.reason = reader.string();
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
    internalBinaryWrite(message: SubscriptionRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.tenantsId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.tenantsId);
        
        if (message.tier !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.tier);
        
        if (message.reason !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.reason);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const SubscriptionRequest = new SubscriptionRequest$Type();

class CancelSubscriptionRequest$Type extends MessageType<CancelSubscriptionRequest> {
    constructor() {
        super("svyne.billing.CancelSubscriptionRequest", [
            { no: 1, name: "tenants_id", kind: "scalar", T: 9  },
            { no: 2, name: "at_period_end", kind: "scalar", T: 8  },
            { no: 3, name: "reason", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<CancelSubscriptionRequest>): CancelSubscriptionRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.tenantsId = "";
        message.atPeriodEnd = false;
        message.reason = "";
        if (value !== undefined)
            reflectionMergePartial<CancelSubscriptionRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: CancelSubscriptionRequest): CancelSubscriptionRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.tenantsId = reader.string();
                    break;
                case  2:
                    message.atPeriodEnd = reader.bool();
                    break;
                case  3:
                    message.reason = reader.string();
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
    internalBinaryWrite(message: CancelSubscriptionRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.tenantsId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.tenantsId);
        
        if (message.atPeriodEnd !== false)
            writer.tag(2, WireType.Varint).bool(message.atPeriodEnd);
        
        if (message.reason !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.reason);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const CancelSubscriptionRequest = new CancelSubscriptionRequest$Type();

class EventUpgradeRow$Type extends MessageType<EventUpgradeRow> {
    constructor() {
        super("svyne.billing.EventUpgradeRow", [
            { no: 1, name: "event_upgrades_id", kind: "scalar", T: 9  },
            { no: 2, name: "events_id", kind: "scalar", T: 9  },
            { no: 3, name: "event_title", kind: "scalar", T: 9  },
            { no: 4, name: "event_status", kind: "scalar", T: 9  },
            { no: 5, name: "tenants_id", kind: "scalar", T: 9  },
            { no: 6, name: "tenant_name", kind: "scalar", T: 9  },
            { no: 7, name: "tenant_slug", kind: "scalar", T: 9  },
            { no: 8, name: "tier", kind: "scalar", T: 9  },
            { no: 9, name: "status", kind: "scalar", T: 9  },
            { no: 10, name: "price_cents", kind: "scalar", T: 5  },
            { no: 11, name: "sms_credits", kind: "scalar", T: 5  },
            { no: 12, name: "custom_domain_limit", kind: "scalar", T: 5  },
            { no: 13, name: "refunded_cents", kind: "scalar", T: 5  },
            { no: 14, name: "created_at_epoch_seconds", kind: "scalar", T: 3  }
        ]);
    }
    create(value?: PartialMessage<EventUpgradeRow>): EventUpgradeRow {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.eventUpgradesId = "";
        message.eventsId = "";
        message.eventTitle = "";
        message.eventStatus = "";
        message.tenantsId = "";
        message.tenantName = "";
        message.tenantSlug = "";
        message.tier = "";
        message.status = "";
        message.priceCents = 0;
        message.smsCredits = 0;
        message.customDomainLimit = 0;
        message.refundedCents = 0;
        message.createdAtEpochSeconds = "0";
        if (value !== undefined)
            reflectionMergePartial<EventUpgradeRow>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: EventUpgradeRow): EventUpgradeRow {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.eventUpgradesId = reader.string();
                    break;
                case  2:
                    message.eventsId = reader.string();
                    break;
                case  3:
                    message.eventTitle = reader.string();
                    break;
                case  4:
                    message.eventStatus = reader.string();
                    break;
                case  5:
                    message.tenantsId = reader.string();
                    break;
                case  6:
                    message.tenantName = reader.string();
                    break;
                case  7:
                    message.tenantSlug = reader.string();
                    break;
                case  8:
                    message.tier = reader.string();
                    break;
                case  9:
                    message.status = reader.string();
                    break;
                case  10:
                    message.priceCents = reader.int32();
                    break;
                case  11:
                    message.smsCredits = reader.int32();
                    break;
                case  12:
                    message.customDomainLimit = reader.int32();
                    break;
                case  13:
                    message.refundedCents = reader.int32();
                    break;
                case  14:
                    message.createdAtEpochSeconds = reader.int64().toString();
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
    internalBinaryWrite(message: EventUpgradeRow, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.eventUpgradesId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.eventUpgradesId);
        
        if (message.eventsId !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.eventsId);
        
        if (message.eventTitle !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.eventTitle);
        
        if (message.eventStatus !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.eventStatus);
        
        if (message.tenantsId !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.tenantsId);
        
        if (message.tenantName !== "")
            writer.tag(6, WireType.LengthDelimited).string(message.tenantName);
        
        if (message.tenantSlug !== "")
            writer.tag(7, WireType.LengthDelimited).string(message.tenantSlug);
        
        if (message.tier !== "")
            writer.tag(8, WireType.LengthDelimited).string(message.tier);
        
        if (message.status !== "")
            writer.tag(9, WireType.LengthDelimited).string(message.status);
        
        if (message.priceCents !== 0)
            writer.tag(10, WireType.Varint).int32(message.priceCents);
        
        if (message.smsCredits !== 0)
            writer.tag(11, WireType.Varint).int32(message.smsCredits);
        
        if (message.customDomainLimit !== 0)
            writer.tag(12, WireType.Varint).int32(message.customDomainLimit);
        
        if (message.refundedCents !== 0)
            writer.tag(13, WireType.Varint).int32(message.refundedCents);
        
        if (message.createdAtEpochSeconds !== "0")
            writer.tag(14, WireType.Varint).int64(message.createdAtEpochSeconds);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const EventUpgradeRow = new EventUpgradeRow$Type();

class EventUpgradeList$Type extends MessageType<EventUpgradeList> {
    constructor() {
        super("svyne.billing.EventUpgradeList", [
            { no: 1, name: "upgrades", kind: "message", repeat: 2 , T: () => EventUpgradeRow },
            { no: 2, name: "meta", kind: "message", T: () => PageMeta }
        ]);
    }
    create(value?: PartialMessage<EventUpgradeList>): EventUpgradeList {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.upgrades = [];
        if (value !== undefined)
            reflectionMergePartial<EventUpgradeList>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: EventUpgradeList): EventUpgradeList {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.upgrades.push(EventUpgradeRow.internalBinaryRead(reader, reader.uint32(), options));
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
    internalBinaryWrite(message: EventUpgradeList, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        for (let i = 0; i < message.upgrades.length; i++)
            EventUpgradeRow.internalBinaryWrite(message.upgrades[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        
        if (message.meta)
            PageMeta.internalBinaryWrite(message.meta, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const EventUpgradeList = new EventUpgradeList$Type();

class EventUpgradeRequest$Type extends MessageType<EventUpgradeRequest> {
    constructor() {
        super("svyne.billing.EventUpgradeRequest", [
            { no: 1, name: "events_id", kind: "scalar", T: 9  },
            { no: 2, name: "tier", kind: "scalar", T: 9  },
            { no: 3, name: "reason", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<EventUpgradeRequest>): EventUpgradeRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.eventsId = "";
        message.tier = "";
        message.reason = "";
        if (value !== undefined)
            reflectionMergePartial<EventUpgradeRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: EventUpgradeRequest): EventUpgradeRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.eventsId = reader.string();
                    break;
                case  2:
                    message.tier = reader.string();
                    break;
                case  3:
                    message.reason = reader.string();
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
    internalBinaryWrite(message: EventUpgradeRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.eventsId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.eventsId);
        
        if (message.tier !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.tier);
        
        if (message.reason !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.reason);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const EventUpgradeRequest = new EventUpgradeRequest$Type();

class CancelEventUpgradeRequest$Type extends MessageType<CancelEventUpgradeRequest> {
    constructor() {
        super("svyne.billing.CancelEventUpgradeRequest", [
            { no: 1, name: "events_id", kind: "scalar", T: 9  },
            { no: 2, name: "refund_cents", kind: "scalar", T: 5  },
            { no: 3, name: "reason", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<CancelEventUpgradeRequest>): CancelEventUpgradeRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.eventsId = "";
        message.refundCents = 0;
        message.reason = "";
        if (value !== undefined)
            reflectionMergePartial<CancelEventUpgradeRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: CancelEventUpgradeRequest): CancelEventUpgradeRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.eventsId = reader.string();
                    break;
                case  2:
                    message.refundCents = reader.int32();
                    break;
                case  3:
                    message.reason = reader.string();
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
    internalBinaryWrite(message: CancelEventUpgradeRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.eventsId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.eventsId);
        
        if (message.refundCents !== 0)
            writer.tag(2, WireType.Varint).int32(message.refundCents);
        
        if (message.reason !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.reason);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const CancelEventUpgradeRequest = new CancelEventUpgradeRequest$Type();

class TenantAddonRow$Type extends MessageType<TenantAddonRow> {
    constructor() {
        super("svyne.billing.TenantAddonRow", [
            { no: 1, name: "tenant_addons_id", kind: "scalar", T: 9  },
            { no: 2, name: "tenants_id", kind: "scalar", T: 9  },
            { no: 3, name: "tenant_name", kind: "scalar", T: 9  },
            { no: 4, name: "type", kind: "scalar", T: 9  },
            { no: 5, name: "billing_period", kind: "scalar", T: 9  },
            { no: 6, name: "quantity", kind: "scalar", T: 5  },
            { no: 7, name: "price_cents", kind: "scalar", T: 5  },
            { no: 8, name: "setup_fee_cents", kind: "scalar", T: 5  },
            { no: 9, name: "status", kind: "scalar", T: 9  },
            { no: 10, name: "current_period_end_epoch_seconds", kind: "scalar", T: 3  },
            { no: 11, name: "usage_count", kind: "scalar", T: 5  }
        ]);
    }
    create(value?: PartialMessage<TenantAddonRow>): TenantAddonRow {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.tenantAddonsId = "";
        message.tenantsId = "";
        message.tenantName = "";
        message.type = "";
        message.billingPeriod = "";
        message.quantity = 0;
        message.priceCents = 0;
        message.setupFeeCents = 0;
        message.status = "";
        message.currentPeriodEndEpochSeconds = "0";
        message.usageCount = 0;
        if (value !== undefined)
            reflectionMergePartial<TenantAddonRow>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: TenantAddonRow): TenantAddonRow {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.tenantAddonsId = reader.string();
                    break;
                case  2:
                    message.tenantsId = reader.string();
                    break;
                case  3:
                    message.tenantName = reader.string();
                    break;
                case  4:
                    message.type = reader.string();
                    break;
                case  5:
                    message.billingPeriod = reader.string();
                    break;
                case  6:
                    message.quantity = reader.int32();
                    break;
                case  7:
                    message.priceCents = reader.int32();
                    break;
                case  8:
                    message.setupFeeCents = reader.int32();
                    break;
                case  9:
                    message.status = reader.string();
                    break;
                case  10:
                    message.currentPeriodEndEpochSeconds = reader.int64().toString();
                    break;
                case  11:
                    message.usageCount = reader.int32();
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
    internalBinaryWrite(message: TenantAddonRow, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.tenantAddonsId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.tenantAddonsId);
        
        if (message.tenantsId !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.tenantsId);
        
        if (message.tenantName !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.tenantName);
        
        if (message.type !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.type);
        
        if (message.billingPeriod !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.billingPeriod);
        
        if (message.quantity !== 0)
            writer.tag(6, WireType.Varint).int32(message.quantity);
        
        if (message.priceCents !== 0)
            writer.tag(7, WireType.Varint).int32(message.priceCents);
        
        if (message.setupFeeCents !== 0)
            writer.tag(8, WireType.Varint).int32(message.setupFeeCents);
        
        if (message.status !== "")
            writer.tag(9, WireType.LengthDelimited).string(message.status);
        
        if (message.currentPeriodEndEpochSeconds !== "0")
            writer.tag(10, WireType.Varint).int64(message.currentPeriodEndEpochSeconds);
        
        if (message.usageCount !== 0)
            writer.tag(11, WireType.Varint).int32(message.usageCount);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const TenantAddonRow = new TenantAddonRow$Type();

class TenantAddonList$Type extends MessageType<TenantAddonList> {
    constructor() {
        super("svyne.billing.TenantAddonList", [
            { no: 1, name: "addons", kind: "message", repeat: 2 , T: () => TenantAddonRow }
        ]);
    }
    create(value?: PartialMessage<TenantAddonList>): TenantAddonList {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.addons = [];
        if (value !== undefined)
            reflectionMergePartial<TenantAddonList>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: TenantAddonList): TenantAddonList {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.addons.push(TenantAddonRow.internalBinaryRead(reader, reader.uint32(), options));
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
    internalBinaryWrite(message: TenantAddonList, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        for (let i = 0; i < message.addons.length; i++)
            TenantAddonRow.internalBinaryWrite(message.addons[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const TenantAddonList = new TenantAddonList$Type();

class ProvisionAddonRequest$Type extends MessageType<ProvisionAddonRequest> {
    constructor() {
        super("svyne.billing.ProvisionAddonRequest", [
            { no: 1, name: "tenants_id", kind: "scalar", T: 9  },
            { no: 2, name: "type", kind: "scalar", T: 9  },
            { no: 3, name: "billing_period", kind: "scalar", T: 9  },
            { no: 4, name: "quantity", kind: "scalar", T: 5  },
            { no: 5, name: "reason", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<ProvisionAddonRequest>): ProvisionAddonRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.tenantsId = "";
        message.type = "";
        message.billingPeriod = "";
        message.quantity = 0;
        message.reason = "";
        if (value !== undefined)
            reflectionMergePartial<ProvisionAddonRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ProvisionAddonRequest): ProvisionAddonRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.tenantsId = reader.string();
                    break;
                case  2:
                    message.type = reader.string();
                    break;
                case  3:
                    message.billingPeriod = reader.string();
                    break;
                case  4:
                    message.quantity = reader.int32();
                    break;
                case  5:
                    message.reason = reader.string();
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
    internalBinaryWrite(message: ProvisionAddonRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.tenantsId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.tenantsId);
        
        if (message.type !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.type);
        
        if (message.billingPeriod !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.billingPeriod);
        
        if (message.quantity !== 0)
            writer.tag(4, WireType.Varint).int32(message.quantity);
        
        if (message.reason !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.reason);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const ProvisionAddonRequest = new ProvisionAddonRequest$Type();

class CancelAddonRequest$Type extends MessageType<CancelAddonRequest> {
    constructor() {
        super("svyne.billing.CancelAddonRequest", [
            { no: 1, name: "tenant_addons_id", kind: "scalar", T: 9  },
            { no: 2, name: "refund_cents", kind: "scalar", T: 5  },
            { no: 3, name: "reason", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<CancelAddonRequest>): CancelAddonRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.tenantAddonsId = "";
        message.refundCents = 0;
        message.reason = "";
        if (value !== undefined)
            reflectionMergePartial<CancelAddonRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: CancelAddonRequest): CancelAddonRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.tenantAddonsId = reader.string();
                    break;
                case  2:
                    message.refundCents = reader.int32();
                    break;
                case  3:
                    message.reason = reader.string();
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
    internalBinaryWrite(message: CancelAddonRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.tenantAddonsId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.tenantAddonsId);
        
        if (message.refundCents !== 0)
            writer.tag(2, WireType.Varint).int32(message.refundCents);
        
        if (message.reason !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.reason);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const CancelAddonRequest = new CancelAddonRequest$Type();

class FeeOverrideRow$Type extends MessageType<FeeOverrideRow> {
    constructor() {
        super("svyne.billing.FeeOverrideRow", [
            { no: 1, name: "scope", kind: "scalar", T: 9  },
            { no: 2, name: "tenants_id", kind: "scalar", T: 9  },
            { no: 3, name: "tenant_name", kind: "scalar", T: 9  },
            { no: 4, name: "tenant_slug", kind: "scalar", T: 9  },
            { no: 5, name: "events_id", kind: "scalar", T: 9  },
            { no: 6, name: "event_title", kind: "scalar", T: 9  },
            { no: 7, name: "percent_bps", kind: "scalar", T: 5  },
            { no: 8, name: "flat_cents", kind: "scalar", T: 5  },
            { no: 9, name: "min_fee_cents", kind: "scalar", T: 5  },
            { no: 10, name: "max_fee_cents", kind: "scalar", T: 5  },
            { no: 11, name: "standard_percent_bps", kind: "scalar", T: 5  },
            { no: 12, name: "standard_flat_cents", kind: "scalar", T: 5  },
            { no: 13, name: "expires_at_epoch_seconds", kind: "scalar", T: 3  },
            { no: 14, name: "updated_at_epoch_seconds", kind: "scalar", T: 3  }
        ]);
    }
    create(value?: PartialMessage<FeeOverrideRow>): FeeOverrideRow {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.scope = "";
        message.tenantsId = "";
        message.tenantName = "";
        message.tenantSlug = "";
        message.eventsId = "";
        message.eventTitle = "";
        message.percentBps = 0;
        message.flatCents = 0;
        message.minFeeCents = 0;
        message.maxFeeCents = 0;
        message.standardPercentBps = 0;
        message.standardFlatCents = 0;
        message.expiresAtEpochSeconds = "0";
        message.updatedAtEpochSeconds = "0";
        if (value !== undefined)
            reflectionMergePartial<FeeOverrideRow>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: FeeOverrideRow): FeeOverrideRow {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.scope = reader.string();
                    break;
                case  2:
                    message.tenantsId = reader.string();
                    break;
                case  3:
                    message.tenantName = reader.string();
                    break;
                case  4:
                    message.tenantSlug = reader.string();
                    break;
                case  5:
                    message.eventsId = reader.string();
                    break;
                case  6:
                    message.eventTitle = reader.string();
                    break;
                case  7:
                    message.percentBps = reader.int32();
                    break;
                case  8:
                    message.flatCents = reader.int32();
                    break;
                case  9:
                    message.minFeeCents = reader.int32();
                    break;
                case  10:
                    message.maxFeeCents = reader.int32();
                    break;
                case  11:
                    message.standardPercentBps = reader.int32();
                    break;
                case  12:
                    message.standardFlatCents = reader.int32();
                    break;
                case  13:
                    message.expiresAtEpochSeconds = reader.int64().toString();
                    break;
                case  14:
                    message.updatedAtEpochSeconds = reader.int64().toString();
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
    internalBinaryWrite(message: FeeOverrideRow, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.scope !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.scope);
        
        if (message.tenantsId !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.tenantsId);
        
        if (message.tenantName !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.tenantName);
        
        if (message.tenantSlug !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.tenantSlug);
        
        if (message.eventsId !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.eventsId);
        
        if (message.eventTitle !== "")
            writer.tag(6, WireType.LengthDelimited).string(message.eventTitle);
        
        if (message.percentBps !== 0)
            writer.tag(7, WireType.Varint).int32(message.percentBps);
        
        if (message.flatCents !== 0)
            writer.tag(8, WireType.Varint).int32(message.flatCents);
        
        if (message.minFeeCents !== 0)
            writer.tag(9, WireType.Varint).int32(message.minFeeCents);
        
        if (message.maxFeeCents !== 0)
            writer.tag(10, WireType.Varint).int32(message.maxFeeCents);
        
        if (message.standardPercentBps !== 0)
            writer.tag(11, WireType.Varint).int32(message.standardPercentBps);
        
        if (message.standardFlatCents !== 0)
            writer.tag(12, WireType.Varint).int32(message.standardFlatCents);
        
        if (message.expiresAtEpochSeconds !== "0")
            writer.tag(13, WireType.Varint).int64(message.expiresAtEpochSeconds);
        
        if (message.updatedAtEpochSeconds !== "0")
            writer.tag(14, WireType.Varint).int64(message.updatedAtEpochSeconds);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const FeeOverrideRow = new FeeOverrideRow$Type();

class FeeOverrideList$Type extends MessageType<FeeOverrideList> {
    constructor() {
        super("svyne.billing.FeeOverrideList", [
            { no: 1, name: "overrides", kind: "message", repeat: 2 , T: () => FeeOverrideRow }
        ]);
    }
    create(value?: PartialMessage<FeeOverrideList>): FeeOverrideList {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.overrides = [];
        if (value !== undefined)
            reflectionMergePartial<FeeOverrideList>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: FeeOverrideList): FeeOverrideList {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.overrides.push(FeeOverrideRow.internalBinaryRead(reader, reader.uint32(), options));
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
    internalBinaryWrite(message: FeeOverrideList, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        for (let i = 0; i < message.overrides.length; i++)
            FeeOverrideRow.internalBinaryWrite(message.overrides[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const FeeOverrideList = new FeeOverrideList$Type();

class SetEventFeeOverrideRequest$Type extends MessageType<SetEventFeeOverrideRequest> {
    constructor() {
        super("svyne.billing.SetEventFeeOverrideRequest", [
            { no: 1, name: "events_id", kind: "scalar", T: 9  },
            { no: 2, name: "percent_bps", kind: "scalar", T: 5  },
            { no: 3, name: "flat_cents", kind: "scalar", T: 5  },
            { no: 4, name: "min_fee_cents", kind: "scalar", T: 5  },
            { no: 5, name: "max_fee_cents", kind: "scalar", T: 5  },
            { no: 6, name: "expires_at_epoch_seconds", kind: "scalar", T: 3  },
            { no: 7, name: "reason", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<SetEventFeeOverrideRequest>): SetEventFeeOverrideRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.eventsId = "";
        message.percentBps = 0;
        message.flatCents = 0;
        message.minFeeCents = 0;
        message.maxFeeCents = 0;
        message.expiresAtEpochSeconds = "0";
        message.reason = "";
        if (value !== undefined)
            reflectionMergePartial<SetEventFeeOverrideRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: SetEventFeeOverrideRequest): SetEventFeeOverrideRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.eventsId = reader.string();
                    break;
                case  2:
                    message.percentBps = reader.int32();
                    break;
                case  3:
                    message.flatCents = reader.int32();
                    break;
                case  4:
                    message.minFeeCents = reader.int32();
                    break;
                case  5:
                    message.maxFeeCents = reader.int32();
                    break;
                case  6:
                    message.expiresAtEpochSeconds = reader.int64().toString();
                    break;
                case  7:
                    message.reason = reader.string();
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
    internalBinaryWrite(message: SetEventFeeOverrideRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.eventsId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.eventsId);
        
        if (message.percentBps !== 0)
            writer.tag(2, WireType.Varint).int32(message.percentBps);
        
        if (message.flatCents !== 0)
            writer.tag(3, WireType.Varint).int32(message.flatCents);
        
        if (message.minFeeCents !== 0)
            writer.tag(4, WireType.Varint).int32(message.minFeeCents);
        
        if (message.maxFeeCents !== 0)
            writer.tag(5, WireType.Varint).int32(message.maxFeeCents);
        
        if (message.expiresAtEpochSeconds !== "0")
            writer.tag(6, WireType.Varint).int64(message.expiresAtEpochSeconds);
        
        if (message.reason !== "")
            writer.tag(7, WireType.LengthDelimited).string(message.reason);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const SetEventFeeOverrideRequest = new SetEventFeeOverrideRequest$Type();

class ClearEventFeeOverrideRequest$Type extends MessageType<ClearEventFeeOverrideRequest> {
    constructor() {
        super("svyne.billing.ClearEventFeeOverrideRequest", [
            { no: 1, name: "events_id", kind: "scalar", T: 9  },
            { no: 2, name: "reason", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<ClearEventFeeOverrideRequest>): ClearEventFeeOverrideRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.eventsId = "";
        message.reason = "";
        if (value !== undefined)
            reflectionMergePartial<ClearEventFeeOverrideRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ClearEventFeeOverrideRequest): ClearEventFeeOverrideRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.eventsId = reader.string();
                    break;
                case  2:
                    message.reason = reader.string();
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
    internalBinaryWrite(message: ClearEventFeeOverrideRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.eventsId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.eventsId);
        
        if (message.reason !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.reason);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const ClearEventFeeOverrideRequest = new ClearEventFeeOverrideRequest$Type();

class RevenueReportRequest$Type extends MessageType<RevenueReportRequest> {
    constructor() {
        super("svyne.billing.RevenueReportRequest", [
            { no: 1, name: "from_epoch_seconds", kind: "scalar", T: 3  },
            { no: 2, name: "to_epoch_seconds", kind: "scalar", T: 3  }
        ]);
    }
    create(value?: PartialMessage<RevenueReportRequest>): RevenueReportRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.fromEpochSeconds = "0";
        message.toEpochSeconds = "0";
        if (value !== undefined)
            reflectionMergePartial<RevenueReportRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: RevenueReportRequest): RevenueReportRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.fromEpochSeconds = reader.int64().toString();
                    break;
                case  2:
                    message.toEpochSeconds = reader.int64().toString();
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
    internalBinaryWrite(message: RevenueReportRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.fromEpochSeconds !== "0")
            writer.tag(1, WireType.Varint).int64(message.fromEpochSeconds);
        
        if (message.toEpochSeconds !== "0")
            writer.tag(2, WireType.Varint).int64(message.toEpochSeconds);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const RevenueReportRequest = new RevenueReportRequest$Type();

class RevenueSourceRow$Type extends MessageType<RevenueSourceRow> {
    constructor() {
        super("svyne.billing.RevenueSourceRow", [
            { no: 1, name: "source", kind: "scalar", T: 9  },
            { no: 2, name: "revenue_cents", kind: "scalar", T: 3  },
            { no: 3, name: "item_count", kind: "scalar", T: 5  }
        ]);
    }
    create(value?: PartialMessage<RevenueSourceRow>): RevenueSourceRow {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.source = "";
        message.revenueCents = "0";
        message.itemCount = 0;
        if (value !== undefined)
            reflectionMergePartial<RevenueSourceRow>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: RevenueSourceRow): RevenueSourceRow {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.source = reader.string();
                    break;
                case  2:
                    message.revenueCents = reader.int64().toString();
                    break;
                case  3:
                    message.itemCount = reader.int32();
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
    internalBinaryWrite(message: RevenueSourceRow, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.source !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.source);
        
        if (message.revenueCents !== "0")
            writer.tag(2, WireType.Varint).int64(message.revenueCents);
        
        if (message.itemCount !== 0)
            writer.tag(3, WireType.Varint).int32(message.itemCount);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const RevenueSourceRow = new RevenueSourceRow$Type();

class RevenueTierRow$Type extends MessageType<RevenueTierRow> {
    constructor() {
        super("svyne.billing.RevenueTierRow", [
            { no: 1, name: "tier", kind: "scalar", T: 9  },
            { no: 2, name: "service_fee_cents", kind: "scalar", T: 3  },
            { no: 3, name: "billing_cents", kind: "scalar", T: 3  },
            { no: 4, name: "tenant_count", kind: "scalar", T: 5  }
        ]);
    }
    create(value?: PartialMessage<RevenueTierRow>): RevenueTierRow {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.tier = "";
        message.serviceFeeCents = "0";
        message.billingCents = "0";
        message.tenantCount = 0;
        if (value !== undefined)
            reflectionMergePartial<RevenueTierRow>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: RevenueTierRow): RevenueTierRow {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.tier = reader.string();
                    break;
                case  2:
                    message.serviceFeeCents = reader.int64().toString();
                    break;
                case  3:
                    message.billingCents = reader.int64().toString();
                    break;
                case  4:
                    message.tenantCount = reader.int32();
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
    internalBinaryWrite(message: RevenueTierRow, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.tier !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.tier);
        
        if (message.serviceFeeCents !== "0")
            writer.tag(2, WireType.Varint).int64(message.serviceFeeCents);
        
        if (message.billingCents !== "0")
            writer.tag(3, WireType.Varint).int64(message.billingCents);
        
        if (message.tenantCount !== 0)
            writer.tag(4, WireType.Varint).int32(message.tenantCount);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const RevenueTierRow = new RevenueTierRow$Type();

class RevenueTrendPoint$Type extends MessageType<RevenueTrendPoint> {
    constructor() {
        super("svyne.billing.RevenueTrendPoint", [
            { no: 1, name: "bucket_start_epoch_seconds", kind: "scalar", T: 3  },
            { no: 2, name: "service_fee_cents", kind: "scalar", T: 3  },
            { no: 3, name: "billing_cents", kind: "scalar", T: 3  }
        ]);
    }
    create(value?: PartialMessage<RevenueTrendPoint>): RevenueTrendPoint {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.bucketStartEpochSeconds = "0";
        message.serviceFeeCents = "0";
        message.billingCents = "0";
        if (value !== undefined)
            reflectionMergePartial<RevenueTrendPoint>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: RevenueTrendPoint): RevenueTrendPoint {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.bucketStartEpochSeconds = reader.int64().toString();
                    break;
                case  2:
                    message.serviceFeeCents = reader.int64().toString();
                    break;
                case  3:
                    message.billingCents = reader.int64().toString();
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
    internalBinaryWrite(message: RevenueTrendPoint, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.bucketStartEpochSeconds !== "0")
            writer.tag(1, WireType.Varint).int64(message.bucketStartEpochSeconds);
        
        if (message.serviceFeeCents !== "0")
            writer.tag(2, WireType.Varint).int64(message.serviceFeeCents);
        
        if (message.billingCents !== "0")
            writer.tag(3, WireType.Varint).int64(message.billingCents);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const RevenueTrendPoint = new RevenueTrendPoint$Type();

class RevenueReport$Type extends MessageType<RevenueReport> {
    constructor() {
        super("svyne.billing.RevenueReport", [
            { no: 1, name: "by_source", kind: "message", repeat: 2 , T: () => RevenueSourceRow },
            { no: 2, name: "by_tier", kind: "message", repeat: 2 , T: () => RevenueTierRow },
            { no: 3, name: "trend", kind: "message", repeat: 2 , T: () => RevenueTrendPoint },
            { no: 4, name: "generated_at_epoch_seconds", kind: "scalar", T: 3  }
        ]);
    }
    create(value?: PartialMessage<RevenueReport>): RevenueReport {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.bySource = [];
        message.byTier = [];
        message.trend = [];
        message.generatedAtEpochSeconds = "0";
        if (value !== undefined)
            reflectionMergePartial<RevenueReport>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: RevenueReport): RevenueReport {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.bySource.push(RevenueSourceRow.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case  2:
                    message.byTier.push(RevenueTierRow.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case  3:
                    message.trend.push(RevenueTrendPoint.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case  4:
                    message.generatedAtEpochSeconds = reader.int64().toString();
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
    internalBinaryWrite(message: RevenueReport, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        for (let i = 0; i < message.bySource.length; i++)
            RevenueSourceRow.internalBinaryWrite(message.bySource[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        
        for (let i = 0; i < message.byTier.length; i++)
            RevenueTierRow.internalBinaryWrite(message.byTier[i], writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        
        for (let i = 0; i < message.trend.length; i++)
            RevenueTrendPoint.internalBinaryWrite(message.trend[i], writer.tag(3, WireType.LengthDelimited).fork(), options).join();
        
        if (message.generatedAtEpochSeconds !== "0")
            writer.tag(4, WireType.Varint).int64(message.generatedAtEpochSeconds);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const RevenueReport = new RevenueReport$Type();

class TenantActivityRequest$Type extends MessageType<TenantActivityRequest> {
    constructor() {
        super("svyne.billing.TenantActivityRequest", [
            { no: 1, name: "from_epoch_seconds", kind: "scalar", T: 3  },
            { no: 2, name: "to_epoch_seconds", kind: "scalar", T: 3  },
            { no: 3, name: "search", kind: "scalar", T: 9  },
            { no: 4, name: "tier", kind: "scalar", T: 9  },
            { no: 5, name: "offset", kind: "scalar", T: 5  },
            { no: 6, name: "limit", kind: "scalar", T: 5  }
        ]);
    }
    create(value?: PartialMessage<TenantActivityRequest>): TenantActivityRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.fromEpochSeconds = "0";
        message.toEpochSeconds = "0";
        message.search = "";
        message.tier = "";
        message.offset = 0;
        message.limit = 0;
        if (value !== undefined)
            reflectionMergePartial<TenantActivityRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: TenantActivityRequest): TenantActivityRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.fromEpochSeconds = reader.int64().toString();
                    break;
                case  2:
                    message.toEpochSeconds = reader.int64().toString();
                    break;
                case  3:
                    message.search = reader.string();
                    break;
                case  4:
                    message.tier = reader.string();
                    break;
                case  5:
                    message.offset = reader.int32();
                    break;
                case  6:
                    message.limit = reader.int32();
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
    internalBinaryWrite(message: TenantActivityRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.fromEpochSeconds !== "0")
            writer.tag(1, WireType.Varint).int64(message.fromEpochSeconds);
        
        if (message.toEpochSeconds !== "0")
            writer.tag(2, WireType.Varint).int64(message.toEpochSeconds);
        
        if (message.search !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.search);
        
        if (message.tier !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.tier);
        
        if (message.offset !== 0)
            writer.tag(5, WireType.Varint).int32(message.offset);
        
        if (message.limit !== 0)
            writer.tag(6, WireType.Varint).int32(message.limit);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const TenantActivityRequest = new TenantActivityRequest$Type();

class TenantActivityRow$Type extends MessageType<TenantActivityRow> {
    constructor() {
        super("svyne.billing.TenantActivityRow", [
            { no: 1, name: "tenants_id", kind: "scalar", T: 9  },
            { no: 2, name: "name", kind: "scalar", T: 9  },
            { no: 3, name: "slug", kind: "scalar", T: 9  },
            { no: 4, name: "tier", kind: "scalar", T: 9  },
            { no: 5, name: "events_created", kind: "scalar", T: 5  },
            { no: 6, name: "tickets_sold", kind: "scalar", T: 5  },
            { no: 7, name: "service_fee_cents", kind: "scalar", T: 3  },
            { no: 8, name: "billing_cents", kind: "scalar", T: 3  },
            { no: 9, name: "avg_ticket_cents", kind: "scalar", T: 3  },
            { no: 10, name: "subscription_status", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<TenantActivityRow>): TenantActivityRow {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.tenantsId = "";
        message.name = "";
        message.slug = "";
        message.tier = "";
        message.eventsCreated = 0;
        message.ticketsSold = 0;
        message.serviceFeeCents = "0";
        message.billingCents = "0";
        message.avgTicketCents = "0";
        message.subscriptionStatus = "";
        if (value !== undefined)
            reflectionMergePartial<TenantActivityRow>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: TenantActivityRow): TenantActivityRow {
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
                    message.slug = reader.string();
                    break;
                case  4:
                    message.tier = reader.string();
                    break;
                case  5:
                    message.eventsCreated = reader.int32();
                    break;
                case  6:
                    message.ticketsSold = reader.int32();
                    break;
                case  7:
                    message.serviceFeeCents = reader.int64().toString();
                    break;
                case  8:
                    message.billingCents = reader.int64().toString();
                    break;
                case  9:
                    message.avgTicketCents = reader.int64().toString();
                    break;
                case  10:
                    message.subscriptionStatus = reader.string();
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
    internalBinaryWrite(message: TenantActivityRow, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.tenantsId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.tenantsId);
        
        if (message.name !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.name);
        
        if (message.slug !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.slug);
        
        if (message.tier !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.tier);
        
        if (message.eventsCreated !== 0)
            writer.tag(5, WireType.Varint).int32(message.eventsCreated);
        
        if (message.ticketsSold !== 0)
            writer.tag(6, WireType.Varint).int32(message.ticketsSold);
        
        if (message.serviceFeeCents !== "0")
            writer.tag(7, WireType.Varint).int64(message.serviceFeeCents);
        
        if (message.billingCents !== "0")
            writer.tag(8, WireType.Varint).int64(message.billingCents);
        
        if (message.avgTicketCents !== "0")
            writer.tag(9, WireType.Varint).int64(message.avgTicketCents);
        
        if (message.subscriptionStatus !== "")
            writer.tag(10, WireType.LengthDelimited).string(message.subscriptionStatus);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const TenantActivityRow = new TenantActivityRow$Type();

class TenantActivityList$Type extends MessageType<TenantActivityList> {
    constructor() {
        super("svyne.billing.TenantActivityList", [
            { no: 1, name: "rows", kind: "message", repeat: 2 , T: () => TenantActivityRow },
            { no: 2, name: "total", kind: "scalar", T: 5  }
        ]);
    }
    create(value?: PartialMessage<TenantActivityList>): TenantActivityList {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.rows = [];
        message.total = 0;
        if (value !== undefined)
            reflectionMergePartial<TenantActivityList>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: TenantActivityList): TenantActivityList {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.rows.push(TenantActivityRow.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case  2:
                    message.total = reader.int32();
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
    internalBinaryWrite(message: TenantActivityList, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        for (let i = 0; i < message.rows.length; i++)
            TenantActivityRow.internalBinaryWrite(message.rows[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        
        if (message.total !== 0)
            writer.tag(2, WireType.Varint).int32(message.total);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const TenantActivityList = new TenantActivityList$Type();

export const DeveloperBillingService = new ServiceType("svyne.billing.DeveloperBillingService", [
    { name: "ListTenantBilling", options: {}, I: PageRequest, O: TenantBillingList },
    { name: "StartTrial", options: {}, I: TenantRequest, O: AckResponse },
    { name: "CreateSubscription", options: {}, I: SubscriptionRequest, O: AckResponse },
    { name: "ChangeSubscriptionTier", options: {}, I: SubscriptionRequest, O: AckResponse },
    { name: "CancelSubscription", options: {}, I: CancelSubscriptionRequest, O: AckResponse },
    { name: "ListEventUpgrades", options: {}, I: PageRequest, O: EventUpgradeList },
    { name: "ActivateEventUpgrade", options: {}, I: EventUpgradeRequest, O: AckResponse },
    { name: "CancelEventUpgrade", options: {}, I: CancelEventUpgradeRequest, O: AckResponse },
    { name: "ListTenantAddons", options: {}, I: TenantRequest, O: TenantAddonList },
    { name: "ProvisionAddon", options: {}, I: ProvisionAddonRequest, O: AckResponse },
    { name: "CancelAddon", options: {}, I: CancelAddonRequest, O: AckResponse },
    { name: "ListFeeOverrides", options: {}, I: Empty, O: FeeOverrideList },
    { name: "SetEventFeeOverride", options: {}, I: SetEventFeeOverrideRequest, O: AckResponse },
    { name: "ClearEventFeeOverride", options: {}, I: ClearEventFeeOverrideRequest, O: AckResponse },
    { name: "GetRevenueReport", options: {}, I: RevenueReportRequest, O: RevenueReport },
    { name: "GetTenantActivity", options: {}, I: TenantActivityRequest, O: TenantActivityList }
]);
