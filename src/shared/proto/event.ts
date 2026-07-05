



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
import { PageRequest } from "./common";

export interface EventImage {
    
    imagesId: string;
    
    storageKey: string;
    
    type: string;
    
    isPrimary: boolean;
    
    sortOrder: number;
}

export interface ListEventImagesRequest {
    
    eventsId: string;
    
    type: string;
}

export interface ListEventImagesResponse {
    
    images: EventImage[];
}

export interface AddEventImageRequest {
    
    eventsId: string;
    
    imagesId: string;
    
    type: string;
}

export interface RemoveEventImageRequest {
    
    eventsId: string;
    
    imagesId: string;
}

export interface ReorderEventImagesRequest {
    
    eventsId: string;
    
    type: string;
    
    imagesId: string[];
}

export interface MediaSettings {
    
    eventImageAspectRatio: string;
    
    eventThumbnailAspectRatio: string;
}

export interface ScheduleItem {
    
    scheduleItemsId: string;
    
    eventsId: string;
    
    title: string;
    
    typeCategory: string;
    
    startTime: string;
    
    endTime: string;
}

export interface ListScheduleItemsResponse {
    
    items: ScheduleItem[];
}

export interface CreateScheduleItemRequest {
    
    eventsId: string;
    
    title: string;
    
    typeCategory: string;
    
    startTime: string;
    
    endTime: string;
}

export interface UpdateScheduleItemRequest {
    
    scheduleItemsId: string;
    
    title: string;
    
    typeCategory: string;
    
    startTime: string;
    
    endTime: string;
}

export interface SetEventFeesIncludedRequest {
    
    eventsId: string;
    
    feesIncluded: boolean;
}

export interface SetEventAchRequest {
    
    eventsId: string;
    
    achEnabled: boolean;
}

export interface Event {
    
    eventsId: string;
    
    tenantsId: string;
    
    title: string;
    
    slug: string;
    
    description: string;
    
    status: string;
    
    category: string;
    
    startDate: string;
    
    endDate: string;
    
    imagePath: string;
    
    isFeatured: boolean;
    
    layoutMode: string;
    
    totalCapacity: number; 
    
    venuesId: string;
    
    performersJson: string;
    
    sponsorsJson: string;
    
    feesIncluded: boolean;
    
    eventType: string; 
    
    primaryImageId: string; 
    
    extraInfoJson: string; 
    
    achEnabled: boolean; 
}

export interface GetEventBySlugRequest {
    
    slug: string;
}

export interface CreateEventRequest {
    
    title: string;
    
    slug: string;
    
    description: string;
    
    status: string;
    
    category: string;
    
    startDate: string;
    
    endDate: string;
    
    imagePath: string;
    
    isFeatured: boolean;
    
    layoutMode: string;
    
    venuesId: string;
    
    scheduledPublishAt: string;
    
    eventType: string; 
}

export interface CreateEventResponse {
    
    eventsId: string;
}

export interface UpdateEventRequest {
    
    eventsId: string;
    
    title: string;
    
    description: string;
    
    category: string;
    
    startDate: string;
    
    endDate: string;
    
    imagePath: string;
    
    isFeatured: boolean;
    
    venuesId: string;
    
    eventType: string; 
    
    extraInfoJson: string; 
}

export interface ChangeEventStatusRequest {
    
    eventsId: string;
    
    status: string;
}

export interface ListEventsRequest {
    
    page?: PageRequest;
    
    status: string;
    
    category: string;
}

export interface SearchEventsRequest {
    
    query: string;
}

export interface ListEventsResponse {
    
    events: Event[];
    
    meta?: PageMeta;
}

export interface EventStats {
    
    eventsId: string;
    
    totalBookings: number;
    
    ticketsSold: number;
    
    revenueCents: string;
    
    checkedIn: number;
}

class EventImage$Type extends MessageType<EventImage> {
    constructor() {
        super("svyne.event.EventImage", [
            { no: 1, name: "images_id", kind: "scalar", T: 9  },
            { no: 2, name: "storage_key", kind: "scalar", T: 9  },
            { no: 3, name: "type", kind: "scalar", T: 9  },
            { no: 4, name: "is_primary", kind: "scalar", T: 8  },
            { no: 5, name: "sort_order", kind: "scalar", T: 5  }
        ]);
    }
    create(value?: PartialMessage<EventImage>): EventImage {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.imagesId = "";
        message.storageKey = "";
        message.type = "";
        message.isPrimary = false;
        message.sortOrder = 0;
        if (value !== undefined)
            reflectionMergePartial<EventImage>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: EventImage): EventImage {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.imagesId = reader.string();
                    break;
                case  2:
                    message.storageKey = reader.string();
                    break;
                case  3:
                    message.type = reader.string();
                    break;
                case  4:
                    message.isPrimary = reader.bool();
                    break;
                case  5:
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
    internalBinaryWrite(message: EventImage, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.imagesId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.imagesId);
        
        if (message.storageKey !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.storageKey);
        
        if (message.type !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.type);
        
        if (message.isPrimary !== false)
            writer.tag(4, WireType.Varint).bool(message.isPrimary);
        
        if (message.sortOrder !== 0)
            writer.tag(5, WireType.Varint).int32(message.sortOrder);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const EventImage = new EventImage$Type();

class ListEventImagesRequest$Type extends MessageType<ListEventImagesRequest> {
    constructor() {
        super("svyne.event.ListEventImagesRequest", [
            { no: 1, name: "events_id", kind: "scalar", T: 9  },
            { no: 2, name: "type", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<ListEventImagesRequest>): ListEventImagesRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.eventsId = "";
        message.type = "";
        if (value !== undefined)
            reflectionMergePartial<ListEventImagesRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ListEventImagesRequest): ListEventImagesRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.eventsId = reader.string();
                    break;
                case  2:
                    message.type = reader.string();
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
    internalBinaryWrite(message: ListEventImagesRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.eventsId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.eventsId);
        
        if (message.type !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.type);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const ListEventImagesRequest = new ListEventImagesRequest$Type();

class ListEventImagesResponse$Type extends MessageType<ListEventImagesResponse> {
    constructor() {
        super("svyne.event.ListEventImagesResponse", [
            { no: 1, name: "images", kind: "message", repeat: 2 , T: () => EventImage }
        ]);
    }
    create(value?: PartialMessage<ListEventImagesResponse>): ListEventImagesResponse {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.images = [];
        if (value !== undefined)
            reflectionMergePartial<ListEventImagesResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ListEventImagesResponse): ListEventImagesResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.images.push(EventImage.internalBinaryRead(reader, reader.uint32(), options));
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
    internalBinaryWrite(message: ListEventImagesResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        for (let i = 0; i < message.images.length; i++)
            EventImage.internalBinaryWrite(message.images[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const ListEventImagesResponse = new ListEventImagesResponse$Type();

class AddEventImageRequest$Type extends MessageType<AddEventImageRequest> {
    constructor() {
        super("svyne.event.AddEventImageRequest", [
            { no: 1, name: "events_id", kind: "scalar", T: 9  },
            { no: 2, name: "images_id", kind: "scalar", T: 9  },
            { no: 3, name: "type", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<AddEventImageRequest>): AddEventImageRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.eventsId = "";
        message.imagesId = "";
        message.type = "";
        if (value !== undefined)
            reflectionMergePartial<AddEventImageRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: AddEventImageRequest): AddEventImageRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.eventsId = reader.string();
                    break;
                case  2:
                    message.imagesId = reader.string();
                    break;
                case  3:
                    message.type = reader.string();
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
    internalBinaryWrite(message: AddEventImageRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.eventsId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.eventsId);
        
        if (message.imagesId !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.imagesId);
        
        if (message.type !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.type);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const AddEventImageRequest = new AddEventImageRequest$Type();

class RemoveEventImageRequest$Type extends MessageType<RemoveEventImageRequest> {
    constructor() {
        super("svyne.event.RemoveEventImageRequest", [
            { no: 1, name: "events_id", kind: "scalar", T: 9  },
            { no: 2, name: "images_id", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<RemoveEventImageRequest>): RemoveEventImageRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.eventsId = "";
        message.imagesId = "";
        if (value !== undefined)
            reflectionMergePartial<RemoveEventImageRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: RemoveEventImageRequest): RemoveEventImageRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.eventsId = reader.string();
                    break;
                case  2:
                    message.imagesId = reader.string();
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
    internalBinaryWrite(message: RemoveEventImageRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.eventsId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.eventsId);
        
        if (message.imagesId !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.imagesId);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const RemoveEventImageRequest = new RemoveEventImageRequest$Type();

class ReorderEventImagesRequest$Type extends MessageType<ReorderEventImagesRequest> {
    constructor() {
        super("svyne.event.ReorderEventImagesRequest", [
            { no: 1, name: "events_id", kind: "scalar", T: 9  },
            { no: 2, name: "type", kind: "scalar", T: 9  },
            { no: 3, name: "images_id", kind: "scalar", repeat: 2 , T: 9  }
        ]);
    }
    create(value?: PartialMessage<ReorderEventImagesRequest>): ReorderEventImagesRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.eventsId = "";
        message.type = "";
        message.imagesId = [];
        if (value !== undefined)
            reflectionMergePartial<ReorderEventImagesRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ReorderEventImagesRequest): ReorderEventImagesRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.eventsId = reader.string();
                    break;
                case  2:
                    message.type = reader.string();
                    break;
                case  3:
                    message.imagesId.push(reader.string());
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
    internalBinaryWrite(message: ReorderEventImagesRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.eventsId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.eventsId);
        
        if (message.type !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.type);
        
        for (let i = 0; i < message.imagesId.length; i++)
            writer.tag(3, WireType.LengthDelimited).string(message.imagesId[i]);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const ReorderEventImagesRequest = new ReorderEventImagesRequest$Type();

class MediaSettings$Type extends MessageType<MediaSettings> {
    constructor() {
        super("svyne.event.MediaSettings", [
            { no: 1, name: "event_image_aspect_ratio", kind: "scalar", T: 9  },
            { no: 2, name: "event_thumbnail_aspect_ratio", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<MediaSettings>): MediaSettings {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.eventImageAspectRatio = "";
        message.eventThumbnailAspectRatio = "";
        if (value !== undefined)
            reflectionMergePartial<MediaSettings>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: MediaSettings): MediaSettings {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.eventImageAspectRatio = reader.string();
                    break;
                case  2:
                    message.eventThumbnailAspectRatio = reader.string();
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
    internalBinaryWrite(message: MediaSettings, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.eventImageAspectRatio !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.eventImageAspectRatio);
        
        if (message.eventThumbnailAspectRatio !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.eventThumbnailAspectRatio);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const MediaSettings = new MediaSettings$Type();

class ScheduleItem$Type extends MessageType<ScheduleItem> {
    constructor() {
        super("svyne.event.ScheduleItem", [
            { no: 1, name: "schedule_items_id", kind: "scalar", T: 9  },
            { no: 2, name: "events_id", kind: "scalar", T: 9  },
            { no: 3, name: "title", kind: "scalar", T: 9  },
            { no: 4, name: "type_category", kind: "scalar", T: 9  },
            { no: 5, name: "start_time", kind: "scalar", T: 3  },
            { no: 6, name: "end_time", kind: "scalar", T: 3  }
        ]);
    }
    create(value?: PartialMessage<ScheduleItem>): ScheduleItem {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.scheduleItemsId = "";
        message.eventsId = "";
        message.title = "";
        message.typeCategory = "";
        message.startTime = "0";
        message.endTime = "0";
        if (value !== undefined)
            reflectionMergePartial<ScheduleItem>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ScheduleItem): ScheduleItem {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.scheduleItemsId = reader.string();
                    break;
                case  2:
                    message.eventsId = reader.string();
                    break;
                case  3:
                    message.title = reader.string();
                    break;
                case  4:
                    message.typeCategory = reader.string();
                    break;
                case  5:
                    message.startTime = reader.int64().toString();
                    break;
                case  6:
                    message.endTime = reader.int64().toString();
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
    internalBinaryWrite(message: ScheduleItem, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.scheduleItemsId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.scheduleItemsId);
        
        if (message.eventsId !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.eventsId);
        
        if (message.title !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.title);
        
        if (message.typeCategory !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.typeCategory);
        
        if (message.startTime !== "0")
            writer.tag(5, WireType.Varint).int64(message.startTime);
        
        if (message.endTime !== "0")
            writer.tag(6, WireType.Varint).int64(message.endTime);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const ScheduleItem = new ScheduleItem$Type();

class ListScheduleItemsResponse$Type extends MessageType<ListScheduleItemsResponse> {
    constructor() {
        super("svyne.event.ListScheduleItemsResponse", [
            { no: 1, name: "items", kind: "message", repeat: 2 , T: () => ScheduleItem }
        ]);
    }
    create(value?: PartialMessage<ListScheduleItemsResponse>): ListScheduleItemsResponse {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.items = [];
        if (value !== undefined)
            reflectionMergePartial<ListScheduleItemsResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ListScheduleItemsResponse): ListScheduleItemsResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.items.push(ScheduleItem.internalBinaryRead(reader, reader.uint32(), options));
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
    internalBinaryWrite(message: ListScheduleItemsResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        for (let i = 0; i < message.items.length; i++)
            ScheduleItem.internalBinaryWrite(message.items[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const ListScheduleItemsResponse = new ListScheduleItemsResponse$Type();

class CreateScheduleItemRequest$Type extends MessageType<CreateScheduleItemRequest> {
    constructor() {
        super("svyne.event.CreateScheduleItemRequest", [
            { no: 1, name: "events_id", kind: "scalar", T: 9  },
            { no: 2, name: "title", kind: "scalar", T: 9  },
            { no: 3, name: "type_category", kind: "scalar", T: 9  },
            { no: 4, name: "start_time", kind: "scalar", T: 3  },
            { no: 5, name: "end_time", kind: "scalar", T: 3  }
        ]);
    }
    create(value?: PartialMessage<CreateScheduleItemRequest>): CreateScheduleItemRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.eventsId = "";
        message.title = "";
        message.typeCategory = "";
        message.startTime = "0";
        message.endTime = "0";
        if (value !== undefined)
            reflectionMergePartial<CreateScheduleItemRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: CreateScheduleItemRequest): CreateScheduleItemRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.eventsId = reader.string();
                    break;
                case  2:
                    message.title = reader.string();
                    break;
                case  3:
                    message.typeCategory = reader.string();
                    break;
                case  4:
                    message.startTime = reader.int64().toString();
                    break;
                case  5:
                    message.endTime = reader.int64().toString();
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
    internalBinaryWrite(message: CreateScheduleItemRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.eventsId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.eventsId);
        
        if (message.title !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.title);
        
        if (message.typeCategory !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.typeCategory);
        
        if (message.startTime !== "0")
            writer.tag(4, WireType.Varint).int64(message.startTime);
        
        if (message.endTime !== "0")
            writer.tag(5, WireType.Varint).int64(message.endTime);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const CreateScheduleItemRequest = new CreateScheduleItemRequest$Type();

class UpdateScheduleItemRequest$Type extends MessageType<UpdateScheduleItemRequest> {
    constructor() {
        super("svyne.event.UpdateScheduleItemRequest", [
            { no: 1, name: "schedule_items_id", kind: "scalar", T: 9  },
            { no: 2, name: "title", kind: "scalar", T: 9  },
            { no: 3, name: "type_category", kind: "scalar", T: 9  },
            { no: 4, name: "start_time", kind: "scalar", T: 3  },
            { no: 5, name: "end_time", kind: "scalar", T: 3  }
        ]);
    }
    create(value?: PartialMessage<UpdateScheduleItemRequest>): UpdateScheduleItemRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.scheduleItemsId = "";
        message.title = "";
        message.typeCategory = "";
        message.startTime = "0";
        message.endTime = "0";
        if (value !== undefined)
            reflectionMergePartial<UpdateScheduleItemRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: UpdateScheduleItemRequest): UpdateScheduleItemRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.scheduleItemsId = reader.string();
                    break;
                case  2:
                    message.title = reader.string();
                    break;
                case  3:
                    message.typeCategory = reader.string();
                    break;
                case  4:
                    message.startTime = reader.int64().toString();
                    break;
                case  5:
                    message.endTime = reader.int64().toString();
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
    internalBinaryWrite(message: UpdateScheduleItemRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.scheduleItemsId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.scheduleItemsId);
        
        if (message.title !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.title);
        
        if (message.typeCategory !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.typeCategory);
        
        if (message.startTime !== "0")
            writer.tag(4, WireType.Varint).int64(message.startTime);
        
        if (message.endTime !== "0")
            writer.tag(5, WireType.Varint).int64(message.endTime);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const UpdateScheduleItemRequest = new UpdateScheduleItemRequest$Type();

class SetEventFeesIncludedRequest$Type extends MessageType<SetEventFeesIncludedRequest> {
    constructor() {
        super("svyne.event.SetEventFeesIncludedRequest", [
            { no: 1, name: "events_id", kind: "scalar", T: 9  },
            { no: 2, name: "fees_included", kind: "scalar", T: 8  }
        ]);
    }
    create(value?: PartialMessage<SetEventFeesIncludedRequest>): SetEventFeesIncludedRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.eventsId = "";
        message.feesIncluded = false;
        if (value !== undefined)
            reflectionMergePartial<SetEventFeesIncludedRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: SetEventFeesIncludedRequest): SetEventFeesIncludedRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.eventsId = reader.string();
                    break;
                case  2:
                    message.feesIncluded = reader.bool();
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
    internalBinaryWrite(message: SetEventFeesIncludedRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.eventsId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.eventsId);
        
        if (message.feesIncluded !== false)
            writer.tag(2, WireType.Varint).bool(message.feesIncluded);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const SetEventFeesIncludedRequest = new SetEventFeesIncludedRequest$Type();

class SetEventAchRequest$Type extends MessageType<SetEventAchRequest> {
    constructor() {
        super("svyne.event.SetEventAchRequest", [
            { no: 1, name: "events_id", kind: "scalar", T: 9  },
            { no: 2, name: "ach_enabled", kind: "scalar", T: 8  }
        ]);
    }
    create(value?: PartialMessage<SetEventAchRequest>): SetEventAchRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.eventsId = "";
        message.achEnabled = false;
        if (value !== undefined)
            reflectionMergePartial<SetEventAchRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: SetEventAchRequest): SetEventAchRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.eventsId = reader.string();
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
    internalBinaryWrite(message: SetEventAchRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.eventsId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.eventsId);
        
        if (message.achEnabled !== false)
            writer.tag(2, WireType.Varint).bool(message.achEnabled);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const SetEventAchRequest = new SetEventAchRequest$Type();

class Event$Type extends MessageType<Event> {
    constructor() {
        super("svyne.event.Event", [
            { no: 1, name: "events_id", kind: "scalar", T: 9  },
            { no: 2, name: "tenants_id", kind: "scalar", T: 9  },
            { no: 3, name: "title", kind: "scalar", T: 9  },
            { no: 4, name: "slug", kind: "scalar", T: 9  },
            { no: 5, name: "description", kind: "scalar", T: 9  },
            { no: 6, name: "status", kind: "scalar", T: 9  },
            { no: 7, name: "category", kind: "scalar", T: 9  },
            { no: 8, name: "start_date", kind: "scalar", T: 3  },
            { no: 9, name: "end_date", kind: "scalar", T: 3  },
            { no: 10, name: "image_path", kind: "scalar", T: 9  },
            { no: 11, name: "is_featured", kind: "scalar", T: 8  },
            { no: 12, name: "layout_mode", kind: "scalar", T: 9  },
            { no: 13, name: "total_capacity", kind: "scalar", T: 5  },
            { no: 14, name: "venues_id", kind: "scalar", T: 9  },
            { no: 15, name: "performers_json", kind: "scalar", T: 9  },
            { no: 16, name: "sponsors_json", kind: "scalar", T: 9  },
            { no: 17, name: "fees_included", kind: "scalar", T: 8  },
            { no: 18, name: "event_type", kind: "scalar", T: 9  },
            { no: 19, name: "primary_image_id", kind: "scalar", T: 9  },
            { no: 20, name: "extra_info_json", kind: "scalar", T: 9  },
            { no: 21, name: "ach_enabled", kind: "scalar", T: 8  }
        ]);
    }
    create(value?: PartialMessage<Event>): Event {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.eventsId = "";
        message.tenantsId = "";
        message.title = "";
        message.slug = "";
        message.description = "";
        message.status = "";
        message.category = "";
        message.startDate = "0";
        message.endDate = "0";
        message.imagePath = "";
        message.isFeatured = false;
        message.layoutMode = "";
        message.totalCapacity = 0;
        message.venuesId = "";
        message.performersJson = "";
        message.sponsorsJson = "";
        message.feesIncluded = false;
        message.eventType = "";
        message.primaryImageId = "";
        message.extraInfoJson = "";
        message.achEnabled = false;
        if (value !== undefined)
            reflectionMergePartial<Event>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Event): Event {
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
                    message.title = reader.string();
                    break;
                case  4:
                    message.slug = reader.string();
                    break;
                case  5:
                    message.description = reader.string();
                    break;
                case  6:
                    message.status = reader.string();
                    break;
                case  7:
                    message.category = reader.string();
                    break;
                case  8:
                    message.startDate = reader.int64().toString();
                    break;
                case  9:
                    message.endDate = reader.int64().toString();
                    break;
                case  10:
                    message.imagePath = reader.string();
                    break;
                case  11:
                    message.isFeatured = reader.bool();
                    break;
                case  12:
                    message.layoutMode = reader.string();
                    break;
                case  13:
                    message.totalCapacity = reader.int32();
                    break;
                case  14:
                    message.venuesId = reader.string();
                    break;
                case  15:
                    message.performersJson = reader.string();
                    break;
                case  16:
                    message.sponsorsJson = reader.string();
                    break;
                case  17:
                    message.feesIncluded = reader.bool();
                    break;
                case  18:
                    message.eventType = reader.string();
                    break;
                case  19:
                    message.primaryImageId = reader.string();
                    break;
                case  20:
                    message.extraInfoJson = reader.string();
                    break;
                case  21:
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
    internalBinaryWrite(message: Event, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.eventsId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.eventsId);
        
        if (message.tenantsId !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.tenantsId);
        
        if (message.title !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.title);
        
        if (message.slug !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.slug);
        
        if (message.description !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.description);
        
        if (message.status !== "")
            writer.tag(6, WireType.LengthDelimited).string(message.status);
        
        if (message.category !== "")
            writer.tag(7, WireType.LengthDelimited).string(message.category);
        
        if (message.startDate !== "0")
            writer.tag(8, WireType.Varint).int64(message.startDate);
        
        if (message.endDate !== "0")
            writer.tag(9, WireType.Varint).int64(message.endDate);
        
        if (message.imagePath !== "")
            writer.tag(10, WireType.LengthDelimited).string(message.imagePath);
        
        if (message.isFeatured !== false)
            writer.tag(11, WireType.Varint).bool(message.isFeatured);
        
        if (message.layoutMode !== "")
            writer.tag(12, WireType.LengthDelimited).string(message.layoutMode);
        
        if (message.totalCapacity !== 0)
            writer.tag(13, WireType.Varint).int32(message.totalCapacity);
        
        if (message.venuesId !== "")
            writer.tag(14, WireType.LengthDelimited).string(message.venuesId);
        
        if (message.performersJson !== "")
            writer.tag(15, WireType.LengthDelimited).string(message.performersJson);
        
        if (message.sponsorsJson !== "")
            writer.tag(16, WireType.LengthDelimited).string(message.sponsorsJson);
        
        if (message.feesIncluded !== false)
            writer.tag(17, WireType.Varint).bool(message.feesIncluded);
        
        if (message.eventType !== "")
            writer.tag(18, WireType.LengthDelimited).string(message.eventType);
        
        if (message.primaryImageId !== "")
            writer.tag(19, WireType.LengthDelimited).string(message.primaryImageId);
        
        if (message.extraInfoJson !== "")
            writer.tag(20, WireType.LengthDelimited).string(message.extraInfoJson);
        
        if (message.achEnabled !== false)
            writer.tag(21, WireType.Varint).bool(message.achEnabled);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const Event = new Event$Type();

class GetEventBySlugRequest$Type extends MessageType<GetEventBySlugRequest> {
    constructor() {
        super("svyne.event.GetEventBySlugRequest", [
            { no: 1, name: "slug", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<GetEventBySlugRequest>): GetEventBySlugRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.slug = "";
        if (value !== undefined)
            reflectionMergePartial<GetEventBySlugRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: GetEventBySlugRequest): GetEventBySlugRequest {
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
    internalBinaryWrite(message: GetEventBySlugRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.slug !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.slug);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const GetEventBySlugRequest = new GetEventBySlugRequest$Type();

class CreateEventRequest$Type extends MessageType<CreateEventRequest> {
    constructor() {
        super("svyne.event.CreateEventRequest", [
            { no: 1, name: "title", kind: "scalar", T: 9  },
            { no: 2, name: "slug", kind: "scalar", T: 9  },
            { no: 3, name: "description", kind: "scalar", T: 9  },
            { no: 4, name: "status", kind: "scalar", T: 9  },
            { no: 5, name: "category", kind: "scalar", T: 9  },
            { no: 6, name: "start_date", kind: "scalar", T: 3  },
            { no: 7, name: "end_date", kind: "scalar", T: 3  },
            { no: 8, name: "image_path", kind: "scalar", T: 9  },
            { no: 9, name: "is_featured", kind: "scalar", T: 8  },
            { no: 10, name: "layout_mode", kind: "scalar", T: 9  },
            { no: 14, name: "venues_id", kind: "scalar", T: 9  },
            { no: 15, name: "scheduled_publish_at", kind: "scalar", T: 3  },
            { no: 16, name: "event_type", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<CreateEventRequest>): CreateEventRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.title = "";
        message.slug = "";
        message.description = "";
        message.status = "";
        message.category = "";
        message.startDate = "0";
        message.endDate = "0";
        message.imagePath = "";
        message.isFeatured = false;
        message.layoutMode = "";
        message.venuesId = "";
        message.scheduledPublishAt = "0";
        message.eventType = "";
        if (value !== undefined)
            reflectionMergePartial<CreateEventRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: CreateEventRequest): CreateEventRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.title = reader.string();
                    break;
                case  2:
                    message.slug = reader.string();
                    break;
                case  3:
                    message.description = reader.string();
                    break;
                case  4:
                    message.status = reader.string();
                    break;
                case  5:
                    message.category = reader.string();
                    break;
                case  6:
                    message.startDate = reader.int64().toString();
                    break;
                case  7:
                    message.endDate = reader.int64().toString();
                    break;
                case  8:
                    message.imagePath = reader.string();
                    break;
                case  9:
                    message.isFeatured = reader.bool();
                    break;
                case  10:
                    message.layoutMode = reader.string();
                    break;
                case  14:
                    message.venuesId = reader.string();
                    break;
                case  15:
                    message.scheduledPublishAt = reader.int64().toString();
                    break;
                case  16:
                    message.eventType = reader.string();
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
    internalBinaryWrite(message: CreateEventRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.title !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.title);
        
        if (message.slug !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.slug);
        
        if (message.description !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.description);
        
        if (message.status !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.status);
        
        if (message.category !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.category);
        
        if (message.startDate !== "0")
            writer.tag(6, WireType.Varint).int64(message.startDate);
        
        if (message.endDate !== "0")
            writer.tag(7, WireType.Varint).int64(message.endDate);
        
        if (message.imagePath !== "")
            writer.tag(8, WireType.LengthDelimited).string(message.imagePath);
        
        if (message.isFeatured !== false)
            writer.tag(9, WireType.Varint).bool(message.isFeatured);
        
        if (message.layoutMode !== "")
            writer.tag(10, WireType.LengthDelimited).string(message.layoutMode);
        
        if (message.venuesId !== "")
            writer.tag(14, WireType.LengthDelimited).string(message.venuesId);
        
        if (message.scheduledPublishAt !== "0")
            writer.tag(15, WireType.Varint).int64(message.scheduledPublishAt);
        
        if (message.eventType !== "")
            writer.tag(16, WireType.LengthDelimited).string(message.eventType);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const CreateEventRequest = new CreateEventRequest$Type();

class CreateEventResponse$Type extends MessageType<CreateEventResponse> {
    constructor() {
        super("svyne.event.CreateEventResponse", [
            { no: 1, name: "events_id", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<CreateEventResponse>): CreateEventResponse {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.eventsId = "";
        if (value !== undefined)
            reflectionMergePartial<CreateEventResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: CreateEventResponse): CreateEventResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
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
    internalBinaryWrite(message: CreateEventResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.eventsId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.eventsId);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const CreateEventResponse = new CreateEventResponse$Type();

class UpdateEventRequest$Type extends MessageType<UpdateEventRequest> {
    constructor() {
        super("svyne.event.UpdateEventRequest", [
            { no: 1, name: "events_id", kind: "scalar", T: 9  },
            { no: 2, name: "title", kind: "scalar", T: 9  },
            { no: 3, name: "description", kind: "scalar", T: 9  },
            { no: 4, name: "category", kind: "scalar", T: 9  },
            { no: 5, name: "start_date", kind: "scalar", T: 3  },
            { no: 6, name: "end_date", kind: "scalar", T: 3  },
            { no: 7, name: "image_path", kind: "scalar", T: 9  },
            { no: 8, name: "is_featured", kind: "scalar", T: 8  },
            { no: 10, name: "venues_id", kind: "scalar", T: 9  },
            { no: 11, name: "event_type", kind: "scalar", T: 9  },
            { no: 12, name: "extra_info_json", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<UpdateEventRequest>): UpdateEventRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.eventsId = "";
        message.title = "";
        message.description = "";
        message.category = "";
        message.startDate = "0";
        message.endDate = "0";
        message.imagePath = "";
        message.isFeatured = false;
        message.venuesId = "";
        message.eventType = "";
        message.extraInfoJson = "";
        if (value !== undefined)
            reflectionMergePartial<UpdateEventRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: UpdateEventRequest): UpdateEventRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.eventsId = reader.string();
                    break;
                case  2:
                    message.title = reader.string();
                    break;
                case  3:
                    message.description = reader.string();
                    break;
                case  4:
                    message.category = reader.string();
                    break;
                case  5:
                    message.startDate = reader.int64().toString();
                    break;
                case  6:
                    message.endDate = reader.int64().toString();
                    break;
                case  7:
                    message.imagePath = reader.string();
                    break;
                case  8:
                    message.isFeatured = reader.bool();
                    break;
                case  10:
                    message.venuesId = reader.string();
                    break;
                case  11:
                    message.eventType = reader.string();
                    break;
                case  12:
                    message.extraInfoJson = reader.string();
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
    internalBinaryWrite(message: UpdateEventRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.eventsId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.eventsId);
        
        if (message.title !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.title);
        
        if (message.description !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.description);
        
        if (message.category !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.category);
        
        if (message.startDate !== "0")
            writer.tag(5, WireType.Varint).int64(message.startDate);
        
        if (message.endDate !== "0")
            writer.tag(6, WireType.Varint).int64(message.endDate);
        
        if (message.imagePath !== "")
            writer.tag(7, WireType.LengthDelimited).string(message.imagePath);
        
        if (message.isFeatured !== false)
            writer.tag(8, WireType.Varint).bool(message.isFeatured);
        
        if (message.venuesId !== "")
            writer.tag(10, WireType.LengthDelimited).string(message.venuesId);
        
        if (message.eventType !== "")
            writer.tag(11, WireType.LengthDelimited).string(message.eventType);
        
        if (message.extraInfoJson !== "")
            writer.tag(12, WireType.LengthDelimited).string(message.extraInfoJson);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const UpdateEventRequest = new UpdateEventRequest$Type();

class ChangeEventStatusRequest$Type extends MessageType<ChangeEventStatusRequest> {
    constructor() {
        super("svyne.event.ChangeEventStatusRequest", [
            { no: 1, name: "events_id", kind: "scalar", T: 9  },
            { no: 2, name: "status", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<ChangeEventStatusRequest>): ChangeEventStatusRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.eventsId = "";
        message.status = "";
        if (value !== undefined)
            reflectionMergePartial<ChangeEventStatusRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ChangeEventStatusRequest): ChangeEventStatusRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.eventsId = reader.string();
                    break;
                case  2:
                    message.status = reader.string();
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
    internalBinaryWrite(message: ChangeEventStatusRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.eventsId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.eventsId);
        
        if (message.status !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.status);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const ChangeEventStatusRequest = new ChangeEventStatusRequest$Type();

class ListEventsRequest$Type extends MessageType<ListEventsRequest> {
    constructor() {
        super("svyne.event.ListEventsRequest", [
            { no: 1, name: "page", kind: "message", T: () => PageRequest },
            { no: 2, name: "status", kind: "scalar", T: 9  },
            { no: 3, name: "category", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<ListEventsRequest>): ListEventsRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.status = "";
        message.category = "";
        if (value !== undefined)
            reflectionMergePartial<ListEventsRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ListEventsRequest): ListEventsRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.page = PageRequest.internalBinaryRead(reader, reader.uint32(), options, message.page);
                    break;
                case  2:
                    message.status = reader.string();
                    break;
                case  3:
                    message.category = reader.string();
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
    internalBinaryWrite(message: ListEventsRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.page)
            PageRequest.internalBinaryWrite(message.page, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        
        if (message.status !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.status);
        
        if (message.category !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.category);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const ListEventsRequest = new ListEventsRequest$Type();

class SearchEventsRequest$Type extends MessageType<SearchEventsRequest> {
    constructor() {
        super("svyne.event.SearchEventsRequest", [
            { no: 1, name: "query", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<SearchEventsRequest>): SearchEventsRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.query = "";
        if (value !== undefined)
            reflectionMergePartial<SearchEventsRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: SearchEventsRequest): SearchEventsRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.query = reader.string();
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
    internalBinaryWrite(message: SearchEventsRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.query !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.query);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const SearchEventsRequest = new SearchEventsRequest$Type();

class ListEventsResponse$Type extends MessageType<ListEventsResponse> {
    constructor() {
        super("svyne.event.ListEventsResponse", [
            { no: 1, name: "events", kind: "message", repeat: 2 , T: () => Event },
            { no: 2, name: "meta", kind: "message", T: () => PageMeta }
        ]);
    }
    create(value?: PartialMessage<ListEventsResponse>): ListEventsResponse {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.events = [];
        if (value !== undefined)
            reflectionMergePartial<ListEventsResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ListEventsResponse): ListEventsResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.events.push(Event.internalBinaryRead(reader, reader.uint32(), options));
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
    internalBinaryWrite(message: ListEventsResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        for (let i = 0; i < message.events.length; i++)
            Event.internalBinaryWrite(message.events[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        
        if (message.meta)
            PageMeta.internalBinaryWrite(message.meta, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const ListEventsResponse = new ListEventsResponse$Type();

class EventStats$Type extends MessageType<EventStats> {
    constructor() {
        super("svyne.event.EventStats", [
            { no: 1, name: "events_id", kind: "scalar", T: 9  },
            { no: 2, name: "total_bookings", kind: "scalar", T: 5  },
            { no: 3, name: "tickets_sold", kind: "scalar", T: 5  },
            { no: 4, name: "revenue_cents", kind: "scalar", T: 3  },
            { no: 5, name: "checked_in", kind: "scalar", T: 5  }
        ]);
    }
    create(value?: PartialMessage<EventStats>): EventStats {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.eventsId = "";
        message.totalBookings = 0;
        message.ticketsSold = 0;
        message.revenueCents = "0";
        message.checkedIn = 0;
        if (value !== undefined)
            reflectionMergePartial<EventStats>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: EventStats): EventStats {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.eventsId = reader.string();
                    break;
                case  2:
                    message.totalBookings = reader.int32();
                    break;
                case  3:
                    message.ticketsSold = reader.int32();
                    break;
                case  4:
                    message.revenueCents = reader.int64().toString();
                    break;
                case  5:
                    message.checkedIn = reader.int32();
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
    internalBinaryWrite(message: EventStats, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.eventsId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.eventsId);
        
        if (message.totalBookings !== 0)
            writer.tag(2, WireType.Varint).int32(message.totalBookings);
        
        if (message.ticketsSold !== 0)
            writer.tag(3, WireType.Varint).int32(message.ticketsSold);
        
        if (message.revenueCents !== "0")
            writer.tag(4, WireType.Varint).int64(message.revenueCents);
        
        if (message.checkedIn !== 0)
            writer.tag(5, WireType.Varint).int32(message.checkedIn);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const EventStats = new EventStats$Type();

export const EventService = new ServiceType("svyne.event.EventService", [
    { name: "CreateEvent", options: {}, I: CreateEventRequest, O: CreateEventResponse },
    { name: "UpdateEvent", options: {}, I: UpdateEventRequest, O: AckResponse },
    { name: "DeleteEvent", options: {}, I: UuidValue, O: AckResponse },
    { name: "GetEvent", options: {}, I: UuidValue, O: Event },
    { name: "GetEventBySlug", options: {}, I: GetEventBySlugRequest, O: Event },
    { name: "ListEvents", options: {}, I: ListEventsRequest, O: ListEventsResponse },
    { name: "SearchEvents", options: {}, I: SearchEventsRequest, O: ListEventsResponse },
    { name: "ChangeEventStatus", options: {}, I: ChangeEventStatusRequest, O: AckResponse },
    { name: "GetEventStats", options: {}, I: UuidValue, O: EventStats },
    { name: "SetEventFeesIncluded", options: {}, I: SetEventFeesIncludedRequest, O: AckResponse },
    { name: "SetEventAch", options: {}, I: SetEventAchRequest, O: AckResponse },
    { name: "ListScheduleItems", options: {}, I: UuidValue, O: ListScheduleItemsResponse },
    { name: "CreateScheduleItem", options: {}, I: CreateScheduleItemRequest, O: UuidValue },
    { name: "UpdateScheduleItem", options: {}, I: UpdateScheduleItemRequest, O: AckResponse },
    { name: "DeleteScheduleItem", options: {}, I: UuidValue, O: AckResponse },
    { name: "ListEventImages", options: {}, I: ListEventImagesRequest, O: ListEventImagesResponse },
    { name: "AddEventImage", options: {}, I: AddEventImageRequest, O: EventImage },
    { name: "RemoveEventImage", options: {}, I: RemoveEventImageRequest, O: AckResponse },
    { name: "SetPrimaryEventImage", options: {}, I: RemoveEventImageRequest, O: AckResponse },
    { name: "ReorderEventImages", options: {}, I: ReorderEventImagesRequest, O: AckResponse },
    { name: "GetMediaSettings", options: {}, I: Empty, O: MediaSettings }
]);
