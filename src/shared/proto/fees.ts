



import { AckResponse } from "./common";
import { UuidValue } from "./common";
import { Empty } from "./common";
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

export interface FeeFormula {
    
    feeFormulasId: string;
    
    name: string;
    
    percentBps: number; 
    
    flatCents: number; 
    
    minFeeCents: number; 
    
    maxFeeCents: number; 
    
    isActive: boolean;
}

export interface FeeFormulaInput {
    
    name: string;
    
    percentBps: number;
    
    flatCents: number;
    
    minFeeCents: number;
    
    maxFeeCents: number;
}

export interface ListFeeFormulasResponse {
    
    formulas: FeeFormula[];
}

export interface FeeLineItem {
    
    id: string;
    
    kind: string; 
    
    label: string;
    
    priceCents: number;
    
    feeFormulasId: string;
    
    feeCents: number; 
}

export interface DeveloperEvent {
    
    eventsId: string;
    
    tenantsId: string;
    
    tenantName: string;
    
    title: string;
    
    status: string;
    
    items: FeeLineItem[];
}

export interface DeveloperEventsResponse {
    
    events: DeveloperEvent[];
}

export interface AssignFeeFormulaRequest {
    
    kind: string; 
    
    targetId: string;
    
    feeFormulasId: string; 
    
    reason: string; 
}

class FeeFormula$Type extends MessageType<FeeFormula> {
    constructor() {
        super("svyne.fees.FeeFormula", [
            { no: 1, name: "fee_formulas_id", kind: "scalar", T: 9  },
            { no: 2, name: "name", kind: "scalar", T: 9  },
            { no: 3, name: "percent_bps", kind: "scalar", T: 5  },
            { no: 4, name: "flat_cents", kind: "scalar", T: 5  },
            { no: 5, name: "min_fee_cents", kind: "scalar", T: 5  },
            { no: 6, name: "max_fee_cents", kind: "scalar", T: 5  },
            { no: 7, name: "is_active", kind: "scalar", T: 8  }
        ]);
    }
    create(value?: PartialMessage<FeeFormula>): FeeFormula {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.feeFormulasId = "";
        message.name = "";
        message.percentBps = 0;
        message.flatCents = 0;
        message.minFeeCents = 0;
        message.maxFeeCents = 0;
        message.isActive = false;
        if (value !== undefined)
            reflectionMergePartial<FeeFormula>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: FeeFormula): FeeFormula {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.feeFormulasId = reader.string();
                    break;
                case  2:
                    message.name = reader.string();
                    break;
                case  3:
                    message.percentBps = reader.int32();
                    break;
                case  4:
                    message.flatCents = reader.int32();
                    break;
                case  5:
                    message.minFeeCents = reader.int32();
                    break;
                case  6:
                    message.maxFeeCents = reader.int32();
                    break;
                case  7:
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
    internalBinaryWrite(message: FeeFormula, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.feeFormulasId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.feeFormulasId);
        
        if (message.name !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.name);
        
        if (message.percentBps !== 0)
            writer.tag(3, WireType.Varint).int32(message.percentBps);
        
        if (message.flatCents !== 0)
            writer.tag(4, WireType.Varint).int32(message.flatCents);
        
        if (message.minFeeCents !== 0)
            writer.tag(5, WireType.Varint).int32(message.minFeeCents);
        
        if (message.maxFeeCents !== 0)
            writer.tag(6, WireType.Varint).int32(message.maxFeeCents);
        
        if (message.isActive !== false)
            writer.tag(7, WireType.Varint).bool(message.isActive);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const FeeFormula = new FeeFormula$Type();

class FeeFormulaInput$Type extends MessageType<FeeFormulaInput> {
    constructor() {
        super("svyne.fees.FeeFormulaInput", [
            { no: 1, name: "name", kind: "scalar", T: 9  },
            { no: 2, name: "percent_bps", kind: "scalar", T: 5  },
            { no: 3, name: "flat_cents", kind: "scalar", T: 5  },
            { no: 4, name: "min_fee_cents", kind: "scalar", T: 5  },
            { no: 5, name: "max_fee_cents", kind: "scalar", T: 5  }
        ]);
    }
    create(value?: PartialMessage<FeeFormulaInput>): FeeFormulaInput {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.name = "";
        message.percentBps = 0;
        message.flatCents = 0;
        message.minFeeCents = 0;
        message.maxFeeCents = 0;
        if (value !== undefined)
            reflectionMergePartial<FeeFormulaInput>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: FeeFormulaInput): FeeFormulaInput {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.name = reader.string();
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
    internalBinaryWrite(message: FeeFormulaInput, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.name !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.name);
        
        if (message.percentBps !== 0)
            writer.tag(2, WireType.Varint).int32(message.percentBps);
        
        if (message.flatCents !== 0)
            writer.tag(3, WireType.Varint).int32(message.flatCents);
        
        if (message.minFeeCents !== 0)
            writer.tag(4, WireType.Varint).int32(message.minFeeCents);
        
        if (message.maxFeeCents !== 0)
            writer.tag(5, WireType.Varint).int32(message.maxFeeCents);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const FeeFormulaInput = new FeeFormulaInput$Type();

class ListFeeFormulasResponse$Type extends MessageType<ListFeeFormulasResponse> {
    constructor() {
        super("svyne.fees.ListFeeFormulasResponse", [
            { no: 1, name: "formulas", kind: "message", repeat: 2 , T: () => FeeFormula }
        ]);
    }
    create(value?: PartialMessage<ListFeeFormulasResponse>): ListFeeFormulasResponse {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.formulas = [];
        if (value !== undefined)
            reflectionMergePartial<ListFeeFormulasResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ListFeeFormulasResponse): ListFeeFormulasResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.formulas.push(FeeFormula.internalBinaryRead(reader, reader.uint32(), options));
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
    internalBinaryWrite(message: ListFeeFormulasResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        for (let i = 0; i < message.formulas.length; i++)
            FeeFormula.internalBinaryWrite(message.formulas[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const ListFeeFormulasResponse = new ListFeeFormulasResponse$Type();

class FeeLineItem$Type extends MessageType<FeeLineItem> {
    constructor() {
        super("svyne.fees.FeeLineItem", [
            { no: 1, name: "id", kind: "scalar", T: 9  },
            { no: 2, name: "kind", kind: "scalar", T: 9  },
            { no: 3, name: "label", kind: "scalar", T: 9  },
            { no: 4, name: "price_cents", kind: "scalar", T: 5  },
            { no: 5, name: "fee_formulas_id", kind: "scalar", T: 9  },
            { no: 6, name: "fee_cents", kind: "scalar", T: 5  }
        ]);
    }
    create(value?: PartialMessage<FeeLineItem>): FeeLineItem {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.id = "";
        message.kind = "";
        message.label = "";
        message.priceCents = 0;
        message.feeFormulasId = "";
        message.feeCents = 0;
        if (value !== undefined)
            reflectionMergePartial<FeeLineItem>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: FeeLineItem): FeeLineItem {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.id = reader.string();
                    break;
                case  2:
                    message.kind = reader.string();
                    break;
                case  3:
                    message.label = reader.string();
                    break;
                case  4:
                    message.priceCents = reader.int32();
                    break;
                case  5:
                    message.feeFormulasId = reader.string();
                    break;
                case  6:
                    message.feeCents = reader.int32();
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
    internalBinaryWrite(message: FeeLineItem, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.id !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.id);
        
        if (message.kind !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.kind);
        
        if (message.label !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.label);
        
        if (message.priceCents !== 0)
            writer.tag(4, WireType.Varint).int32(message.priceCents);
        
        if (message.feeFormulasId !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.feeFormulasId);
        
        if (message.feeCents !== 0)
            writer.tag(6, WireType.Varint).int32(message.feeCents);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const FeeLineItem = new FeeLineItem$Type();

class DeveloperEvent$Type extends MessageType<DeveloperEvent> {
    constructor() {
        super("svyne.fees.DeveloperEvent", [
            { no: 1, name: "events_id", kind: "scalar", T: 9  },
            { no: 2, name: "tenants_id", kind: "scalar", T: 9  },
            { no: 3, name: "tenant_name", kind: "scalar", T: 9  },
            { no: 4, name: "title", kind: "scalar", T: 9  },
            { no: 5, name: "status", kind: "scalar", T: 9  },
            { no: 6, name: "items", kind: "message", repeat: 2 , T: () => FeeLineItem }
        ]);
    }
    create(value?: PartialMessage<DeveloperEvent>): DeveloperEvent {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.eventsId = "";
        message.tenantsId = "";
        message.tenantName = "";
        message.title = "";
        message.status = "";
        message.items = [];
        if (value !== undefined)
            reflectionMergePartial<DeveloperEvent>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: DeveloperEvent): DeveloperEvent {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.eventsId = reader.string();
                    break;
                case  2:
                    message.tenantsId = reader.string();
                    break;
                case  3:
                    message.tenantName = reader.string();
                    break;
                case  4:
                    message.title = reader.string();
                    break;
                case  5:
                    message.status = reader.string();
                    break;
                case  6:
                    message.items.push(FeeLineItem.internalBinaryRead(reader, reader.uint32(), options));
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
    internalBinaryWrite(message: DeveloperEvent, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.eventsId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.eventsId);
        
        if (message.tenantsId !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.tenantsId);
        
        if (message.tenantName !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.tenantName);
        
        if (message.title !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.title);
        
        if (message.status !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.status);
        
        for (let i = 0; i < message.items.length; i++)
            FeeLineItem.internalBinaryWrite(message.items[i], writer.tag(6, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const DeveloperEvent = new DeveloperEvent$Type();

class DeveloperEventsResponse$Type extends MessageType<DeveloperEventsResponse> {
    constructor() {
        super("svyne.fees.DeveloperEventsResponse", [
            { no: 1, name: "events", kind: "message", repeat: 2 , T: () => DeveloperEvent }
        ]);
    }
    create(value?: PartialMessage<DeveloperEventsResponse>): DeveloperEventsResponse {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.events = [];
        if (value !== undefined)
            reflectionMergePartial<DeveloperEventsResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: DeveloperEventsResponse): DeveloperEventsResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.events.push(DeveloperEvent.internalBinaryRead(reader, reader.uint32(), options));
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
    internalBinaryWrite(message: DeveloperEventsResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        for (let i = 0; i < message.events.length; i++)
            DeveloperEvent.internalBinaryWrite(message.events[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const DeveloperEventsResponse = new DeveloperEventsResponse$Type();

class AssignFeeFormulaRequest$Type extends MessageType<AssignFeeFormulaRequest> {
    constructor() {
        super("svyne.fees.AssignFeeFormulaRequest", [
            { no: 1, name: "kind", kind: "scalar", T: 9  },
            { no: 2, name: "target_id", kind: "scalar", T: 9  },
            { no: 3, name: "fee_formulas_id", kind: "scalar", T: 9  },
            { no: 4, name: "reason", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<AssignFeeFormulaRequest>): AssignFeeFormulaRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.kind = "";
        message.targetId = "";
        message.feeFormulasId = "";
        message.reason = "";
        if (value !== undefined)
            reflectionMergePartial<AssignFeeFormulaRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: AssignFeeFormulaRequest): AssignFeeFormulaRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.kind = reader.string();
                    break;
                case  2:
                    message.targetId = reader.string();
                    break;
                case  3:
                    message.feeFormulasId = reader.string();
                    break;
                case  4:
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
    internalBinaryWrite(message: AssignFeeFormulaRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.kind !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.kind);
        
        if (message.targetId !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.targetId);
        
        if (message.feeFormulasId !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.feeFormulasId);
        
        if (message.reason !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.reason);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const AssignFeeFormulaRequest = new AssignFeeFormulaRequest$Type();

export const FeeService = new ServiceType("svyne.fees.FeeService", [
    { name: "ListFeeFormulas", options: {}, I: Empty, O: ListFeeFormulasResponse },
    { name: "CreateFeeFormula", options: {}, I: FeeFormulaInput, O: UuidValue },
    { name: "UpdateFeeFormula", options: {}, I: FeeFormula, O: AckResponse },
    { name: "DeleteFeeFormula", options: {}, I: UuidValue, O: AckResponse },
    { name: "ListAllEvents", options: {}, I: Empty, O: DeveloperEventsResponse },
    { name: "AssignFeeFormula", options: {}, I: AssignFeeFormulaRequest, O: AckResponse }
]);
