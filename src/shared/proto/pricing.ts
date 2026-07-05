



import { AckResponse } from "./common";
import { UuidValue } from "./common";
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

export interface Price {
    
    pricesId: string;
    
    eventsId: string;
    
    name: string;
    
    pricingType: string; 
    
    basePriceCents: number;
    
    perAttendeeCents: number;
    
    isAllInclusive: boolean;
    
    feeFormulasId: string; 
    
    maxQuantity: number; 
    
    isActive: boolean;
}

export interface CreatePriceRequest {
    
    eventsId: string;
    
    name: string;
    
    pricingType: string;
    
    basePriceCents: number;
    
    perAttendeeCents: number;
    
    isAllInclusive: boolean;
    
    feeFormulasId: string; 
    
    maxQuantity: number;
}

export interface UpdatePriceRequest {
    
    pricesId: string;
    
    name: string;
    
    basePriceCents: number;
    
    perAttendeeCents: number;
    
    isAllInclusive: boolean;
    
    maxQuantity: number;
    
    isActive: boolean;
    
    feeFormulasId: string; 
}

export interface ListPricesResponse {
    
    prices: Price[];
}

export interface PriceRule {
    
    priceRulesId: string;
    
    pricesId: string; 
    
    name: string;
    
    ruleType: string; 
    
    priority: number; 
    
    priceCents: number;
    
    activeFrom: string; 
    
    activeUntil: string; 
    
    minRemaining: number; 
    
    maxRemaining: number; 
    
    isActive: boolean;
    
    scope: string; 
    
    eventsId: string; 
    
    capacity: number; 
}

export interface CreatePriceRuleRequest {
    
    ownerId: string;
    
    name: string;
    
    ruleType: string;
    
    priority: number;
    
    priceCents: number;
    
    activeFrom: string;
    
    activeUntil: string;
    
    minRemaining: number;
    
    maxRemaining: number;
    
    scope: string; 
    
    capacity: number; 
}

export interface UpdatePriceRuleRequest {
    
    priceRulesId: string;
    
    name: string;
    
    ruleType: string;
    
    priority: number;
    
    priceCents: number;
    
    activeFrom: string;
    
    activeUntil: string;
    
    minRemaining: number;
    
    maxRemaining: number;
    
    isActive: boolean;
    
    capacity: number; 
}

export interface ListPriceRulesResponse {
    
    rules: PriceRule[];
}

export interface CalculatePriceRequest {
    
    pricesId: string;
    
    seats: number;
    
    at: string; 
    
    remaining: number; 
}

export interface PriceBreakdown {
    
    subtotalCents: number;
    
    feeCents: number;
    
    totalCents: number;
    
    basePriceCents: number; 
    
    sellingPriceCents: number; 
    
    discountCents: number; 
    
    appliedPriceRulesId: string; 
    
    appliedRuleName: string; 
    
    platformFeeCents: number;
    
    gatewayFeeCents: number;
    
    taxCents: number;
    
    finalPriceCents: number; 
    
    organizerNetCents: number; 
    
    currency: string;
}

export interface SetTenantDefaultFeeFormulaRequest {
    
    tenantsId: string;
    
    feeFormulasId: string; 
    
    reason: string; 
}

class Price$Type extends MessageType<Price> {
    constructor() {
        super("svyne.pricing.Price", [
            { no: 1, name: "prices_id", kind: "scalar", T: 9  },
            { no: 2, name: "events_id", kind: "scalar", T: 9  },
            { no: 3, name: "name", kind: "scalar", T: 9  },
            { no: 4, name: "pricing_type", kind: "scalar", T: 9  },
            { no: 5, name: "base_price_cents", kind: "scalar", T: 5  },
            { no: 6, name: "per_attendee_cents", kind: "scalar", T: 5  },
            { no: 7, name: "is_all_inclusive", kind: "scalar", T: 8  },
            { no: 8, name: "fee_formulas_id", kind: "scalar", T: 9  },
            { no: 10, name: "max_quantity", kind: "scalar", T: 5  },
            { no: 11, name: "is_active", kind: "scalar", T: 8  }
        ]);
    }
    create(value?: PartialMessage<Price>): Price {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.pricesId = "";
        message.eventsId = "";
        message.name = "";
        message.pricingType = "";
        message.basePriceCents = 0;
        message.perAttendeeCents = 0;
        message.isAllInclusive = false;
        message.feeFormulasId = "";
        message.maxQuantity = 0;
        message.isActive = false;
        if (value !== undefined)
            reflectionMergePartial<Price>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Price): Price {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.pricesId = reader.string();
                    break;
                case  2:
                    message.eventsId = reader.string();
                    break;
                case  3:
                    message.name = reader.string();
                    break;
                case  4:
                    message.pricingType = reader.string();
                    break;
                case  5:
                    message.basePriceCents = reader.int32();
                    break;
                case  6:
                    message.perAttendeeCents = reader.int32();
                    break;
                case  7:
                    message.isAllInclusive = reader.bool();
                    break;
                case  8:
                    message.feeFormulasId = reader.string();
                    break;
                case  10:
                    message.maxQuantity = reader.int32();
                    break;
                case  11:
                    message.isActive = reader.bool();
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
    internalBinaryWrite(message: Price, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.pricesId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.pricesId);
        
        if (message.eventsId !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.eventsId);
        
        if (message.name !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.name);
        
        if (message.pricingType !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.pricingType);
        
        if (message.basePriceCents !== 0)
            writer.tag(5, WireType.Varint).int32(message.basePriceCents);
        
        if (message.perAttendeeCents !== 0)
            writer.tag(6, WireType.Varint).int32(message.perAttendeeCents);
        
        if (message.isAllInclusive !== false)
            writer.tag(7, WireType.Varint).bool(message.isAllInclusive);
        
        if (message.feeFormulasId !== "")
            writer.tag(8, WireType.LengthDelimited).string(message.feeFormulasId);
        
        if (message.maxQuantity !== 0)
            writer.tag(10, WireType.Varint).int32(message.maxQuantity);
        
        if (message.isActive !== false)
            writer.tag(11, WireType.Varint).bool(message.isActive);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const Price = new Price$Type();

class CreatePriceRequest$Type extends MessageType<CreatePriceRequest> {
    constructor() {
        super("svyne.pricing.CreatePriceRequest", [
            { no: 1, name: "events_id", kind: "scalar", T: 9  },
            { no: 2, name: "name", kind: "scalar", T: 9  },
            { no: 3, name: "pricing_type", kind: "scalar", T: 9  },
            { no: 4, name: "base_price_cents", kind: "scalar", T: 5  },
            { no: 5, name: "per_attendee_cents", kind: "scalar", T: 5  },
            { no: 6, name: "is_all_inclusive", kind: "scalar", T: 8  },
            { no: 7, name: "fee_formulas_id", kind: "scalar", T: 9  },
            { no: 9, name: "max_quantity", kind: "scalar", T: 5  }
        ]);
    }
    create(value?: PartialMessage<CreatePriceRequest>): CreatePriceRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.eventsId = "";
        message.name = "";
        message.pricingType = "";
        message.basePriceCents = 0;
        message.perAttendeeCents = 0;
        message.isAllInclusive = false;
        message.feeFormulasId = "";
        message.maxQuantity = 0;
        if (value !== undefined)
            reflectionMergePartial<CreatePriceRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: CreatePriceRequest): CreatePriceRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.eventsId = reader.string();
                    break;
                case  2:
                    message.name = reader.string();
                    break;
                case  3:
                    message.pricingType = reader.string();
                    break;
                case  4:
                    message.basePriceCents = reader.int32();
                    break;
                case  5:
                    message.perAttendeeCents = reader.int32();
                    break;
                case  6:
                    message.isAllInclusive = reader.bool();
                    break;
                case  7:
                    message.feeFormulasId = reader.string();
                    break;
                case  9:
                    message.maxQuantity = reader.int32();
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
    internalBinaryWrite(message: CreatePriceRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.eventsId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.eventsId);
        
        if (message.name !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.name);
        
        if (message.pricingType !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.pricingType);
        
        if (message.basePriceCents !== 0)
            writer.tag(4, WireType.Varint).int32(message.basePriceCents);
        
        if (message.perAttendeeCents !== 0)
            writer.tag(5, WireType.Varint).int32(message.perAttendeeCents);
        
        if (message.isAllInclusive !== false)
            writer.tag(6, WireType.Varint).bool(message.isAllInclusive);
        
        if (message.feeFormulasId !== "")
            writer.tag(7, WireType.LengthDelimited).string(message.feeFormulasId);
        
        if (message.maxQuantity !== 0)
            writer.tag(9, WireType.Varint).int32(message.maxQuantity);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const CreatePriceRequest = new CreatePriceRequest$Type();

class UpdatePriceRequest$Type extends MessageType<UpdatePriceRequest> {
    constructor() {
        super("svyne.pricing.UpdatePriceRequest", [
            { no: 1, name: "prices_id", kind: "scalar", T: 9  },
            { no: 2, name: "name", kind: "scalar", T: 9  },
            { no: 3, name: "base_price_cents", kind: "scalar", T: 5  },
            { no: 4, name: "per_attendee_cents", kind: "scalar", T: 5  },
            { no: 5, name: "is_all_inclusive", kind: "scalar", T: 8  },
            { no: 6, name: "max_quantity", kind: "scalar", T: 5  },
            { no: 7, name: "is_active", kind: "scalar", T: 8  },
            { no: 8, name: "fee_formulas_id", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<UpdatePriceRequest>): UpdatePriceRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.pricesId = "";
        message.name = "";
        message.basePriceCents = 0;
        message.perAttendeeCents = 0;
        message.isAllInclusive = false;
        message.maxQuantity = 0;
        message.isActive = false;
        message.feeFormulasId = "";
        if (value !== undefined)
            reflectionMergePartial<UpdatePriceRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: UpdatePriceRequest): UpdatePriceRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.pricesId = reader.string();
                    break;
                case  2:
                    message.name = reader.string();
                    break;
                case  3:
                    message.basePriceCents = reader.int32();
                    break;
                case  4:
                    message.perAttendeeCents = reader.int32();
                    break;
                case  5:
                    message.isAllInclusive = reader.bool();
                    break;
                case  6:
                    message.maxQuantity = reader.int32();
                    break;
                case  7:
                    message.isActive = reader.bool();
                    break;
                case  8:
                    message.feeFormulasId = reader.string();
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
    internalBinaryWrite(message: UpdatePriceRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.pricesId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.pricesId);
        
        if (message.name !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.name);
        
        if (message.basePriceCents !== 0)
            writer.tag(3, WireType.Varint).int32(message.basePriceCents);
        
        if (message.perAttendeeCents !== 0)
            writer.tag(4, WireType.Varint).int32(message.perAttendeeCents);
        
        if (message.isAllInclusive !== false)
            writer.tag(5, WireType.Varint).bool(message.isAllInclusive);
        
        if (message.maxQuantity !== 0)
            writer.tag(6, WireType.Varint).int32(message.maxQuantity);
        
        if (message.isActive !== false)
            writer.tag(7, WireType.Varint).bool(message.isActive);
        
        if (message.feeFormulasId !== "")
            writer.tag(8, WireType.LengthDelimited).string(message.feeFormulasId);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const UpdatePriceRequest = new UpdatePriceRequest$Type();

class ListPricesResponse$Type extends MessageType<ListPricesResponse> {
    constructor() {
        super("svyne.pricing.ListPricesResponse", [
            { no: 1, name: "prices", kind: "message", repeat: 2 , T: () => Price }
        ]);
    }
    create(value?: PartialMessage<ListPricesResponse>): ListPricesResponse {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.prices = [];
        if (value !== undefined)
            reflectionMergePartial<ListPricesResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ListPricesResponse): ListPricesResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.prices.push(Price.internalBinaryRead(reader, reader.uint32(), options));
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
    internalBinaryWrite(message: ListPricesResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        for (let i = 0; i < message.prices.length; i++)
            Price.internalBinaryWrite(message.prices[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const ListPricesResponse = new ListPricesResponse$Type();

class PriceRule$Type extends MessageType<PriceRule> {
    constructor() {
        super("svyne.pricing.PriceRule", [
            { no: 1, name: "price_rules_id", kind: "scalar", T: 9  },
            { no: 2, name: "prices_id", kind: "scalar", T: 9  },
            { no: 3, name: "name", kind: "scalar", T: 9  },
            { no: 4, name: "rule_type", kind: "scalar", T: 9  },
            { no: 5, name: "priority", kind: "scalar", T: 5  },
            { no: 6, name: "price_cents", kind: "scalar", T: 5  },
            { no: 7, name: "active_from", kind: "scalar", T: 3  },
            { no: 8, name: "active_until", kind: "scalar", T: 3  },
            { no: 9, name: "min_remaining", kind: "scalar", T: 5  },
            { no: 10, name: "max_remaining", kind: "scalar", T: 5  },
            { no: 11, name: "is_active", kind: "scalar", T: 8  },
            { no: 12, name: "scope", kind: "scalar", T: 9  },
            { no: 13, name: "events_id", kind: "scalar", T: 9  },
            { no: 14, name: "capacity", kind: "scalar", T: 5  }
        ]);
    }
    create(value?: PartialMessage<PriceRule>): PriceRule {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.priceRulesId = "";
        message.pricesId = "";
        message.name = "";
        message.ruleType = "";
        message.priority = 0;
        message.priceCents = 0;
        message.activeFrom = "0";
        message.activeUntil = "0";
        message.minRemaining = 0;
        message.maxRemaining = 0;
        message.isActive = false;
        message.scope = "";
        message.eventsId = "";
        message.capacity = 0;
        if (value !== undefined)
            reflectionMergePartial<PriceRule>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: PriceRule): PriceRule {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.priceRulesId = reader.string();
                    break;
                case  2:
                    message.pricesId = reader.string();
                    break;
                case  3:
                    message.name = reader.string();
                    break;
                case  4:
                    message.ruleType = reader.string();
                    break;
                case  5:
                    message.priority = reader.int32();
                    break;
                case  6:
                    message.priceCents = reader.int32();
                    break;
                case  7:
                    message.activeFrom = reader.int64().toString();
                    break;
                case  8:
                    message.activeUntil = reader.int64().toString();
                    break;
                case  9:
                    message.minRemaining = reader.int32();
                    break;
                case  10:
                    message.maxRemaining = reader.int32();
                    break;
                case  11:
                    message.isActive = reader.bool();
                    break;
                case  12:
                    message.scope = reader.string();
                    break;
                case  13:
                    message.eventsId = reader.string();
                    break;
                case  14:
                    message.capacity = reader.int32();
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
    internalBinaryWrite(message: PriceRule, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.priceRulesId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.priceRulesId);
        
        if (message.pricesId !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.pricesId);
        
        if (message.name !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.name);
        
        if (message.ruleType !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.ruleType);
        
        if (message.priority !== 0)
            writer.tag(5, WireType.Varint).int32(message.priority);
        
        if (message.priceCents !== 0)
            writer.tag(6, WireType.Varint).int32(message.priceCents);
        
        if (message.activeFrom !== "0")
            writer.tag(7, WireType.Varint).int64(message.activeFrom);
        
        if (message.activeUntil !== "0")
            writer.tag(8, WireType.Varint).int64(message.activeUntil);
        
        if (message.minRemaining !== 0)
            writer.tag(9, WireType.Varint).int32(message.minRemaining);
        
        if (message.maxRemaining !== 0)
            writer.tag(10, WireType.Varint).int32(message.maxRemaining);
        
        if (message.isActive !== false)
            writer.tag(11, WireType.Varint).bool(message.isActive);
        
        if (message.scope !== "")
            writer.tag(12, WireType.LengthDelimited).string(message.scope);
        
        if (message.eventsId !== "")
            writer.tag(13, WireType.LengthDelimited).string(message.eventsId);
        
        if (message.capacity !== 0)
            writer.tag(14, WireType.Varint).int32(message.capacity);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const PriceRule = new PriceRule$Type();

class CreatePriceRuleRequest$Type extends MessageType<CreatePriceRuleRequest> {
    constructor() {
        super("svyne.pricing.CreatePriceRuleRequest", [
            { no: 1, name: "owner_id", kind: "scalar", T: 9  },
            { no: 2, name: "name", kind: "scalar", T: 9  },
            { no: 3, name: "rule_type", kind: "scalar", T: 9  },
            { no: 4, name: "priority", kind: "scalar", T: 5  },
            { no: 5, name: "price_cents", kind: "scalar", T: 5  },
            { no: 6, name: "active_from", kind: "scalar", T: 3  },
            { no: 7, name: "active_until", kind: "scalar", T: 3  },
            { no: 8, name: "min_remaining", kind: "scalar", T: 5  },
            { no: 9, name: "max_remaining", kind: "scalar", T: 5  },
            { no: 10, name: "scope", kind: "scalar", T: 9  },
            { no: 11, name: "capacity", kind: "scalar", T: 5  }
        ]);
    }
    create(value?: PartialMessage<CreatePriceRuleRequest>): CreatePriceRuleRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.ownerId = "";
        message.name = "";
        message.ruleType = "";
        message.priority = 0;
        message.priceCents = 0;
        message.activeFrom = "0";
        message.activeUntil = "0";
        message.minRemaining = 0;
        message.maxRemaining = 0;
        message.scope = "";
        message.capacity = 0;
        if (value !== undefined)
            reflectionMergePartial<CreatePriceRuleRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: CreatePriceRuleRequest): CreatePriceRuleRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.ownerId = reader.string();
                    break;
                case  2:
                    message.name = reader.string();
                    break;
                case  3:
                    message.ruleType = reader.string();
                    break;
                case  4:
                    message.priority = reader.int32();
                    break;
                case  5:
                    message.priceCents = reader.int32();
                    break;
                case  6:
                    message.activeFrom = reader.int64().toString();
                    break;
                case  7:
                    message.activeUntil = reader.int64().toString();
                    break;
                case  8:
                    message.minRemaining = reader.int32();
                    break;
                case  9:
                    message.maxRemaining = reader.int32();
                    break;
                case  10:
                    message.scope = reader.string();
                    break;
                case  11:
                    message.capacity = reader.int32();
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
    internalBinaryWrite(message: CreatePriceRuleRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.ownerId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.ownerId);
        
        if (message.name !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.name);
        
        if (message.ruleType !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.ruleType);
        
        if (message.priority !== 0)
            writer.tag(4, WireType.Varint).int32(message.priority);
        
        if (message.priceCents !== 0)
            writer.tag(5, WireType.Varint).int32(message.priceCents);
        
        if (message.activeFrom !== "0")
            writer.tag(6, WireType.Varint).int64(message.activeFrom);
        
        if (message.activeUntil !== "0")
            writer.tag(7, WireType.Varint).int64(message.activeUntil);
        
        if (message.minRemaining !== 0)
            writer.tag(8, WireType.Varint).int32(message.minRemaining);
        
        if (message.maxRemaining !== 0)
            writer.tag(9, WireType.Varint).int32(message.maxRemaining);
        
        if (message.scope !== "")
            writer.tag(10, WireType.LengthDelimited).string(message.scope);
        
        if (message.capacity !== 0)
            writer.tag(11, WireType.Varint).int32(message.capacity);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const CreatePriceRuleRequest = new CreatePriceRuleRequest$Type();

class UpdatePriceRuleRequest$Type extends MessageType<UpdatePriceRuleRequest> {
    constructor() {
        super("svyne.pricing.UpdatePriceRuleRequest", [
            { no: 1, name: "price_rules_id", kind: "scalar", T: 9  },
            { no: 2, name: "name", kind: "scalar", T: 9  },
            { no: 3, name: "rule_type", kind: "scalar", T: 9  },
            { no: 4, name: "priority", kind: "scalar", T: 5  },
            { no: 5, name: "price_cents", kind: "scalar", T: 5  },
            { no: 6, name: "active_from", kind: "scalar", T: 3  },
            { no: 7, name: "active_until", kind: "scalar", T: 3  },
            { no: 8, name: "min_remaining", kind: "scalar", T: 5  },
            { no: 9, name: "max_remaining", kind: "scalar", T: 5  },
            { no: 10, name: "is_active", kind: "scalar", T: 8  },
            { no: 11, name: "capacity", kind: "scalar", T: 5  }
        ]);
    }
    create(value?: PartialMessage<UpdatePriceRuleRequest>): UpdatePriceRuleRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.priceRulesId = "";
        message.name = "";
        message.ruleType = "";
        message.priority = 0;
        message.priceCents = 0;
        message.activeFrom = "0";
        message.activeUntil = "0";
        message.minRemaining = 0;
        message.maxRemaining = 0;
        message.isActive = false;
        message.capacity = 0;
        if (value !== undefined)
            reflectionMergePartial<UpdatePriceRuleRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: UpdatePriceRuleRequest): UpdatePriceRuleRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.priceRulesId = reader.string();
                    break;
                case  2:
                    message.name = reader.string();
                    break;
                case  3:
                    message.ruleType = reader.string();
                    break;
                case  4:
                    message.priority = reader.int32();
                    break;
                case  5:
                    message.priceCents = reader.int32();
                    break;
                case  6:
                    message.activeFrom = reader.int64().toString();
                    break;
                case  7:
                    message.activeUntil = reader.int64().toString();
                    break;
                case  8:
                    message.minRemaining = reader.int32();
                    break;
                case  9:
                    message.maxRemaining = reader.int32();
                    break;
                case  10:
                    message.isActive = reader.bool();
                    break;
                case  11:
                    message.capacity = reader.int32();
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
    internalBinaryWrite(message: UpdatePriceRuleRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.priceRulesId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.priceRulesId);
        
        if (message.name !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.name);
        
        if (message.ruleType !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.ruleType);
        
        if (message.priority !== 0)
            writer.tag(4, WireType.Varint).int32(message.priority);
        
        if (message.priceCents !== 0)
            writer.tag(5, WireType.Varint).int32(message.priceCents);
        
        if (message.activeFrom !== "0")
            writer.tag(6, WireType.Varint).int64(message.activeFrom);
        
        if (message.activeUntil !== "0")
            writer.tag(7, WireType.Varint).int64(message.activeUntil);
        
        if (message.minRemaining !== 0)
            writer.tag(8, WireType.Varint).int32(message.minRemaining);
        
        if (message.maxRemaining !== 0)
            writer.tag(9, WireType.Varint).int32(message.maxRemaining);
        
        if (message.isActive !== false)
            writer.tag(10, WireType.Varint).bool(message.isActive);
        
        if (message.capacity !== 0)
            writer.tag(11, WireType.Varint).int32(message.capacity);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const UpdatePriceRuleRequest = new UpdatePriceRuleRequest$Type();

class ListPriceRulesResponse$Type extends MessageType<ListPriceRulesResponse> {
    constructor() {
        super("svyne.pricing.ListPriceRulesResponse", [
            { no: 1, name: "rules", kind: "message", repeat: 2 , T: () => PriceRule }
        ]);
    }
    create(value?: PartialMessage<ListPriceRulesResponse>): ListPriceRulesResponse {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.rules = [];
        if (value !== undefined)
            reflectionMergePartial<ListPriceRulesResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ListPriceRulesResponse): ListPriceRulesResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.rules.push(PriceRule.internalBinaryRead(reader, reader.uint32(), options));
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
    internalBinaryWrite(message: ListPriceRulesResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        for (let i = 0; i < message.rules.length; i++)
            PriceRule.internalBinaryWrite(message.rules[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const ListPriceRulesResponse = new ListPriceRulesResponse$Type();

class CalculatePriceRequest$Type extends MessageType<CalculatePriceRequest> {
    constructor() {
        super("svyne.pricing.CalculatePriceRequest", [
            { no: 1, name: "prices_id", kind: "scalar", T: 9  },
            { no: 2, name: "seats", kind: "scalar", T: 5  },
            { no: 3, name: "at", kind: "scalar", T: 3  },
            { no: 4, name: "remaining", kind: "scalar", T: 5  }
        ]);
    }
    create(value?: PartialMessage<CalculatePriceRequest>): CalculatePriceRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.pricesId = "";
        message.seats = 0;
        message.at = "0";
        message.remaining = 0;
        if (value !== undefined)
            reflectionMergePartial<CalculatePriceRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: CalculatePriceRequest): CalculatePriceRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.pricesId = reader.string();
                    break;
                case  2:
                    message.seats = reader.int32();
                    break;
                case  3:
                    message.at = reader.int64().toString();
                    break;
                case  4:
                    message.remaining = reader.int32();
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
    internalBinaryWrite(message: CalculatePriceRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.pricesId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.pricesId);
        
        if (message.seats !== 0)
            writer.tag(2, WireType.Varint).int32(message.seats);
        
        if (message.at !== "0")
            writer.tag(3, WireType.Varint).int64(message.at);
        
        if (message.remaining !== 0)
            writer.tag(4, WireType.Varint).int32(message.remaining);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const CalculatePriceRequest = new CalculatePriceRequest$Type();

class PriceBreakdown$Type extends MessageType<PriceBreakdown> {
    constructor() {
        super("svyne.pricing.PriceBreakdown", [
            { no: 1, name: "subtotal_cents", kind: "scalar", T: 5  },
            { no: 2, name: "fee_cents", kind: "scalar", T: 5  },
            { no: 3, name: "total_cents", kind: "scalar", T: 5  },
            { no: 4, name: "base_price_cents", kind: "scalar", T: 5  },
            { no: 5, name: "selling_price_cents", kind: "scalar", T: 5  },
            { no: 6, name: "discount_cents", kind: "scalar", T: 5  },
            { no: 7, name: "applied_price_rules_id", kind: "scalar", T: 9  },
            { no: 8, name: "applied_rule_name", kind: "scalar", T: 9  },
            { no: 9, name: "platform_fee_cents", kind: "scalar", T: 5  },
            { no: 10, name: "gateway_fee_cents", kind: "scalar", T: 5  },
            { no: 11, name: "tax_cents", kind: "scalar", T: 5  },
            { no: 12, name: "final_price_cents", kind: "scalar", T: 5  },
            { no: 13, name: "organizer_net_cents", kind: "scalar", T: 5  },
            { no: 14, name: "currency", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<PriceBreakdown>): PriceBreakdown {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.subtotalCents = 0;
        message.feeCents = 0;
        message.totalCents = 0;
        message.basePriceCents = 0;
        message.sellingPriceCents = 0;
        message.discountCents = 0;
        message.appliedPriceRulesId = "";
        message.appliedRuleName = "";
        message.platformFeeCents = 0;
        message.gatewayFeeCents = 0;
        message.taxCents = 0;
        message.finalPriceCents = 0;
        message.organizerNetCents = 0;
        message.currency = "";
        if (value !== undefined)
            reflectionMergePartial<PriceBreakdown>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: PriceBreakdown): PriceBreakdown {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.subtotalCents = reader.int32();
                    break;
                case  2:
                    message.feeCents = reader.int32();
                    break;
                case  3:
                    message.totalCents = reader.int32();
                    break;
                case  4:
                    message.basePriceCents = reader.int32();
                    break;
                case  5:
                    message.sellingPriceCents = reader.int32();
                    break;
                case  6:
                    message.discountCents = reader.int32();
                    break;
                case  7:
                    message.appliedPriceRulesId = reader.string();
                    break;
                case  8:
                    message.appliedRuleName = reader.string();
                    break;
                case  9:
                    message.platformFeeCents = reader.int32();
                    break;
                case  10:
                    message.gatewayFeeCents = reader.int32();
                    break;
                case  11:
                    message.taxCents = reader.int32();
                    break;
                case  12:
                    message.finalPriceCents = reader.int32();
                    break;
                case  13:
                    message.organizerNetCents = reader.int32();
                    break;
                case  14:
                    message.currency = reader.string();
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
    internalBinaryWrite(message: PriceBreakdown, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.subtotalCents !== 0)
            writer.tag(1, WireType.Varint).int32(message.subtotalCents);
        
        if (message.feeCents !== 0)
            writer.tag(2, WireType.Varint).int32(message.feeCents);
        
        if (message.totalCents !== 0)
            writer.tag(3, WireType.Varint).int32(message.totalCents);
        
        if (message.basePriceCents !== 0)
            writer.tag(4, WireType.Varint).int32(message.basePriceCents);
        
        if (message.sellingPriceCents !== 0)
            writer.tag(5, WireType.Varint).int32(message.sellingPriceCents);
        
        if (message.discountCents !== 0)
            writer.tag(6, WireType.Varint).int32(message.discountCents);
        
        if (message.appliedPriceRulesId !== "")
            writer.tag(7, WireType.LengthDelimited).string(message.appliedPriceRulesId);
        
        if (message.appliedRuleName !== "")
            writer.tag(8, WireType.LengthDelimited).string(message.appliedRuleName);
        
        if (message.platformFeeCents !== 0)
            writer.tag(9, WireType.Varint).int32(message.platformFeeCents);
        
        if (message.gatewayFeeCents !== 0)
            writer.tag(10, WireType.Varint).int32(message.gatewayFeeCents);
        
        if (message.taxCents !== 0)
            writer.tag(11, WireType.Varint).int32(message.taxCents);
        
        if (message.finalPriceCents !== 0)
            writer.tag(12, WireType.Varint).int32(message.finalPriceCents);
        
        if (message.organizerNetCents !== 0)
            writer.tag(13, WireType.Varint).int32(message.organizerNetCents);
        
        if (message.currency !== "")
            writer.tag(14, WireType.LengthDelimited).string(message.currency);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const PriceBreakdown = new PriceBreakdown$Type();

class SetTenantDefaultFeeFormulaRequest$Type extends MessageType<SetTenantDefaultFeeFormulaRequest> {
    constructor() {
        super("svyne.pricing.SetTenantDefaultFeeFormulaRequest", [
            { no: 1, name: "tenants_id", kind: "scalar", T: 9  },
            { no: 2, name: "fee_formulas_id", kind: "scalar", T: 9  },
            { no: 3, name: "reason", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<SetTenantDefaultFeeFormulaRequest>): SetTenantDefaultFeeFormulaRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.tenantsId = "";
        message.feeFormulasId = "";
        message.reason = "";
        if (value !== undefined)
            reflectionMergePartial<SetTenantDefaultFeeFormulaRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: SetTenantDefaultFeeFormulaRequest): SetTenantDefaultFeeFormulaRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.tenantsId = reader.string();
                    break;
                case  2:
                    message.feeFormulasId = reader.string();
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
    internalBinaryWrite(message: SetTenantDefaultFeeFormulaRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.tenantsId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.tenantsId);
        
        if (message.feeFormulasId !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.feeFormulasId);
        
        if (message.reason !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.reason);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const SetTenantDefaultFeeFormulaRequest = new SetTenantDefaultFeeFormulaRequest$Type();

export const PricingService = new ServiceType("svyne.pricing.PricingService", [
    { name: "CreatePrice", options: {}, I: CreatePriceRequest, O: UuidValue },
    { name: "UpdatePrice", options: {}, I: UpdatePriceRequest, O: AckResponse },
    { name: "GetPrice", options: {}, I: UuidValue, O: Price },
    { name: "ListPricesForEvent", options: {}, I: UuidValue, O: ListPricesResponse },
    { name: "DeletePrice", options: {}, I: UuidValue, O: AckResponse },
    { name: "CreatePriceRule", options: {}, I: CreatePriceRuleRequest, O: UuidValue },
    { name: "UpdatePriceRule", options: {}, I: UpdatePriceRuleRequest, O: AckResponse },
    { name: "DeletePriceRule", options: {}, I: UuidValue, O: AckResponse },
    { name: "ListPriceRules", options: {}, I: UuidValue, O: ListPriceRulesResponse },
    { name: "ListEventPriceRules", options: {}, I: UuidValue, O: ListPriceRulesResponse },
    { name: "CalculatePrice", options: {}, I: CalculatePriceRequest, O: PriceBreakdown },
    { name: "SetTenantDefaultFeeFormula", options: {}, I: SetTenantDefaultFeeFormulaRequest, O: AckResponse }
]);
