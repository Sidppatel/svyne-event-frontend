



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

export interface ListEnumsRequest {
    
    enumType: string;
}

export interface EnumValue {
    
    enumType: string;
    
    value: string;
    
    intValue: number;
    
    usedIn: string;
    
    description: string;
}

export interface ListEnumsResponse {
    
    values: EnumValue[];
}

class ListEnumsRequest$Type extends MessageType<ListEnumsRequest> {
    constructor() {
        super("svyne.enums.ListEnumsRequest", [
            { no: 1, name: "enum_type", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<ListEnumsRequest>): ListEnumsRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.enumType = "";
        if (value !== undefined)
            reflectionMergePartial<ListEnumsRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ListEnumsRequest): ListEnumsRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.enumType = reader.string();
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
    internalBinaryWrite(message: ListEnumsRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.enumType !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.enumType);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const ListEnumsRequest = new ListEnumsRequest$Type();

class EnumValue$Type extends MessageType<EnumValue> {
    constructor() {
        super("svyne.enums.EnumValue", [
            { no: 1, name: "enum_type", kind: "scalar", T: 9  },
            { no: 2, name: "value", kind: "scalar", T: 9  },
            { no: 3, name: "int_value", kind: "scalar", T: 5  },
            { no: 4, name: "used_in", kind: "scalar", T: 9  },
            { no: 5, name: "description", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<EnumValue>): EnumValue {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.enumType = "";
        message.value = "";
        message.intValue = 0;
        message.usedIn = "";
        message.description = "";
        if (value !== undefined)
            reflectionMergePartial<EnumValue>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: EnumValue): EnumValue {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.enumType = reader.string();
                    break;
                case  2:
                    message.value = reader.string();
                    break;
                case  3:
                    message.intValue = reader.int32();
                    break;
                case  4:
                    message.usedIn = reader.string();
                    break;
                case  5:
                    message.description = reader.string();
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
    internalBinaryWrite(message: EnumValue, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.enumType !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.enumType);
        
        if (message.value !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.value);
        
        if (message.intValue !== 0)
            writer.tag(3, WireType.Varint).int32(message.intValue);
        
        if (message.usedIn !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.usedIn);
        
        if (message.description !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.description);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const EnumValue = new EnumValue$Type();

class ListEnumsResponse$Type extends MessageType<ListEnumsResponse> {
    constructor() {
        super("svyne.enums.ListEnumsResponse", [
            { no: 1, name: "values", kind: "message", repeat: 2 , T: () => EnumValue }
        ]);
    }
    create(value?: PartialMessage<ListEnumsResponse>): ListEnumsResponse {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.values = [];
        if (value !== undefined)
            reflectionMergePartial<ListEnumsResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ListEnumsResponse): ListEnumsResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.values.push(EnumValue.internalBinaryRead(reader, reader.uint32(), options));
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
    internalBinaryWrite(message: ListEnumsResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        for (let i = 0; i < message.values.length; i++)
            EnumValue.internalBinaryWrite(message.values[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const ListEnumsResponse = new ListEnumsResponse$Type();

export const EnumService = new ServiceType("svyne.enums.EnumService", [
    { name: "ListEnums", options: {}, I: ListEnumsRequest, O: ListEnumsResponse }
]);
