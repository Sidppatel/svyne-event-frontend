



import { Empty } from "./common";
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

export interface Table {
    
    tablesId: string;
    
    eventTablesId: string;
    
    label: string;
    
    posX: number;
    
    posY: number;
    
    width: number;
    
    height: number;
    
    status: string;
    
    priceCents: number;
    
    platformFeeCents: number;
    
    feeFormulasId: string;
    
    shapeOverride: string;
    
    colorOverride: string;
    
    capacityOverride: number;
    
    pricesId: string;
}

export interface LayoutObject {
    
    layoutObjectsId: string;
    
    objectType: string;
    
    label: string;
    
    posX: number;
    
    posY: number;
    
    width: number;
    
    height: number;
    
    color: string;
    
    sortOrder: number;
}

export interface EventLayout {
    
    eventsId: string;
    
    tables: Table[];
    
    objects: LayoutObject[];
}

export interface SaveEventLayoutRequest {
    
    eventsId: string;
    
    tablesJson: string;
    
    lockedIds: string[];
    
    objectsJson: string;
}

export interface LockTableRequest {
    
    tablesId: string;
}

export interface ListTablesResponse {
    
    tables: Table[];
}

export interface EventTableType {
    
    eventTablesId: string;
    
    label: string;
    
    capacity: number;
    
    shape: string;
    
    color: string;
    
    priceCents: number;
    
    pricesId: string;
    
    defaultWidth: number;
    
    defaultHeight: number;
    
    platformFeeCents: number;
}

export interface ListEventTableTypesResponse {
    
    tableTypes: EventTableType[];
}

export interface CreateEventTableRequest {
    
    eventsId: string;
    
    label: string;
    
    capacity: number;
    
    shape: string;
    
    color: string;
    
    priceCents: number;
    
    feeFormulasId: string;
    
    tableTemplatesId: string;
    
    isAllInclusive: boolean;
    
    perAttendeeCents: number;
    
    width: number;
    
    height: number;
}

export interface CreateEventTicketTypeRequest {
    
    eventsId: string;
    
    label: string;
    
    priceCents: number;
    
    feeFormulasId: string;
    
    maxQuantity: number;
    
    sortOrder: number;
    
    description: string;
    
    capacity: number; 
}

export interface UpdateEventTicketTypeRequest {
    
    eventTicketTypesId: string;
    
    label: string;
    
    priceCents: number;
    
    feeFormulasId: string;
    
    maxQuantity: number;
    
    sortOrder: number;
    
    description: string;
    
    isActive: boolean;
    
    capacity: number; 
}

export interface TableTemplatePriceRule {
    
    tableTemplatePriceRulesId: string;
    
    tableTemplatesId: string;
    
    name: string;
    
    ruleType: string; 
    
    priority: number; 
    
    priceCents: number;
    
    activeFrom: string; 
    
    activeUntil: string; 
    
    minRemaining: number; 
    
    maxRemaining: number; 
    
    isActive: boolean;
}

export interface CreateTableTemplatePriceRuleRequest {
    
    tableTemplatesId: string;
    
    name: string;
    
    ruleType: string;
    
    priority: number;
    
    priceCents: number;
    
    activeFrom: string;
    
    activeUntil: string;
    
    minRemaining: number;
    
    maxRemaining: number;
}

export interface ListTableTemplatePriceRulesResponse {
    
    rules: TableTemplatePriceRule[];
}

export interface TableTemplate {
    
    tableTemplatesId: string;
    
    name: string;
    
    defaultCapacity: number;
    
    defaultShape: string;
    
    defaultColor: string;
    
    defaultPriceCents: number;
    
    isActive: boolean;
    
    defaultWidth: number;
    
    defaultHeight: number;
    
    defaultIsAllInclusive: boolean;
}

export interface CreateTableTemplateRequest {
    
    name: string;
    
    defaultCapacity: number;
    
    defaultShape: string;
    
    defaultColor: string;
    
    defaultPriceCents: number;
    
    defaultWidth: number;
    
    defaultHeight: number;
    
    defaultIsAllInclusive: boolean;
}

export interface UpdateTableTemplateRequest {
    
    tableTemplatesId: string;
    
    defaultCapacity: number;
    
    defaultShape: string;
    
    defaultColor: string;
    
    defaultPriceCents: number;
    
    defaultWidth: number;
    
    defaultHeight: number;
    
    defaultIsAllInclusive: boolean;
    
    isActive: boolean;
}

export interface ListTableTemplatesResponse {
    
    templates: TableTemplate[];
}

class Table$Type extends MessageType<Table> {
    constructor() {
        super("svyne.booking.Table", [
            { no: 1, name: "tables_id", kind: "scalar", T: 9  },
            { no: 2, name: "event_tables_id", kind: "scalar", T: 9  },
            { no: 3, name: "label", kind: "scalar", T: 9  },
            { no: 4, name: "pos_x", kind: "scalar", T: 1  },
            { no: 5, name: "pos_y", kind: "scalar", T: 1  },
            { no: 6, name: "width", kind: "scalar", T: 1  },
            { no: 7, name: "height", kind: "scalar", T: 1  },
            { no: 8, name: "status", kind: "scalar", T: 9  },
            { no: 9, name: "price_cents", kind: "scalar", T: 5  },
            { no: 10, name: "platform_fee_cents", kind: "scalar", T: 5  },
            { no: 11, name: "fee_formulas_id", kind: "scalar", T: 9  },
            { no: 12, name: "shape_override", kind: "scalar", T: 9  },
            { no: 13, name: "color_override", kind: "scalar", T: 9  },
            { no: 14, name: "capacity_override", kind: "scalar", T: 5  },
            { no: 15, name: "prices_id", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<Table>): Table {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.tablesId = "";
        message.eventTablesId = "";
        message.label = "";
        message.posX = 0;
        message.posY = 0;
        message.width = 0;
        message.height = 0;
        message.status = "";
        message.priceCents = 0;
        message.platformFeeCents = 0;
        message.feeFormulasId = "";
        message.shapeOverride = "";
        message.colorOverride = "";
        message.capacityOverride = 0;
        message.pricesId = "";
        if (value !== undefined)
            reflectionMergePartial<Table>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Table): Table {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.tablesId = reader.string();
                    break;
                case  2:
                    message.eventTablesId = reader.string();
                    break;
                case  3:
                    message.label = reader.string();
                    break;
                case  4:
                    message.posX = reader.double();
                    break;
                case  5:
                    message.posY = reader.double();
                    break;
                case  6:
                    message.width = reader.double();
                    break;
                case  7:
                    message.height = reader.double();
                    break;
                case  8:
                    message.status = reader.string();
                    break;
                case  9:
                    message.priceCents = reader.int32();
                    break;
                case  10:
                    message.platformFeeCents = reader.int32();
                    break;
                case  11:
                    message.feeFormulasId = reader.string();
                    break;
                case  12:
                    message.shapeOverride = reader.string();
                    break;
                case  13:
                    message.colorOverride = reader.string();
                    break;
                case  14:
                    message.capacityOverride = reader.int32();
                    break;
                case  15:
                    message.pricesId = reader.string();
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
    internalBinaryWrite(message: Table, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.tablesId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.tablesId);
        
        if (message.eventTablesId !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.eventTablesId);
        
        if (message.label !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.label);
        
        if (message.posX !== 0)
            writer.tag(4, WireType.Bit64).double(message.posX);
        
        if (message.posY !== 0)
            writer.tag(5, WireType.Bit64).double(message.posY);
        
        if (message.width !== 0)
            writer.tag(6, WireType.Bit64).double(message.width);
        
        if (message.height !== 0)
            writer.tag(7, WireType.Bit64).double(message.height);
        
        if (message.status !== "")
            writer.tag(8, WireType.LengthDelimited).string(message.status);
        
        if (message.priceCents !== 0)
            writer.tag(9, WireType.Varint).int32(message.priceCents);
        
        if (message.platformFeeCents !== 0)
            writer.tag(10, WireType.Varint).int32(message.platformFeeCents);
        
        if (message.feeFormulasId !== "")
            writer.tag(11, WireType.LengthDelimited).string(message.feeFormulasId);
        
        if (message.shapeOverride !== "")
            writer.tag(12, WireType.LengthDelimited).string(message.shapeOverride);
        
        if (message.colorOverride !== "")
            writer.tag(13, WireType.LengthDelimited).string(message.colorOverride);
        
        if (message.capacityOverride !== 0)
            writer.tag(14, WireType.Varint).int32(message.capacityOverride);
        
        if (message.pricesId !== "")
            writer.tag(15, WireType.LengthDelimited).string(message.pricesId);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const Table = new Table$Type();

class LayoutObject$Type extends MessageType<LayoutObject> {
    constructor() {
        super("svyne.booking.LayoutObject", [
            { no: 1, name: "layout_objects_id", kind: "scalar", T: 9  },
            { no: 2, name: "object_type", kind: "scalar", T: 9  },
            { no: 3, name: "label", kind: "scalar", T: 9  },
            { no: 4, name: "pos_x", kind: "scalar", T: 1  },
            { no: 5, name: "pos_y", kind: "scalar", T: 1  },
            { no: 6, name: "width", kind: "scalar", T: 1  },
            { no: 7, name: "height", kind: "scalar", T: 1  },
            { no: 8, name: "color", kind: "scalar", T: 9  },
            { no: 9, name: "sort_order", kind: "scalar", T: 5  }
        ]);
    }
    create(value?: PartialMessage<LayoutObject>): LayoutObject {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.layoutObjectsId = "";
        message.objectType = "";
        message.label = "";
        message.posX = 0;
        message.posY = 0;
        message.width = 0;
        message.height = 0;
        message.color = "";
        message.sortOrder = 0;
        if (value !== undefined)
            reflectionMergePartial<LayoutObject>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: LayoutObject): LayoutObject {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.layoutObjectsId = reader.string();
                    break;
                case  2:
                    message.objectType = reader.string();
                    break;
                case  3:
                    message.label = reader.string();
                    break;
                case  4:
                    message.posX = reader.double();
                    break;
                case  5:
                    message.posY = reader.double();
                    break;
                case  6:
                    message.width = reader.double();
                    break;
                case  7:
                    message.height = reader.double();
                    break;
                case  8:
                    message.color = reader.string();
                    break;
                case  9:
                    message.sortOrder = reader.int32();
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
    internalBinaryWrite(message: LayoutObject, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.layoutObjectsId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.layoutObjectsId);
        
        if (message.objectType !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.objectType);
        
        if (message.label !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.label);
        
        if (message.posX !== 0)
            writer.tag(4, WireType.Bit64).double(message.posX);
        
        if (message.posY !== 0)
            writer.tag(5, WireType.Bit64).double(message.posY);
        
        if (message.width !== 0)
            writer.tag(6, WireType.Bit64).double(message.width);
        
        if (message.height !== 0)
            writer.tag(7, WireType.Bit64).double(message.height);
        
        if (message.color !== "")
            writer.tag(8, WireType.LengthDelimited).string(message.color);
        
        if (message.sortOrder !== 0)
            writer.tag(9, WireType.Varint).int32(message.sortOrder);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const LayoutObject = new LayoutObject$Type();

class EventLayout$Type extends MessageType<EventLayout> {
    constructor() {
        super("svyne.booking.EventLayout", [
            { no: 1, name: "events_id", kind: "scalar", T: 9  },
            { no: 4, name: "tables", kind: "message", repeat: 2 , T: () => Table },
            { no: 5, name: "objects", kind: "message", repeat: 2 , T: () => LayoutObject }
        ]);
    }
    create(value?: PartialMessage<EventLayout>): EventLayout {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.eventsId = "";
        message.tables = [];
        message.objects = [];
        if (value !== undefined)
            reflectionMergePartial<EventLayout>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: EventLayout): EventLayout {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.eventsId = reader.string();
                    break;
                case  4:
                    message.tables.push(Table.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case  5:
                    message.objects.push(LayoutObject.internalBinaryRead(reader, reader.uint32(), options));
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
    internalBinaryWrite(message: EventLayout, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.eventsId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.eventsId);
        
        for (let i = 0; i < message.tables.length; i++)
            Table.internalBinaryWrite(message.tables[i], writer.tag(4, WireType.LengthDelimited).fork(), options).join();
        
        for (let i = 0; i < message.objects.length; i++)
            LayoutObject.internalBinaryWrite(message.objects[i], writer.tag(5, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const EventLayout = new EventLayout$Type();

class SaveEventLayoutRequest$Type extends MessageType<SaveEventLayoutRequest> {
    constructor() {
        super("svyne.booking.SaveEventLayoutRequest", [
            { no: 1, name: "events_id", kind: "scalar", T: 9  },
            { no: 4, name: "tables_json", kind: "scalar", T: 9  },
            { no: 5, name: "locked_ids", kind: "scalar", repeat: 2 , T: 9  },
            { no: 6, name: "objects_json", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<SaveEventLayoutRequest>): SaveEventLayoutRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.eventsId = "";
        message.tablesJson = "";
        message.lockedIds = [];
        message.objectsJson = "";
        if (value !== undefined)
            reflectionMergePartial<SaveEventLayoutRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: SaveEventLayoutRequest): SaveEventLayoutRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.eventsId = reader.string();
                    break;
                case  4:
                    message.tablesJson = reader.string();
                    break;
                case  5:
                    message.lockedIds.push(reader.string());
                    break;
                case  6:
                    message.objectsJson = reader.string();
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
    internalBinaryWrite(message: SaveEventLayoutRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.eventsId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.eventsId);
        
        if (message.tablesJson !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.tablesJson);
        
        for (let i = 0; i < message.lockedIds.length; i++)
            writer.tag(5, WireType.LengthDelimited).string(message.lockedIds[i]);
        
        if (message.objectsJson !== "")
            writer.tag(6, WireType.LengthDelimited).string(message.objectsJson);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const SaveEventLayoutRequest = new SaveEventLayoutRequest$Type();

class LockTableRequest$Type extends MessageType<LockTableRequest> {
    constructor() {
        super("svyne.booking.LockTableRequest", [
            { no: 1, name: "tables_id", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<LockTableRequest>): LockTableRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.tablesId = "";
        if (value !== undefined)
            reflectionMergePartial<LockTableRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: LockTableRequest): LockTableRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.tablesId = reader.string();
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
    internalBinaryWrite(message: LockTableRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.tablesId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.tablesId);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const LockTableRequest = new LockTableRequest$Type();

class ListTablesResponse$Type extends MessageType<ListTablesResponse> {
    constructor() {
        super("svyne.booking.ListTablesResponse", [
            { no: 1, name: "tables", kind: "message", repeat: 2 , T: () => Table }
        ]);
    }
    create(value?: PartialMessage<ListTablesResponse>): ListTablesResponse {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.tables = [];
        if (value !== undefined)
            reflectionMergePartial<ListTablesResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ListTablesResponse): ListTablesResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.tables.push(Table.internalBinaryRead(reader, reader.uint32(), options));
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
    internalBinaryWrite(message: ListTablesResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        for (let i = 0; i < message.tables.length; i++)
            Table.internalBinaryWrite(message.tables[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const ListTablesResponse = new ListTablesResponse$Type();

class EventTableType$Type extends MessageType<EventTableType> {
    constructor() {
        super("svyne.booking.EventTableType", [
            { no: 1, name: "event_tables_id", kind: "scalar", T: 9  },
            { no: 2, name: "label", kind: "scalar", T: 9  },
            { no: 3, name: "capacity", kind: "scalar", T: 5  },
            { no: 4, name: "shape", kind: "scalar", T: 9  },
            { no: 5, name: "color", kind: "scalar", T: 9  },
            { no: 6, name: "price_cents", kind: "scalar", T: 5  },
            { no: 7, name: "prices_id", kind: "scalar", T: 9  },
            { no: 8, name: "default_width", kind: "scalar", T: 1  },
            { no: 9, name: "default_height", kind: "scalar", T: 1  },
            { no: 10, name: "platform_fee_cents", kind: "scalar", T: 5  }
        ]);
    }
    create(value?: PartialMessage<EventTableType>): EventTableType {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.eventTablesId = "";
        message.label = "";
        message.capacity = 0;
        message.shape = "";
        message.color = "";
        message.priceCents = 0;
        message.pricesId = "";
        message.defaultWidth = 0;
        message.defaultHeight = 0;
        message.platformFeeCents = 0;
        if (value !== undefined)
            reflectionMergePartial<EventTableType>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: EventTableType): EventTableType {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.eventTablesId = reader.string();
                    break;
                case  2:
                    message.label = reader.string();
                    break;
                case  3:
                    message.capacity = reader.int32();
                    break;
                case  4:
                    message.shape = reader.string();
                    break;
                case  5:
                    message.color = reader.string();
                    break;
                case  6:
                    message.priceCents = reader.int32();
                    break;
                case  7:
                    message.pricesId = reader.string();
                    break;
                case  8:
                    message.defaultWidth = reader.double();
                    break;
                case  9:
                    message.defaultHeight = reader.double();
                    break;
                case  10:
                    message.platformFeeCents = reader.int32();
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
    internalBinaryWrite(message: EventTableType, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.eventTablesId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.eventTablesId);
        
        if (message.label !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.label);
        
        if (message.capacity !== 0)
            writer.tag(3, WireType.Varint).int32(message.capacity);
        
        if (message.shape !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.shape);
        
        if (message.color !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.color);
        
        if (message.priceCents !== 0)
            writer.tag(6, WireType.Varint).int32(message.priceCents);
        
        if (message.pricesId !== "")
            writer.tag(7, WireType.LengthDelimited).string(message.pricesId);
        
        if (message.defaultWidth !== 0)
            writer.tag(8, WireType.Bit64).double(message.defaultWidth);
        
        if (message.defaultHeight !== 0)
            writer.tag(9, WireType.Bit64).double(message.defaultHeight);
        
        if (message.platformFeeCents !== 0)
            writer.tag(10, WireType.Varint).int32(message.platformFeeCents);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const EventTableType = new EventTableType$Type();

class ListEventTableTypesResponse$Type extends MessageType<ListEventTableTypesResponse> {
    constructor() {
        super("svyne.booking.ListEventTableTypesResponse", [
            { no: 1, name: "table_types", kind: "message", repeat: 2 , T: () => EventTableType }
        ]);
    }
    create(value?: PartialMessage<ListEventTableTypesResponse>): ListEventTableTypesResponse {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.tableTypes = [];
        if (value !== undefined)
            reflectionMergePartial<ListEventTableTypesResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ListEventTableTypesResponse): ListEventTableTypesResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.tableTypes.push(EventTableType.internalBinaryRead(reader, reader.uint32(), options));
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
    internalBinaryWrite(message: ListEventTableTypesResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        for (let i = 0; i < message.tableTypes.length; i++)
            EventTableType.internalBinaryWrite(message.tableTypes[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const ListEventTableTypesResponse = new ListEventTableTypesResponse$Type();

class CreateEventTableRequest$Type extends MessageType<CreateEventTableRequest> {
    constructor() {
        super("svyne.booking.CreateEventTableRequest", [
            { no: 1, name: "events_id", kind: "scalar", T: 9  },
            { no: 2, name: "label", kind: "scalar", T: 9  },
            { no: 3, name: "capacity", kind: "scalar", T: 5  },
            { no: 4, name: "shape", kind: "scalar", T: 9  },
            { no: 5, name: "color", kind: "scalar", T: 9  },
            { no: 6, name: "price_cents", kind: "scalar", T: 5  },
            { no: 7, name: "fee_formulas_id", kind: "scalar", T: 9  },
            { no: 8, name: "table_templates_id", kind: "scalar", T: 9  },
            { no: 9, name: "is_all_inclusive", kind: "scalar", T: 8  },
            { no: 10, name: "per_attendee_cents", kind: "scalar", T: 5  },
            { no: 11, name: "width", kind: "scalar", T: 1  },
            { no: 12, name: "height", kind: "scalar", T: 1  }
        ]);
    }
    create(value?: PartialMessage<CreateEventTableRequest>): CreateEventTableRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.eventsId = "";
        message.label = "";
        message.capacity = 0;
        message.shape = "";
        message.color = "";
        message.priceCents = 0;
        message.feeFormulasId = "";
        message.tableTemplatesId = "";
        message.isAllInclusive = false;
        message.perAttendeeCents = 0;
        message.width = 0;
        message.height = 0;
        if (value !== undefined)
            reflectionMergePartial<CreateEventTableRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: CreateEventTableRequest): CreateEventTableRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.eventsId = reader.string();
                    break;
                case  2:
                    message.label = reader.string();
                    break;
                case  3:
                    message.capacity = reader.int32();
                    break;
                case  4:
                    message.shape = reader.string();
                    break;
                case  5:
                    message.color = reader.string();
                    break;
                case  6:
                    message.priceCents = reader.int32();
                    break;
                case  7:
                    message.feeFormulasId = reader.string();
                    break;
                case  8:
                    message.tableTemplatesId = reader.string();
                    break;
                case  9:
                    message.isAllInclusive = reader.bool();
                    break;
                case  10:
                    message.perAttendeeCents = reader.int32();
                    break;
                case  11:
                    message.width = reader.double();
                    break;
                case  12:
                    message.height = reader.double();
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
    internalBinaryWrite(message: CreateEventTableRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.eventsId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.eventsId);
        
        if (message.label !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.label);
        
        if (message.capacity !== 0)
            writer.tag(3, WireType.Varint).int32(message.capacity);
        
        if (message.shape !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.shape);
        
        if (message.color !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.color);
        
        if (message.priceCents !== 0)
            writer.tag(6, WireType.Varint).int32(message.priceCents);
        
        if (message.feeFormulasId !== "")
            writer.tag(7, WireType.LengthDelimited).string(message.feeFormulasId);
        
        if (message.tableTemplatesId !== "")
            writer.tag(8, WireType.LengthDelimited).string(message.tableTemplatesId);
        
        if (message.isAllInclusive !== false)
            writer.tag(9, WireType.Varint).bool(message.isAllInclusive);
        
        if (message.perAttendeeCents !== 0)
            writer.tag(10, WireType.Varint).int32(message.perAttendeeCents);
        
        if (message.width !== 0)
            writer.tag(11, WireType.Bit64).double(message.width);
        
        if (message.height !== 0)
            writer.tag(12, WireType.Bit64).double(message.height);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const CreateEventTableRequest = new CreateEventTableRequest$Type();

class CreateEventTicketTypeRequest$Type extends MessageType<CreateEventTicketTypeRequest> {
    constructor() {
        super("svyne.booking.CreateEventTicketTypeRequest", [
            { no: 1, name: "events_id", kind: "scalar", T: 9  },
            { no: 2, name: "label", kind: "scalar", T: 9  },
            { no: 3, name: "price_cents", kind: "scalar", T: 5  },
            { no: 4, name: "fee_formulas_id", kind: "scalar", T: 9  },
            { no: 5, name: "max_quantity", kind: "scalar", T: 5  },
            { no: 6, name: "sort_order", kind: "scalar", T: 5  },
            { no: 7, name: "description", kind: "scalar", T: 9  },
            { no: 8, name: "capacity", kind: "scalar", T: 5  }
        ]);
    }
    create(value?: PartialMessage<CreateEventTicketTypeRequest>): CreateEventTicketTypeRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.eventsId = "";
        message.label = "";
        message.priceCents = 0;
        message.feeFormulasId = "";
        message.maxQuantity = 0;
        message.sortOrder = 0;
        message.description = "";
        message.capacity = 0;
        if (value !== undefined)
            reflectionMergePartial<CreateEventTicketTypeRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: CreateEventTicketTypeRequest): CreateEventTicketTypeRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.eventsId = reader.string();
                    break;
                case  2:
                    message.label = reader.string();
                    break;
                case  3:
                    message.priceCents = reader.int32();
                    break;
                case  4:
                    message.feeFormulasId = reader.string();
                    break;
                case  5:
                    message.maxQuantity = reader.int32();
                    break;
                case  6:
                    message.sortOrder = reader.int32();
                    break;
                case  7:
                    message.description = reader.string();
                    break;
                case  8:
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
    internalBinaryWrite(message: CreateEventTicketTypeRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.eventsId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.eventsId);
        
        if (message.label !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.label);
        
        if (message.priceCents !== 0)
            writer.tag(3, WireType.Varint).int32(message.priceCents);
        
        if (message.feeFormulasId !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.feeFormulasId);
        
        if (message.maxQuantity !== 0)
            writer.tag(5, WireType.Varint).int32(message.maxQuantity);
        
        if (message.sortOrder !== 0)
            writer.tag(6, WireType.Varint).int32(message.sortOrder);
        
        if (message.description !== "")
            writer.tag(7, WireType.LengthDelimited).string(message.description);
        
        if (message.capacity !== 0)
            writer.tag(8, WireType.Varint).int32(message.capacity);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const CreateEventTicketTypeRequest = new CreateEventTicketTypeRequest$Type();

class UpdateEventTicketTypeRequest$Type extends MessageType<UpdateEventTicketTypeRequest> {
    constructor() {
        super("svyne.booking.UpdateEventTicketTypeRequest", [
            { no: 1, name: "event_ticket_types_id", kind: "scalar", T: 9  },
            { no: 2, name: "label", kind: "scalar", T: 9  },
            { no: 3, name: "price_cents", kind: "scalar", T: 5  },
            { no: 4, name: "fee_formulas_id", kind: "scalar", T: 9  },
            { no: 5, name: "max_quantity", kind: "scalar", T: 5  },
            { no: 6, name: "sort_order", kind: "scalar", T: 5  },
            { no: 7, name: "description", kind: "scalar", T: 9  },
            { no: 8, name: "is_active", kind: "scalar", T: 8  },
            { no: 9, name: "capacity", kind: "scalar", T: 5  }
        ]);
    }
    create(value?: PartialMessage<UpdateEventTicketTypeRequest>): UpdateEventTicketTypeRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.eventTicketTypesId = "";
        message.label = "";
        message.priceCents = 0;
        message.feeFormulasId = "";
        message.maxQuantity = 0;
        message.sortOrder = 0;
        message.description = "";
        message.isActive = false;
        message.capacity = 0;
        if (value !== undefined)
            reflectionMergePartial<UpdateEventTicketTypeRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: UpdateEventTicketTypeRequest): UpdateEventTicketTypeRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.eventTicketTypesId = reader.string();
                    break;
                case  2:
                    message.label = reader.string();
                    break;
                case  3:
                    message.priceCents = reader.int32();
                    break;
                case  4:
                    message.feeFormulasId = reader.string();
                    break;
                case  5:
                    message.maxQuantity = reader.int32();
                    break;
                case  6:
                    message.sortOrder = reader.int32();
                    break;
                case  7:
                    message.description = reader.string();
                    break;
                case  8:
                    message.isActive = reader.bool();
                    break;
                case  9:
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
    internalBinaryWrite(message: UpdateEventTicketTypeRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.eventTicketTypesId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.eventTicketTypesId);
        
        if (message.label !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.label);
        
        if (message.priceCents !== 0)
            writer.tag(3, WireType.Varint).int32(message.priceCents);
        
        if (message.feeFormulasId !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.feeFormulasId);
        
        if (message.maxQuantity !== 0)
            writer.tag(5, WireType.Varint).int32(message.maxQuantity);
        
        if (message.sortOrder !== 0)
            writer.tag(6, WireType.Varint).int32(message.sortOrder);
        
        if (message.description !== "")
            writer.tag(7, WireType.LengthDelimited).string(message.description);
        
        if (message.isActive !== false)
            writer.tag(8, WireType.Varint).bool(message.isActive);
        
        if (message.capacity !== 0)
            writer.tag(9, WireType.Varint).int32(message.capacity);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const UpdateEventTicketTypeRequest = new UpdateEventTicketTypeRequest$Type();

class TableTemplatePriceRule$Type extends MessageType<TableTemplatePriceRule> {
    constructor() {
        super("svyne.booking.TableTemplatePriceRule", [
            { no: 1, name: "table_template_price_rules_id", kind: "scalar", T: 9  },
            { no: 2, name: "table_templates_id", kind: "scalar", T: 9  },
            { no: 3, name: "name", kind: "scalar", T: 9  },
            { no: 4, name: "rule_type", kind: "scalar", T: 9  },
            { no: 5, name: "priority", kind: "scalar", T: 5  },
            { no: 6, name: "price_cents", kind: "scalar", T: 5  },
            { no: 7, name: "active_from", kind: "scalar", T: 3  },
            { no: 8, name: "active_until", kind: "scalar", T: 3  },
            { no: 9, name: "min_remaining", kind: "scalar", T: 5  },
            { no: 10, name: "max_remaining", kind: "scalar", T: 5  },
            { no: 11, name: "is_active", kind: "scalar", T: 8  }
        ]);
    }
    create(value?: PartialMessage<TableTemplatePriceRule>): TableTemplatePriceRule {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.tableTemplatePriceRulesId = "";
        message.tableTemplatesId = "";
        message.name = "";
        message.ruleType = "";
        message.priority = 0;
        message.priceCents = 0;
        message.activeFrom = "0";
        message.activeUntil = "0";
        message.minRemaining = 0;
        message.maxRemaining = 0;
        message.isActive = false;
        if (value !== undefined)
            reflectionMergePartial<TableTemplatePriceRule>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: TableTemplatePriceRule): TableTemplatePriceRule {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.tableTemplatePriceRulesId = reader.string();
                    break;
                case  2:
                    message.tableTemplatesId = reader.string();
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
    internalBinaryWrite(message: TableTemplatePriceRule, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.tableTemplatePriceRulesId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.tableTemplatePriceRulesId);
        
        if (message.tableTemplatesId !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.tableTemplatesId);
        
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
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const TableTemplatePriceRule = new TableTemplatePriceRule$Type();

class CreateTableTemplatePriceRuleRequest$Type extends MessageType<CreateTableTemplatePriceRuleRequest> {
    constructor() {
        super("svyne.booking.CreateTableTemplatePriceRuleRequest", [
            { no: 1, name: "table_templates_id", kind: "scalar", T: 9  },
            { no: 2, name: "name", kind: "scalar", T: 9  },
            { no: 3, name: "rule_type", kind: "scalar", T: 9  },
            { no: 4, name: "priority", kind: "scalar", T: 5  },
            { no: 5, name: "price_cents", kind: "scalar", T: 5  },
            { no: 6, name: "active_from", kind: "scalar", T: 3  },
            { no: 7, name: "active_until", kind: "scalar", T: 3  },
            { no: 8, name: "min_remaining", kind: "scalar", T: 5  },
            { no: 9, name: "max_remaining", kind: "scalar", T: 5  }
        ]);
    }
    create(value?: PartialMessage<CreateTableTemplatePriceRuleRequest>): CreateTableTemplatePriceRuleRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.tableTemplatesId = "";
        message.name = "";
        message.ruleType = "";
        message.priority = 0;
        message.priceCents = 0;
        message.activeFrom = "0";
        message.activeUntil = "0";
        message.minRemaining = 0;
        message.maxRemaining = 0;
        if (value !== undefined)
            reflectionMergePartial<CreateTableTemplatePriceRuleRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: CreateTableTemplatePriceRuleRequest): CreateTableTemplatePriceRuleRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.tableTemplatesId = reader.string();
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
    internalBinaryWrite(message: CreateTableTemplatePriceRuleRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.tableTemplatesId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.tableTemplatesId);
        
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
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const CreateTableTemplatePriceRuleRequest = new CreateTableTemplatePriceRuleRequest$Type();

class ListTableTemplatePriceRulesResponse$Type extends MessageType<ListTableTemplatePriceRulesResponse> {
    constructor() {
        super("svyne.booking.ListTableTemplatePriceRulesResponse", [
            { no: 1, name: "rules", kind: "message", repeat: 2 , T: () => TableTemplatePriceRule }
        ]);
    }
    create(value?: PartialMessage<ListTableTemplatePriceRulesResponse>): ListTableTemplatePriceRulesResponse {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.rules = [];
        if (value !== undefined)
            reflectionMergePartial<ListTableTemplatePriceRulesResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ListTableTemplatePriceRulesResponse): ListTableTemplatePriceRulesResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.rules.push(TableTemplatePriceRule.internalBinaryRead(reader, reader.uint32(), options));
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
    internalBinaryWrite(message: ListTableTemplatePriceRulesResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        for (let i = 0; i < message.rules.length; i++)
            TableTemplatePriceRule.internalBinaryWrite(message.rules[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const ListTableTemplatePriceRulesResponse = new ListTableTemplatePriceRulesResponse$Type();

class TableTemplate$Type extends MessageType<TableTemplate> {
    constructor() {
        super("svyne.booking.TableTemplate", [
            { no: 1, name: "table_templates_id", kind: "scalar", T: 9  },
            { no: 2, name: "name", kind: "scalar", T: 9  },
            { no: 3, name: "default_capacity", kind: "scalar", T: 5  },
            { no: 4, name: "default_shape", kind: "scalar", T: 9  },
            { no: 5, name: "default_color", kind: "scalar", T: 9  },
            { no: 6, name: "default_price_cents", kind: "scalar", T: 5  },
            { no: 7, name: "is_active", kind: "scalar", T: 8  },
            { no: 8, name: "default_width", kind: "scalar", T: 1  },
            { no: 9, name: "default_height", kind: "scalar", T: 1  },
            { no: 10, name: "default_is_all_inclusive", kind: "scalar", T: 8  }
        ]);
    }
    create(value?: PartialMessage<TableTemplate>): TableTemplate {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.tableTemplatesId = "";
        message.name = "";
        message.defaultCapacity = 0;
        message.defaultShape = "";
        message.defaultColor = "";
        message.defaultPriceCents = 0;
        message.isActive = false;
        message.defaultWidth = 0;
        message.defaultHeight = 0;
        message.defaultIsAllInclusive = false;
        if (value !== undefined)
            reflectionMergePartial<TableTemplate>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: TableTemplate): TableTemplate {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.tableTemplatesId = reader.string();
                    break;
                case  2:
                    message.name = reader.string();
                    break;
                case  3:
                    message.defaultCapacity = reader.int32();
                    break;
                case  4:
                    message.defaultShape = reader.string();
                    break;
                case  5:
                    message.defaultColor = reader.string();
                    break;
                case  6:
                    message.defaultPriceCents = reader.int32();
                    break;
                case  7:
                    message.isActive = reader.bool();
                    break;
                case  8:
                    message.defaultWidth = reader.double();
                    break;
                case  9:
                    message.defaultHeight = reader.double();
                    break;
                case  10:
                    message.defaultIsAllInclusive = reader.bool();
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
    internalBinaryWrite(message: TableTemplate, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.tableTemplatesId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.tableTemplatesId);
        
        if (message.name !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.name);
        
        if (message.defaultCapacity !== 0)
            writer.tag(3, WireType.Varint).int32(message.defaultCapacity);
        
        if (message.defaultShape !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.defaultShape);
        
        if (message.defaultColor !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.defaultColor);
        
        if (message.defaultPriceCents !== 0)
            writer.tag(6, WireType.Varint).int32(message.defaultPriceCents);
        
        if (message.isActive !== false)
            writer.tag(7, WireType.Varint).bool(message.isActive);
        
        if (message.defaultWidth !== 0)
            writer.tag(8, WireType.Bit64).double(message.defaultWidth);
        
        if (message.defaultHeight !== 0)
            writer.tag(9, WireType.Bit64).double(message.defaultHeight);
        
        if (message.defaultIsAllInclusive !== false)
            writer.tag(10, WireType.Varint).bool(message.defaultIsAllInclusive);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const TableTemplate = new TableTemplate$Type();

class CreateTableTemplateRequest$Type extends MessageType<CreateTableTemplateRequest> {
    constructor() {
        super("svyne.booking.CreateTableTemplateRequest", [
            { no: 1, name: "name", kind: "scalar", T: 9  },
            { no: 2, name: "default_capacity", kind: "scalar", T: 5  },
            { no: 3, name: "default_shape", kind: "scalar", T: 9  },
            { no: 4, name: "default_color", kind: "scalar", T: 9  },
            { no: 5, name: "default_price_cents", kind: "scalar", T: 5  },
            { no: 6, name: "default_width", kind: "scalar", T: 1  },
            { no: 7, name: "default_height", kind: "scalar", T: 1  },
            { no: 8, name: "default_is_all_inclusive", kind: "scalar", T: 8  }
        ]);
    }
    create(value?: PartialMessage<CreateTableTemplateRequest>): CreateTableTemplateRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.name = "";
        message.defaultCapacity = 0;
        message.defaultShape = "";
        message.defaultColor = "";
        message.defaultPriceCents = 0;
        message.defaultWidth = 0;
        message.defaultHeight = 0;
        message.defaultIsAllInclusive = false;
        if (value !== undefined)
            reflectionMergePartial<CreateTableTemplateRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: CreateTableTemplateRequest): CreateTableTemplateRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.name = reader.string();
                    break;
                case  2:
                    message.defaultCapacity = reader.int32();
                    break;
                case  3:
                    message.defaultShape = reader.string();
                    break;
                case  4:
                    message.defaultColor = reader.string();
                    break;
                case  5:
                    message.defaultPriceCents = reader.int32();
                    break;
                case  6:
                    message.defaultWidth = reader.double();
                    break;
                case  7:
                    message.defaultHeight = reader.double();
                    break;
                case  8:
                    message.defaultIsAllInclusive = reader.bool();
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
    internalBinaryWrite(message: CreateTableTemplateRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.name !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.name);
        
        if (message.defaultCapacity !== 0)
            writer.tag(2, WireType.Varint).int32(message.defaultCapacity);
        
        if (message.defaultShape !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.defaultShape);
        
        if (message.defaultColor !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.defaultColor);
        
        if (message.defaultPriceCents !== 0)
            writer.tag(5, WireType.Varint).int32(message.defaultPriceCents);
        
        if (message.defaultWidth !== 0)
            writer.tag(6, WireType.Bit64).double(message.defaultWidth);
        
        if (message.defaultHeight !== 0)
            writer.tag(7, WireType.Bit64).double(message.defaultHeight);
        
        if (message.defaultIsAllInclusive !== false)
            writer.tag(8, WireType.Varint).bool(message.defaultIsAllInclusive);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const CreateTableTemplateRequest = new CreateTableTemplateRequest$Type();

class UpdateTableTemplateRequest$Type extends MessageType<UpdateTableTemplateRequest> {
    constructor() {
        super("svyne.booking.UpdateTableTemplateRequest", [
            { no: 1, name: "table_templates_id", kind: "scalar", T: 9  },
            { no: 2, name: "default_capacity", kind: "scalar", T: 5  },
            { no: 3, name: "default_shape", kind: "scalar", T: 9  },
            { no: 4, name: "default_color", kind: "scalar", T: 9  },
            { no: 5, name: "default_price_cents", kind: "scalar", T: 5  },
            { no: 6, name: "default_width", kind: "scalar", T: 1  },
            { no: 7, name: "default_height", kind: "scalar", T: 1  },
            { no: 8, name: "default_is_all_inclusive", kind: "scalar", T: 8  },
            { no: 9, name: "is_active", kind: "scalar", T: 8  }
        ]);
    }
    create(value?: PartialMessage<UpdateTableTemplateRequest>): UpdateTableTemplateRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.tableTemplatesId = "";
        message.defaultCapacity = 0;
        message.defaultShape = "";
        message.defaultColor = "";
        message.defaultPriceCents = 0;
        message.defaultWidth = 0;
        message.defaultHeight = 0;
        message.defaultIsAllInclusive = false;
        message.isActive = false;
        if (value !== undefined)
            reflectionMergePartial<UpdateTableTemplateRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: UpdateTableTemplateRequest): UpdateTableTemplateRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.tableTemplatesId = reader.string();
                    break;
                case  2:
                    message.defaultCapacity = reader.int32();
                    break;
                case  3:
                    message.defaultShape = reader.string();
                    break;
                case  4:
                    message.defaultColor = reader.string();
                    break;
                case  5:
                    message.defaultPriceCents = reader.int32();
                    break;
                case  6:
                    message.defaultWidth = reader.double();
                    break;
                case  7:
                    message.defaultHeight = reader.double();
                    break;
                case  8:
                    message.defaultIsAllInclusive = reader.bool();
                    break;
                case  9:
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
    internalBinaryWrite(message: UpdateTableTemplateRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.tableTemplatesId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.tableTemplatesId);
        
        if (message.defaultCapacity !== 0)
            writer.tag(2, WireType.Varint).int32(message.defaultCapacity);
        
        if (message.defaultShape !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.defaultShape);
        
        if (message.defaultColor !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.defaultColor);
        
        if (message.defaultPriceCents !== 0)
            writer.tag(5, WireType.Varint).int32(message.defaultPriceCents);
        
        if (message.defaultWidth !== 0)
            writer.tag(6, WireType.Bit64).double(message.defaultWidth);
        
        if (message.defaultHeight !== 0)
            writer.tag(7, WireType.Bit64).double(message.defaultHeight);
        
        if (message.defaultIsAllInclusive !== false)
            writer.tag(8, WireType.Varint).bool(message.defaultIsAllInclusive);
        
        if (message.isActive !== false)
            writer.tag(9, WireType.Varint).bool(message.isActive);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const UpdateTableTemplateRequest = new UpdateTableTemplateRequest$Type();

class ListTableTemplatesResponse$Type extends MessageType<ListTableTemplatesResponse> {
    constructor() {
        super("svyne.booking.ListTableTemplatesResponse", [
            { no: 1, name: "templates", kind: "message", repeat: 2 , T: () => TableTemplate }
        ]);
    }
    create(value?: PartialMessage<ListTableTemplatesResponse>): ListTableTemplatesResponse {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.templates = [];
        if (value !== undefined)
            reflectionMergePartial<ListTableTemplatesResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ListTableTemplatesResponse): ListTableTemplatesResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.templates.push(TableTemplate.internalBinaryRead(reader, reader.uint32(), options));
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
    internalBinaryWrite(message: ListTableTemplatesResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        for (let i = 0; i < message.templates.length; i++)
            TableTemplate.internalBinaryWrite(message.templates[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const ListTableTemplatesResponse = new ListTableTemplatesResponse$Type();

export const TableBookingService = new ServiceType("svyne.booking.TableBookingService", [
    { name: "GetEventLayout", options: {}, I: UuidValue, O: EventLayout },
    { name: "SaveEventLayout", options: {}, I: SaveEventLayoutRequest, O: AckResponse },
    { name: "LockTable", options: {}, I: LockTableRequest, O: AckResponse },
    { name: "ReleaseTableLock", options: {}, I: LockTableRequest, O: AckResponse },
    { name: "ListTablesForEvent", options: {}, I: UuidValue, O: ListTablesResponse },
    { name: "ListEventTableTypes", options: {}, I: UuidValue, O: ListEventTableTypesResponse },
    { name: "CreateEventTable", options: {}, I: CreateEventTableRequest, O: UuidValue },
    { name: "DeleteEventTable", options: {}, I: UuidValue, O: AckResponse },
    { name: "CreateEventTicketType", options: {}, I: CreateEventTicketTypeRequest, O: UuidValue },
    { name: "UpdateEventTicketType", options: {}, I: UpdateEventTicketTypeRequest, O: AckResponse },
    { name: "DeleteEventTicketType", options: {}, I: UuidValue, O: AckResponse },
    { name: "CreateTableTemplatePriceRule", options: {}, I: CreateTableTemplatePriceRuleRequest, O: UuidValue },
    { name: "ListTableTemplatePriceRules", options: {}, I: UuidValue, O: ListTableTemplatePriceRulesResponse },
    { name: "DeleteTableTemplatePriceRule", options: {}, I: UuidValue, O: AckResponse },
    { name: "ListTableTemplates", options: {}, I: Empty, O: ListTableTemplatesResponse },
    { name: "CreateTableTemplate", options: {}, I: CreateTableTemplateRequest, O: UuidValue },
    { name: "UpdateTableTemplate", options: {}, I: UpdateTableTemplateRequest, O: AckResponse },
    { name: "DeleteTableTemplate", options: {}, I: UuidValue, O: AckResponse }
]);
