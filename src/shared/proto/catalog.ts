



import { PageRequest } from "./common";
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
import { PageMeta } from "./common";

export interface GetBySlugRequest {
    
    slug: string;
}

export interface PublicLinkedEvent {
    
    eventsId: string;
    
    title: string;
    
    slug: string;
    
    startDate: string;
    
    primaryImagePath: string;
    
    category: string;
}

export interface PublicPerformer {
    
    performersId: string;
    
    name: string;
    
    slug: string;
    
    primaryImagePath: string;
    
    metaJson: string;
    
    events: PublicLinkedEvent[];
}

export interface PublicSponsor {
    
    sponsorsId: string;
    
    name: string;
    
    slug: string;
    
    primaryImagePath: string;
    
    metaJson: string;
    
    events: PublicLinkedEvent[];
}

export interface Venue {
    
    venuesId: string;
    
    name: string;
    
    description: string;
    
    imagePath: string;
    
    phone: string;
    
    email: string;
    
    website: string;
    
    isActive: boolean;
    
    state: string;
    
    line1: string;
    
    line2: string;
    
    city: string;
    
    zip: string;
}

export interface CreateVenueRequest {
    
    name: string;
    
    description: string;
    
    imagePath: string;
    
    phone: string;
    
    email: string;
    
    website: string;
    
    line1: string;
    
    line2: string;
    
    city: string;
    
    state: string;
    
    zip: string;
}

export interface UpdateVenueRequest {
    
    venuesId: string;
    
    name: string;
    
    description: string;
    
    phone: string;
    
    email: string;
    
    website: string;
    
    line1: string;
    
    line2: string;
    
    city: string;
    
    state: string;
    
    zip: string;
    
    isActive: boolean;
}

export interface ListVenuesResponse {
    
    venues: Venue[];
    
    meta?: PageMeta;
}

export interface VenueImage {
    
    imagesId: string;
    
    storageKey: string;
    
    isPrimary: boolean;
    
    sortOrder: number;
}

export interface ListVenueImagesResponse {
    
    images: VenueImage[];
}

export interface AddVenueImageRequest {
    
    venuesId: string;
    
    imagesId: string;
}

export interface RemoveVenueImageRequest {
    
    venuesId: string;
    
    imagesId: string;
}

export interface ReorderVenueImagesRequest {
    
    venuesId: string;
    
    imagesId: string[];
}

export interface Performer {
    
    performersId: string;
    
    name: string;
    
    slug: string;
    
    primaryImagePath: string;
    
    metaJson: string;
    
    isActive: boolean;
}

export interface CreatePerformerRequest {
    
    name: string;
    
    slug: string;
    
    imagePath: string;
    
    metaJson: string;
    
    isActive: boolean;
}

export interface UpdatePerformerRequest {
    
    performersId: string;
    
    name: string;
    
    imagePath: string;
    
    metaJson: string;
    
    isActive: boolean;
}

export interface ListPerformersResponse {
    
    performers: Performer[];
    
    meta?: PageMeta;
}

export interface Sponsor {
    
    sponsorsId: string;
    
    name: string;
    
    slug: string;
    
    primaryImagePath: string;
    
    metaJson: string;
    
    isActive: boolean;
}

export interface CreateSponsorRequest {
    
    name: string;
    
    slug: string;
    
    imagePath: string;
    
    metaJson: string;
    
    isActive: boolean;
}

export interface UpdateSponsorRequest {
    
    sponsorsId: string;
    
    name: string;
    
    imagePath: string;
    
    metaJson: string;
    
    isActive: boolean;
}

export interface ListSponsorsResponse {
    
    sponsors: Sponsor[];
    
    meta?: PageMeta;
}

export interface SetEventLinksRequest {
    
    eventsId: string;
    
    linksJson: string;
}

class GetBySlugRequest$Type extends MessageType<GetBySlugRequest> {
    constructor() {
        super("svyne.catalog.GetBySlugRequest", [
            { no: 1, name: "slug", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<GetBySlugRequest>): GetBySlugRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.slug = "";
        if (value !== undefined)
            reflectionMergePartial<GetBySlugRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: GetBySlugRequest): GetBySlugRequest {
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
    internalBinaryWrite(message: GetBySlugRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.slug !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.slug);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const GetBySlugRequest = new GetBySlugRequest$Type();

class PublicLinkedEvent$Type extends MessageType<PublicLinkedEvent> {
    constructor() {
        super("svyne.catalog.PublicLinkedEvent", [
            { no: 1, name: "events_id", kind: "scalar", T: 9  },
            { no: 2, name: "title", kind: "scalar", T: 9  },
            { no: 3, name: "slug", kind: "scalar", T: 9  },
            { no: 4, name: "start_date", kind: "scalar", T: 3  },
            { no: 5, name: "primary_image_path", kind: "scalar", T: 9  },
            { no: 6, name: "category", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<PublicLinkedEvent>): PublicLinkedEvent {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.eventsId = "";
        message.title = "";
        message.slug = "";
        message.startDate = "0";
        message.primaryImagePath = "";
        message.category = "";
        if (value !== undefined)
            reflectionMergePartial<PublicLinkedEvent>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: PublicLinkedEvent): PublicLinkedEvent {
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
                    message.slug = reader.string();
                    break;
                case  4:
                    message.startDate = reader.int64().toString();
                    break;
                case  5:
                    message.primaryImagePath = reader.string();
                    break;
                case  6:
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
    internalBinaryWrite(message: PublicLinkedEvent, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.eventsId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.eventsId);
        
        if (message.title !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.title);
        
        if (message.slug !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.slug);
        
        if (message.startDate !== "0")
            writer.tag(4, WireType.Varint).int64(message.startDate);
        
        if (message.primaryImagePath !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.primaryImagePath);
        
        if (message.category !== "")
            writer.tag(6, WireType.LengthDelimited).string(message.category);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const PublicLinkedEvent = new PublicLinkedEvent$Type();

class PublicPerformer$Type extends MessageType<PublicPerformer> {
    constructor() {
        super("svyne.catalog.PublicPerformer", [
            { no: 1, name: "performers_id", kind: "scalar", T: 9  },
            { no: 2, name: "name", kind: "scalar", T: 9  },
            { no: 3, name: "slug", kind: "scalar", T: 9  },
            { no: 4, name: "primary_image_path", kind: "scalar", T: 9  },
            { no: 5, name: "meta_json", kind: "scalar", T: 9  },
            { no: 6, name: "events", kind: "message", repeat: 2 , T: () => PublicLinkedEvent }
        ]);
    }
    create(value?: PartialMessage<PublicPerformer>): PublicPerformer {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.performersId = "";
        message.name = "";
        message.slug = "";
        message.primaryImagePath = "";
        message.metaJson = "";
        message.events = [];
        if (value !== undefined)
            reflectionMergePartial<PublicPerformer>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: PublicPerformer): PublicPerformer {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.performersId = reader.string();
                    break;
                case  2:
                    message.name = reader.string();
                    break;
                case  3:
                    message.slug = reader.string();
                    break;
                case  4:
                    message.primaryImagePath = reader.string();
                    break;
                case  5:
                    message.metaJson = reader.string();
                    break;
                case  6:
                    message.events.push(PublicLinkedEvent.internalBinaryRead(reader, reader.uint32(), options));
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
    internalBinaryWrite(message: PublicPerformer, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.performersId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.performersId);
        
        if (message.name !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.name);
        
        if (message.slug !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.slug);
        
        if (message.primaryImagePath !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.primaryImagePath);
        
        if (message.metaJson !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.metaJson);
        
        for (let i = 0; i < message.events.length; i++)
            PublicLinkedEvent.internalBinaryWrite(message.events[i], writer.tag(6, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const PublicPerformer = new PublicPerformer$Type();

class PublicSponsor$Type extends MessageType<PublicSponsor> {
    constructor() {
        super("svyne.catalog.PublicSponsor", [
            { no: 1, name: "sponsors_id", kind: "scalar", T: 9  },
            { no: 2, name: "name", kind: "scalar", T: 9  },
            { no: 3, name: "slug", kind: "scalar", T: 9  },
            { no: 4, name: "primary_image_path", kind: "scalar", T: 9  },
            { no: 5, name: "meta_json", kind: "scalar", T: 9  },
            { no: 6, name: "events", kind: "message", repeat: 2 , T: () => PublicLinkedEvent }
        ]);
    }
    create(value?: PartialMessage<PublicSponsor>): PublicSponsor {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.sponsorsId = "";
        message.name = "";
        message.slug = "";
        message.primaryImagePath = "";
        message.metaJson = "";
        message.events = [];
        if (value !== undefined)
            reflectionMergePartial<PublicSponsor>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: PublicSponsor): PublicSponsor {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.sponsorsId = reader.string();
                    break;
                case  2:
                    message.name = reader.string();
                    break;
                case  3:
                    message.slug = reader.string();
                    break;
                case  4:
                    message.primaryImagePath = reader.string();
                    break;
                case  5:
                    message.metaJson = reader.string();
                    break;
                case  6:
                    message.events.push(PublicLinkedEvent.internalBinaryRead(reader, reader.uint32(), options));
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
    internalBinaryWrite(message: PublicSponsor, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.sponsorsId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.sponsorsId);
        
        if (message.name !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.name);
        
        if (message.slug !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.slug);
        
        if (message.primaryImagePath !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.primaryImagePath);
        
        if (message.metaJson !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.metaJson);
        
        for (let i = 0; i < message.events.length; i++)
            PublicLinkedEvent.internalBinaryWrite(message.events[i], writer.tag(6, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const PublicSponsor = new PublicSponsor$Type();

class Venue$Type extends MessageType<Venue> {
    constructor() {
        super("svyne.catalog.Venue", [
            { no: 1, name: "venues_id", kind: "scalar", T: 9  },
            { no: 2, name: "name", kind: "scalar", T: 9  },
            { no: 3, name: "description", kind: "scalar", T: 9  },
            { no: 4, name: "image_path", kind: "scalar", T: 9  },
            { no: 5, name: "phone", kind: "scalar", T: 9  },
            { no: 6, name: "email", kind: "scalar", T: 9  },
            { no: 7, name: "website", kind: "scalar", T: 9  },
            { no: 8, name: "is_active", kind: "scalar", T: 8  },
            { no: 9, name: "state", kind: "scalar", T: 9  },
            { no: 10, name: "line1", kind: "scalar", T: 9  },
            { no: 11, name: "line2", kind: "scalar", T: 9  },
            { no: 12, name: "city", kind: "scalar", T: 9  },
            { no: 13, name: "zip", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<Venue>): Venue {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.venuesId = "";
        message.name = "";
        message.description = "";
        message.imagePath = "";
        message.phone = "";
        message.email = "";
        message.website = "";
        message.isActive = false;
        message.state = "";
        message.line1 = "";
        message.line2 = "";
        message.city = "";
        message.zip = "";
        if (value !== undefined)
            reflectionMergePartial<Venue>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Venue): Venue {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.venuesId = reader.string();
                    break;
                case  2:
                    message.name = reader.string();
                    break;
                case  3:
                    message.description = reader.string();
                    break;
                case  4:
                    message.imagePath = reader.string();
                    break;
                case  5:
                    message.phone = reader.string();
                    break;
                case  6:
                    message.email = reader.string();
                    break;
                case  7:
                    message.website = reader.string();
                    break;
                case  8:
                    message.isActive = reader.bool();
                    break;
                case  9:
                    message.state = reader.string();
                    break;
                case  10:
                    message.line1 = reader.string();
                    break;
                case  11:
                    message.line2 = reader.string();
                    break;
                case  12:
                    message.city = reader.string();
                    break;
                case  13:
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
    internalBinaryWrite(message: Venue, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.venuesId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.venuesId);
        
        if (message.name !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.name);
        
        if (message.description !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.description);
        
        if (message.imagePath !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.imagePath);
        
        if (message.phone !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.phone);
        
        if (message.email !== "")
            writer.tag(6, WireType.LengthDelimited).string(message.email);
        
        if (message.website !== "")
            writer.tag(7, WireType.LengthDelimited).string(message.website);
        
        if (message.isActive !== false)
            writer.tag(8, WireType.Varint).bool(message.isActive);
        
        if (message.state !== "")
            writer.tag(9, WireType.LengthDelimited).string(message.state);
        
        if (message.line1 !== "")
            writer.tag(10, WireType.LengthDelimited).string(message.line1);
        
        if (message.line2 !== "")
            writer.tag(11, WireType.LengthDelimited).string(message.line2);
        
        if (message.city !== "")
            writer.tag(12, WireType.LengthDelimited).string(message.city);
        
        if (message.zip !== "")
            writer.tag(13, WireType.LengthDelimited).string(message.zip);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const Venue = new Venue$Type();

class CreateVenueRequest$Type extends MessageType<CreateVenueRequest> {
    constructor() {
        super("svyne.catalog.CreateVenueRequest", [
            { no: 1, name: "name", kind: "scalar", T: 9  },
            { no: 2, name: "description", kind: "scalar", T: 9  },
            { no: 3, name: "image_path", kind: "scalar", T: 9  },
            { no: 4, name: "phone", kind: "scalar", T: 9  },
            { no: 5, name: "email", kind: "scalar", T: 9  },
            { no: 6, name: "website", kind: "scalar", T: 9  },
            { no: 7, name: "line1", kind: "scalar", T: 9  },
            { no: 8, name: "line2", kind: "scalar", T: 9  },
            { no: 9, name: "city", kind: "scalar", T: 9  },
            { no: 10, name: "state", kind: "scalar", T: 9  },
            { no: 11, name: "zip", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<CreateVenueRequest>): CreateVenueRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.name = "";
        message.description = "";
        message.imagePath = "";
        message.phone = "";
        message.email = "";
        message.website = "";
        message.line1 = "";
        message.line2 = "";
        message.city = "";
        message.state = "";
        message.zip = "";
        if (value !== undefined)
            reflectionMergePartial<CreateVenueRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: CreateVenueRequest): CreateVenueRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.name = reader.string();
                    break;
                case  2:
                    message.description = reader.string();
                    break;
                case  3:
                    message.imagePath = reader.string();
                    break;
                case  4:
                    message.phone = reader.string();
                    break;
                case  5:
                    message.email = reader.string();
                    break;
                case  6:
                    message.website = reader.string();
                    break;
                case  7:
                    message.line1 = reader.string();
                    break;
                case  8:
                    message.line2 = reader.string();
                    break;
                case  9:
                    message.city = reader.string();
                    break;
                case  10:
                    message.state = reader.string();
                    break;
                case  11:
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
    internalBinaryWrite(message: CreateVenueRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.name !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.name);
        
        if (message.description !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.description);
        
        if (message.imagePath !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.imagePath);
        
        if (message.phone !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.phone);
        
        if (message.email !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.email);
        
        if (message.website !== "")
            writer.tag(6, WireType.LengthDelimited).string(message.website);
        
        if (message.line1 !== "")
            writer.tag(7, WireType.LengthDelimited).string(message.line1);
        
        if (message.line2 !== "")
            writer.tag(8, WireType.LengthDelimited).string(message.line2);
        
        if (message.city !== "")
            writer.tag(9, WireType.LengthDelimited).string(message.city);
        
        if (message.state !== "")
            writer.tag(10, WireType.LengthDelimited).string(message.state);
        
        if (message.zip !== "")
            writer.tag(11, WireType.LengthDelimited).string(message.zip);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const CreateVenueRequest = new CreateVenueRequest$Type();

class UpdateVenueRequest$Type extends MessageType<UpdateVenueRequest> {
    constructor() {
        super("svyne.catalog.UpdateVenueRequest", [
            { no: 1, name: "venues_id", kind: "scalar", T: 9  },
            { no: 2, name: "name", kind: "scalar", T: 9  },
            { no: 3, name: "description", kind: "scalar", T: 9  },
            { no: 4, name: "phone", kind: "scalar", T: 9  },
            { no: 5, name: "email", kind: "scalar", T: 9  },
            { no: 6, name: "website", kind: "scalar", T: 9  },
            { no: 7, name: "line1", kind: "scalar", T: 9  },
            { no: 8, name: "line2", kind: "scalar", T: 9  },
            { no: 9, name: "city", kind: "scalar", T: 9  },
            { no: 10, name: "state", kind: "scalar", T: 9  },
            { no: 11, name: "zip", kind: "scalar", T: 9  },
            { no: 14, name: "is_active", kind: "scalar", T: 8  }
        ]);
    }
    create(value?: PartialMessage<UpdateVenueRequest>): UpdateVenueRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.venuesId = "";
        message.name = "";
        message.description = "";
        message.phone = "";
        message.email = "";
        message.website = "";
        message.line1 = "";
        message.line2 = "";
        message.city = "";
        message.state = "";
        message.zip = "";
        message.isActive = false;
        if (value !== undefined)
            reflectionMergePartial<UpdateVenueRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: UpdateVenueRequest): UpdateVenueRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.venuesId = reader.string();
                    break;
                case  2:
                    message.name = reader.string();
                    break;
                case  3:
                    message.description = reader.string();
                    break;
                case  4:
                    message.phone = reader.string();
                    break;
                case  5:
                    message.email = reader.string();
                    break;
                case  6:
                    message.website = reader.string();
                    break;
                case  7:
                    message.line1 = reader.string();
                    break;
                case  8:
                    message.line2 = reader.string();
                    break;
                case  9:
                    message.city = reader.string();
                    break;
                case  10:
                    message.state = reader.string();
                    break;
                case  11:
                    message.zip = reader.string();
                    break;
                case  14:
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
    internalBinaryWrite(message: UpdateVenueRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.venuesId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.venuesId);
        
        if (message.name !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.name);
        
        if (message.description !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.description);
        
        if (message.phone !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.phone);
        
        if (message.email !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.email);
        
        if (message.website !== "")
            writer.tag(6, WireType.LengthDelimited).string(message.website);
        
        if (message.line1 !== "")
            writer.tag(7, WireType.LengthDelimited).string(message.line1);
        
        if (message.line2 !== "")
            writer.tag(8, WireType.LengthDelimited).string(message.line2);
        
        if (message.city !== "")
            writer.tag(9, WireType.LengthDelimited).string(message.city);
        
        if (message.state !== "")
            writer.tag(10, WireType.LengthDelimited).string(message.state);
        
        if (message.zip !== "")
            writer.tag(11, WireType.LengthDelimited).string(message.zip);
        
        if (message.isActive !== false)
            writer.tag(14, WireType.Varint).bool(message.isActive);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const UpdateVenueRequest = new UpdateVenueRequest$Type();

class ListVenuesResponse$Type extends MessageType<ListVenuesResponse> {
    constructor() {
        super("svyne.catalog.ListVenuesResponse", [
            { no: 1, name: "venues", kind: "message", repeat: 2 , T: () => Venue },
            { no: 2, name: "meta", kind: "message", T: () => PageMeta }
        ]);
    }
    create(value?: PartialMessage<ListVenuesResponse>): ListVenuesResponse {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.venues = [];
        if (value !== undefined)
            reflectionMergePartial<ListVenuesResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ListVenuesResponse): ListVenuesResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.venues.push(Venue.internalBinaryRead(reader, reader.uint32(), options));
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
    internalBinaryWrite(message: ListVenuesResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        for (let i = 0; i < message.venues.length; i++)
            Venue.internalBinaryWrite(message.venues[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        
        if (message.meta)
            PageMeta.internalBinaryWrite(message.meta, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const ListVenuesResponse = new ListVenuesResponse$Type();

class VenueImage$Type extends MessageType<VenueImage> {
    constructor() {
        super("svyne.catalog.VenueImage", [
            { no: 1, name: "images_id", kind: "scalar", T: 9  },
            { no: 2, name: "storage_key", kind: "scalar", T: 9  },
            { no: 3, name: "is_primary", kind: "scalar", T: 8  },
            { no: 4, name: "sort_order", kind: "scalar", T: 5  }
        ]);
    }
    create(value?: PartialMessage<VenueImage>): VenueImage {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.imagesId = "";
        message.storageKey = "";
        message.isPrimary = false;
        message.sortOrder = 0;
        if (value !== undefined)
            reflectionMergePartial<VenueImage>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: VenueImage): VenueImage {
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
                    message.isPrimary = reader.bool();
                    break;
                case  4:
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
    internalBinaryWrite(message: VenueImage, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.imagesId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.imagesId);
        
        if (message.storageKey !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.storageKey);
        
        if (message.isPrimary !== false)
            writer.tag(3, WireType.Varint).bool(message.isPrimary);
        
        if (message.sortOrder !== 0)
            writer.tag(4, WireType.Varint).int32(message.sortOrder);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const VenueImage = new VenueImage$Type();

class ListVenueImagesResponse$Type extends MessageType<ListVenueImagesResponse> {
    constructor() {
        super("svyne.catalog.ListVenueImagesResponse", [
            { no: 1, name: "images", kind: "message", repeat: 2 , T: () => VenueImage }
        ]);
    }
    create(value?: PartialMessage<ListVenueImagesResponse>): ListVenueImagesResponse {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.images = [];
        if (value !== undefined)
            reflectionMergePartial<ListVenueImagesResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ListVenueImagesResponse): ListVenueImagesResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.images.push(VenueImage.internalBinaryRead(reader, reader.uint32(), options));
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
    internalBinaryWrite(message: ListVenueImagesResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        for (let i = 0; i < message.images.length; i++)
            VenueImage.internalBinaryWrite(message.images[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const ListVenueImagesResponse = new ListVenueImagesResponse$Type();

class AddVenueImageRequest$Type extends MessageType<AddVenueImageRequest> {
    constructor() {
        super("svyne.catalog.AddVenueImageRequest", [
            { no: 1, name: "venues_id", kind: "scalar", T: 9  },
            { no: 2, name: "images_id", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<AddVenueImageRequest>): AddVenueImageRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.venuesId = "";
        message.imagesId = "";
        if (value !== undefined)
            reflectionMergePartial<AddVenueImageRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: AddVenueImageRequest): AddVenueImageRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.venuesId = reader.string();
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
    internalBinaryWrite(message: AddVenueImageRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.venuesId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.venuesId);
        
        if (message.imagesId !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.imagesId);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const AddVenueImageRequest = new AddVenueImageRequest$Type();

class RemoveVenueImageRequest$Type extends MessageType<RemoveVenueImageRequest> {
    constructor() {
        super("svyne.catalog.RemoveVenueImageRequest", [
            { no: 1, name: "venues_id", kind: "scalar", T: 9  },
            { no: 2, name: "images_id", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<RemoveVenueImageRequest>): RemoveVenueImageRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.venuesId = "";
        message.imagesId = "";
        if (value !== undefined)
            reflectionMergePartial<RemoveVenueImageRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: RemoveVenueImageRequest): RemoveVenueImageRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.venuesId = reader.string();
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
    internalBinaryWrite(message: RemoveVenueImageRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.venuesId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.venuesId);
        
        if (message.imagesId !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.imagesId);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const RemoveVenueImageRequest = new RemoveVenueImageRequest$Type();

class ReorderVenueImagesRequest$Type extends MessageType<ReorderVenueImagesRequest> {
    constructor() {
        super("svyne.catalog.ReorderVenueImagesRequest", [
            { no: 1, name: "venues_id", kind: "scalar", T: 9  },
            { no: 2, name: "images_id", kind: "scalar", repeat: 2 , T: 9  }
        ]);
    }
    create(value?: PartialMessage<ReorderVenueImagesRequest>): ReorderVenueImagesRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.venuesId = "";
        message.imagesId = [];
        if (value !== undefined)
            reflectionMergePartial<ReorderVenueImagesRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ReorderVenueImagesRequest): ReorderVenueImagesRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.venuesId = reader.string();
                    break;
                case  2:
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
    internalBinaryWrite(message: ReorderVenueImagesRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.venuesId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.venuesId);
        
        for (let i = 0; i < message.imagesId.length; i++)
            writer.tag(2, WireType.LengthDelimited).string(message.imagesId[i]);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const ReorderVenueImagesRequest = new ReorderVenueImagesRequest$Type();

class Performer$Type extends MessageType<Performer> {
    constructor() {
        super("svyne.catalog.Performer", [
            { no: 1, name: "performers_id", kind: "scalar", T: 9  },
            { no: 2, name: "name", kind: "scalar", T: 9  },
            { no: 3, name: "slug", kind: "scalar", T: 9  },
            { no: 4, name: "primary_image_path", kind: "scalar", T: 9  },
            { no: 5, name: "meta_json", kind: "scalar", T: 9  },
            { no: 6, name: "is_active", kind: "scalar", T: 8  }
        ]);
    }
    create(value?: PartialMessage<Performer>): Performer {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.performersId = "";
        message.name = "";
        message.slug = "";
        message.primaryImagePath = "";
        message.metaJson = "";
        message.isActive = false;
        if (value !== undefined)
            reflectionMergePartial<Performer>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Performer): Performer {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.performersId = reader.string();
                    break;
                case  2:
                    message.name = reader.string();
                    break;
                case  3:
                    message.slug = reader.string();
                    break;
                case  4:
                    message.primaryImagePath = reader.string();
                    break;
                case  5:
                    message.metaJson = reader.string();
                    break;
                case  6:
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
    internalBinaryWrite(message: Performer, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.performersId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.performersId);
        
        if (message.name !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.name);
        
        if (message.slug !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.slug);
        
        if (message.primaryImagePath !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.primaryImagePath);
        
        if (message.metaJson !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.metaJson);
        
        if (message.isActive !== false)
            writer.tag(6, WireType.Varint).bool(message.isActive);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const Performer = new Performer$Type();

class CreatePerformerRequest$Type extends MessageType<CreatePerformerRequest> {
    constructor() {
        super("svyne.catalog.CreatePerformerRequest", [
            { no: 1, name: "name", kind: "scalar", T: 9  },
            { no: 2, name: "slug", kind: "scalar", T: 9  },
            { no: 3, name: "image_path", kind: "scalar", T: 9  },
            { no: 4, name: "meta_json", kind: "scalar", T: 9  },
            { no: 5, name: "is_active", kind: "scalar", T: 8  }
        ]);
    }
    create(value?: PartialMessage<CreatePerformerRequest>): CreatePerformerRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.name = "";
        message.slug = "";
        message.imagePath = "";
        message.metaJson = "";
        message.isActive = false;
        if (value !== undefined)
            reflectionMergePartial<CreatePerformerRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: CreatePerformerRequest): CreatePerformerRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.name = reader.string();
                    break;
                case  2:
                    message.slug = reader.string();
                    break;
                case  3:
                    message.imagePath = reader.string();
                    break;
                case  4:
                    message.metaJson = reader.string();
                    break;
                case  5:
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
    internalBinaryWrite(message: CreatePerformerRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.name !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.name);
        
        if (message.slug !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.slug);
        
        if (message.imagePath !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.imagePath);
        
        if (message.metaJson !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.metaJson);
        
        if (message.isActive !== false)
            writer.tag(5, WireType.Varint).bool(message.isActive);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const CreatePerformerRequest = new CreatePerformerRequest$Type();

class UpdatePerformerRequest$Type extends MessageType<UpdatePerformerRequest> {
    constructor() {
        super("svyne.catalog.UpdatePerformerRequest", [
            { no: 1, name: "performers_id", kind: "scalar", T: 9  },
            { no: 2, name: "name", kind: "scalar", T: 9  },
            { no: 3, name: "image_path", kind: "scalar", T: 9  },
            { no: 4, name: "meta_json", kind: "scalar", T: 9  },
            { no: 5, name: "is_active", kind: "scalar", T: 8  }
        ]);
    }
    create(value?: PartialMessage<UpdatePerformerRequest>): UpdatePerformerRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.performersId = "";
        message.name = "";
        message.imagePath = "";
        message.metaJson = "";
        message.isActive = false;
        if (value !== undefined)
            reflectionMergePartial<UpdatePerformerRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: UpdatePerformerRequest): UpdatePerformerRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.performersId = reader.string();
                    break;
                case  2:
                    message.name = reader.string();
                    break;
                case  3:
                    message.imagePath = reader.string();
                    break;
                case  4:
                    message.metaJson = reader.string();
                    break;
                case  5:
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
    internalBinaryWrite(message: UpdatePerformerRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.performersId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.performersId);
        
        if (message.name !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.name);
        
        if (message.imagePath !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.imagePath);
        
        if (message.metaJson !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.metaJson);
        
        if (message.isActive !== false)
            writer.tag(5, WireType.Varint).bool(message.isActive);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const UpdatePerformerRequest = new UpdatePerformerRequest$Type();

class ListPerformersResponse$Type extends MessageType<ListPerformersResponse> {
    constructor() {
        super("svyne.catalog.ListPerformersResponse", [
            { no: 1, name: "performers", kind: "message", repeat: 2 , T: () => Performer },
            { no: 2, name: "meta", kind: "message", T: () => PageMeta }
        ]);
    }
    create(value?: PartialMessage<ListPerformersResponse>): ListPerformersResponse {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.performers = [];
        if (value !== undefined)
            reflectionMergePartial<ListPerformersResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ListPerformersResponse): ListPerformersResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.performers.push(Performer.internalBinaryRead(reader, reader.uint32(), options));
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
    internalBinaryWrite(message: ListPerformersResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        for (let i = 0; i < message.performers.length; i++)
            Performer.internalBinaryWrite(message.performers[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        
        if (message.meta)
            PageMeta.internalBinaryWrite(message.meta, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const ListPerformersResponse = new ListPerformersResponse$Type();

class Sponsor$Type extends MessageType<Sponsor> {
    constructor() {
        super("svyne.catalog.Sponsor", [
            { no: 1, name: "sponsors_id", kind: "scalar", T: 9  },
            { no: 2, name: "name", kind: "scalar", T: 9  },
            { no: 3, name: "slug", kind: "scalar", T: 9  },
            { no: 4, name: "primary_image_path", kind: "scalar", T: 9  },
            { no: 5, name: "meta_json", kind: "scalar", T: 9  },
            { no: 6, name: "is_active", kind: "scalar", T: 8  }
        ]);
    }
    create(value?: PartialMessage<Sponsor>): Sponsor {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.sponsorsId = "";
        message.name = "";
        message.slug = "";
        message.primaryImagePath = "";
        message.metaJson = "";
        message.isActive = false;
        if (value !== undefined)
            reflectionMergePartial<Sponsor>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Sponsor): Sponsor {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.sponsorsId = reader.string();
                    break;
                case  2:
                    message.name = reader.string();
                    break;
                case  3:
                    message.slug = reader.string();
                    break;
                case  4:
                    message.primaryImagePath = reader.string();
                    break;
                case  5:
                    message.metaJson = reader.string();
                    break;
                case  6:
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
    internalBinaryWrite(message: Sponsor, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.sponsorsId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.sponsorsId);
        
        if (message.name !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.name);
        
        if (message.slug !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.slug);
        
        if (message.primaryImagePath !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.primaryImagePath);
        
        if (message.metaJson !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.metaJson);
        
        if (message.isActive !== false)
            writer.tag(6, WireType.Varint).bool(message.isActive);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const Sponsor = new Sponsor$Type();

class CreateSponsorRequest$Type extends MessageType<CreateSponsorRequest> {
    constructor() {
        super("svyne.catalog.CreateSponsorRequest", [
            { no: 1, name: "name", kind: "scalar", T: 9  },
            { no: 2, name: "slug", kind: "scalar", T: 9  },
            { no: 3, name: "image_path", kind: "scalar", T: 9  },
            { no: 4, name: "meta_json", kind: "scalar", T: 9  },
            { no: 5, name: "is_active", kind: "scalar", T: 8  }
        ]);
    }
    create(value?: PartialMessage<CreateSponsorRequest>): CreateSponsorRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.name = "";
        message.slug = "";
        message.imagePath = "";
        message.metaJson = "";
        message.isActive = false;
        if (value !== undefined)
            reflectionMergePartial<CreateSponsorRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: CreateSponsorRequest): CreateSponsorRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.name = reader.string();
                    break;
                case  2:
                    message.slug = reader.string();
                    break;
                case  3:
                    message.imagePath = reader.string();
                    break;
                case  4:
                    message.metaJson = reader.string();
                    break;
                case  5:
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
    internalBinaryWrite(message: CreateSponsorRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.name !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.name);
        
        if (message.slug !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.slug);
        
        if (message.imagePath !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.imagePath);
        
        if (message.metaJson !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.metaJson);
        
        if (message.isActive !== false)
            writer.tag(5, WireType.Varint).bool(message.isActive);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const CreateSponsorRequest = new CreateSponsorRequest$Type();

class UpdateSponsorRequest$Type extends MessageType<UpdateSponsorRequest> {
    constructor() {
        super("svyne.catalog.UpdateSponsorRequest", [
            { no: 1, name: "sponsors_id", kind: "scalar", T: 9  },
            { no: 2, name: "name", kind: "scalar", T: 9  },
            { no: 3, name: "image_path", kind: "scalar", T: 9  },
            { no: 4, name: "meta_json", kind: "scalar", T: 9  },
            { no: 5, name: "is_active", kind: "scalar", T: 8  }
        ]);
    }
    create(value?: PartialMessage<UpdateSponsorRequest>): UpdateSponsorRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.sponsorsId = "";
        message.name = "";
        message.imagePath = "";
        message.metaJson = "";
        message.isActive = false;
        if (value !== undefined)
            reflectionMergePartial<UpdateSponsorRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: UpdateSponsorRequest): UpdateSponsorRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.sponsorsId = reader.string();
                    break;
                case  2:
                    message.name = reader.string();
                    break;
                case  3:
                    message.imagePath = reader.string();
                    break;
                case  4:
                    message.metaJson = reader.string();
                    break;
                case  5:
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
    internalBinaryWrite(message: UpdateSponsorRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.sponsorsId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.sponsorsId);
        
        if (message.name !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.name);
        
        if (message.imagePath !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.imagePath);
        
        if (message.metaJson !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.metaJson);
        
        if (message.isActive !== false)
            writer.tag(5, WireType.Varint).bool(message.isActive);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const UpdateSponsorRequest = new UpdateSponsorRequest$Type();

class ListSponsorsResponse$Type extends MessageType<ListSponsorsResponse> {
    constructor() {
        super("svyne.catalog.ListSponsorsResponse", [
            { no: 1, name: "sponsors", kind: "message", repeat: 2 , T: () => Sponsor },
            { no: 2, name: "meta", kind: "message", T: () => PageMeta }
        ]);
    }
    create(value?: PartialMessage<ListSponsorsResponse>): ListSponsorsResponse {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.sponsors = [];
        if (value !== undefined)
            reflectionMergePartial<ListSponsorsResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ListSponsorsResponse): ListSponsorsResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.sponsors.push(Sponsor.internalBinaryRead(reader, reader.uint32(), options));
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
    internalBinaryWrite(message: ListSponsorsResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        for (let i = 0; i < message.sponsors.length; i++)
            Sponsor.internalBinaryWrite(message.sponsors[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        
        if (message.meta)
            PageMeta.internalBinaryWrite(message.meta, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const ListSponsorsResponse = new ListSponsorsResponse$Type();

class SetEventLinksRequest$Type extends MessageType<SetEventLinksRequest> {
    constructor() {
        super("svyne.catalog.SetEventLinksRequest", [
            { no: 1, name: "events_id", kind: "scalar", T: 9  },
            { no: 2, name: "links_json", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<SetEventLinksRequest>): SetEventLinksRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.eventsId = "";
        message.linksJson = "";
        if (value !== undefined)
            reflectionMergePartial<SetEventLinksRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: SetEventLinksRequest): SetEventLinksRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.eventsId = reader.string();
                    break;
                case  2:
                    message.linksJson = reader.string();
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
    internalBinaryWrite(message: SetEventLinksRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.eventsId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.eventsId);
        
        if (message.linksJson !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.linksJson);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const SetEventLinksRequest = new SetEventLinksRequest$Type();

export const VenueService = new ServiceType("svyne.catalog.VenueService", [
    { name: "CreateVenue", options: {}, I: CreateVenueRequest, O: UuidValue },
    { name: "UpdateVenue", options: {}, I: UpdateVenueRequest, O: AckResponse },
    { name: "GetVenue", options: {}, I: UuidValue, O: Venue },
    { name: "ListVenues", options: {}, I: PageRequest, O: ListVenuesResponse },
    { name: "ListVenueImages", options: {}, I: UuidValue, O: ListVenueImagesResponse },
    { name: "AddVenueImage", options: {}, I: AddVenueImageRequest, O: VenueImage },
    { name: "RemoveVenueImage", options: {}, I: RemoveVenueImageRequest, O: AckResponse },
    { name: "SetPrimaryVenueImage", options: {}, I: RemoveVenueImageRequest, O: AckResponse },
    { name: "ReorderVenueImages", options: {}, I: ReorderVenueImagesRequest, O: AckResponse }
]);

export const PerformerService = new ServiceType("svyne.catalog.PerformerService", [
    { name: "CreatePerformer", options: {}, I: CreatePerformerRequest, O: UuidValue },
    { name: "UpdatePerformer", options: {}, I: UpdatePerformerRequest, O: AckResponse },
    { name: "DeletePerformer", options: {}, I: UuidValue, O: AckResponse },
    { name: "ListPerformers", options: {}, I: PageRequest, O: ListPerformersResponse },
    { name: "SetEventPerformers", options: {}, I: SetEventLinksRequest, O: AckResponse },
    { name: "GetPerformerBySlug", options: {}, I: GetBySlugRequest, O: PublicPerformer }
]);

export const SponsorService = new ServiceType("svyne.catalog.SponsorService", [
    { name: "CreateSponsor", options: {}, I: CreateSponsorRequest, O: UuidValue },
    { name: "UpdateSponsor", options: {}, I: UpdateSponsorRequest, O: AckResponse },
    { name: "DeleteSponsor", options: {}, I: UuidValue, O: AckResponse },
    { name: "ListSponsors", options: {}, I: PageRequest, O: ListSponsorsResponse },
    { name: "SetEventSponsors", options: {}, I: SetEventLinksRequest, O: AckResponse },
    { name: "GetSponsorBySlug", options: {}, I: GetBySlugRequest, O: PublicSponsor }
]);
