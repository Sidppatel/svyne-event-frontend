



import { SponsorService } from "./catalog";
import type { PublicSponsor } from "./catalog";
import type { ListSponsorsResponse } from "./catalog";
import type { UpdateSponsorRequest } from "./catalog";
import type { CreateSponsorRequest } from "./catalog";
import { PerformerService } from "./catalog";
import type { PublicPerformer } from "./catalog";
import type { GetBySlugRequest } from "./catalog";
import type { SetEventLinksRequest } from "./catalog";
import type { ListPerformersResponse } from "./catalog";
import type { UpdatePerformerRequest } from "./catalog";
import type { CreatePerformerRequest } from "./catalog";
import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { VenueService } from "./catalog";
import type { ReorderVenueImagesRequest } from "./catalog";
import type { RemoveVenueImageRequest } from "./catalog";
import type { VenueImage } from "./catalog";
import type { AddVenueImageRequest } from "./catalog";
import type { ListVenueImagesResponse } from "./catalog";
import type { ListVenuesResponse } from "./catalog";
import type { PageRequest } from "./common";
import type { Venue } from "./catalog";
import type { AckResponse } from "./common";
import type { UpdateVenueRequest } from "./catalog";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { UuidValue } from "./common";
import type { CreateVenueRequest } from "./catalog";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";

export interface IVenueServiceClient {
    
    createVenue(input: CreateVenueRequest, options?: RpcOptions): UnaryCall<CreateVenueRequest, UuidValue>;
    
    updateVenue(input: UpdateVenueRequest, options?: RpcOptions): UnaryCall<UpdateVenueRequest, AckResponse>;
    
    getVenue(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, Venue>;
    
    listVenues(input: PageRequest, options?: RpcOptions): UnaryCall<PageRequest, ListVenuesResponse>;
    
    listVenueImages(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, ListVenueImagesResponse>;
    
    addVenueImage(input: AddVenueImageRequest, options?: RpcOptions): UnaryCall<AddVenueImageRequest, VenueImage>;
    
    removeVenueImage(input: RemoveVenueImageRequest, options?: RpcOptions): UnaryCall<RemoveVenueImageRequest, AckResponse>;
    
    setPrimaryVenueImage(input: RemoveVenueImageRequest, options?: RpcOptions): UnaryCall<RemoveVenueImageRequest, AckResponse>;
    
    reorderVenueImages(input: ReorderVenueImagesRequest, options?: RpcOptions): UnaryCall<ReorderVenueImagesRequest, AckResponse>;
}

export class VenueServiceClient implements IVenueServiceClient, ServiceInfo {
    typeName = VenueService.typeName;
    methods = VenueService.methods;
    options = VenueService.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    
    createVenue(input: CreateVenueRequest, options?: RpcOptions): UnaryCall<CreateVenueRequest, UuidValue> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<CreateVenueRequest, UuidValue>("unary", this._transport, method, opt, input);
    }
    
    updateVenue(input: UpdateVenueRequest, options?: RpcOptions): UnaryCall<UpdateVenueRequest, AckResponse> {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept<UpdateVenueRequest, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    getVenue(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, Venue> {
        const method = this.methods[2], opt = this._transport.mergeOptions(options);
        return stackIntercept<UuidValue, Venue>("unary", this._transport, method, opt, input);
    }
    
    listVenues(input: PageRequest, options?: RpcOptions): UnaryCall<PageRequest, ListVenuesResponse> {
        const method = this.methods[3], opt = this._transport.mergeOptions(options);
        return stackIntercept<PageRequest, ListVenuesResponse>("unary", this._transport, method, opt, input);
    }
    
    listVenueImages(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, ListVenueImagesResponse> {
        const method = this.methods[4], opt = this._transport.mergeOptions(options);
        return stackIntercept<UuidValue, ListVenueImagesResponse>("unary", this._transport, method, opt, input);
    }
    
    addVenueImage(input: AddVenueImageRequest, options?: RpcOptions): UnaryCall<AddVenueImageRequest, VenueImage> {
        const method = this.methods[5], opt = this._transport.mergeOptions(options);
        return stackIntercept<AddVenueImageRequest, VenueImage>("unary", this._transport, method, opt, input);
    }
    
    removeVenueImage(input: RemoveVenueImageRequest, options?: RpcOptions): UnaryCall<RemoveVenueImageRequest, AckResponse> {
        const method = this.methods[6], opt = this._transport.mergeOptions(options);
        return stackIntercept<RemoveVenueImageRequest, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    setPrimaryVenueImage(input: RemoveVenueImageRequest, options?: RpcOptions): UnaryCall<RemoveVenueImageRequest, AckResponse> {
        const method = this.methods[7], opt = this._transport.mergeOptions(options);
        return stackIntercept<RemoveVenueImageRequest, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    reorderVenueImages(input: ReorderVenueImagesRequest, options?: RpcOptions): UnaryCall<ReorderVenueImagesRequest, AckResponse> {
        const method = this.methods[8], opt = this._transport.mergeOptions(options);
        return stackIntercept<ReorderVenueImagesRequest, AckResponse>("unary", this._transport, method, opt, input);
    }
}

export interface IPerformerServiceClient {
    
    createPerformer(input: CreatePerformerRequest, options?: RpcOptions): UnaryCall<CreatePerformerRequest, UuidValue>;
    
    updatePerformer(input: UpdatePerformerRequest, options?: RpcOptions): UnaryCall<UpdatePerformerRequest, AckResponse>;
    
    deletePerformer(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, AckResponse>;
    
    listPerformers(input: PageRequest, options?: RpcOptions): UnaryCall<PageRequest, ListPerformersResponse>;
    
    setEventPerformers(input: SetEventLinksRequest, options?: RpcOptions): UnaryCall<SetEventLinksRequest, AckResponse>;
    
    getPerformerBySlug(input: GetBySlugRequest, options?: RpcOptions): UnaryCall<GetBySlugRequest, PublicPerformer>;
}

export class PerformerServiceClient implements IPerformerServiceClient, ServiceInfo {
    typeName = PerformerService.typeName;
    methods = PerformerService.methods;
    options = PerformerService.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    
    createPerformer(input: CreatePerformerRequest, options?: RpcOptions): UnaryCall<CreatePerformerRequest, UuidValue> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<CreatePerformerRequest, UuidValue>("unary", this._transport, method, opt, input);
    }
    
    updatePerformer(input: UpdatePerformerRequest, options?: RpcOptions): UnaryCall<UpdatePerformerRequest, AckResponse> {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept<UpdatePerformerRequest, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    deletePerformer(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, AckResponse> {
        const method = this.methods[2], opt = this._transport.mergeOptions(options);
        return stackIntercept<UuidValue, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    listPerformers(input: PageRequest, options?: RpcOptions): UnaryCall<PageRequest, ListPerformersResponse> {
        const method = this.methods[3], opt = this._transport.mergeOptions(options);
        return stackIntercept<PageRequest, ListPerformersResponse>("unary", this._transport, method, opt, input);
    }
    
    setEventPerformers(input: SetEventLinksRequest, options?: RpcOptions): UnaryCall<SetEventLinksRequest, AckResponse> {
        const method = this.methods[4], opt = this._transport.mergeOptions(options);
        return stackIntercept<SetEventLinksRequest, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    getPerformerBySlug(input: GetBySlugRequest, options?: RpcOptions): UnaryCall<GetBySlugRequest, PublicPerformer> {
        const method = this.methods[5], opt = this._transport.mergeOptions(options);
        return stackIntercept<GetBySlugRequest, PublicPerformer>("unary", this._transport, method, opt, input);
    }
}

export interface ISponsorServiceClient {
    
    createSponsor(input: CreateSponsorRequest, options?: RpcOptions): UnaryCall<CreateSponsorRequest, UuidValue>;
    
    updateSponsor(input: UpdateSponsorRequest, options?: RpcOptions): UnaryCall<UpdateSponsorRequest, AckResponse>;
    
    deleteSponsor(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, AckResponse>;
    
    listSponsors(input: PageRequest, options?: RpcOptions): UnaryCall<PageRequest, ListSponsorsResponse>;
    
    setEventSponsors(input: SetEventLinksRequest, options?: RpcOptions): UnaryCall<SetEventLinksRequest, AckResponse>;
    
    getSponsorBySlug(input: GetBySlugRequest, options?: RpcOptions): UnaryCall<GetBySlugRequest, PublicSponsor>;
}

export class SponsorServiceClient implements ISponsorServiceClient, ServiceInfo {
    typeName = SponsorService.typeName;
    methods = SponsorService.methods;
    options = SponsorService.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    
    createSponsor(input: CreateSponsorRequest, options?: RpcOptions): UnaryCall<CreateSponsorRequest, UuidValue> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<CreateSponsorRequest, UuidValue>("unary", this._transport, method, opt, input);
    }
    
    updateSponsor(input: UpdateSponsorRequest, options?: RpcOptions): UnaryCall<UpdateSponsorRequest, AckResponse> {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept<UpdateSponsorRequest, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    deleteSponsor(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, AckResponse> {
        const method = this.methods[2], opt = this._transport.mergeOptions(options);
        return stackIntercept<UuidValue, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    listSponsors(input: PageRequest, options?: RpcOptions): UnaryCall<PageRequest, ListSponsorsResponse> {
        const method = this.methods[3], opt = this._transport.mergeOptions(options);
        return stackIntercept<PageRequest, ListSponsorsResponse>("unary", this._transport, method, opt, input);
    }
    
    setEventSponsors(input: SetEventLinksRequest, options?: RpcOptions): UnaryCall<SetEventLinksRequest, AckResponse> {
        const method = this.methods[4], opt = this._transport.mergeOptions(options);
        return stackIntercept<SetEventLinksRequest, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    getSponsorBySlug(input: GetBySlugRequest, options?: RpcOptions): UnaryCall<GetBySlugRequest, PublicSponsor> {
        const method = this.methods[5], opt = this._transport.mergeOptions(options);
        return stackIntercept<GetBySlugRequest, PublicSponsor>("unary", this._transport, method, opt, input);
    }
}
