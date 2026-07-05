



import { AckResponse } from "./common";
import { Empty } from "./common";
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

export interface SaveAsTemplateRequest {
    
    eventsId: string;
    
    name: string;
}

export interface ApplyTemplateRequest {
    
    floorPlanTemplatesId: string;
    
    eventsId: string;
}

export interface FloorPlanTemplate {
    
    floorPlanTemplatesId: string;
    
    name: string;
    
    tableCount: number;
    
    objectCount: number;
    
    isActive: boolean;
}

export interface ListFloorPlanTemplatesResponse {
    
    templates: FloorPlanTemplate[];
}

class SaveAsTemplateRequest$Type extends MessageType<SaveAsTemplateRequest> {
    constructor() {
        super("svyne.floorplan.SaveAsTemplateRequest", [
            { no: 1, name: "events_id", kind: "scalar", T: 9  },
            { no: 2, name: "name", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<SaveAsTemplateRequest>): SaveAsTemplateRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.eventsId = "";
        message.name = "";
        if (value !== undefined)
            reflectionMergePartial<SaveAsTemplateRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: SaveAsTemplateRequest): SaveAsTemplateRequest {
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
    internalBinaryWrite(message: SaveAsTemplateRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.eventsId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.eventsId);
        
        if (message.name !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.name);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const SaveAsTemplateRequest = new SaveAsTemplateRequest$Type();

class ApplyTemplateRequest$Type extends MessageType<ApplyTemplateRequest> {
    constructor() {
        super("svyne.floorplan.ApplyTemplateRequest", [
            { no: 1, name: "floor_plan_templates_id", kind: "scalar", T: 9  },
            { no: 2, name: "events_id", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<ApplyTemplateRequest>): ApplyTemplateRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.floorPlanTemplatesId = "";
        message.eventsId = "";
        if (value !== undefined)
            reflectionMergePartial<ApplyTemplateRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ApplyTemplateRequest): ApplyTemplateRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.floorPlanTemplatesId = reader.string();
                    break;
                case  2:
                    message.eventsId = reader.string();
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
    internalBinaryWrite(message: ApplyTemplateRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.floorPlanTemplatesId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.floorPlanTemplatesId);
        
        if (message.eventsId !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.eventsId);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const ApplyTemplateRequest = new ApplyTemplateRequest$Type();

class FloorPlanTemplate$Type extends MessageType<FloorPlanTemplate> {
    constructor() {
        super("svyne.floorplan.FloorPlanTemplate", [
            { no: 1, name: "floor_plan_templates_id", kind: "scalar", T: 9  },
            { no: 2, name: "name", kind: "scalar", T: 9  },
            { no: 5, name: "table_count", kind: "scalar", T: 5  },
            { no: 6, name: "object_count", kind: "scalar", T: 5  },
            { no: 7, name: "is_active", kind: "scalar", T: 8  }
        ]);
    }
    create(value?: PartialMessage<FloorPlanTemplate>): FloorPlanTemplate {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.floorPlanTemplatesId = "";
        message.name = "";
        message.tableCount = 0;
        message.objectCount = 0;
        message.isActive = false;
        if (value !== undefined)
            reflectionMergePartial<FloorPlanTemplate>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: FloorPlanTemplate): FloorPlanTemplate {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.floorPlanTemplatesId = reader.string();
                    break;
                case  2:
                    message.name = reader.string();
                    break;
                case  5:
                    message.tableCount = reader.int32();
                    break;
                case  6:
                    message.objectCount = reader.int32();
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
    internalBinaryWrite(message: FloorPlanTemplate, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.floorPlanTemplatesId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.floorPlanTemplatesId);
        
        if (message.name !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.name);
        
        if (message.tableCount !== 0)
            writer.tag(5, WireType.Varint).int32(message.tableCount);
        
        if (message.objectCount !== 0)
            writer.tag(6, WireType.Varint).int32(message.objectCount);
        
        if (message.isActive !== false)
            writer.tag(7, WireType.Varint).bool(message.isActive);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const FloorPlanTemplate = new FloorPlanTemplate$Type();

class ListFloorPlanTemplatesResponse$Type extends MessageType<ListFloorPlanTemplatesResponse> {
    constructor() {
        super("svyne.floorplan.ListFloorPlanTemplatesResponse", [
            { no: 1, name: "templates", kind: "message", repeat: 2 , T: () => FloorPlanTemplate }
        ]);
    }
    create(value?: PartialMessage<ListFloorPlanTemplatesResponse>): ListFloorPlanTemplatesResponse {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.templates = [];
        if (value !== undefined)
            reflectionMergePartial<ListFloorPlanTemplatesResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ListFloorPlanTemplatesResponse): ListFloorPlanTemplatesResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.templates.push(FloorPlanTemplate.internalBinaryRead(reader, reader.uint32(), options));
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
    internalBinaryWrite(message: ListFloorPlanTemplatesResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        for (let i = 0; i < message.templates.length; i++)
            FloorPlanTemplate.internalBinaryWrite(message.templates[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const ListFloorPlanTemplatesResponse = new ListFloorPlanTemplatesResponse$Type();

export const FloorPlanService = new ServiceType("svyne.floorplan.FloorPlanService", [
    { name: "SaveAsTemplate", options: {}, I: SaveAsTemplateRequest, O: UuidValue },
    { name: "ListFloorPlanTemplates", options: {}, I: Empty, O: ListFloorPlanTemplatesResponse },
    { name: "ApplyTemplate", options: {}, I: ApplyTemplateRequest, O: AckResponse },
    { name: "DeleteFloorPlanTemplate", options: {}, I: UuidValue, O: AckResponse }
]);
