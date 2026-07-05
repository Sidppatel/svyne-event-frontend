



import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { EventService } from "./event";
import type { MediaSettings } from "./event";
import type { Empty } from "./common";
import type { ReorderEventImagesRequest } from "./event";
import type { RemoveEventImageRequest } from "./event";
import type { EventImage } from "./event";
import type { AddEventImageRequest } from "./event";
import type { ListEventImagesResponse } from "./event";
import type { ListEventImagesRequest } from "./event";
import type { UpdateScheduleItemRequest } from "./event";
import type { CreateScheduleItemRequest } from "./event";
import type { ListScheduleItemsResponse } from "./event";
import type { SetEventAchRequest } from "./event";
import type { SetEventFeesIncludedRequest } from "./event";
import type { EventStats } from "./event";
import type { ChangeEventStatusRequest } from "./event";
import type { SearchEventsRequest } from "./event";
import type { ListEventsResponse } from "./event";
import type { ListEventsRequest } from "./event";
import type { GetEventBySlugRequest } from "./event";
import type { Event } from "./event";
import type { UuidValue } from "./common";
import type { AckResponse } from "./common";
import type { UpdateEventRequest } from "./event";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { CreateEventResponse } from "./event";
import type { CreateEventRequest } from "./event";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";

export interface IEventServiceClient {
    
    createEvent(input: CreateEventRequest, options?: RpcOptions): UnaryCall<CreateEventRequest, CreateEventResponse>;
    
    updateEvent(input: UpdateEventRequest, options?: RpcOptions): UnaryCall<UpdateEventRequest, AckResponse>;
    
    deleteEvent(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, AckResponse>;
    
    getEvent(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, Event>;
    
    getEventBySlug(input: GetEventBySlugRequest, options?: RpcOptions): UnaryCall<GetEventBySlugRequest, Event>;
    
    listEvents(input: ListEventsRequest, options?: RpcOptions): UnaryCall<ListEventsRequest, ListEventsResponse>;
    
    searchEvents(input: SearchEventsRequest, options?: RpcOptions): UnaryCall<SearchEventsRequest, ListEventsResponse>;
    
    changeEventStatus(input: ChangeEventStatusRequest, options?: RpcOptions): UnaryCall<ChangeEventStatusRequest, AckResponse>;
    
    getEventStats(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, EventStats>;
    
    setEventFeesIncluded(input: SetEventFeesIncludedRequest, options?: RpcOptions): UnaryCall<SetEventFeesIncludedRequest, AckResponse>;
    
    setEventAch(input: SetEventAchRequest, options?: RpcOptions): UnaryCall<SetEventAchRequest, AckResponse>;
    
    listScheduleItems(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, ListScheduleItemsResponse>;
    
    createScheduleItem(input: CreateScheduleItemRequest, options?: RpcOptions): UnaryCall<CreateScheduleItemRequest, UuidValue>;
    
    updateScheduleItem(input: UpdateScheduleItemRequest, options?: RpcOptions): UnaryCall<UpdateScheduleItemRequest, AckResponse>;
    
    deleteScheduleItem(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, AckResponse>;
    
    listEventImages(input: ListEventImagesRequest, options?: RpcOptions): UnaryCall<ListEventImagesRequest, ListEventImagesResponse>;
    
    addEventImage(input: AddEventImageRequest, options?: RpcOptions): UnaryCall<AddEventImageRequest, EventImage>;
    
    removeEventImage(input: RemoveEventImageRequest, options?: RpcOptions): UnaryCall<RemoveEventImageRequest, AckResponse>;
    
    setPrimaryEventImage(input: RemoveEventImageRequest, options?: RpcOptions): UnaryCall<RemoveEventImageRequest, AckResponse>;
    
    reorderEventImages(input: ReorderEventImagesRequest, options?: RpcOptions): UnaryCall<ReorderEventImagesRequest, AckResponse>;
    
    getMediaSettings(input: Empty, options?: RpcOptions): UnaryCall<Empty, MediaSettings>;
}

export class EventServiceClient implements IEventServiceClient, ServiceInfo {
    typeName = EventService.typeName;
    methods = EventService.methods;
    options = EventService.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    
    createEvent(input: CreateEventRequest, options?: RpcOptions): UnaryCall<CreateEventRequest, CreateEventResponse> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<CreateEventRequest, CreateEventResponse>("unary", this._transport, method, opt, input);
    }
    
    updateEvent(input: UpdateEventRequest, options?: RpcOptions): UnaryCall<UpdateEventRequest, AckResponse> {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept<UpdateEventRequest, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    deleteEvent(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, AckResponse> {
        const method = this.methods[2], opt = this._transport.mergeOptions(options);
        return stackIntercept<UuidValue, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    getEvent(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, Event> {
        const method = this.methods[3], opt = this._transport.mergeOptions(options);
        return stackIntercept<UuidValue, Event>("unary", this._transport, method, opt, input);
    }
    
    getEventBySlug(input: GetEventBySlugRequest, options?: RpcOptions): UnaryCall<GetEventBySlugRequest, Event> {
        const method = this.methods[4], opt = this._transport.mergeOptions(options);
        return stackIntercept<GetEventBySlugRequest, Event>("unary", this._transport, method, opt, input);
    }
    
    listEvents(input: ListEventsRequest, options?: RpcOptions): UnaryCall<ListEventsRequest, ListEventsResponse> {
        const method = this.methods[5], opt = this._transport.mergeOptions(options);
        return stackIntercept<ListEventsRequest, ListEventsResponse>("unary", this._transport, method, opt, input);
    }
    
    searchEvents(input: SearchEventsRequest, options?: RpcOptions): UnaryCall<SearchEventsRequest, ListEventsResponse> {
        const method = this.methods[6], opt = this._transport.mergeOptions(options);
        return stackIntercept<SearchEventsRequest, ListEventsResponse>("unary", this._transport, method, opt, input);
    }
    
    changeEventStatus(input: ChangeEventStatusRequest, options?: RpcOptions): UnaryCall<ChangeEventStatusRequest, AckResponse> {
        const method = this.methods[7], opt = this._transport.mergeOptions(options);
        return stackIntercept<ChangeEventStatusRequest, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    getEventStats(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, EventStats> {
        const method = this.methods[8], opt = this._transport.mergeOptions(options);
        return stackIntercept<UuidValue, EventStats>("unary", this._transport, method, opt, input);
    }
    
    setEventFeesIncluded(input: SetEventFeesIncludedRequest, options?: RpcOptions): UnaryCall<SetEventFeesIncludedRequest, AckResponse> {
        const method = this.methods[9], opt = this._transport.mergeOptions(options);
        return stackIntercept<SetEventFeesIncludedRequest, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    setEventAch(input: SetEventAchRequest, options?: RpcOptions): UnaryCall<SetEventAchRequest, AckResponse> {
        const method = this.methods[10], opt = this._transport.mergeOptions(options);
        return stackIntercept<SetEventAchRequest, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    listScheduleItems(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, ListScheduleItemsResponse> {
        const method = this.methods[11], opt = this._transport.mergeOptions(options);
        return stackIntercept<UuidValue, ListScheduleItemsResponse>("unary", this._transport, method, opt, input);
    }
    
    createScheduleItem(input: CreateScheduleItemRequest, options?: RpcOptions): UnaryCall<CreateScheduleItemRequest, UuidValue> {
        const method = this.methods[12], opt = this._transport.mergeOptions(options);
        return stackIntercept<CreateScheduleItemRequest, UuidValue>("unary", this._transport, method, opt, input);
    }
    
    updateScheduleItem(input: UpdateScheduleItemRequest, options?: RpcOptions): UnaryCall<UpdateScheduleItemRequest, AckResponse> {
        const method = this.methods[13], opt = this._transport.mergeOptions(options);
        return stackIntercept<UpdateScheduleItemRequest, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    deleteScheduleItem(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, AckResponse> {
        const method = this.methods[14], opt = this._transport.mergeOptions(options);
        return stackIntercept<UuidValue, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    listEventImages(input: ListEventImagesRequest, options?: RpcOptions): UnaryCall<ListEventImagesRequest, ListEventImagesResponse> {
        const method = this.methods[15], opt = this._transport.mergeOptions(options);
        return stackIntercept<ListEventImagesRequest, ListEventImagesResponse>("unary", this._transport, method, opt, input);
    }
    
    addEventImage(input: AddEventImageRequest, options?: RpcOptions): UnaryCall<AddEventImageRequest, EventImage> {
        const method = this.methods[16], opt = this._transport.mergeOptions(options);
        return stackIntercept<AddEventImageRequest, EventImage>("unary", this._transport, method, opt, input);
    }
    
    removeEventImage(input: RemoveEventImageRequest, options?: RpcOptions): UnaryCall<RemoveEventImageRequest, AckResponse> {
        const method = this.methods[17], opt = this._transport.mergeOptions(options);
        return stackIntercept<RemoveEventImageRequest, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    setPrimaryEventImage(input: RemoveEventImageRequest, options?: RpcOptions): UnaryCall<RemoveEventImageRequest, AckResponse> {
        const method = this.methods[18], opt = this._transport.mergeOptions(options);
        return stackIntercept<RemoveEventImageRequest, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    reorderEventImages(input: ReorderEventImagesRequest, options?: RpcOptions): UnaryCall<ReorderEventImagesRequest, AckResponse> {
        const method = this.methods[19], opt = this._transport.mergeOptions(options);
        return stackIntercept<ReorderEventImagesRequest, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    getMediaSettings(input: Empty, options?: RpcOptions): UnaryCall<Empty, MediaSettings> {
        const method = this.methods[20], opt = this._transport.mergeOptions(options);
        return stackIntercept<Empty, MediaSettings>("unary", this._transport, method, opt, input);
    }
}
